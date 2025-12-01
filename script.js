/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    // ☙—————————————————————————————❧
    //      1. 全域變數 & 初始設定
    // ☙—————————————————————————————❧
    const CARDS_PER_PAGE = 5; // 一頁最多顯示幾張卡片
    let currentPage = 1; // 正在看的頁數
    let currentFilter = 'all'; // 目前的子分類篩選器
    let currentSearchTerm = ''; // 搜尋框裡打了什麼鬼東西
    // DOM 元素快取，老是重新抓取太浪費時間了。
    const homeButton = document.getElementById('home-btn');
    const mainNavButtons = document.querySelectorAll('.main-nav-scroll .nav-btn');
    const mainContentSections = document.querySelectorAll('.content-section');
    const allSubNavs = document.querySelectorAll('.sub-nav');
    const searchBoxes = document.querySelectorAll('.search-box');
    const tagToggleButtons = document.querySelectorAll('.tag-toggle-btn');
    const toggleNavButton = document.getElementById('toggle-nav-btn');
    const mainNavContainer = document.getElementById('main-nav-container');
    // ☙—————————————————————————————❧
    //   2. 核心渲染功能 (角色卡 & 分頁)
    // ☙—————————————————————————————❧
    /**
     * @description 根據目前的篩選條件和頁碼，產生對應的角色卡 HTML。
     * @param {object} char - 單一角色物件，從 chars.js 來的。
     * @returns {string} - 一張完整角色卡的 HTML 字串。
     */
    function createCharacterCardHTML(char) {
        const tagsHTML = char.tags.map(tag => `<span>${tag}</span>`).join('');
        const reminderHTML = char.reminder ? `<p class="character-reminder">${char.reminder}</p>` : '';
        const warningHTML = char.warning ? `<p class="character-warning">${char.warning}</p>` : '';
        const footerHTML = createCardFooterHTML(char); // 把底部的產生邏輯抽離出去
        return `
            <div class="character-card" data-category="${char.category}">
                <div class="card-main-content">
                    <img src="${char.image}" alt="${char.name}的角色圖">
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
     * @description 專門產生卡片底部（Footer）的 HTML，包含那些勾勾選選的狀態和連結。
     * @param {object} char - 角色物件。
     * @returns {string} - 卡片 Footer 的 HTML 字串，如果沒內容就回傳空字串。
     */
    function createCardFooterHTML(char) {
        const statusHTML = createCardStatusHTML(char); // 狀態列（checkbox、知識書）
        const linksHTML = char.links && char.links.length > 0
            ? `<div class="character-links">${char.links.map(link =>
                `<a href="${link.url}" target="_blank" class="char-link-btn">${link.name}</a>`
              ).join('')}</div>`
            : '';
        // 如果狀態列和連結都沒內容，就沒必要顯示整個 footer 
        if (!statusHTML && !linksHTML) {
            return '';
        }
        return `
            <div class="card-footer">
                ${statusHTML}
                ${linksHTML}
            </div>
        `;
    }
    /**
     * @description 產生卡片 Footer 裡面的狀態列。
     * @param {object} char - 角色物件。
     * @returns {string} - 狀態列的 HTML 字串。
     */
    function createCardStatusHTML(char) {
        let allFeaturesHTML = '';
        // --- 處理 Features (Checkbox) ---
        if (char.features) {
            for (const [feature, enabled] of Object.entries(char.features)) {
                allFeaturesHTML += `
                    <label class="feature-label">
                        <input type="checkbox" ${enabled ? 'checked' : ''} disabled>
                        <span class="checkmark"></span>
                        <span>${feature}</span>
                    </label>
                `;
            }
        }
        // --- 處理知識書 ---
        if (char.lorebook !== undefined) {
            const hasLorebookContent = char.lorebook && char.lorebook.trim() !== '';
            const lorebookText = hasLorebookContent ? char.lorebook : '－';
            const lorebookChecked = hasLorebookContent ? 'checked' : '';
            allFeaturesHTML += `
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

        // 如果上面什麼都沒有，就回傳空的
        if (!allFeaturesHTML) {
            return '';
        }
        return `<div class="character-status-container">${allFeaturesHTML}</div>`;
    }
    /**
     * @description 主要的渲染函數。
     *              它會過濾角色、處理分頁，然後把結果塞到頁面上。
     */
    function renderContent() {
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection || activeSection.id === 'home-content') return; // 在首頁？不用幹任何事。
        const sectionType = activeSection.id.replace('-content', '');
        // 步驟 1: 根據一堆條件篩選出想看的角色。
        const filteredCharacters = characters.filter(char => {
            const categoryPrefix = char.category.split('-')[0];
            const isInMainCategory = categoryPrefix === sectionType;
            if (!isInMainCategory) return false;
            const subCategoryMatch = currentFilter === `${sectionType}-all` || char.category === currentFilter;
            const searchTermMatch = !currentSearchTerm ||
                                    char.name.toLowerCase().includes(currentSearchTerm) ||
                                    char.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm)) ||
                                    char.description.toLowerCase().includes(currentSearchTerm) ||
                                    char.reminder.toLowerCase().includes(currentSearchTerm) ||
                                    char.warning.toLowerCase().includes(currentSearchTerm);
            return subCategoryMatch && searchTermMatch;
        });
        // 步驟 2: 計算總頁數，順便處理一下換頁的邏輯。
        const totalPages = Math.ceil(filteredCharacters.length / CARDS_PER_PAGE);
        currentPage = Math.min(currentPage, totalPages) || 1;
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const paginatedCharacters = filteredCharacters.slice(startIndex, startIndex + CARDS_PER_PAGE);
        // 步驟 3: 把產生好的 HTML 塞進對應的區域。
        const scrollArea = activeSection.querySelector('.sub-content-scroll-area');
        scrollArea.innerHTML = paginatedCharacters.map(createCharacterCardHTML).join('');
        // 步驟 4: 分頁按鈕。
        renderPagination(activeSection, totalPages);
    }
    /**
     * @description 產生分頁按鈕。
     * @param {HTMLElement} activeSection - 當前活躍的 section 元素。
     * @param {number} totalPages - 總頁數。
     */
    function renderPagination(activeSection, totalPages) {
        const paginationContainer = activeSection.querySelector('.pagination-container');
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return; // 只有一頁，還需要按鈕嗎？
        const createPageButton = (text, page, isActive = false, isDisabled = false) => {
            const button = document.createElement('a');
            button.href = '#';
            button.textContent = text;
            button.classList.add('page-btn');
            if (isActive) button.classList.add('active');
            if (isDisabled) {
                button.classList.add('disabled');
            } else {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentPage = page;
                    renderContent();
                });
            }
            return button;
        };
        // 「上一頁」按鈕
        if (currentPage > 1) {
            paginationContainer.appendChild(createPageButton('« 上一頁', currentPage - 1));
        }
        // 數字頁碼按鈕
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.appendChild(createPageButton(i, i, i === currentPage));
        }
        // 「下一頁」按鈕
        if (currentPage < totalPages) {
            paginationContainer.appendChild(createPageButton('下一頁 »', currentPage + 1));
        }
    }
    // ☙—————————————————————————————❧
    //      3. 事件監聽 & 流程控制
    // ☙—————————————————————————————❧
    // 輔助函數：隱藏所有子分類導航
    function hideAllSubNavs() {
        allSubNavs.forEach(nav => nav.classList.remove('active'));
    }
    // 輔助函數：顯示指定的內容區塊
    function showMainContent(targetId) {
        mainContentSections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    // --- HOME 按鈕 ---
    // 點這裡就回到最初的起點，什麼都重置。
    homeButton.addEventListener('click', (e) => {
        e.preventDefault();
        mainNavButtons.forEach(btn => btn.classList.remove('active'));
        hideAllSubNavs();
        showMainContent('home-content');
    });
    // --- 主分類按鈕 ---
    mainNavButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetContentId = button.id.replace('-btn', '-content');

            // 如果點的是同一個按鈕，就什麼都不做。
            if (button.classList.contains('active')) return;
            // 切換按鈕的 active 狀態
            mainNavButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // 顯示對應的內容區塊和子分類
            showMainContent(targetContentId);
            hideAllSubNavs();
            const targetSubNav = document.querySelector(`.sub-nav[data-parent="${targetContentId}"]`);
            if (targetSubNav) {
                targetSubNav.classList.add('active');
                // 重置到該分類的「全部」狀態
                const defaultAllButton = targetSubNav.querySelector('.sub-nav-btn');
                if (defaultAllButton) {
                    targetSubNav.querySelectorAll('.sub-nav-btn').forEach(btn => btn.classList.remove('active'));
                    defaultAllButton.classList.add('active');

                    // 重置篩選器、頁碼和搜尋框
                    currentFilter = defaultAllButton.dataset.target;
                    currentPage = 1;
                    currentSearchTerm = '';
                    const activeSearchBox = document.querySelector(`#${targetContentId} .search-box`);
                    if (activeSearchBox) activeSearchBox.value = '';
                    // 最後，在一切就緒後，再重新渲染內容
                    updateTagList();
                    renderContent();
                }
            }
        });
    });
    // --- 子分類按鈕 ---
    allSubNavs.forEach(nav => {
        nav.addEventListener('click', (e) => {
            // 事件委派，只處理按鈕的點擊
            if (!e.target.matches('.sub-nav-btn')) return;
            e.preventDefault();

            const button = e.target;
            // 點同一個按鈕？無視。
            if (button.classList.contains('active')) return;
            nav.querySelectorAll('.sub-nav-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentFilter = button.dataset.target;
            currentPage = 1; // 換分類當然要從第一頁開始
            updateTagList();
            renderContent();
        });
    });
    // ☙—————————————————————————————❧
    //    4. 雜項功能 (標籤/搜尋/摺疊)
    // ☙—————————————————————————————❧

    /**
     * @description 更新那個彈出式的標籤清單。
     *              會根據當前的分類，只顯示相關的標籤。
     */
    function updateTagList() {
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection || activeSection.id === 'home-content') return;

        const sectionType = activeSection.id.replace('-content', '');
        const relevantCharacters = characters.filter(char => {
            const categoryPrefix = char.category.split('-')[0];
            if (categoryPrefix !== sectionType) return false;
            return currentFilter === `${sectionType}-all` || char.category === currentFilter;
        });

        // 取得所有相關標籤，去除重複，然後排序。
        const allTags = [...new Set(relevantCharacters.flatMap(char => char.tags))].sort();

        const container = activeSection.querySelector('.tag-list-container');
        if (!container) return;
        // 清空舊按鈕，同時保留標題
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
                    // 手動觸發 input 事件，這樣搜尋才會馬上生效
                    searchBox.dispatchEvent(new Event('input', { bubbles: true }));
                }
                container.classList.remove('active'); // 點完就收起來
            });
            container.appendChild(tagButton);
        });
    }
    // --- 標籤清單的開關 ---
    tagToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.nextElementSibling;
            container.classList.toggle('active');
        });
    });
    // --- 點擊標籤清單以外的地方，就自動關閉 ---
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.tag-list-container.active').forEach(container => {
            const toggleBtn = container.previousElementSibling;
            // 如果點擊的目標不是容器本身，也不是打開它的那個按鈕，就關閉。
            if (!container.contains(e.target) && e.target !== toggleBtn) {
                container.classList.remove('active');
            }
        });
    });
    // --- 搜尋框 ---
    searchBoxes.forEach(box => {
        box.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            currentPage = 1; // 搜尋新的東西，當然也要從第一頁開始
            renderContent();
        });
    });
    // --- 導航列的摺疊開關 ---
    if (toggleNavButton && mainNavContainer) {
        toggleNavButton.addEventListener('click', () => {
            mainNavContainer.classList.toggle('collapsed');
            toggleNavButton.textContent = mainNavContainer.classList.contains('collapsed') ? '☰' : '∧';
        });
    }
    // ☙—————————————————————————————❧
    //         5. 初始啟動
    // ☙—————————————————————————————❧
    // 點一下 Home 按鈕，讓頁面進入初始狀態。
    homeButton.click();
});
