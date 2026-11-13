/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    // ☙—————————————————————————————❧
    //      0. 全域狀態變數 & 深度安全降級機制 (防止變數未定義導致的致命 Bug)
    // ☙—————————————————————————————❧
    const WORKER_URL = "https://long-bar-14d9.tsuki-chen.workers.dev/"; // 部署成功的網址
    const CARDS_PER_PAGE = 5;
    let currentPage = 1;
    let currentFilter = 'all';
    let currentSearchTerm = '';
    // 優先從本地記憶庫讀取當前語言
    let currentLang = localStorage.getItem('lang') || 'zh';
    // 建立安全的靜態資料備份，避免 chars.js 或 prompts.js 載入失敗時整頁白畫面
    // ☙ 建立安全的靜態資料備份，並依據頂部點名簿 (charOrder) 自動排序 ❧
    // ☙ 智慧點名排序機制 (相容物件與純字串) ❧
    const rawCharacters = (typeof characters !== 'undefined' && Array.isArray(characters)) ? characters : [];
    const safeCharOrder = (typeof charOrder !== 'undefined' && Array.isArray(charOrder)) ? charOrder : [];
    const safeCharacters = [...rawCharacters].sort((a, b) => {
        const getRank = (char) => {
            if (!char) return 999999;
            const idx = safeCharOrder.findIndex(item => {
                const targetId = (typeof item === 'object') ? item.id : item;
                return targetId === char.id || targetId === char.name;
            });
            return idx !== -1 ? idx : 999999;
        };
        const rankA = getRank(a);
        const rankB = getRank(b);
        return rankA !== rankB ? rankA - rankB : 0;
    });

    const safePrompts = (typeof prompts !== 'undefined' && Array.isArray(prompts)) ? prompts : [];
    // ☙—————————————————————————————❧
    //      0.5 下載與成人驗證彈窗功能 (角色卡與提示詞)
    // ☙—————————————————————————————❧
    /**
     * @description 動態渲染並顯示自訂的成人驗證或使用條款彈窗 (中英雙語完美對照無缺漏版)
     * @param {string} type - 彈窗類型："char" (角色卡) 或 "prompt" (提示詞)
     * @returns {Promise<boolean>} 使用者是否確認同意
     */
    function showVerificationModal(type = "char") {
        return new Promise((resolve) => {
            // 創建 overlay 容器
            const overlay = document.createElement("div");
            overlay.className = "age-modal-overlay";
            const isEn = (currentLang === 'en'); // 這裡現在能安全、完美地抓到全域的 currentLang 了！
            let modalHTMLContent = "";
            if (type === "char") {
                // 角色卡條款 (中英雙語完全對等，無任何字句省略)
                modalHTMLContent = `
                    <div class="age-modal-content">
                        <div class="age-modal-title">${isEn ? "【Character Card Download Policy】" : "【角色卡下載須知】"}</div>
                        <div class="age-modal-body">
                            ${isEn ? `You are about to download a character card that may contain Mature Content (NSFW), including but not limited to:`
                                   : `您即將下載之角色卡可能包含成人向內容（NSFW），包含但不限於：`}
                            <ul class="age-modal-list">
                                <li>${isEn ? "Explicit sexual depictions" : "露骨性描寫"}</li>
                                <li>${isEn ? "Violent, horrific, or dark themes" : "暴力、恐怖或黑暗題材"}</li>
                                <li>${isEn ? "Psychological trauma, body modifications, and other potentially triggering content" : "心理創傷、身體改造等可能引起不適之內容"}</li>
                                <li>${isEn ? "Other adult content unsuitable for minors" : "其他不適合未成年人閱覽之成人內容"}</li>
                            </ul>
                            ${isEn ? `By clicking "I Agree" and downloading the character card, you declare and agree to the following:`
                                   : `點選「我同意」並下載角色卡即表示您聲明並同意以下事項：`}
                            <ul class="age-modal-list">
                                <li>${isEn ? "You are at least 18 years old or has reached the legal age of majority in your jurisdiction."
                                           : "您已年滿 18 歲，或已達您所在地法律規定之成年年齡"}</li>
                                <li>${isEn ? "You understand that the downloaded content may contain adult themes, and you voluntarily choose to download and view it."
                                           : "您理解下載內容可能包含成人向題材，並自願選擇下載與閱覽"}</li>
                                <li>${isEn ? "You have the legal right to access and possess such content under the laws of your jurisdiction."
                                           : "您依所在地法律有權接觸及持有此類內容"}</li>
                                <li>${isEn ? "The age information you have provided is true and correct."
                                           : "您提供之年齡資訊為真實且正確"}</li>
                                <li>${isEn ? "The downloaded character card is solely for personal, private AI-RP use, and shall not be used for any commercial or illegal purposes."
                                           : "您下載之角色卡僅用於個人私下 AI-RP 使用，不用於任何商業用途與違法用途"}</li>
                                <li>${isEn ? "Any consequences resulting from providing false information or violating the laws of your jurisdiction shall be solely borne by yourself."
                                           : "如因提供不實資訊或違反所在地法律而產生任何後果，相關責任應由您自行承擔"}</li>
                                <li>${isEn ? "<strong>RE-UPLOADING IS STRICTLY PROHIBITED!</strong> This includes, but is not limited to, unauthorized modifications, derivative works, adaptations, plagiarism, or re-uploading without proper credit and a link to the original source."
                                           : "<strong>禁止二次上傳！</strong>包含但不限於任何未經授權的修改、衍生作品、改編、盜用，或未標註原作者及提供出處連結的重新上傳行為。"}</li>
                            </ul>
                            ${isEn ? `Do you confirm that you have read, understood, and agreed to the above content?<br>Clicking "Disagree" will cancel the download.`
                                   : `請問您是否已閱讀、理解並同意上述內容？<br>點選「不同意」將不會進行下載。`}
                        </div>
                        <div class="age-modal-footer">
                            <button type="button" class="age-modal-btn cancel" id="age-confirm-btn">${isEn ? "I Agree" : "我同意"}</button>
                            <button type="button" class="age-modal-btn confirm" id="age-cancel-btn">${isEn ? "Disagree" : "不同意"}</button>
                        </div>
                    </div>
                `;
            } else {
                // 提示詞條款 (中英雙語完全對等，無任何字句省略)
                modalHTMLContent = `
                    <div class="age-modal-content">
                        <div class="age-modal-title">${isEn ? "【Prompt Download Policy】" : "【提示詞下載須知】"}</div>
                        <div class="age-modal-body">
                            ${isEn ? `You are about to download a prompt that may cause LLMs to generate Mature Content (NSFW). By clicking "I Agree" and downloading, you declare and agree to the following:`
                                   : `您即將下載之提示詞可能致使 LLM 產出成人向內容（NSFW），點選「我同意」並下載即表示您聲明並同意以下事項：`}
                            <ul class="age-modal-list">
                                <li>${isEn ? "You are at least 18 years old or has reached the legal age of majority in your jurisdiction."
                                           : "您已年滿 18 歲，或已達您所在地法律規定之成年年齡"}</li>
                                <li>${isEn ? "You understand that the downloaded prompt may cause LLMs to generate mature content, and you voluntarily choose to download and use it."
                                           : "您理解下載之提示詞可能致使 LLM 產出成人向內容，並自願選擇下載與使用"}</li>
                                <li>${isEn ? "You have the legal right to access and possess such content under the laws of your jurisdiction."
                                           : "您依所在地法律有權接觸及持有此類內容"}</li>
                                <li>${isEn ? "The age information you have provided is true and correct."
                                           : "您提供之年齡資訊為真實且正確"}</li>
                                <li>${isEn ? "The downloaded prompt is solely for personal, private AI-RP use, and shall not be used for any commercial or illegal purposes."
                                           : "您下載之提示詞僅用於個人私下 AI-RP 使用，不用於任何商業用途與違法用途"}</li>
                                <li>${isEn ? "Any consequences resulting from providing false information or violating the laws of your jurisdiction shall be solely borne by yourself."
                                           : "如因提供不實資訊或違反所在地法律而產生任何後果，相關責任應由您自行承擔"}</li>
                                <li>${isEn ? "<strong>RE-UPLOADING IS STRICTLY PROHIBITED!</strong> This includes, but is not limited to, unauthorized modifications, derivative works, adaptations, plagiarism, or re-uploading without proper credit and a link to the original source."
                                           : "<strong>禁止二次上傳！</strong>包含但不限於任何未經授權的修改、衍生作品、改編、盜用，或未標註原作者及提供出處連結的重新上傳行為。"}</li>
                            </ul>
                            ${isEn ? `Do you confirm that you have read, understood, and agreed to the above content?<br>Clicking "Disagree" will cancel the download.`
                                   : `請問您是否已閱讀、理解並同意上述內容？<br>點選「不同意」將不會進行下載。`}
                        </div>
                        <div class="age-modal-footer">
                            <button type="button" class="age-modal-btn cancel" id="age-confirm-btn">${isEn ? "I Agree" : "我同意"}</button>
                            <button type="button" class="age-modal-btn confirm" id="age-cancel-btn">${isEn ? "Disagree" : "不同意"}</button>
                        </div>
                    </div>
                `;
            }
            overlay.innerHTML = modalHTMLContent;
            document.body.appendChild(overlay);
            setTimeout(() => {
                overlay.classList.add("active");
            }, 10);
            const destroyModal = (result) => {
                overlay.classList.remove("active");
                setTimeout(() => {
                    overlay.remove();
                    resolve(result);
                }, 300);
            };
            overlay.querySelector("#age-confirm-btn").addEventListener("click", () => destroyModal(true));
            overlay.querySelector("#age-cancel-btn").addEventListener("click", () => destroyModal(false));
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) {
                    destroyModal(false);
                }
            });
        });
    }
    /**
     * @description 觸發成人下載（包含角色卡與提示詞判斷）
     * @param {string} fileName - 要下載的檔案名稱
     * @param {string} type - 下載類型："char" 或者是 "prompt"
     */
    function handleSecureDownload(fileName, type = "char") {
        showVerificationModal(type).then(isConfirmed => {
            if (isConfirmed) {
                try {
                    const timestamp = Math.floor(Date.now() / 1000).toString();
                    const finalDownloadUrl = `${WORKER_URL}${fileName}?time=${timestamp}`;
                    window.location.href = finalDownloadUrl;
                } catch (err) {
                    console.error("執行重導向下載時出了點小差錯：", err);
                    alert("出了點小差錯，請再試一次。");
                }
            }
        });
    }
    // ☙—————————————————————————————❧
    //      1. DOM 元素獲取 & 主題控制
    // ☙—————————————————————————————❧
    const homeButton = document.getElementById('home-btn');
    const mainNavButtons = document.querySelectorAll('.main-nav-scroll .nav-btn');
    const mainContentSections = document.querySelectorAll('.content-section');
    const allSubNavs = document.querySelectorAll('.sub-nav');
    const searchBoxes = document.querySelectorAll('.search-box');
    const tagToggleButtons = document.querySelectorAll('.tag-toggle-btn');
    const toggleNavButton = document.getElementById('toggle-nav-btn');
    const mainNavContainer = document.getElementById('main-nav-container');
    const promptsOutputContainer = document.getElementById('prompts-output-container');
    const mainPromptToggle = document.querySelector('.prompt-intro-toggle');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    if (themeToggleBtn) themeToggleBtn.textContent = savedTheme === 'dark' ? '☼' : '☾';
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggleBtn.textContent = newTheme === 'dark' ? '☼' : '☾';
        });
    }
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    // ☙—————————————————————————————❧
    //      1.5 本地JS翻譯字典加載 (安全層、防錯與自癒機制)
    // ☙—————————————————————————————❧
    function loadLanguagePack() {
        if (typeof i18n !== 'undefined') {
            updateStaticTexts();
            if (homeButton) homeButton.click(); // 初始點擊 Home 載入
        } else {
            console.warn("找不到 i18n 語言配置檔，已啟動預設防空機制。");
            updateStaticTexts();
            if (homeButton) homeButton.click();
        }
    }
    function updateStaticTexts() {
        // 安全字典降級機制：即使 i18n 結構損毀或缺少語言，也絕不爆掉
        const i18nData = (typeof i18n !== 'undefined') ? i18n : {};
        const t = i18nData[currentLang] || i18nData['zh'] || Object.values(i18nData)[0] || {};
        document.title = t.siteTitle || "Adia's HOME | 角色卡倉庫";
        if (homeButton && t.home) homeButton.textContent = t.home;
        const fantasyBtn = document.getElementById('fantasy-btn');
        if (fantasyBtn && t.fantasyBtn) fantasyBtn.textContent = t.fantasyBtn;
        const fictionalBtn = document.getElementById('fictional-btn');
        if (fictionalBtn && t.fictionalBtn) fictionalBtn.textContent = t.fictionalBtn;
        searchBoxes.forEach(box => {
            if (t.searchPlaceholder) box.placeholder = t.searchPlaceholder;
        });
        tagToggleButtons.forEach(btn => {
            if (t.tagToggle) btn.textContent = t.tagToggle;
        });
        document.querySelectorAll('.tag-list-header').forEach(header => {
            if (t.tagListHeader) header.textContent = t.tagListHeader;
        });
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const keyPath = el.getAttribute('data-i18n');
            const textValue = getValueByPath(t, keyPath);
            if (textValue !== undefined && textValue !== null) el.innerHTML = textValue;
        });
        const subNavButtons = document.querySelectorAll('.sub-nav-btn');
        subNavButtons.forEach(btn => {
            const targetKey = btn.getAttribute('data-target');
            if (t.subTags && t.subTags[targetKey]) {
                btn.textContent = t.subTags[targetKey];
            }
        });
        const footerParagraphs = document.querySelectorAll('#page-footer p');
        if (footerParagraphs.length >= 2) {
            if (t.footerWarning) footerParagraphs[0].textContent = t.footerWarning;
            if (t.footerPublishBtn) footerParagraphs[1].textContent = t.footerPublishBtn;
        }
        if (langToggleBtn) {
            langToggleBtn.textContent = currentLang === 'zh' ? 'EN' : 'ZH';
        }
        const translationNotice = document.getElementById('translation-notice');
        if (translationNotice) {
            if (currentLang === 'en') {
                translationNotice.style.display = 'block'; // 英文時英姿颯爽地站出來
            } else {
                translationNotice.style.display = 'none';  // 中文時安靜地退隱
            }
        }
        // 🪄 首頁單欄底部：「◈ 聯絡信箱」與「◈ 最後更新 [日期] (📖)」優雅同行並排！
        const contactRow = document.querySelector('#home-content [data-i18n="homeIntro.authorP4"]');
        if (contactRow && t.homeIntro) {
            const cData = (typeof changelogData !== 'undefined') ? changelogData : {};
            const latestDate = (cData.logs && cData.logs.length > 0) ? cData.logs[0].date : '';
            const updateLabel = t.homeIntro.updateLabel || (currentLang === 'en' ? 'Last Updated' : '最後更新');
            const btnTooltip = t.homeIntro.changelogTitle || (currentLang === 'en' ? 'Changelog' : '更新日誌');
            contactRow.className = 'home-meta-bar';
            contactRow.innerHTML = `
                <div class="home-meta-item">
                    ${t.homeIntro.authorP4}
                </div>
                <div class="home-meta-item home-update-group">
                    <span class="home-meta-label">◈ ${updateLabel}</span>
                    <span class="home-meta-val">${latestDate}</span>
                    <button type="button" class="author-note-btn home-changelog-btn" title="${btnTooltip}" aria-label="${btnTooltip}">
                        ${typeof bookIconSVG !== 'undefined' ? bookIconSVG : '📖'}
                    </button>
                </div>
            `;
        }
        // 🪄 奶茶店底部：「◈ 驗證提醒（可留空）」與「Wiki＋加入伺服器按鈕」同行並排！
        const shopNoteEl = document.querySelector('#home-content [data-i18n="homeIntro.shopP2"]');
        const shopBtnsEl = document.querySelector('#home-content .home-buttons-container:not(.friend-links-container)');
        if (shopNoteEl && shopBtnsEl) {
            let shopBar = document.querySelector('#home-content .home-shop-bar');
            if (!shopBar) {
                shopBar = document.createElement('div');
                shopBar.className = 'home-meta-bar home-shop-bar';
                shopNoteEl.parentNode.insertBefore(shopBar, shopNoteEl);
                shopBar.appendChild(shopNoteEl);
                shopBar.appendChild(shopBtnsEl);
            }
            // 若 lang.js 裡的 shopP2 留空 ""，自動隱藏左側注釋，右側按鈕依然穩穩靠右！
            const rawShopP2 = (t.homeIntro && t.homeIntro.shopP2) ? t.homeIntro.shopP2.trim() : '';
            shopNoteEl.style.display = rawShopP2 ? '' : 'none';
        }
    }
    function getValueByPath(obj, path) {
        if (!obj || !path) return undefined;
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = (currentLang === 'zh' ? 'en' : 'zh');
            localStorage.setItem('lang', currentLang);
            updateStaticTexts();
            renderContent();
            renderPrompts();
            updateTagList();
        });
    }
    // ☙—————————————————————————————❧
    //   2. 核心渲染功能 (角色卡 & 分頁之數據防呆處理)
    // ☙—————————————————————————————❧
    const bookIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M5.83231 7.60591c0.38989 0 0.78979 0 1.17969 0.05999 0.66748 0.03781 1.32352 0.18998 1.93949 0.44988 0.07509 0.03725 0.16155 0.04452 0.24181 0.02032 0.08026 -0.02419 0.14831 -0.07803 0.19031 -0.15057 0.042 -0.07255 0.05481 -0.15836 0.03582 -0.24001 -0.01898 -0.08165 -0.06833 -0.15301 -0.13803 -0.19959 -0.55083 -0.40053 -1.17116 -0.69544 -1.82952 -0.86977 -0.56245 -0.15612 -1.15008 -0.20027 -1.72954 -0.12997 -0.66559 0.10302 -1.3103 0.3123 -1.9095 0.61984 -0.0715 0.0271 -0.12994 0.08049 -0.16339 0.14924 -0.03344 0.06875 -0.03937 0.14769 -0.01657 0.22066 0.0271 0.0738 0.0821 0.13402 0.15315 0.16767 0.07106 0.03366 0.15248 0.03807 0.22675 0.01229 0.60034 -0.10588 1.21081 -0.14278 1.81953 -0.10998Z"/><path fill="currentColor" d="M9.51132 10.1353c-0.73459 -0.66619 -1.67863 -1.05511 -2.6693 -1.09974 -0.27722 -0.00939 -0.55474 0.00398 -0.82978 0.03999 -0.64579 0.12101 -1.27386 0.32252 -1.86951 0.59984 -0.06456 0.02899 -0.11629 0.08059 -0.14544 0.14508 -0.02915 0.06449 -0.0337 0.13742 -0.0128 0.20503 0.0209 0.0676 0.06581 0.1253 0.12626 0.162 0.06046 0.0368 0.13228 0.0503 0.20194 0.0378 0.60602 -0.084 1.21796 -0.1174 1.82952 -0.1H7.3119c0.64503 0.0253 1.27654 0.1925 1.84952 0.4898 0.03293 0.0352 0.07317 0.0627 0.11788 0.0806 0.0447 0.018 0.09279 0.0259 0.14089 0.0233 0.04809 -0.0027 0.09503 -0.0158 0.13751 -0.0385 0.04247 -0.0227 0.07946 -0.0545 0.10837 -0.093 0.0289 -0.0385 0.04901 -0.0829 0.05892 -0.1301 0.00991 -0.0471 0.00938 -0.0959 -0.00156 -0.1428 -0.01093 -0.0469 -0.03201 -0.0908 -0.06175 -0.1287 -0.02973 -0.0379 -0.0674 -0.0688 -0.11037 -0.0906l-0.03999 0.04Z"/><path fill="currentColor" d="M6.89201 11.5549c-0.28552 -0.035 -0.57425 -0.035 -0.85977 0 -0.65049 0.0882 -1.28012 0.2913 -1.85951 0.5998 -0.06821 0.0275 -0.12343 0.0799 -0.15446 0.1466 -0.03104 0.0667 -0.03558 0.1426 -0.01271 0.2125 0.02288 0.0699 0.07146 0.1285 0.13591 0.1639 0.06444 0.0355 0.13995 0.0451 0.21121 0.0269 0.56592 -0.1118 1.14449 -0.1454 1.71955 -0.1h0.69982c0.23183 0.0186 0.46224 0.052 0.68981 0.1 0.54265 0.1294 1.06433 0.3347 1.5496 0.6098 0.03403 0.0253 0.07274 0.0434 0.11386 0.0536 0.04112 0.0101 0.08385 0.012 0.1257 0.0055 0.04185 -0.0065 0.08199 -0.0213 0.1181 -0.0434 0.0361 -0.0222 0.06745 -0.0513 0.09222 -0.0856 0.02632 -0.035 0.04519 -0.075 0.05544 -0.1175 0.01026 -0.0425 0.01168 -0.0867 0.00419 -0.1298 -0.0075 -0.0431 -0.02376 -0.0842 -0.04777 -0.1208 -0.02401 -0.0365 -0.05527 -0.0678 -0.09184 -0.0918 -0.49203 -0.4359 -1.06184 -0.775 -1.67956 -0.9998 -0.26298 -0.0992 -0.53387 -0.1762 -0.80979 -0.2299Z"/><path fill="currentColor" d="M15.5298 5.65645c0.0771 0.393 0.1305 0.79028 0.1599 1.18969 0.14 1.66956 0 3.37906 0.2899 4.99866 0 0 0.4399 0.6099 0.8998 0.23 0.2165 -0.179 0.4234 -0.3692 0.6198 -0.5699 0.1238 -0.1642 0.2341 -0.338 0.33 -0.5199 0.136 -0.2487 0.2562 -0.5059 0.3599 -0.7697 0.2298 0.2468 0.4403 0.5108 0.6298 0.7897 0 0 0.5299 0.6999 0.5699 0.7398 0.0849 0.1012 0.2009 0.1715 0.3299 0.2 0.1311 0.0347 0.2706 0.0177 0.3897 -0.0474 0.119 -0.0651 0.2085 -0.1734 0.2501 -0.3025 0.0644 -0.1633 0.1048 -0.335 0.12 -0.5099v-0.9097l-0.1 -2.65934c-0.3699 -3.53907 -0.3699 -3.99895 -0.6098 -4.48882 -0.0885 -0.17678 -0.2122 -0.33361 -0.3635 -0.46083 -0.1513 -0.12723 -0.327 -0.22216 -0.5163 -0.27898 -0.2831 -0.09466 -0.5821 -0.13204 -0.8798 -0.10997 -0.3691 0.01091 -0.7369 0.05103 -1.0997 0.11997 -0.1 0 -2.1394 0.46988 -2.3294 0.58985 -0.0326 0.01858 -0.0612 0.04353 -0.084 0.07338 -0.0228 0.02985 -0.0393 0.06398 -0.0487 0.10036 -0.0093 0.03638 -0.0112 0.07427 -0.0056 0.1114 0.0056 0.03714 0.0187 0.07276 0.0383 0.10475 0.4221 0.75932 0.7734 1.55579 1.0498 2.37938Zm-0.26 -2.30939 1.7396 -0.36991c0.3329 -0.02051 0.6668 -0.02051 0.9997 0 0.1908 -0.00852 0.3813 0.0221 0.5599 0.08998 0.0894 0.02844 0.172 0.0751 0.2426 0.13704 0.0705 0.06194 0.1275 0.13782 0.1673 0.22286 0.1097 0.37648 0.1602 0.7677 0.1499 1.1597l0.21 3.0492v2.33938c-0.1392 -0.18235 -0.2894 -0.35597 -0.4499 -0.51986 -0.2242 -0.22041 -0.4804 -0.40578 -0.7598 -0.54985 -0.0752 -0.0349 -0.1571 -0.05298 -0.24 -0.05298 -0.0828 0 -0.1647 0.01808 -0.2399 0.05298 -0.1074 0.03947 -0.1987 0.11326 -0.2599 0.20994 -0.0407 0.10762 -0.0741 0.21784 -0.1 0.32991l-0.15 0.3999c-0.0799 0.18995 -0.1599 0.38985 -0.2499 0.57985l-0.14 0.2599c-0.1699 -1.27964 -0.1699 -2.59929 -0.3499 -3.88895 -0.0509 -0.4282 -0.1311 -0.85241 -0.2399 -1.26967 -0.0937 -0.36742 -0.2209 -0.72549 -0.3799 -1.06972 -0.17 -0.3599 -0.3699 -0.71981 -0.5798 -1.06971l0.0699 -0.03999Z"/><path fill="currentColor" d="M23.8975 10.2253c-0.1099 -0.99976 -0.2799 -1.9995 -0.4298 -2.91925 -0.0919 -0.71843 -0.2458 -1.42755 -0.4599 -2.11945 -0.1101 -0.37755 -0.3421 -0.70801 -0.6598 -0.93975 -0.3671 -0.20705 -0.7714 -0.33955 -1.1897 -0.3899 -0.07 -0.00385 -0.1401 -0.00385 -0.21 0 -0.6498 0 -0.5598 0.61984 0 0.72981h0.07c0.3061 0.05575 0.5983 0.17125 0.8598 0.33991 0.1966 0.22685 0.3157 0.51055 0.3399 0.80979 0.12 0.61984 0.13 1.32965 0.1799 1.76953 0.13 0.86978 0.26 1.84952 0.3899 2.85921 0.13 1.0098 0.23 1.8995 0.26 2.8493 0.0443 0.9594 -0.0093 1.9207 -0.16 2.8692 -1.1398 -0.3799 -2.3384 -0.5526 -3.5391 -0.5098 -1.2458 0.0382 -2.4818 0.233 -3.679 0.5798 -0.3793 0.1077 -0.7424 0.2657 -1.0797 0.4699 -0.4301 0.2615 -0.844 0.5487 -1.2397 0.8598l-0.3099 0.1999c0 -0.8797 0.08 -1.9995 0.07 -3.1092v-1.5096c0 -0.5098 -0.08 -0.9997 -0.14 -1.4996 -0.1599 -1.3196 -0.4099 -2.5493 -0.6098 -3.45906 0.0003 -0.04248 -0.0094 -0.08443 -0.0283 -0.12245s-0.0466 -0.07104 -0.0807 -0.09636c-0.0341 -0.02533 -0.0737 -0.04226 -0.1155 -0.0494 -0.0419 -0.00715 -0.0849 -0.00431 -0.1254 0.00827 -0.037 0.00489 -0.0725 0.0171 -0.1047 0.03591 -0.0321 0.01881 -0.0602 0.04385 -0.0825 0.07364 -0.0224 0.02979 -0.0385 0.06375 -0.0476 0.09987 -0.0091 0.03612 -0.0108 0.07369 -0.0052 0.1105 0.08 0.91976 0.09 2.14948 0.14 3.46908 0 0.4799 0 0.9997 0.08 1.4796s0.07 0.9998 0.1199 1.4896c0.09 1.0697 0.19 2.0695 0.25 2.9093 -0.24 -0.17 -0.5199 -0.3699 -0.8898 -0.5899 -0.3814 -0.2315 -0.779 -0.4354 -1.1897 -0.6098 -1.4214 -0.6032 -2.97414 -0.8304 -4.50879 -0.6598 -1.37063 0.1792 -2.69229 0.6277 -3.88898 1.3196 0.10413 -0.869 0.14755 -1.7442 0.12996 -2.6193 -0.01674 -0.9718 -0.10698 -1.941 -0.26992 -2.8992l-0.61984 -4.47887c0 -0.19994 0.10997 -0.32991 0.26993 -0.44988 0.26745 -0.18487 0.56046 -0.3297 0.86977 -0.42989 1.49827 -0.56821 3.08638 -0.86281 4.68877 -0.86977 1.60716 0.02029 3.1942 0.36014 4.6688 0.99974 0.0782 0.03579 0.1674 0.03905 0.248 0.00905 0.0807 -0.02999 0.1461 -0.09079 0.1819 -0.16901s0.039 -0.16745 0.009 -0.24807c-0.03 -0.08062 -0.0908 -0.14602 -0.169 -0.18182 -1.5195 -0.76731 -3.17962 -1.21636 -4.87872 -1.31965 -1.71954 -0.07581 -3.43822 0.16826 -5.06867 0.71981 -0.52537 0.15604 -1.010017 0.42567 -1.419624 0.78979 -0.189816 0.15654 -0.336346 0.35911 -0.4256058 0.58839 -0.08925934 0.22927 -0.1182691 0.4776 -0.0842604 0.72127 0 0.20995 0.1799522 1.19969 0.3599052 2.23941 0.149961 0.8598 0.319916 1.7395 0.449882 2.2694 0.208563 0.905 0.352233 1.8238 0.429883 2.7493 0.06999 0.9497 0 3.1292 0 3.1991 -0.03958 0.4026 0.05534 0.8069 0.26993 1.1497 0.11843 0.1814 0.276 0.3339 0.46111 0.4464 0.18512 0.1124 0.39309 0.182 0.60861 0.2035 0.23162 0.0393 0.46821 0.0393 0.69982 0 0.43988 -0.09 0.90976 -0.29 1.30965 -0.3499 0.55422 -0.0621 1.1121 -0.0855 1.66957 -0.07 0.54463 0.0037 1.08741 0.064 1.61957 0.1799 0.90884 0.1244 1.73357 0.5977 2.29935 1.3197 0.2853 0.4214 0.6484 0.7844 1.0698 1.0697 0.4151 0.217 0.8825 0.3139 1.3496 0.2799 0.6111 0.0043 1.2132 -0.1471 1.7496 -0.4399 0.6606 -0.4758 1.2733 -1.0149 1.8295 -1.6095 0.2131 -0.1916 0.4608 -0.3409 0.7298 -0.4399 0.4515 -0.1812 0.9205 -0.3152 1.3996 -0.3999 0.4836 -0.1019 0.9756 -0.1588 1.4696 -0.17 0.4931 -0.0072 0.9855 0.0363 1.4696 0.13 0.09 0 0.7398 0.2499 0.9998 0.2899 0.0753 0.0153 0.1531 0.0133 0.2275 -0.0057 0.0745 -0.0191 0.1436 -0.0547 0.2024 -0.1042 0.2154 -0.2396 0.3697 -0.5277 0.4498 -0.8398 0.403 -1.6437 0.687 -3.3142 0.8498 -4.9987 0.0322 -1.004 0.0021 -2.009 -0.09 -3.0092Zm-1.4096 7.7479c-0.0378 0.112 -0.0881 0.2193 -0.1499 0.32 -0.2893 -0.1208 -0.5969 -0.1918 -0.9098 -0.21 -0.537 -0.1307 -1.087 -0.2011 -1.6396 -0.2099 -0.5486 -0.0084 -1.097 0.0284 -1.6395 0.1099 -0.5397 0.0814 -1.0715 0.2085 -1.5896 0.3799 -0.3656 0.1404 -0.7039 0.3434 -0.9998 0.5999 -0.5226 0.5264 -1.0914 1.0048 -1.6995 1.4296 -0.3821 0.1999 -0.8086 0.2997 -1.2397 0.2899 -0.8898 0 -1.0997 -0.3999 -1.4696 -0.8497 -0.3496 -0.4708 -0.8006 -0.8569 -1.31966 -1.1297 -0.53608 -0.2753 -1.11354 -0.461 -1.70955 -0.5499 -0.59852 -0.0918 -1.20454 -0.1253 -1.80952 -0.1 -0.60054 0.0168 -1.19886 0.0803 -1.78953 0.19 -0.4099 0.08 -0.87977 0.3099 -1.32966 0.4299 -0.14935 0.0432 -0.30442 0.0634 -0.45987 0.0599 -0.12302 -0.0041 -0.24352 -0.036 -0.35255 -0.0931 -0.10903 -0.0571 -0.20381 -0.138 -0.27729 -0.2368 -0.14221 -0.2164 -0.21542 -0.4709 -0.20994 -0.7298 1.23358 -0.6724 2.59746 -1.0713 3.99895 -1.1697 1.37901 -0.0736 2.75434 0.2015 3.99894 0.7998 0.84158 0.4316 1.65318 0.9192 2.42938 1.4596 0.1823 0.0917 0.3868 0.1298 0.5898 0.11 0.3168 -0.0392 0.619 -0.1559 0.8798 -0.3399 0.6617 -0.5907 1.4102 -1.0763 2.2194 -1.4396 1.1102 -0.3741 2.2616 -0.6125 3.4291 -0.7098 1.1233 -0.1073 2.2567 0.0013 3.3391 0.3199 -0.0499 0.07 -0.1999 0.9897 -0.2899 1.2696Z"/><path fill="currentColor" d="M12.6606 6.16673c0.3839 -0.18997 0.7817 -0.35043 1.19 -0.48l0.56 -0.23c0.1031 -0.05318 0.1859 -0.13871 0.2357 -0.24347 0.0498 -0.10476 0.0639 -0.22296 0.04 -0.33648 -0.0238 -0.11352 -0.0842 -0.21609 -0.172 -0.29196 -0.0877 -0.07588 -0.1979 -0.12088 -0.3137 -0.12809 -0.3604 0.05193 -0.7032 0.18906 -1 0.4 -0.3551 0.25355 -0.6688 0.56051 -0.93 0.91 -0.0513 0.05392 -0.08 0.12553 -0.08 0.2 0 0.07446 0.0287 0.14607 0.08 0.2 0.0523 0.0507 0.1222 0.07906 0.195 0.07906s0.1428 -0.02836 0.195 -0.07906Z"/></svg>`;
    function createCharacterCardHTML(char) {
        if (!char) return '';
        const isEn = (currentLang === 'en');
        const name = isEn ? (char.name_en || char.name) : (char.name || char.name_en || '');
        const description = isEn ? (char.description_en || char.description) : (char.description || char.description_en || '');
        const reminder = isEn ? (char.reminder_en || char.reminder) : (char.reminder || char.reminder_en || '');
        const warning = isEn ? (char.warning_en || char.warning) : (char.warning || char.warning_en || '');
        const tags = isEn ? (char.tags_en || char.tags) : (char.tags || char.tags_en || []);
        const links = isEn ? (char.links_en || char.links) : (char.links || char.links_en || []);
        // ☙ 檢查點名簿裡是否為該角色指定了專屬緞帶 ❧
        let ribbonHTML = '';
        const orderConfig = safeCharOrder.find(item => {
            const targetId = (typeof item === 'object') ? item.id : item;
            return targetId === char.id || targetId === char.name;
        });
        if (orderConfig && typeof orderConfig === 'object' && orderConfig.badge) {
            const badgeText = isEn ? (orderConfig.badge_en || orderConfig.badge) : orderConfig.badge;
            const badgeType = orderConfig.type || 'new'; // 預設為 'new' 樣式
            ribbonHTML = `<div class="corner-ribbon ribbon-${badgeType}"><span>${badgeText}</span></div>`;
        }
        // ☙ 檢查是否有寫作者手札 (支援直接寫在 data.js 角色裡) ❧
        const noteContent = isEn ? (char.authorNote_en || char.authorNote) : (char.authorNote || char.authorNote_en || '');
        const noteBtnText = isEn
            ? `${bookIconSVG}`
            : `${bookIconSVG}`;
        const noteTooltip = isEn ? "Author's Note" : "作者手札";
        const noteBtnHTML = noteContent
            ? `<button type="button" class="author-note-btn" title="${noteTooltip}" aria-label="${noteTooltip}" data-note-title="${encodeURIComponent(name)}" data-note-content="${encodeURIComponent(noteContent)}">${bookIconSVG}</button>`
            : '';
        const imageSliderHTML = createCharacterImageSliderHTML(char);
        const tagsHTML = Array.isArray(tags) ? tags.map(tag => `<span>${tag}</span>`).join('') : '';
        const reminderHTML = reminder ? `<p class="character-reminder">${reminder}</p>` : '';
        const warningHTML = warning ? `<p class="character-warning">${warning}</p>` : '';
        const footerHTML = createCardFooterHTML(char, links);
        return `
            <div class="character-card" data-category="${char.category || ''}">
                ${ribbonHTML}
                <div class="card-main-content">
                    ${imageSliderHTML}
                    <div class="character-info">
                        <div class="character-header-row">
                            <h3 class="character-name">${name}</h3>
                            ${noteBtnHTML}
                        </div>
                        <div class="character-tags">${tagsHTML}</div>
                        <p class="character-desc">${description}</p>
                        ${reminderHTML}
                        ${warningHTML}
                    </div>
                </div>
                ${footerHTML}
            </div>
        `;
    }

    function createCharacterImageSliderHTML(char) {
        const imageSources = char.images && char.images.length > 0 ? char.images : (char.image ? [char.image] : []);
        if (imageSources.length === 0) return '';
        const sliderId = `slider-${char.id || Math.random().toString(36).substr(2, 9)}`;
        const imagesHTML = imageSources.map((src, index) =>
            `<div class="slide ${index === 0 ? 'active' : ''}"><img src="${src}" alt="Img ${index + 1}"></div>`
        ).join('');
        const dotsHTML = imageSources.map((_, index) =>
            `<div class="dot ${index === 0 ? 'active' : ''}" data-slide-index="${index}"></div>`
        ).join('');
        return `
            <div class="character-image-slider" id="${sliderId}">
                <div class="slides-container">${imagesHTML}</div>
                ${imageSources.length > 1 ? `
                    <button class="slider-btn prev">‹</button>
                    <button class="slider-btn next">›</button>
                    <div class="dots-container">${dotsHTML}</div>
                ` : ''}
            </div>
        `;
    }
    function createCardFooterHTML(char, links) {
        const statusHTML = createCardStatusHTML(char);
        const linksHTML = links && links.length > 0
            ? `<div class="character-links">${links.map(link => {
                if (link.file) {
                    return `<button type="button" class="char-link-btn" data-secure-file="${link.file}" data-type="char">${link.name}</button>`;
                } else {
                    return `<a href="${link.url || '#'}" target="_blank" class="char-link-btn">${link.name}</a>`;
                }
              }).join('')}</div>`
            : '';
        if (!statusHTML && !linksHTML) return '';
        return `<div class="card-footer">${statusHTML}${linksHTML}</div>`;
    }
    function createCardStatusHTML(char) {
        const isEn = (currentLang === 'en');
        const lorebookLabel = isEn ? "Lorebook:" : "知識書：";
        const noLorebookText = "-";
        const createSingleStatusRow = (statusData, versionName = null, updatesAvailable = false) => {
            let featuresHTML = '';
            if (versionName) {
                featuresHTML += `
                    <div class="version-name-container" ${updatesAvailable ? 'role="button" tabindex="0"' : ''}>
                        ${updatesAvailable ? '<span class="toggle-arrow">›</span>' : ''}
                        <span class="version-name">${versionName}</span>
                    </div>
                `;
            }
            if (statusData.features) {
                for (const [feature, enabled] of Object.entries(statusData.features)) {
                    let displayFeature = feature;
                    if (isEn) {
                        if (feature === "中文開場") displayFeature = "ZH Opening";
                        else if (feature === "英文開場") displayFeature = "EN Opening";
                        else if (feature === "可替換頭像") displayFeature = "Alt Avatars";
                        else if (feature === "視覺小說立繪") displayFeature = "Visual Novel Sprites";
                    }
                    featuresHTML += `
                        <label class="feature-label">
                            <input type="checkbox" ${enabled ? 'checked' : ''} disabled>
                            <span class="checkmark"></span>
                            <span>${displayFeature}</span>
                        </label>
                    `;
                }
            }
            // ☙—————————————————————————————❧
            //   已經為您修正：支援 lorebook 與 lorebook_en 翻譯切換
            // ☙—————————————————————————————❧
            if (statusData.lorebook !== undefined || statusData.lorebook_en !== undefined) {
                const rawLorebook = isEn
                    ? (statusData.lorebook_en || statusData.lorebook || '')
                    : (statusData.lorebook || statusData.lorebook_en || '');
                const hasLorebookContent = rawLorebook && rawLorebook.trim() !== '' && rawLorebook.trim() !== '無' && rawLorebook.trim() !== 'none';
                const lorebookText = hasLorebookContent ? rawLorebook : noLorebookText;
                const lorebookChecked = hasLorebookContent ? 'checked' : '';
                featuresHTML += `
                    <div class="character-lorebook">
                        <label class="feature-label">
                            <input type="checkbox" ${lorebookChecked} disabled>
                            <span class="checkmark"></span>
                            <span>${lorebookLabel}</span>
                        </label>
                        <span class="lorebook-text">${lorebookText}</span>
                    </div>
                `;
            }
            return featuresHTML ? `<div class="character-status-container">${featuresHTML}</div>` : '';
        };
        if (char.versions && char.versions.length > 0) {
            const baseVersion = char.versions[0];
            const updates = char.versions.slice(1);
            const hasUpdates = updates.length > 0;
            let finalHTML = createSingleStatusRow(baseVersion, baseVersion.versionName, hasUpdates);
            if (hasUpdates) {
                const updatesHTML = updates.map(update => {
                    const desc = isEn ? (update.updateDescription_en || update.updateDescription) : (update.updateDescription || update.updateDescription_en || '');
                    return `<p class="version-update">▪ ${update.versionName} ${desc}</p>`;
                }).join('');
                finalHTML += `<div class="version-updates-container collapsed">${updatesHTML}</div>`;
            }
            return finalHTML;
        } else {
            return createSingleStatusRow(char);
        }
    }
    // ☙—————————————————————————————❧
    //   2.5 提示詞渲染功能
    // ☙—————————————————————————————❧
    function createPromptCardHTML(promptData) {
        if (!promptData) return '';
        const isEn = (currentLang === 'en');
        const mainName = isEn ? (promptData.mainName_en || promptData.mainName) : (promptData.mainName || promptData.mainName_en || '');
        const subNameHTML = promptData.subName ? `<span class="prompt-subname">${promptData.subName}</span>` : '';
        const labelVersion = isEn ? "Version:" : "版本：";
        const labelCompat = isEn ? "Models:" : "適用模型：";
        const labelFeature = isEn ? "Features:" : "特色功能：";
        const labelGuide = isEn ? "Structure:" : "搭配結構：";
        const toggleHistoryText = isEn ? "View historical versions" : "查看重點歷史版本";
        const createVersionDetailHTML = (version, isLatest = false) => {
            if (!version) return '';
            const compat = isEn ? (version.compatibility_en || version.compatibility) : (version.compatibility || version.compatibility_en || '');
            const features = isEn ? (version.features_en || version.features) : (version.features || version.features_en || '');
            const links = isEn ? (version.links_en || version.links) : (version.links || version.links_en || []);
            const linksHTML = links && links.length > 0
                ? `<div class="${isLatest ? 'prompt-links' : 'old-version-links'}">${links.map(link => {
                    if (link.file) {
                        return `<button type="button" class="prompt-link-btn ${isLatest ? 'primary' : 'secondary'}" data-secure-file="${link.file}" data-type="prompt">${link.name}</button>`;
                    } else {
                        return `<a href="${link.url || '#'}" target="_blank" class="prompt-link-btn ${isLatest ? 'primary' : 'secondary'}">${link.name}</a>`;
                    }
                  }).join('')}</div>`
                : '';
            let guideHTML = '';
            if (version.guide) {
                const guideText = isEn ? (version.guide.text_en || version.guide.text) : (version.guide.text || version.guide.text_en || '');
                const linkName = isEn ? (version.guide.link.name_en || version.guide.link.name) : (version.guide.link.name || version.guide.link.name_en || '');
                guideHTML = `<p class="${isLatest ? 'prompt-guide' : 'old-version-guide'}">
                        <span class="label">▪ ${labelGuide}</span> ${guideText} <a href="${version.guide.link.url || '#'}" target="_blank" rel="noopener noreferrer">${linkName}</a>
                   </p>`;
            }
            // ☙—————————————————————————————❧
            //   就是這裡！唯有當 isLatest 為 true (最新版) 時，才會生成特色功能的 HTML
            //   歷史版本舊卡片 (isLatest 為 false) 將會直接優雅地跳過它，不再渲染顯示
            // ☙—————————————————————————————❧
            const featuresHTML = isLatest ? `
                <p class="prompt-feature prompt-text-wrap">
                    <span class="label">▪ ${labelFeature}</span> ${features}
                </p>
            ` : '';
            return `
                <p class="${isLatest ? 'current-version' : 'old-version-item-version'}">
                    <span class="label">▪ ${labelVersion}</span> ${version.versionName || ''}
                </p>
                <p class="${isLatest ? 'prompt-compatibility' : 'old-version-compatibility'}">
                    <span class="label">▪ ${labelCompat}</span> ${compat}
                </p>
                ${featuresHTML}
                ${guideHTML}
                ${linksHTML}
            `;
        };
        const latestVersionHTML = createVersionDetailHTML(promptData.latestVersion, true);
        const oldVersionsHTML = promptData.oldVersions && promptData.oldVersions.length > 0
            ? `
                <div class="prompt-version-history">
                    <div class="version-history-toggle" role="button" tabindex="0">
                        <span class="toggle-arrow">›</span>
                        ${toggleHistoryText}
                    </div>
                    <div class="version-history-list collapsed">
                        ${promptData.oldVersions.map(version => `
                            <div class="old-version-item">
                                ${createVersionDetailHTML(version, false)}
                            </div>
                        `).join('')}
                    </div>
                </div>
              `
            : '';
        return `
            <div class="prompt-item" id="prompt-${promptData.id || Math.random().toString(36).substr(2, 9)}">
                <h2 class="prompt-name">
                    <span>${mainName}</span>
                    ${subNameHTML}
                </h2>
                <div class="prompt-details">
                    ${latestVersionHTML}
                </div>
                ${oldVersionsHTML}
            </div>
        `;
    }
    function renderPrompts() {
        if (!promptsOutputContainer) return;
        promptsOutputContainer.innerHTML = safePrompts.map(createPromptCardHTML).join('');
        promptsOutputContainer.classList.add('collapsed');
        if (mainPromptToggle) mainPromptToggle.classList.remove('expanded');
        document.querySelectorAll('.version-history-list').forEach(list => {
            list.classList.add('collapsed');
            const toggle = list.previousElementSibling;
            if (toggle) toggle.classList.remove('expanded');
        });
    }
        let currentExactCharId = null; // 👈 新增：記錄從世界觀跳轉過來的精準角色 ID
    function renderContent() {
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection || activeSection.id === 'home-content') return;
        const sectionType = activeSection.id.replace('-content', '');
        const controlsContainer = activeSection.querySelector('.controls-container');
        const scrollArea = activeSection.querySelector('.sub-content-scroll-area');
        const paginationContainer = activeSection.querySelector('.pagination-container');
        const wvContainer = activeSection.querySelector('.worldview-scroll-area');
        // ☙ 如果點選的是「✦ 世界觀」，隱藏角色列表，展開世界觀專屬頁面 ❧
        if (currentFilter === `${sectionType}-worldview`) {
            if (controlsContainer) controlsContainer.style.display = 'none';
            if (scrollArea) scrollArea.style.display = 'none';
            if (paginationContainer) paginationContainer.style.display = 'none';
            renderWorldview(activeSection, sectionType);
            const newWvContainer = activeSection.querySelector('.worldview-scroll-area');
            if (newWvContainer) newWvContainer.style.display = 'block';
            return;
        }
        // ☙ 如果點選的是「全部 / 雪域 / 魔都...」，隱藏世界觀，立刻跳回角色卡展示頁！ ❧
        if (wvContainer) wvContainer.style.display = 'none';
        if (controlsContainer) controlsContainer.style.display = '';
        if (scrollArea) scrollArea.style.display = '';
        if (paginationContainer) paginationContainer.style.display = '';
        // 🪄 收集當前語言的所有已知標籤 (用來辨識帶有空白的英文長標籤，如 Dark Fairy Tale)
        const isEn = (currentLang === 'en');
        const allKnownTags = new Set(
            safeCharacters.flatMap(c => (isEn ? (c.tags_en || c.tags) : (c.tags || c.tags_en)) || [])
                .filter(Boolean)
                .map(t => t.toLowerCase().trim())
        );
        // 先依「逗號 / 頓號」拆開；若使用者手打空白（如「譚樂望 現代」）且該詞不是已知的空白長標籤，才依空白拆開！
        const searchKeywords = currentSearchTerm
            .split(/[,，、;；]+/)
            .map(s => s.trim())
            .filter(Boolean)
            .flatMap(segment => {
                if (allKnownTags.has(segment)) return [segment];
                return segment.split(/\s+/).filter(Boolean);
            });
        const filteredCharacters = safeCharacters.filter(char => {
            if (!char || !char.category) return false;
            const categoryPrefix = char.category.split('-')[0];
            if (categoryPrefix !== sectionType) return false;
            // 🔫 若是從世界觀點擊角色頭像跳轉過來，直接 100% 精準狙擊該張卡片的 ID！
            if (currentExactCharId) {
                return char.id === currentExactCharId;
            }
            const subCategoryMatch = currentFilter === `${sectionType}-all` || char.category === currentFilter;
            const charTags = [
                ...(char.tags || []),
                ...(char.tags_en || [])
            ].filter(Boolean).map(t => t.toLowerCase().trim());
            const searchTarget = [
                char.name, char.name_en,
                char.description, char.description_en,
                char.reminder, char.reminder_en,
                char.warning, char.warning_en,
                ...charTags
            ].filter(Boolean).map(text => text.toLowerCase());
            // 🎯 智慧交集：若關鍵字是「已知標籤」，必須精準命中該標籤（防止 Male 誤抓 Female、Dark 誤抓 Dark Fairy Tale）！
            const searchTermMatch = searchKeywords.length === 0 || searchKeywords.every(kw => {
                if (allKnownTags.has(kw)) {
                    return charTags.includes(kw);
                }
                return searchTarget.some(text => text.includes(kw));
            });
            return subCategoryMatch && searchTermMatch;
        });
        const totalPages = Math.ceil(filteredCharacters.length / CARDS_PER_PAGE);
        currentPage = Math.min(currentPage, totalPages) || 1;
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const paginatedCharacters = filteredCharacters.slice(startIndex, startIndex + CARDS_PER_PAGE);
        if (scrollArea) {
            scrollArea.innerHTML = paginatedCharacters.map(createCharacterCardHTML).join('');
        }
        renderPagination(activeSection, totalPages);
        initializeAllVisibleSliders();
    }

    function renderPagination(activeSection, totalPages) {
        const paginationContainer = activeSection.querySelector('.pagination-container');
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;
        const isEn = (currentLang === 'en');
        const prevText = isEn ? "« Prev" : "« 上一頁";
        const nextText = isEn ? "Next »" : "下一頁 »";
        const createPageButton = (text, page, isActive = false) => {
            const button = document.createElement('a');
            button.href = '#';
            button.textContent = text;
            button.className = `page-btn ${isActive ? 'active' : ''}`;
            button.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = page;
                renderContent();
                const scrollArea = activeSection.querySelector('.sub-content-scroll-area');
                if (scrollArea) {
                    requestAnimationFrame(() => { scrollArea.scrollTop = 0; });
                }
            });
            return button;
        };
        if (currentPage > 1) paginationContainer.appendChild(createPageButton(prevText, currentPage - 1));
        for (let i = 1; i <= totalPages; i++) paginationContainer.appendChild(createPageButton(i, i, i === currentPage));
        if (currentPage < totalPages) paginationContainer.appendChild(createPageButton(nextText, currentPage + 1));
    }
    // ☙—————————————————————————————❧
    //   2.8 世界觀專屬頁面渲染功能 (萬邦諸國：左目錄·右翻牌禪意版)
    // ☙—————————————————————————————❧
    let currentWorldTab = 'overview';       // 記憶目前選中的世界觀章節
    let currentSelectedKingdomKey = '0-0';  // 記憶【萬邦諸國】目前翻開的國家 (格式: 區域索引-國家索引)
    let currentLoreCategory = 'beings';     // 記憶【萬象群生】目前選的是 'beings'(群生) 還是 'phenomena'(萬象)
    let currentSelectedLoreIndex = 0;       // 記憶目前點選的巧克力磚索引
    function renderWorldview(activeSection, sectionType) {
        const wData = (typeof worldviewData !== 'undefined' && worldviewData[sectionType]) ? worldviewData[sectionType] : null;
        if (!wData) return;
        const isEn = (currentLang === 'en');
        let wvContainer = activeSection.querySelector('.worldview-scroll-area');
        if (!wvContainer) {
            wvContainer = document.createElement('div');
            wvContainer.className = 'worldview-scroll-area';
            activeSection.appendChild(wvContainer);
        }
        if (!wData.tabs.some(t => t.id === currentWorldTab)) {
            currentWorldTab = wData.tabs[0].id;
        }
        // 🪄 自動去 data.js 抓出角色的第一張圖片，生成帶縮圖的傳送按鈕
        const buildCharLinksHTML = (chars, labelZh, labelEn) => {
            if (!chars || chars.length === 0) return '';
            const btnsHTML = chars.map(c => {
                const foundChar = safeCharacters.find(sc => sc.id === c.id);
                const imgSrc = foundChar ? ((foundChar.images && foundChar.images[0]) || foundChar.image || '') : '';
                const isCustomName = c.name && foundChar && c.name !== foundChar.name;
                const displayName = isEn
                    ? (c.name_en || (isCustomName ? c.name : (foundChar ? (foundChar.name_en || c.name) : c.name)))
                    : (c.name || (foundChar ? foundChar.name : ''));
                const imgHTML = imgSrc
                    ? `<img src="${imgSrc}" alt="${displayName}" class="wv-char-thumb" loading="lazy">`
                    : `<span class="wv-char-fallback">❦</span>`;
                return `
                    <button type="button" class="wv-char-jump-btn" data-jump-id="${c.id}" title="${displayName}">
                        ${imgHTML}
                        <span class="wv-char-name">${displayName}</span>
                    </button>
                `;
            }).join('');
            return `
                <div class="wv-char-links">
                    <div class="wv-char-label">${isEn ? labelEn : labelZh}</div>
                    <div class="wv-char-list">${btnsHTML}</div>
                </div>
            `;
        };
        // 1. 生成頂部章節書籤列
        const tabsHTML = wData.tabs.map(tab => `
            <button type="button" class="wv-tab-btn ${tab.id === currentWorldTab ? 'active' : ''}" data-wv-tab="${tab.id}">
                ${isEn ? (tab.name_en || tab.name) : tab.name}
            </button>
        `).join('<span class="wv-tab-dot">·</span>');
        // 2. 根據不同章節，生成對應的四大專屬美學版型
        let bodyHTML = '';
        if (currentWorldTab === 'overview' && wData.overview) {
            const ov = wData.overview;
            const quote = isEn ? (ov.quote_en || ov.quote) : ov.quote;
            const sectionsHTML = (ov.sections || []).map(sec => {
                const secTitle = isEn ? (sec.title_en || sec.title) : (sec.title || sec.title_en);
                const titleHTML = secTitle ? `<h3 class="wv-section-title">❦ ${secTitle}</h3>` : '';
                return `
                    <div class="wv-overview-card">
                        ${titleHTML}
                        <div class="wv-section-text">${isEn ? (sec.content_en || sec.content) : sec.content}</div>
                    </div>
                `;
            }).join('');
            bodyHTML = `
                <div class="wv-quote-box">${quote}</div>
                <div class="wv-overview-list">${sectionsHTML}</div>
            `;
        } else if (currentWorldTab === 'timeline' && wData.timeline) {
            const itemsHTML = wData.timeline.map(item => {
                const charsHTML = buildCharLinksHTML(item.chars, '時代之下的身影', 'Figures of This Era');
                return `
                    <div class="wv-timeline-item">
                        <div class="wv-timeline-node">◈</div>
                        <div class="wv-timeline-content">
                            <div class="wv-timeline-era">${isEn ? (item.era_en || item.era) : item.era}</div>
                            <h3 class="wv-timeline-title">${isEn ? (item.title_en || item.title) : item.title}</h3>
                            <p class="wv-timeline-desc">${isEn ? (item.desc_en || item.desc) : item.desc}</p>
                            ${charsHTML}
                        </div>
                    </div>
                `;
            }).join('');
            bodyHTML = `<div class="wv-timeline-wrapper">${itemsHTML}</div>`;
        } else if (currentWorldTab === 'regions' && wData.regions) {
            // 確保預設選中的國家存在，否則自動選第一個有國家的區域
            let firstValidKey = null;
            wData.regions.forEach((reg, rIdx) => {
                (reg.kingdoms || []).forEach((_, kIdx) => {
                    const key = `${rIdx}-${kIdx}`;
                    if (!firstValidKey) firstValidKey = key;
                });
            });
            const [selR, selK] = currentSelectedKingdomKey.split('-').map(Number);
            if (!wData.regions[selR] || !wData.regions[selR].kingdoms || !wData.regions[selR].kingdoms[selK]) {
                currentSelectedKingdomKey = firstValidKey || '0-0';
            }
            // A. 生成左側無框禪意目錄
            const sidebarHTML = wData.regions.map((reg, rIdx) => {
                const kButtonsHTML = (reg.kingdoms || []).map((k, kIdx) => {
                    const key = `${rIdx}-${kIdx}`;
                    const isActive = (key === currentSelectedKingdomKey);
                    return `
                        <button type="button" class="wv-sidebar-kingdom-btn ${isActive ? 'active' : ''}" data-kingdom-key="${key}">
                            ${isEn ? (k.name_en || k.name) : k.name}
                        </button>
                    `;
                }).join('');
                if (!kButtonsHTML) return '';
                return `
                    <div class="wv-sidebar-group">
                        <div class="wv-sidebar-region">◈ ${isEn ? (reg.regionName_en || reg.regionName) : reg.regionName}</div>
                        <div class="wv-sidebar-list">${kButtonsHTML}</div>
                    </div>
                `;
            }).join('');
            // B. 生成右側所有國家的風土牌
            const cardsHTML = wData.regions.map((reg, rIdx) => {
                return (reg.kingdoms || []).map((k, kIdx) => {
                    const key = `${rIdx}-${kIdx}`;
                    const isActive = (key === currentSelectedKingdomKey);
                    const regionLabel = isEn ? (reg.regionName_en || reg.regionName) : reg.regionName;
                    const kName = isEn ? (k.name_en || k.name) : k.name;
                    let cardInnerHTML = '';
                    if (Array.isArray(k.eras) && k.eras.length > 0) {
                        const eraTabsHTML = k.eras.map((eraObj, eIdx) => `
                            <button type="button" class="wv-era-tab-btn ${eIdx === 0 ? 'active' : ''}" data-era-index="${eIdx}">
                                〔 ${isEn ? (eraObj.era_en || eraObj.era) : eraObj.era} 〕
                            </button>
                        `).join('<span class="wv-era-dot">·</span>');
                        const eraPanesHTML = k.eras.map((eraObj, eIdx) => {
                            const eraCharsHTML = buildCharLinksHTML(eraObj.chars, '身處於此的身影', 'Figures of This Realm');
                            return `
                                <div class="wv-era-pane ${eIdx === 0 ? 'active' : ''}" data-era-pane="${eIdx}">
                                    <div class="wv-kingdom-desc">${isEn ? (eraObj.desc_en || eraObj.desc || '') : (eraObj.desc || '')}</div>
                                    ${eraCharsHTML}
                                </div>
                            `;
                        }).join('');
                        cardInnerHTML = `
                            <div class="wv-era-tabs">${eraTabsHTML}</div>
                            <div class="wv-era-panes">${eraPanesHTML}</div>
                        `;
                    } else {
                        const charsHTML = buildCharLinksHTML(k.chars, '身處於此的身影', 'Figures of This Realm');
                        cardInnerHTML = `
                            <div class="wv-kingdom-desc">${isEn ? (k.desc_en || k.desc || '') : (k.desc || '')}</div>
                            ${charsHTML}
                        `;
                    }
                    return `
                        <div class="wv-kingdom-card ${isActive ? 'active' : ''}" data-kingdom-card="${key}">
                            <div class="wv-kingdom-card-header">
                                <div class="wv-kingdom-card-region">${regionLabel}</div>
                                <h3 class="wv-kingdom-card-title">${kName}</h3>
                                <div class="wv-kingdom-card-divider"><span>❖</span></div>
                            </div>
                            <div class="wv-kingdom-card-body">
                                ${cardInnerHTML}
                            </div>
                        </div>
                    `;
                }).join('');
            }).join('');
            // 👇 新增小螢幕專用的目錄開關鈕 (.wv-sidebar-toggle-btn) 與遮罩
            bodyHTML = `
                <div class="wv-regions-layout">
                    <button type="button" class="wv-sidebar-toggle-btn">
                        ◈ ${isEn ? 'Realms Index' : '萬邦諸國目錄'} <span class="wv-sidebar-toggle-arrow">▸</span>
                    </button>
                    <div class="wv-sidebar-backdrop"></div>
                    <aside class="wv-regions-sidebar">${sidebarHTML}</aside>
                    <section class="wv-regions-stage">${cardsHTML}</section>
                </div>
            `;
        } else if (currentWorldTab === 'lore' && wData.lore) {
            const loreList = wData.lore[currentLoreCategory] || [];
            if (currentSelectedLoreIndex >= loreList.length) {
                currentSelectedLoreIndex = 0;
            }
            const isBeings = (currentLoreCategory === 'beings');
            const charLabelZh = isBeings ? '屬此族類的身影' : '與此相關的身影';
            const charLabelEn = isBeings ? 'Figures of This Kind' : 'Figures Tied to This';
            // A. 生成左側：與【萬邦諸國】同款的置中星芒標題卡（拿掉重複的 ◈，層次更分明！）
            const cardsHTML = loreList.map((item, idx) => {
                const isActive = (idx === currentSelectedLoreIndex);
                const mainTitle = isEn ? (item.subtitle || item.name_en || item.name) : item.name;
                // 頂部小標：中文時顯示英文副標（如 Human），英文時顯示分類名（Beings / Phenomena）
                const topLabel = isEn
                    ? (isBeings ? 'Beings' : 'Phenomena')
                    : (item.subtitle || item.name_en || (isBeings ? '群生' : '萬象'));
                const charsHTML = buildCharLinksHTML(item.chars, charLabelZh, charLabelEn);
                return `
                    <div class="wv-lore-detail-card ${isActive ? 'active' : ''}" data-lore-card="${idx}">
                        <div class="wv-kingdom-card-header">
                            <div class="wv-kingdom-card-region">${topLabel}</div>
                            <h3 class="wv-kingdom-card-title">${mainTitle}</h3>
                            <div class="wv-kingdom-card-divider"><span>❖</span></div>
                        </div>
                        <div class="wv-lore-card-body">
                            <div class="wv-lore-desc">${isEn ? (item.desc_en || item.desc) : item.desc}</div>
                            ${charsHTML}
                        </div>
                    </div>
                `;
            }).join('');
            // B. 生成右側：中文版為「直立燕尾七夕籤」，英文版自動化為「橫書日式繪馬」！
            const tilesHTML = loreList.map((item, idx) => {
                const isActive = (idx === currentSelectedLoreIndex);
                const tileTitle = isEn ? (item.subtitle || item.name_en || item.name) : item.name;
                // 🪄 中文版為「直立燕尾籤 (60x140)」，英文版轉 90 度化為「橫式燕尾籤 (140x60)」！
                const svgShapeHTML = isEn
                    ? `<svg class="wv-tanzaku-bg" viewBox="0 0 140 60" preserveAspectRatio="none" aria-hidden="true">
                           <polygon class="wv-tanzaku-shape" points="1,1 138,1 122,30 138,59 1,59" />
                       </svg>`
                    : `<svg class="wv-tanzaku-bg" viewBox="0 0 60 140" preserveAspectRatio="none" aria-hidden="true">
                           <polygon class="wv-tanzaku-shape" points="1,1 59,1 59,138 30,122 1,138" />
                       </svg>`;
                return `
                    <button type="button" class="wv-lore-tile-btn ${isActive ? 'active' : ''}" data-lore-index="${idx}">
                        ${svgShapeHTML}
                        <span class="wv-tanzaku-hole" aria-hidden="true"></span>
                        <span class="wv-tanzaku-text">${tileTitle}</span>
                    </button>
                `;
            }).join('');
            // 👇 加上與【萬邦諸國】同款的小螢幕收合目錄按鈕與遮罩
            // 👇 就是這一行！幫它貼上 lang-en 或 lang-zh 的識別證
            bodyHTML = `
                <div class="wv-lore-layout ${isEn ? 'lang-en' : 'lang-zh'}">
                    <button type="button" class="wv-lore-toggle-btn">
                        ◈ ${isEn ? 'Index' : '萬象群生目錄'} <span class="wv-lore-toggle-arrow">▸</span>
                    </button>
                    <div class="wv-lore-backdrop"></div>
                    <section class="wv-lore-stage">${cardsHTML}</section>
                    <aside class="wv-lore-matrix-panel">
                        <div class="wv-lore-switch-bar">
                            <button type="button" class="wv-lore-cat-btn ${currentLoreCategory === 'phenomena' ? 'active' : ''}" data-lore-cat="phenomena">
                                〔 ${isEn ? 'Phenomena' : '萬象'} 〕
                            </button>
                            <span class="wv-lore-switch-dot">❖</span>
                            <button type="button" class="wv-lore-cat-btn ${currentLoreCategory === 'beings' ? 'active' : ''}" data-lore-cat="beings">
                                〔 ${isEn ? 'Beings' : '群生'} 〕
                            </button>
                        </div>
                        <div class="wv-lore-chocolate-grid">${tilesHTML}</div>
                    </aside>
                </div>
            `;
        }
        wvContainer.innerHTML = `
            <div class="wv-chapter-nav">${tabsHTML}</div>
            <div class="wv-chapter-body">${bodyHTML}</div>
        `;
    }
    // ☙—————————————————————————————❧
    //      3. 事件監聽 & 流程控制 (整合事件委託·自動解除狙擊鎖定版)
    // ☙—————————————————————————————❧
    function hideAllSubNavs() { allSubNavs.forEach(nav => nav.classList.remove('active')); }
    function showMainContent(targetId) {
        mainContentSections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) targetSection.classList.add('active');
    }
    if (homeButton) {
        homeButton.addEventListener('click', (e) => {
            e.preventDefault();
            currentExactCharId = null; // 回到首頁時解除單卡鎖定
            mainNavButtons.forEach(btn => btn.classList.remove('active'));
            hideAllSubNavs();
            showMainContent('home-content');
            renderPrompts();
        });
    }
    mainNavButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetContentId = button.id.replace('-btn', '-content');
            // 若已在該大分類、且沒有處於單卡狙擊鎖定狀態，才跳過不動作
            if (button.classList.contains('active') && !currentExactCharId) return;
            currentExactCharId = null; // 👈 切換大分類時，立刻解除單卡 ID 鎖定！
            mainNavButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showMainContent(targetContentId);
            hideAllSubNavs();
            const targetSubNav = document.querySelector(`.sub-nav[data-parent="${targetContentId}"]`);
            if (targetSubNav) {
                targetSubNav.classList.add('active');
                const defaultAllButton = targetSubNav.querySelector('.sub-nav-btn[data-target$="-all"]') || targetSubNav.querySelector('.sub-nav-btn');
                if (defaultAllButton) {
                    targetSubNav.querySelectorAll('.sub-nav-btn').forEach(btn => btn.classList.remove('active'));
                    defaultAllButton.classList.add('active');
                    currentFilter = defaultAllButton.dataset.target;
                    currentPage = 1;
                    currentSearchTerm = '';
                    // 清空所有搜尋框殘留的跳轉名字
                    searchBoxes.forEach(box => { box.value = ''; });
                    updateTagList();
                    renderContent();
                    const activeSection = document.getElementById(targetContentId);
                    if (activeSection) {
                        const scrollArea = activeSection.querySelector('.sub-content-scroll-area');
                        if (scrollArea) {
                            requestAnimationFrame(() => { scrollArea.scrollTop = 0; });
                        }
                    }
                }
            }
        });
    });
    allSubNavs.forEach(nav => {
        nav.addEventListener('click', (e) => {
            if (!e.target.matches('.sub-nav-btn')) return;
            e.preventDefault();
            const button = e.target;
            // 若點擊已選中的子分類（例如「全部」），但正處於單卡鎖定狀態，允許點擊以解除鎖定！
            if (button.classList.contains('active') && !currentExactCharId) return;
            // 👈 若剛才處於世界觀跳轉的單卡鎖定狀態，點任何子分類按鈕時一併清空搜尋框並解鎖
            if (currentExactCharId) {
                currentExactCharId = null;
                currentSearchTerm = '';
                searchBoxes.forEach(box => { box.value = ''; });
            }
            nav.querySelectorAll('.sub-nav-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.target;
            currentPage = 1;
            updateTagList();
            renderContent();
            const activeSection = document.querySelector('.content-section.active');
            if (activeSection) {
                const scrollArea = activeSection.querySelector('.sub-content-scroll-area');
                if (scrollArea) {
                    requestAnimationFrame(() => { scrollArea.scrollTop = 0; });
                }
            }
        });
    });
    // ☙—————————————————————————————❧
    //    4. 雜項功能 & 多標籤疊加搜尋系統 (逗號分隔·完美相容英文空白標籤)
    // ☙—————————————————————————————❧
    // 🪄 將搜尋框內容解析為乾淨的標籤/關鍵字陣列
    function parseSearchTokens(val) {
        if (!val) return [];
        return val.split(/[,，、;；]+/).map(s => s.trim()).filter(Boolean);
    }
    // 🪄 智慧切換搜尋框裡的 Tag（以「, 」優雅分隔，不再切碎 Dark Fairy Tale！）
    function toggleTagInSearchBox(searchBox, tag) {
        if (!searchBox || !tag) return;
        currentExactCharId = null;
        const cleanTag = tag.trim();
        const tokens = parseSearchTokens(searchBox.value);
        const existingIndex = tokens.findIndex(t => t.toLowerCase() === cleanTag.toLowerCase());
        if (existingIndex !== -1) {
            tokens.splice(existingIndex, 1); // 已存在就精準拔除
        } else {
            tokens.push(cleanTag);           // 不存在就加入尾端
        }
        searchBox.value = tokens.join(', ');
        searchBox.dispatchEvent(new Event('input', { bubbles: true }));
    }
    function updateTagList() {
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection || activeSection.id === 'home-content') return;
        const sectionType = activeSection.id.replace('-content', '');
        const searchBox = activeSection.querySelector('.search-box');
        const activeTokens = parseSearchTokens(searchBox ? searchBox.value : '').map(t => t.toLowerCase());
        const relevantCharacters = safeCharacters.filter(char => {
            if (!char || !char.category) return false;
            if (char.category.split('-')[0] !== sectionType) return false;
            return currentFilter === `${sectionType}-all` || char.category === currentFilter;
        });
        const isEn = (currentLang === 'en');
        const rawTags = relevantCharacters.flatMap(char => {
            const list = isEn ? (char.tags_en || char.tags) : (char.tags || char.tags_en);
            return Array.isArray(list) ? list : [];
        });
        const allTags = [...new Set(rawTags)].sort();
        const container = activeSection.querySelector('.tag-list-container');
        if (!container) return;
        const header = container.querySelector('.tag-list-header');
        container.innerHTML = '';
        if (header) container.appendChild(header);
        allTags.forEach(tag => {
            if (!tag) return;
            const tagButton = document.createElement('button');
            tagButton.type = 'button';
            tagButton.className = 'tag-suggestion-btn';
            tagButton.textContent = tag;
            // 🎯 100% 完整比對！點選 Dark Fairy Tale 絕對不會再誤亮旁邊的 Dark！
            if (activeTokens.includes(tag.trim().toLowerCase())) {
                tagButton.classList.add('active');
            }
            tagButton.addEventListener('click', (e) => {
                e.stopPropagation(); // 點完保持清單開啟
                toggleTagInSearchBox(searchBox, tag);
            });
            container.appendChild(tagButton);
        });
    }
    tagToggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            if (button.nextElementSibling) button.nextElementSibling.classList.toggle('active');
        });
    });
    document.addEventListener('click', (e) => {
        if (e.target.closest('.tag-suggestion-btn')) return;
        document.querySelectorAll('.tag-list-container.active').forEach(container => {
            const toggleBtn = container.previousElementSibling;
            if (!container.contains(e.target) && e.target !== toggleBtn) {
                container.classList.remove('active');
            }
        });
    });
    searchBoxes.forEach(box => box.addEventListener('input', (e) => {
        currentExactCharId = null;
        currentSearchTerm = e.target.value.toLowerCase().trim();
        currentPage = 1;
        renderContent();
        updateTagList();
    }));
    if (toggleNavButton && mainNavContainer) {
        const rightControls = document.querySelector('.header-right-controls');
        if (rightControls) rightControls.prepend(toggleNavButton);
        // 展開時：選單細線 + 向上收起箭頭
        const collapseSVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="13" y2="6"></line><line x1="3" y1="12" x2="11" y2="12"></line><line x1="3" y1="18" x2="11" y2="18"></line><polyline points="15 11 18 8 21 11"></polyline><line x1="18" y1="8" x2="18" y2="18"></line></svg>`;
        // 收合時：選單細線 + 向下拉開箭頭
        const expandSVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="13" y2="6"></line><line x1="3" y1="12" x2="11" y2="12"></line><line x1="3" y1="18" x2="11" y2="18"></line><polyline points="15 15 18 18 21 15"></polyline><line x1="18" y1="6" x2="18" y2="18"></line></svg>`;
        toggleNavButton.innerHTML = collapseSVG;
        toggleNavButton.title = "收合導覽列 / Toggle Menu";
        toggleNavButton.addEventListener('click', () => {
            const isCollapsed = mainNavContainer.classList.toggle('collapsed');
            toggleNavButton.innerHTML = isCollapsed ? expandSVG : collapseSVG;
        });
    }
    // ☙—————————————————————————————❧
    //      5. 圖片輪播器功能
    // ☙—————————————————————————————❧
    const sliderIntervals = {};
    function initializeSlider(sliderId) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;
        const slides = slider.querySelectorAll('.slide');
        const dots = slider.querySelectorAll('.dot');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        let currentIndex = 0;
        const totalSlides = slides.length;
        if (totalSlides <= 1) return;
        const goToSlide = (index) => {
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            currentIndex = (index + totalSlides) % totalSlides;
            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        };
        const startAutoplay = () => {
            stopAutoplay();
            sliderIntervals[sliderId] = setInterval(() => goToSlide(currentIndex + 1), 5000);
        };
        const stopAutoplay = () => clearInterval(sliderIntervals[sliderId]);
        if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        dots.forEach(dot => dot.addEventListener('click', (e) => goToSlide(parseInt(e.target.dataset.slideIndex))));
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
        startAutoplay();
    }
    function initializeAllVisibleSliders() {
        Object.values(sliderIntervals).forEach(clearInterval);
        const visibleSliders = document.querySelectorAll('.content-section.active .character-image-slider');
        visibleSliders.forEach(slider => initializeSlider(slider.id));
    }
    // ☙—————————————————————————————❧
    //    6. 事件委託：管理摺疊、彈窗與下載
    // ☙—————————————————————————————❧
    document.addEventListener('click', function(e) {
        // ☙ 點擊首頁「最後更新」旁的小書本圓章，彈出倉庫更新手札 ❧
        const changelogBtn = e.target.closest('.home-changelog-btn');
        if (changelogBtn) {
            e.preventDefault();
            const isEn = (currentLang === 'en');
            const i18nData = (typeof i18n !== 'undefined') ? i18n : {};
            const tHome = (i18nData[currentLang] && i18nData[currentLang].homeIntro) ? i18nData[currentLang].homeIntro : {};
            const cData = (typeof changelogData !== 'undefined') ? changelogData : {};
            const modalSubtitle = tHome.changelogSubtitle || (isEn ? "✦ Warehouse Log ✦" : "✦ 倉庫手札 ✦");
            const modalTitle = tHome.changelogTitle || (isEn ? "Changelog" : "更新日誌");
            const upcomingLabel = tHome.upcomingLabel || (isEn ? "Upcoming" : "未來預定");
            const closeText = isEn ? "Close" : "闔上手札";
            const upcomingText = isEn ? (cData.upcoming_en || cData.upcoming) : (cData.upcoming || cData.upcoming_en);
            const upcomingHTML = upcomingText ? `
                <div class="changelog-modal-upcoming">
                    <div class="changelog-modal-date">◈ ${upcomingLabel}</div>
                    <div class="changelog-modal-text">${upcomingText}</div>
                </div>
            ` : '';
            const logsHTML = (cData.logs || []).map(item => {
                const text = isEn ? (item.content_en || item.content) : (item.content || item.content_en);
                return `
                    <div class="changelog-modal-entry">
                        <div class="changelog-modal-date">◈ ${item.date}</div>
                        <div class="changelog-modal-text">${text}</div>
                    </div>
                `;
            }).join('');
            const overlay = document.createElement("div");
            overlay.className = "age-modal-overlay";
            overlay.innerHTML = `
                <div class="age-modal-content author-note-modal">
                    <div class="author-note-subtitle">${modalSubtitle}</div>
                    <div class="age-modal-title">${modalTitle}</div>
                    <div class="age-modal-body author-note-body changelog-modal-body">${upcomingHTML}${logsHTML}</div>
                    <div class="age-modal-footer">
                        <button type="button" class="age-modal-btn cancel" id="changelog-close-btn">${closeText}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
            setTimeout(() => overlay.classList.add("active"), 10);
            const closeModal = () => {
                overlay.classList.remove("active");
                setTimeout(() => overlay.remove(), 300);
            };
            overlay.querySelector("#changelog-close-btn").addEventListener("click", closeModal);
            overlay.addEventListener("click", (ev) => { if (ev.target === overlay) closeModal(); });
            return;
        }
        // ☙ 點擊右上角「作者手札」彈出日誌視窗 ❧
        const noteBtn = e.target.closest('.author-note-btn');
        if (noteBtn) {
            e.preventDefault();
            const isEn = (currentLang === 'en');
            const title = decodeURIComponent(noteBtn.getAttribute('data-note-title') || '');
            const content = decodeURIComponent(noteBtn.getAttribute('data-note-content') || '');
            const modalSubtitle = isEn ? "✦ Author's Note ✦" : "✦ 作者手札 ✦";
            const closeText = isEn ? "Close" : "闔上手札";
            const overlay = document.createElement("div");
            overlay.className = "age-modal-overlay";
            overlay.innerHTML = `
                <div class="age-modal-content author-note-modal">
                    <div class="author-note-subtitle">${modalSubtitle}</div>
                    <div class="age-modal-title">${title}</div>
                    <div class="age-modal-body author-note-body">${content}</div>
                    <div class="age-modal-footer">
                        <button type="button" class="age-modal-btn cancel" id="note-close-btn">${closeText}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
            setTimeout(() => overlay.classList.add("active"), 10);
            const closeModal = () => {
                overlay.classList.remove("active");
                setTimeout(() => overlay.remove(), 300);
            };
            overlay.querySelector("#note-close-btn").addEventListener("click", closeModal);
            overlay.addEventListener("click", (ev) => { if (ev.target === overlay) closeModal(); });
            return;
        }
        const secureBtn = e.target.closest('[data-secure-file]');
        if (secureBtn) {
            e.preventDefault();
            const fileName = secureBtn.getAttribute('data-secure-file');
            const downloadType = secureBtn.getAttribute('data-type') || "char";
            handleSecureDownload(fileName, downloadType);
            return;
        }
        const toggleButton = e.target.closest('.version-name-container[role="button"]');
        if (toggleButton) {
             const statusContainer = toggleButton.closest('.character-status-container');
             const updatesContainer = statusContainer ? statusContainer.nextElementSibling : null;
             const arrow = toggleButton.querySelector('.toggle-arrow');
             if (updatesContainer && arrow) {
                 updatesContainer.classList.toggle('collapsed');
                 arrow.classList.toggle('expanded', !updatesContainer.classList.contains('collapsed'));
             }
             return;
        }
        // ☙ 只有點擊「SillyTavern 提示詞」旁邊的小箭頭圓章時，才展開/收合抽屜！ ❧
        const promptArrowBtn = e.target.closest('.prompt-intro-toggle .toggle-arrow');
        if (promptArrowBtn) {
            const mainPromptToggle = promptArrowBtn.closest('.prompt-intro-toggle');
            const wrapper = mainPromptToggle ? mainPromptToggle.nextElementSibling : null;
            if (wrapper && mainPromptToggle) {
                wrapper.classList.toggle('collapsed');
                mainPromptToggle.classList.toggle('expanded', !wrapper.classList.contains('collapsed'));
            }
            return;
        }
        const versionHistoryToggle = e.target.closest('.version-history-toggle');
        if (versionHistoryToggle) {
            const list = versionHistoryToggle.nextElementSibling;
            const arrow = versionHistoryToggle.querySelector('.toggle-arrow');
            if (list && arrow) {
                list.classList.toggle('collapsed');
                versionHistoryToggle.classList.toggle('expanded', !list.classList.contains('collapsed'));
            }
        }
        // ☙ 世界觀：切換內部 4 大章節分頁 ❧
        const wvTabBtn = e.target.closest('.wv-tab-btn');
        if (wvTabBtn) {
            currentWorldTab = wvTabBtn.getAttribute('data-wv-tab');
            const activeSection = document.querySelector('.content-section.active');
            if (activeSection) {
                const sectionType = activeSection.id.replace('-content', '');
                renderWorldview(activeSection, sectionType);
                const wvArea = activeSection.querySelector('.worldview-scroll-area');
                if (wvArea) wvArea.scrollTop = 0;
            }
            return;
        }
        // ☙ 世界觀【萬象群生】：小螢幕展開/收合目錄盒（與萬邦諸國同款！） ❧
        const loreToggleBtn = e.target.closest('.wv-lore-toggle-btn');
        if (loreToggleBtn) {
            const layout = loreToggleBtn.closest('.wv-lore-layout');
            if (layout) layout.classList.toggle('sidebar-open');
            return;
        }
        const loreBackdrop = e.target.closest('.wv-lore-backdrop');
        if (loreBackdrop) {
            const layout = loreBackdrop.closest('.wv-lore-layout');
            if (layout) layout.classList.remove('sidebar-open');
            return;
        }
        // ☙ 世界觀【萬象群生】：點擊「〔萬象〕❖〔群生〕」切換大分類 ❧
        const loreCatBtn = e.target.closest('.wv-lore-cat-btn');
        if (loreCatBtn) {
            const targetCat = loreCatBtn.getAttribute('data-lore-cat');
            const wasOpen = Boolean(loreCatBtn.closest('.wv-lore-layout.sidebar-open'));
            if (targetCat && targetCat !== currentLoreCategory) {
                currentLoreCategory = targetCat;
                currentSelectedLoreIndex = 0;
                const activeSection = document.querySelector('.content-section.active');
                if (activeSection) {
                    renderWorldview(activeSection, activeSection.id.replace('-content', ''));
                    // 若在手機版目錄內切換「萬象/群生」，保持目錄展開讓使用者能直接點小泡泡！
                    if (wasOpen) {
                        const newLayout = activeSection.querySelector('.wv-lore-layout');
                        if (newLayout) newLayout.classList.add('sidebar-open');
                    }
                }
            }
            return;
        }
        // ☙ 世界觀【萬象群生】：點擊右側「七夕書籤（手機為小泡泡）」切換左側內容 ❧
        const loreTileBtn = e.target.closest('.wv-lore-tile-btn');
        if (loreTileBtn) {
            const targetIdx = parseInt(loreTileBtn.getAttribute('data-lore-index'), 10);
            const layout = loreTileBtn.closest('.wv-lore-layout');
            if (layout && !isNaN(targetIdx)) {
                layout.classList.remove('sidebar-open'); // 手機版選完小泡泡自動收起目錄！
                currentSelectedLoreIndex = targetIdx;
                layout.querySelectorAll('.wv-lore-tile-btn').forEach(btn => {
                    btn.classList.toggle('active', btn === loreTileBtn);
                });
                layout.querySelectorAll('.wv-lore-detail-card').forEach(card => {
                    card.classList.toggle('active', parseInt(card.getAttribute('data-lore-card'), 10) === targetIdx);
                });
            }
            return;
        }
        // ☙ 世界觀【萬邦諸國】：小螢幕展開/收合左側目錄 ❧
        const sidebarToggleBtn = e.target.closest('.wv-sidebar-toggle-btn');
        if (sidebarToggleBtn) {
            const layout = sidebarToggleBtn.closest('.wv-regions-layout');
            if (layout) layout.classList.toggle('sidebar-open');
            return;
        }
        const sidebarBackdrop = e.target.closest('.wv-sidebar-backdrop');
        if (sidebarBackdrop) {
            const layout = sidebarBackdrop.closest('.wv-regions-layout');
            if (layout) layout.classList.remove('sidebar-open');
            return;
        }
        // ☙ 世界觀【萬邦諸國】：點擊左側目錄切換國家（無閃現＋小螢幕點完自動收起目錄！） ❧
        const sidebarKingdomBtn = e.target.closest('.wv-sidebar-kingdom-btn');
        if (sidebarKingdomBtn) {
            const targetKey = sidebarKingdomBtn.getAttribute('data-kingdom-key');
            const layout = sidebarKingdomBtn.closest('.wv-regions-layout');
            if (layout) {
                layout.classList.remove('sidebar-open'); // 小螢幕選完國家後自動收合側欄
                if (targetKey && targetKey !== currentSelectedKingdomKey) {
                    currentSelectedKingdomKey = targetKey;
                    layout.querySelectorAll('.wv-sidebar-kingdom-btn').forEach(btn => {
                        btn.classList.toggle('active', btn === sidebarKingdomBtn);
                    });
                    layout.querySelectorAll('.wv-kingdom-card').forEach(card => {
                        card.classList.toggle('active', card.getAttribute('data-kingdom-card') === targetKey);
                    });
                }
            }
            return;
        }
        // ☙ 世界觀【萬邦諸國】：點擊卡片內的「時期括號書籤」無縫切換時期！ ❧
        const eraTabBtn = e.target.closest('.wv-era-tab-btn');
        if (eraTabBtn) {
            const targetIdx = eraTabBtn.getAttribute('data-era-index');
            const cardBody = eraTabBtn.closest('.wv-kingdom-card-body');
            if (cardBody) {
                cardBody.querySelectorAll('.wv-era-tab-btn').forEach(btn => {
                    btn.classList.toggle('active', btn === eraTabBtn);
                });
                cardBody.querySelectorAll('.wv-era-pane').forEach(pane => {
                    pane.classList.toggle('active', pane.getAttribute('data-era-pane') === targetIdx);
                });
            }
            return;
        }
        // ☙ 點擊角色卡身上的小 Tag，也能直接加入/移除多標籤搜尋！ ❧
        const cardTagSpan = e.target.closest('.character-tags span');
        if (cardTagSpan) {
            const activeSec = document.querySelector('.content-section.active');
            const searchBox = activeSec ? activeSec.querySelector('.search-box') : null;
            toggleTagInSearchBox(searchBox, cardTagSpan.textContent.trim());
            updateTagList();
            return;
        }
        // ☙ 世界觀：點擊「關聯角色縮圖」，啟動 ID 狙擊鎖定，100% 精準定位該張角色卡！ ❧
        const jumpBtn = e.target.closest('.wv-char-jump-btn');
        if (jumpBtn) {
            const targetCharId = jumpBtn.getAttribute('data-jump-id');
            const targetChar = safeCharacters.find(c => c.id === targetCharId);
            if (targetChar) {
                const targetSectionType = targetChar.category.split('-')[0];
                const targetMainBtn = document.getElementById(`${targetSectionType}-btn`);
                if (targetMainBtn && !targetMainBtn.classList.contains('active')) {
                    targetMainBtn.click();
                }
                const targetSubNav = document.querySelector(`.sub-nav[data-parent="${targetSectionType}-content"]`);
                const allBtn = targetSubNav ? targetSubNav.querySelector(`.sub-nav-btn[data-target="${targetSectionType}-all"]`) : null;
                if (allBtn) {
                    targetSubNav.querySelectorAll('.sub-nav-btn').forEach(b => b.classList.remove('active'));
                    allBtn.classList.add('active');
                }
                currentFilter = `${targetSectionType}-all`;
                const activeSec = document.getElementById(`${targetSectionType}-content`);
                const searchBox = activeSec ? activeSec.querySelector('.search-box') : null;
                const charName = (currentLang === 'en') ? (targetChar.name_en || targetChar.name) : targetChar.name;
                currentSearchTerm = charName.toLowerCase();
                if (searchBox) searchBox.value = charName;
                // 🔫 啟動單卡 ID 精準鎖定！（這樣點 Anamor 絕不會把 Raymond 一起搜出來！）
                currentExactCharId = targetChar.id;
                currentPage = 1;
                renderContent();
                updateTagList();
            }
            return;
        }
    });
    // ☙—————————————————————————————❧
    //     7. 啟動加載 (加載當前選語言)
    // ☙—————————————————————————————❧
    // ☙ 返回頂部懸浮小圓鈕 (支援世界觀、角色列表與首頁) ❧
    const mainEl = document.querySelector('main');
    if (mainEl) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.type = 'button';
        backToTopBtn.className = 'back-to-top-btn';
        backToTopBtn.title = '返回頂部 / Back to Top';
        backToTopBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
        mainEl.appendChild(backToTopBtn);
        const getActiveScrollBox = () => {
            const activeSec = document.querySelector('.content-section.active');
            if (!activeSec) return null;
            if (activeSec.id === 'home-content') return activeSec;
            const wvArea = activeSec.querySelector('.worldview-scroll-area');
            if (wvArea && wvArea.style.display !== 'none') return wvArea;
            return activeSec.querySelector('.sub-content-scroll-area');
        };
        // 監聽所有滾動區的滾動事件（キャプチャ模式，連動態生成的世界觀都能自動抓到！）
        mainEl.addEventListener('scroll', (e) => {
            const box = e.target;
            if (box === getActiveScrollBox()) {
                backToTopBtn.classList.toggle('visible', box.scrollTop > 160);
            }
        }, true);
        // 點擊時絲滑滾回最頂端，切换頁面時自動收起按鈕
        backToTopBtn.addEventListener('click', () => {
            const box = getActiveScrollBox();
            if (box) box.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-btn, .sub-nav-btn, .wv-tab-btn, #home-btn')) {
                backToTopBtn.classList.remove('visible');
            }
        });
    }
    loadLanguagePack();
});

