/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    // ☙—————————————————————————————❧
    //      0. 下載與成人驗證彈窗功能 (角色卡與提示詞)
    // ☙—————————————————————————————❧
    const WORKER_URL = "https://long-bar-14d9.tsuki-chen.workers.dev/"; // 部署成功的網址
    /**
     * @description 動態渲染並顯示自訂的成人驗證或使用條款彈窗
     * @param {string} type - 彈窗類型："char" (角色卡) 或 "prompt" (提示詞)
     * @returns {Promise<boolean>} 使用者是否確認同意
     */
    function showVerificationModal(type = "char") {
        return new Promise((resolve) => {
            // 創建 overlay 容器
            const overlay = document.createElement("div");
            overlay.className = "age-modal-overlay";
            // 根據下載類型，準備不同檔次的 HTML 結構與文字內容
            let modalHTMLContent = "";
            if (type === "char") {
                // 角色卡條款
                modalHTMLContent = `
                    <div class="age-modal-content">
                        <div class="age-modal-title">【角色卡下載須知】</div>
                        <div class="age-modal-body">
                            您即將下載之角色卡可能包含成人向內容（NSFW），包含但不限於：
                            <ul class="age-modal-list">
                                <li>露骨性描寫</li>
                                <li>暴力、恐怖或黑暗題材</li>
                                <li>心理創傷、身體改造等可能引起不適之內容</li>
                                <li>其他不適合未成年人閱覽之成人內容</li>
                            </ul>
                            點選「我同意」並下載角色卡即表示您聲明並同意以下事項：
                            <ul class="age-modal-list">
                                <li>您已年滿 18 歲，或已達您所在地法律規定之成年年齡</li>
                                <li>您理解下載內容可能包含成人向題材，並自願選擇下載與閱覽</li>
                                <li>您依所在地法律有權接觸及持有此類內容</li>
                                <li>您提供之年齡資訊為真實且正確</li>
                                <li>您下載之角色卡僅用於個人私下 AI-RP 使用，不用於任何商業用途與違法用途</li>
                                <li>如因提供不實資訊或違反所在地法律而產生任何後果，相關責任應由您自行承擔</li>
                                <li>禁止二次上傳！包含但不限於禁止無授權、無標註原作者、無提供原出處連結的任何形式的修改、參考、借鑑、盜用後再上傳！</li>
                            </ul>
                            請問您是否已閱讀、理解並同意上述內容？<br>
                            點選「不同意」將不會進行下載。
                        </div>
                        <div class="age-modal-footer">
                            <button type="button" class="age-modal-btn cancel" id="age-confirm-btn">我同意</button>
                            <button type="button" class="age-modal-btn confirm" id="age-cancel-btn">不同意</button>
                        </div>
                    </div>
                `;
            } else {
                // 提示詞條款
                modalHTMLContent = `
                    <div class="age-modal-content">
                        <div class="age-modal-title">【提示詞下載須知】</div>
                        <div class="age-modal-body">
                            您即將下載之提示詞可能致使 LLM 產出成人向內容（NSFW），點選「我同意」並下載即表示您聲明並同意以下事項：
                            <ul class="age-modal-list">
                                <li>您已年滿 18 歲，或已達您所在地法律規定之成年年齡</li>
                                <li>您理解下載之提示詞可能致使 LLM 產出成人向內容，並自願選擇下載與使用</li>
                                <li>您依所在地法律有權接觸及持有此類內容</li>
                                <li>您提供之年齡資訊為真實且正確</li>
                                <li>您下載之提示詞僅用於個人私下 AI-RP 使用，不用於任何商業用途與違法用途</li>
                                <li>如因提供不實資訊或違反所在地法律而產生任何後果，相關責任應由您自行承擔</li>
                                <li>禁止二次上傳！包含但不限於禁止無授權、無標註原作者、無提供原出處連結的任何形式的修改、參考、借鑑、盜用後再上傳！</li>
                            </ul>
                            請問您是否已閱讀、理解並同意上述內容？<br>
                            點選「不同意」將不會進行下載。
                        </div>
                        <div class="age-modal-footer">
                            <button type="button" class="age-modal-btn cancel" id="age-confirm-btn">我同意</button>
                            <button type="button" class="age-modal-btn confirm" id="age-cancel-btn">不同意</button>
                        </div>
                    </div>
                `;
            }
            overlay.innerHTML = modalHTMLContent;
            // 掛載到 body 上
            document.body.appendChild(overlay);
            // 微小延遲以觸發 CSS 淡入與放大過渡動畫
            setTimeout(() => {
                overlay.classList.add("active");
            }, 10);
            // 統一的關閉彈窗邏輯
            const destroyModal = (result) => {
                overlay.classList.remove("active");
                // 等待動畫結束後，徹底從 DOM 中移除，保持網頁乾淨
                setTimeout(() => {
                    overlay.remove();
                    resolve(result);
                }, 300);
            };
            // 事件監聽綁定
            overlay.querySelector("#age-confirm-btn").addEventListener("click", () => destroyModal(true));
            overlay.querySelector("#age-cancel-btn").addEventListener("click", () => destroyModal(false));
            // 點擊背景遮罩也可以當作取消關閉
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
                    // 只需要抓現在的時間秒數
                    const timestamp = Math.floor(Date.now() / 1000).toString();
                    // 直接把檔名和時間傳給 Workers
                    const finalDownloadUrl = `${WORKER_URL}${fileName}?time=${timestamp}`;
                    // 執行下載
                    window.location.href = finalDownloadUrl;
                } catch (err) {
                    console.error("執行重導向下載時出了點小差錯：", err);
                    alert("出了點小差錯，請再試一次。");
                }
            }
        });
    }
    // ☙—————————————————————————————❧
    //      1. 全域變數 & 初始設定
    // ☙—————————————————————————————❧
    const CARDS_PER_PAGE = 5; // 一頁最多顯示幾張卡片。
    let currentPage = 1; // 正在看的頁數。
    let currentFilter = 'all'; // 目前的子分類篩選器。
    let currentSearchTerm = ''; // 搜尋欄。
    // 常用的元素先抓好。
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
    // ☙—————————————————————————————❧
    //   2. 核心渲染功能 (角色卡 & 分頁)
    // ☙—————————————————————————————❧
    /**
     * @description 產生一張包含所有零件的完整角色卡 HTML。
     * @param {object} char - 單一角色物件。
     * @returns {string} 角色卡的 HTML 字串。
     */
    function createCharacterCardHTML(char) {
        const imageSliderHTML = createCharacterImageSliderHTML(char); // 圖片輪播器
        const tagsHTML = char.tags.map(tag => `<span>${tag}</span>`).join('');
        const reminderHTML = char.reminder ? `<p class="character-reminder">${char.reminder}</p>` : '';
        const warningHTML = char.warning ? `<p class="character-warning">${char.warning}</p>` : '';
        const footerHTML = createCardFooterHTML(char); // 卡片底部（狀態列、連結）
        return `
            <div class="character-card" data-category="${char.category}">
                <div class="card-main-content">
                    ${imageSliderHTML}
                    <div class="character-info">
                        <h3 class="character-name">${char.name}</h3>
                        <div class="character-tags">${tagsHTML}</div>
                        <p class="character-desc">${char.description}</p>
                        ${reminderHTML}
                        ${warningHTML}
                    </div>
                </div>
                ${footerHTML}
            </div>
        `;
    }
    /**
     * @description 專門產生那個華麗的圖片輪播器 HTML。
     * @param {object} char - 角色物件。
     * @returns {string} 輪播器的 HTML 字串。
     */
    function createCharacterImageSliderHTML(char) {
        const imageSources = char.images && char.images.length > 0 ? char.images : [char.image];
        const sliderId = `slider-${char.id}`; // 每個輪播器都需要一個獨一無二的 ID
        const imagesHTML = imageSources.map((src, index) =>
            `<div class="slide ${index === 0 ? 'active' : ''}"><img src="${src}" alt="${char.name}的角色圖 ${index + 1}"></div>`
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
    /**
     * @description 產生卡片底部（Footer）的 HTML。
     * @param {object} char - 角色物件。
     * @returns {string} Footer 的 HTML 字串。
     */
    function createCardFooterHTML(char) {
        const statusHTML = createCardStatusHTML(char);
        // 決定你按鈕是往一般 DC 還是往加密 Workers
        const linksHTML = char.links && char.links.length > 0
            ? `<div class="character-links">${char.links.map(link => {
                if (link.file) {
                    // 如果帶有 file 屬性，生成一個安全標記按鈕 (指定 data-type="char")
                    return `<button type="button" class="char-link-btn" data-secure-file="${link.file}" data-type="char">${link.name}</button>`;
                } else {
                    // 否則，生成一般的普通 URL 跳轉按鈕
                    return `<a href="${link.url}" target="_blank" class="char-link-btn">${link.name}</a>`;
                }
              }).join('')}</div>`
            : '';
        if (!statusHTML && !linksHTML) return '';
        return `<div class="card-footer">${statusHTML}${linksHTML}</div>`;
    }
    /**
     * @description 產生包含狀態列與可摺疊更新紀要的 HTML。
     * @param {object} char - 角色物件.
     * @returns {string} 狀態列與更新紀要的 HTML 字串。
     */
    function createCardStatusHTML(char) {
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
                    featuresHTML += `
                        <label class="feature-label">
                            <input type="checkbox" ${enabled ? 'checked' : ''} disabled>
                            <span class="checkmark"></span>
                            <span>${feature}</span>
                        </label>
                    `;
                }
            }
            if (statusData.lorebook !== undefined) {
                const hasLorebookContent = statusData.lorebook && statusData.lorebook.trim() !== '' && statusData.lorebook.trim() !== '無';
                const lorebookText = hasLorebookContent ? statusData.lorebook : '－';
                const lorebookChecked = hasLorebookContent ? 'checked' : '';
                featuresHTML += `
                    <div class="character-lorebook">
                        <label class="feature-label">
                            <input type="checkbox" ${lorebookChecked} disabled>
                            <span class="checkmark"></span>
                            <span>知識書：</span>
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
                const updatesHTML = updates.map(update =>
                    `<p class="version-update">▪ ${update.versionName} ${update.updateDescription}</p>`
                ).join('');
                finalHTML += `<div class="version-updates-container collapsed">${updatesHTML}</div>`;
            }
            return finalHTML;
        } else {
            return createSingleStatusRow(char);
        }
    }
    /**
     * @description 生成單個提示詞卡片的 HTML。
     * @param {object} promptData - 單一提示詞物件。
     * @returns {string} 提示詞卡片的 HTML 字串。
     */
    function createPromptCardHTML(promptData) {
        const subNameHTML = promptData.subName ? `<span class="prompt-subname">${promptData.subName}</span>` : '';
        const createVersionDetailHTML = (version, isLatest = false) => {
            // 提示詞裡的下載連結部分同步套用判斷，只要在資料中寫 file 就能自動觸發 (指定 data-type="prompt")
            const linksHTML = version.links && version.links.length > 0
                ? `<div class="${isLatest ? 'prompt-links' : 'old-version-links'}">${version.links.map(link => {
                    if (link.file) {
                        return `<button type="button" class="prompt-link-btn ${isLatest ? 'primary' : 'secondary'}" data-secure-file="${link.file}" data-type="prompt">${link.name}</button>`;
                    } else {
                        return `<a href="${link.url}" target="_blank" class="prompt-link-btn ${isLatest ? 'primary' : 'secondary'}">${link.name}</a>`;
                    }
                  }).join('')}</div>`
                : '';
            const guideHTML = version.guide
                ? `<p class="${isLatest ? 'prompt-guide' : 'old-version-guide'}">
                        <span class="label">▪ 搭配結構：</span> ${version.guide.text} <a href="${version.guide.link.url}" target="_blank" rel="noopener noreferrer">${version.guide.link.name}</a>
                   </p>`
                : '';
            return `
                <p class="${isLatest ? 'current-version' : 'old-version-item-version'}">
                    <span class="label">▪ 版本：</span> ${version.versionName}
                </p>
                <p class="${isLatest ? 'prompt-compatibility' : 'old-version-compatibility'}">
                    <span class="label">▪ 適用模型：</span> ${version.compatibility}
                </p>
                <p class="${isLatest ? 'prompt-feature' : 'old-version-feature'} prompt-text-wrap">
                    <span class="label">▪ 特色功能：</span> ${version.features}
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
                        查看重點歷史版本
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
            <div class="prompt-item" id="prompt-${promptData.id}">
                <h2 class="prompt-name">
                    <span>${promptData.mainName}</span>
                    ${subNameHTML}
                </h2>
                <div class="prompt-details">
                    ${latestVersionHTML}
                </div>
                ${oldVersionsHTML}
            </div>
        `;
    }
    /**
     * @description 在 home-content 區塊中渲染所有提示詞。
     */
    function renderPrompts() {
        if (!promptsOutputContainer) return;
        promptsOutputContainer.innerHTML = prompts.map(createPromptCardHTML).join('');
        promptsOutputContainer.classList.add('collapsed');
        if (mainPromptToggle) mainPromptToggle.classList.remove('expanded');
        document.querySelectorAll('.version-history-list').forEach(list => {
            list.classList.add('collapsed');
            const toggle = list.previousElementSibling;
            if (toggle) toggle.classList.remove('expanded');
        });
    }
    /**
     * @description 主要的渲染函數。所有的篩選、分頁和最終的畫面呈現都在這裡完成。
     */
    function renderContent() {
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection || activeSection.id === 'home-content') return;
        const sectionType = activeSection.id.replace('-content', '');
        const filteredCharacters = characters.filter(char => {
            const categoryPrefix = char.category.split('-')[0];
            if (categoryPrefix !== sectionType) return false;
            const subCategoryMatch = currentFilter === `${sectionType}-all` || char.category === currentFilter;
            const searchTermMatch = !currentSearchTerm ||
                                    [char.name, char.description, char.reminder, char.warning, ...char.tags]
                                    .some(text => text.toLowerCase().includes(currentSearchTerm));
            return subCategoryMatch && searchTermMatch;
        });
        const totalPages = Math.ceil(filteredCharacters.length / CARDS_PER_PAGE);
        currentPage = Math.min(currentPage, totalPages) || 1;
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const paginatedCharacters = filteredCharacters.slice(startIndex, startIndex + CARDS_PER_PAGE);
        const scrollArea = activeSection.querySelector('.sub-content-scroll-area');
        scrollArea.innerHTML = paginatedCharacters.map(createCharacterCardHTML).join('');
        renderPagination(activeSection, totalPages);
        initializeAllVisibleSliders();
    }
    /**
     * @description 產生分頁按鈕。
     */
    function renderPagination(activeSection, totalPages) {
        const paginationContainer = activeSection.querySelector('.pagination-container');
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;
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
                    // 使用 requestAnimationFrame 確保 DOM 渲染結束後，瞬間將置頂高度重設為 0
                    requestAnimationFrame(() => {
                        scrollArea.scrollTop = 0;
                    });
                }
            });
            return button;
        };
        if (currentPage > 1) paginationContainer.appendChild(createPageButton('« 上一頁', currentPage - 1));
        for (let i = 1; i <= totalPages; i++) paginationContainer.appendChild(createPageButton(i, i, i === currentPage));
        if (currentPage < totalPages) paginationContainer.appendChild(createPageButton('下一頁 »', currentPage + 1));
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
    homeButton.addEventListener('click', (e) => {
        e.preventDefault();
        mainNavButtons.forEach(btn => btn.classList.remove('active'));
        hideAllSubNavs();
        showMainContent('home-content');
        renderPrompts();
    });
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
                            requestAnimationFrame(() => {
                                scrollArea.scrollTop = 0;
                            });
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
                    requestAnimationFrame(() => {
                        scrollArea.scrollTop = 0;
                    });
                }
            }
        });
    });
    // ☙—————————————————————————————❧
    //    4. 雜項功能 (標籤/搜尋/摺疊)
    // ☙—————————————————————————————❧
    function updateTagList() {
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection || activeSection.id === 'home-content') return;
        const sectionType = activeSection.id.replace('-content', '');
        const relevantCharacters = characters.filter(char => {
            if (char.category.split('-')[0] !== sectionType) return false;
            return currentFilter === `${sectionType}-all` || char.category === currentFilter;
        });
        const allTags = [...new Set(relevantCharacters.flatMap(char => char.tags))].sort();
        const container = activeSection.querySelector('.tag-list-container');
        if (!container) return;
        const header = container.querySelector('.tag-list-header');
        container.innerHTML = '';
        if (header) container.appendChild(header);
        allTags.forEach(tag => {
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
    tagToggleButtons.forEach(button => button.addEventListener('click', () => button.nextElementSibling.classList.toggle('active')));
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
    //         5. 初始啟動
    // ☙—————————————————————————————❧
    homeButton.click();
    // ☙—————————————————————————————❧
    //      6. 圖片輪播器功能
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
    //    7. 事件委託：統一管理摺疊與成人下載點擊
    // ☙—————————————————————————————❧
    document.addEventListener('click', function(e) {
        // 成人下載的點擊監聽
        const secureBtn = e.target.closest('[data-secure-file]');
        if (secureBtn) {
            e.preventDefault();
            const fileName = secureBtn.getAttribute('data-secure-file');
            // 自動從 data-type 取得類型，好辨別是要展示角色卡警告（char）還是提示詞須知（prompt）的彈窗
            const downloadType = secureBtn.getAttribute('data-type') || "char";
            handleSecureDownload(fileName, downloadType);
            return;
        }
        // 角色卡的摺疊按鈕
        const toggleButton = e.target.closest('.version-name-container[role="button"]');
        if (toggleButton) {
             const statusContainer = toggleButton.closest('.character-status-container');
             const updatesContainer = statusContainer.nextElementSibling;
             const arrow = toggleButton.querySelector('.toggle-arrow');
             if (updatesContainer && arrow) {
                 updatesContainer.classList.toggle('collapsed');
                 arrow.classList.toggle('expanded', !updatesContainer.classList.contains('collapsed'));
             }
             return;
        }
        // 提示詞的主區塊摺疊
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
        // 提示詞的舊版本歷史摺疊
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
});
