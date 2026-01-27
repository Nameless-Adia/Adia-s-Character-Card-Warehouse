/* script.js */
document.addEventListener('DOMContentLoaded', () => {
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
        const linksHTML = char.links && char.links.length > 0
            ? `<div class="character-links">${char.links.map(link =>
                `<a href="${link.url}" target="_blank" class="char-link-btn">${link.name}</a>`
              ).join('')}</div>`
            : '';
        if (!statusHTML && !linksHTML) return '';
        return `<div class="card-footer">${statusHTML}${linksHTML}</div>`;
    }
    /**
     * @description 產生包含狀態列與可摺疊更新紀要的 HTML。
     * @param {object} char - 角色物件。
     * @returns {string} 狀態列與更新紀要的 HTML 字串。
     */
    function createCardStatusHTML(char) {
        // --- 內部輔助函數：專門產生「一排」狀態列 ---
        const createSingleStatusRow = (statusData, versionName = null, updatesAvailable = false) => {
            let featuresHTML = '';
            // 步驟 1: 加上版本號和那個可以點的箭頭
            if (versionName) {
                featuresHTML += `
                    <div class="version-name-container" ${updatesAvailable ? 'role="button" tabindex="0"' : ''}>
                        ${updatesAvailable ? '<span class="toggle-arrow">›</span>' : ''}
                        <span class="version-name">${versionName}</span>
                    </div>
                `;
            }
            // 步驟 2: 把 features 和 lorebook 的選項一個個加上去
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
            // 步驟 3: 最後用容器把它包起來
            return featuresHTML ? `<div class="character-status-container">${featuresHTML}</div>` : '';
        };
        // --- 主要邏輯：判斷角色有無 versions ---
        if (char.versions && char.versions.length > 0) {
            const baseVersion = char.versions[0];
            const updates = char.versions.slice(1);
            const hasUpdates = updates.length > 0;
            // 先產生基礎版本的那一排狀態列
            let finalHTML = createSingleStatusRow(baseVersion, baseVersion.versionName, hasUpdates);
            // 如果有更新歷史，就把它們全都塞進那預設關上的欄位裡
            if (hasUpdates) {
                const updatesHTML = updates.map(update =>
                    `<p class="version-update">▪ ${update.versionName} ${update.updateDescription}</p>`
                ).join('');
                finalHTML += `<div class="version-updates-container collapsed">${updatesHTML}</div>`;
            }
            return finalHTML;
        } else {
            // 沒 versions 的就用舊方法處理
            return createSingleStatusRow(char);
        }
    }
    /**
     * @description 生成單個提示詞卡片的 HTML。
     * @param {object} promptData - 單一提示詞物件。
     * @returns {string} 提示詞卡片的 HTML 字串。
     */
    function createPromptCardHTML(promptData) {
        // 副標題，如果不存在則為空
        const subNameHTML = promptData.subName ? `<span class="prompt-subname">${promptData.subName}</span>` : '';
        const createVersionDetailHTML = (version, isLatest = false) => {

            const linksHTML = version.links && version.links.length > 0
                ? `<div class="${isLatest ? 'prompt-links' : 'old-version-links'}">${version.links.map(link =>
                    `<a href="${link.url}" target="_blank" class="prompt-link-btn ${isLatest ? 'primary' : 'secondary'}">${link.name}</a>`
                  ).join('')}</div>`
                : '';

            const guideHTML = version.guide
                ? `<p class="${isLatest ? 'prompt-guide' : 'old-version-guide'}">
                        <span class="label">▪ 搭配結構：</span> ${version.guide.text} <a href="${version.guide.link.url}" target="_blank" rel="noopener noreferrer">${version.guide.link.name}</a>
                   </p>`
                : '';

            return `
                <p class="${isLatest ? 'current-version' : 'old-version-item-version'}">
                    <span class="label">▪ 版本：</span> <span class="version-number">${version.versionName}</span>
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
        // 初始化提示詞摺疊狀態
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
        // 步驟 1: 從所有角色裡篩選出想看的
        const filteredCharacters = characters.filter(char => {
            const categoryPrefix = char.category.split('-')[0];
            if (categoryPrefix !== sectionType) return false;
            const subCategoryMatch = currentFilter === `${sectionType}-all` || char.category === currentFilter;
            const searchTermMatch = !currentSearchTerm ||
                                    [char.name, char.description, char.reminder, char.warning, ...char.tags]
                                    .some(text => text.toLowerCase().includes(currentSearchTerm));
            return subCategoryMatch && searchTermMatch;
        });
        // 步驟 2: 處理分頁的數學題
        const totalPages = Math.ceil(filteredCharacters.length / CARDS_PER_PAGE);
        currentPage = Math.min(currentPage, totalPages) || 1;
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const paginatedCharacters = filteredCharacters.slice(startIndex, startIndex + CARDS_PER_PAGE);
        // 步驟 3:  把角色卡顯示到頁面上
        const scrollArea = activeSection.querySelector('.sub-content-scroll-area');
        scrollArea.innerHTML = paginatedCharacters.map(createCharacterCardHTML).join('');
        // 步驟 4: 最後，處理分頁按鈕，並為所有新出現的輪播器初始化
        renderPagination(activeSection, totalPages);
        initializeAllVisibleSliders();
    }
    /**
     * @description 產生分頁按鈕。
     * @param {HTMLElement} activeSection - 當前活躍的區塊。
     * @param {number} totalPages - 總頁數。
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
            });
            return button;
        };
        if (currentPage > 1) paginationContainer.appendChild(createPageButton('« 上一頁', currentPage - 1));
        for (let i = 1; i <= totalPages; i++) paginationContainer.appendChild(createPageButton(i, i, i === currentPage));
        if (currentPage < totalPages) paginationContainer.appendChild(createPageButton('下一頁 »', currentPage + 1));
    }
    // ☙—————————————————————————————❧
    //      3. 事件監聽 & 流程控制
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
        renderPrompts(); // 確保回到 HOME 頁面時也渲染提示詞
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
        });
    });
    // ☙—————————————————————————————❧
    //    4. 雜項功能 (標籤/搜尋/摺疊)
    // ☙—————————————————————————————❧
    /** @description 更新標籤清單。 */
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
    /** @description 初始化一個指定的圖片輪播器。 */
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
    /** @description 初始化所有可見的輪播器。 */
    function initializeAllVisibleSliders() {
        Object.values(sliderIntervals).forEach(clearInterval);
        const visibleSliders = document.querySelectorAll('.content-section.active .character-image-slider');
        visibleSliders.forEach(slider => initializeSlider(slider.id));
    }
    // ☙—————————————————————————————❧
    //      7. 更新紀要摺疊功能
    // ☙—————————————————————————————❧
    /** @description 摺疊的開關。 */
    document.addEventListener('click', function(e) {
        const toggleButton = e.target.closest('.version-name-container[role="button"]');
        if (toggleButton) { // 確保是角色卡的摺疊按鈕
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
            const wrapper = mainPromptToggle.nextElementSibling; // 這是 promptsOutputContainer
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
