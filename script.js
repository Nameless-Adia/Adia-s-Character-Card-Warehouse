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
    const safeCharacters = (typeof characters !== 'undefined' && Array.isArray(characters)) ? characters : [];
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
                                <li>${isEn ? "<strong>RE-UPLOADING IS STRICTLY PROHIBITED!</strong> This includes, but is not limited to, any form of editing, referencing, adapting, or plagiarizing followed by re-uploading without authorization, proper author attribution, or original source links!"
                                           : "<strong>禁止二次上傳！</strong>包含但不限於禁止無授權、無標註原作者、無提供原出處連結的任何形式的修改、參考、借鑑、盜用後再上傳！"}</li>
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
                                <li>${isEn ? "<strong>RE-UPLOADING IS STRICTLY PROHIBITED!</strong> This includes, but is not limited to, any form of editing, referencing, adapting, or plagiarizing followed by re-uploading without authorization, proper author attribution, or original source links!"
                                           : "<strong>禁止二次上傳！</strong>包含但不限於禁止無授權、無標註原作者、無提供原出處連結的任何形式的修改、參考、借鑑、盜用後再上傳！"}</li>
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
        });
    }
    // ☙—————————————————————————————❧
    //   2. 核心渲染功能 (角色卡 & 分頁之數據防呆處理)
    // ☙—————————————————————————————❧
    function createCharacterCardHTML(char) {
        if (!char) return '';
        const isEn = (currentLang === 'en');
        const name = isEn ? (char.name_en || char.name) : (char.name || char.name_en || '');
        const description = isEn ? (char.description_en || char.description) : (char.description || char.description_en || '');
        const reminder = isEn ? (char.reminder_en || char.reminder) : (char.reminder || char.reminder_en || '');
        const warning = isEn ? (char.warning_en || char.warning) : (char.warning || char.warning_en || '');
        const tags = isEn ? (char.tags_en || char.tags) : (char.tags || char.tags_en || []);
        const links = isEn ? (char.links_en || char.links) : (char.links || char.links_en || []);
        const imageSliderHTML = createCharacterImageSliderHTML(char);
        const tagsHTML = Array.isArray(tags) ? tags.map(tag => `<span>${tag}</span>`).join('') : '';
        const reminderHTML = reminder ? `<p class="character-reminder">${reminder}</p>` : '';
        const warningHTML = warning ? `<p class="character-warning">${warning}</p>` : '';
        const footerHTML = createCardFooterHTML(char, links);
        return `
            <div class="character-card" data-category="${char.category || ''}">
                <div class="card-main-content">
                    ${imageSliderHTML}
                    <div class="character-info">
                        <h3 class="character-name">${name}</h3>
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
                        if (feature === "中文開場") displayFeature = "ZH First Message";
                        else if (feature === "英文開場") displayFeature = "EN First Message";
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
            return `
                <p class="${isLatest ? 'current-version' : 'old-version-item-version'}">
                    <span class="label">▪ ${labelVersion}</span> ${version.versionName || ''}
                </p>
                <p class="${isLatest ? 'prompt-compatibility' : 'old-version-compatibility'}">
                    <span class="label">▪ ${labelCompat}</span> ${compat}
                </p>
                <p class="${isLatest ? 'prompt-feature' : 'old-version-feature'} prompt-text-wrap">
                    <span class="label">▪ ${labelFeature}</span> ${features}
                </p>
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
    function renderContent() {
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection || activeSection.id === 'home-content') return;
        const sectionType = activeSection.id.replace('-content', '');
        const filteredCharacters = safeCharacters.filter(char => {
            if (!char || !char.category) return false;
            const categoryPrefix = char.category.split('-')[0];
            if (categoryPrefix !== sectionType) return false;
            const subCategoryMatch = currentFilter === `${sectionType}-all` || char.category === currentFilter;
            const searchTarget = [
                char.name, char.name_en,
                char.description, char.description_en,
                char.reminder, char.reminder_en,
                char.warning, char.warning_en,
                ...(char.tags || []), ...(char.tags_en || [])
            ].filter(Boolean).map(text => text.toLowerCase());
            const searchTermMatch = !currentSearchTerm || searchTarget.some(text => text.includes(currentSearchTerm));
            return subCategoryMatch && searchTermMatch;
        });
        const totalPages = Math.ceil(filteredCharacters.length / CARDS_PER_PAGE);
        currentPage = Math.min(currentPage, totalPages) || 1;
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const paginatedCharacters = filteredCharacters.slice(startIndex, startIndex + CARDS_PER_PAGE);
        const scrollArea = activeSection.querySelector('.sub-content-scroll-area');
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
    //      3. 事件監聽 & 流程控制 (整合事件委託)
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
            if (button.classList.contains('active')) return;
            mainNavButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showMainContent(targetContentId);
            hideAllSubNavs();
            const targetSubNav = document.querySelector(`.sub-nav[data-parent="${targetContentId}"]`);
            if (targetSubNav) {
                targetSubNav.classList.add('active');
                const defaultAllButton = targetSubNav.querySelector('.sub-nav-btn');
                if (defaultAllButton) {
                    targetSubNav.querySelectorAll('.sub-nav-btn').forEach(btn => btn.classList.remove('active'));
                    defaultAllButton.classList.add('active');
                    currentFilter = defaultAllButton.dataset.target;
                    currentPage = 1;
                    currentSearchTerm = '';
                    const activeSearchBox = document.querySelector(`#${targetContentId} .search-box`);
                    if (activeSearchBox) activeSearchBox.value = '';
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
            if (button.classList.contains('active')) return;
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
    //    4. 雜項功能 & 標籤防錯處理
    // ☙—————————————————————————————❧
    function updateTagList() {
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection || activeSection.id === 'home-content') return;
        const sectionType = activeSection.id.replace('-content', '');
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
            tagButton.className = 'tag-suggestion-btn';
            tagButton.textContent = tag;
            tagButton.addEventListener('click', () => {
                const searchBox = activeSection.querySelector('.search-box');
                if (searchBox) {
                    searchBox.value = tag;
                    searchBox.dispatchEvent(new Event('input', { bubbles: true }));
                }
                container.classList.remove('active');
            });
            container.appendChild(tagButton);
        });
    }
    tagToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.nextElementSibling) button.nextElementSibling.classList.toggle('active');
        });
    });
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.tag-list-container.active').forEach(container => {
            const toggleBtn = container.previousElementSibling;
            if (!container.contains(e.target) && e.target !== toggleBtn) {
                container.classList.remove('active');
            }
        });
    });
    searchBoxes.forEach(box => box.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase().trim();
        currentPage = 1;
        renderContent();
    }));
    if (toggleNavButton && mainNavContainer) {
        toggleNavButton.addEventListener('click', () => {
            mainNavContainer.classList.toggle('collapsed');
            toggleNavButton.textContent = mainNavContainer.classList.contains('collapsed') ? '☰' : '∧';
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
    //    6. 事件委託：統一管理摺疊與下載
    // ☙—————————————————————————————❧
    document.addEventListener('click', function(e) {
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
        const mainPromptToggle = e.target.closest('.prompt-intro-toggle');
        if (mainPromptToggle) {
            const wrapper = mainPromptToggle.nextElementSibling;
            const arrow = mainPromptToggle.querySelector('.toggle-arrow');
            if (wrapper && arrow) {
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
    });
    // ☙—————————————————————————————❧
    //     7. 啟動加載 (加載當前選語言)
    // ☙—————————————————————————————❧
    loadLanguagePack();
});

