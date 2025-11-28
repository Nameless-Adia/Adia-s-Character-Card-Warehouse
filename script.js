// script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- 初始設定 & 變數宣告 ---
    const CARDS_PER_PAGE = 5; // 每頁顯示幾張角色卡
    let currentPage = 1;
    let currentFilter = 'all';
    let currentSearchTerm = '';

    const homeButton = document.getElementById('home-btn');
    const mainNavButtons = document.querySelectorAll('.main-nav-scroll .nav-btn');
    const mainContentSections = document.querySelectorAll('.content-section');
    const allSubNavs = document.querySelectorAll('.sub-nav');
    const searchBoxes = document.querySelectorAll('.search-box');
    const tagToggleButtons = document.querySelectorAll('.tag-toggle-btn');
    const toggleNavButton = document.getElementById('toggle-nav-btn');
    const mainNavContainer = document.getElementById('main-nav-container');
    // --- 渲染角色卡與分頁 ---
    function renderContent() {
        // 確定當前在哪個主要分頁 (fantasy 或 fictional)
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection || activeSection.id === 'home-content') return; // 如果在首頁，就什麼都不做
        const sectionType = activeSection.id.replace('-content', ''); // e.g., 'fantasy'

        // 1. 篩選角色
        let filteredCharacters = characters.filter(char => {
            const categoryPrefix = char.category.split('-')[0]; // e.g., 'fantasy' from 'fantasy-east'

            // 條件 A: 角色必須屬於當前的主分類 (fantasy / fictional)
            const isInMainCategory = categoryPrefix === sectionType;
            if (!isInMainCategory) return false;
            // 條件 B: 角色必須符合子分類篩選 (e.g., fantasy-east)
            const subCategoryMatch = currentFilter === `${sectionType}-all` || char.category === currentFilter;
            // 條件 C: 角色必須符合搜尋關鍵字
            const searchTermMatch = !currentSearchTerm ||
                                    char.name.toLowerCase().includes(currentSearchTerm) ||
                                    char.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm)) ||
                                    char.description.toLowerCase().includes(currentSearchTerm) ||
                                    char.reminder.toLowerCase().includes(currentSearchTerm) ||
                                    char.warning.toLowerCase().includes(currentSearchTerm);
            return subCategoryMatch && searchTermMatch;
        });
        // 2. 處理分頁
        const totalPages = Math.ceil(filteredCharacters.length / CARDS_PER_PAGE);
        currentPage = Math.min(currentPage, totalPages) || 1; // 如果篩選後頁數變少，自動跳回第一頁
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
        const endIndex = startIndex + CARDS_PER_PAGE;
        const paginatedCharacters = filteredCharacters.slice(startIndex, endIndex);
        // 3. 生成 HTML 並渲染
        const scrollArea = activeSection.querySelector('.sub-content-scroll-area');
        scrollArea.innerHTML = ''; // 清空舊的卡片
        paginatedCharacters.forEach(char => {
            const tagsHTML = char.tags.map(tag => `<span>${tag}</span>`).join('');
            const reminderHTML = char.reminder ? `<p class="character-reminder">${char.reminder}</p>` : '';
            const warningHTML = char.warning ? `<p class="character-warning">${char.warning}</p>` : '';
            const linksHTML = char.links && char.links.length > 0
                ? `<div class="character-links">${char.links.map(link =>
                    `<a href="${link.url}" target="_blank" class="char-link-btn">${link.name}</a>`
                  ).join('')}</div>`
                : '';
                const cardHTML = `
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
                        ${linksHTML ? `<div class="card-footer">${linksHTML}</div>` : ''}
                    </div>
                `;
                scrollArea.innerHTML += cardHTML;
        });
        // 4. 渲染分頁按鈕
        renderPagination(activeSection, totalPages);
    }
    function renderPagination(activeSection, totalPages) {
        const paginationContainer = activeSection.querySelector('.pagination-container');
        paginationContainer.innerHTML = ''; // 清空舊的按鈕
        if (totalPages <= 1) return; // 如果只有一頁或沒有，就不顯示分頁按鈕
        // 上一頁按鈕
        if (currentPage > 1) {
            const prevButton = document.createElement('a');
            prevButton.href = '#';
            prevButton.textContent = '« 上一頁';
            prevButton.classList.add('page-btn');
            prevButton.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage--;
                renderContent();
            });
            paginationContainer.appendChild(prevButton);
        }
        // 頁碼按鈕
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('a');
            pageButton.href = '#';
            pageButton.textContent = i;
            pageButton.classList.add('page-btn');
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                renderContent();
            });
            paginationContainer.appendChild(pageButton);
        }
        // 下一頁按鈕
        if (currentPage < totalPages) {
            const nextButton = document.createElement('a');
            nextButton.href = '#';
            nextButton.textContent = '下一頁 »';
            nextButton.classList.add('page-btn');
            nextButton.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage++;
                renderContent();
            });
            paginationContainer.appendChild(nextButton);
        }
    }
    // --- 事件監聽 & 流程控制 ---
    function hideAllSubNavs() {
        allSubNavs.forEach(nav => nav.classList.remove('active'));
    }
    function showMainContent(targetId) {
        mainContentSections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    homeButton.addEventListener('click', (e) => {
        e.preventDefault();
        mainNavButtons.forEach(btn => btn.classList.remove('active'));
        hideAllSubNavs();
        showMainContent('home-content');
    });
    mainNavButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetContentId = button.id.replace('-btn', '-content');
            mainNavButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showMainContent(targetContentId);
            hideAllSubNavs();
            const targetSubNav = document.querySelector(`.sub-nav[data-parent="${targetContentId}"]`);
            if (targetSubNav) {
                targetSubNav.classList.add('active');
                // 1. 找到預設的「全部」按鈕
                const defaultAllButton = targetSubNav.querySelector('.sub-nav-btn');
                if (defaultAllButton) {
                    // 2. 更新所有按鈕的狀態
                    targetSubNav.querySelectorAll('.sub-nav-btn').forEach(btn => btn.classList.remove('active'));
                    defaultAllButton.classList.add('active');
                    // 3. 更新全域篩選器變數
                    currentFilter = defaultAllButton.dataset.target;
                    currentPage = 1;
                    currentSearchTerm = '';
                    const activeSearchBox = document.querySelector(`#${targetContentId} .search-box`);
                    if (activeSearchBox) activeSearchBox.value = '';
                    // 4. 在所有變數都設好後，再觸發更新
                    updateTagList(); // 更新標籤辭典
                    renderContent(); // 渲染角色卡
                }
            }
        });
    });

    // 子分類按鈕事件
    const allSubNavButtons = document.querySelectorAll('.sub-nav-btn');
    allSubNavButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const parentNav = button.closest('.sub-nav');
            if (!parentNav) return;

            parentNav.querySelectorAll('.sub-nav-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentFilter = button.dataset.target;
            currentPage = 1; // 每次篩選都回到第一頁
            updateTagList();
            renderContent();
        });
    });
    // --- 標籤辭典相關功能 ---
    function updateTagList() {
        // 首先，確定我們在哪個大分類
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection || activeSection.id === 'home-content') return;
        const sectionType = activeSection.id.replace('-content', '');
        // 然後，根據大分類和當前的小分類來篩選角色
        const relevantCharacters = characters.filter(char => {
            const categoryPrefix = char.category.split('-')[0];
            if (categoryPrefix !== sectionType) return false;
            return currentFilter === `${sectionType}-all` || char.category === currentFilter;
        });
        const allTags = [...new Set(relevantCharacters.flatMap(char => char.tags))].sort();
        const container = activeSection.querySelector('.tag-list-container');
        if (!container) return;
        // 1. 先藏起 header
        const header = container.querySelector('.tag-list-header');
        // 2. 清空
        container.innerHTML = '';
        // 3. 把 header 放回去
        if (header) {
            container.appendChild(header);
        }
        allTags.forEach(tag => {
            const tagButton = document.createElement('button');
            tagButton.classList.add('tag-suggestion-btn');
            tagButton.textContent = tag;
            tagButton.addEventListener('click', () => {
                const searchBox = activeSection.querySelector('.search-box');
                if(searchBox) { // 稍微加個保險，免得找不到
                    searchBox.value = tag;
                    searchBox.dispatchEvent(new Event('input', { bubbles: true }));
                }
                container.classList.remove('active');
                const toggleBtn = activeSection.querySelector('.tag-toggle-btn');
                if (toggleBtn) {
                     toggleBtn.textContent = '標籤清單';
                }
            });
            container.appendChild(tagButton);
        });
    }
    // 當開啟辭典時，順便更新一下按鈕文字
    tagToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.nextElementSibling;
            const isActive = container.classList.toggle('active');
            button.textContent = isActive ? '標籤清單' : '標籤清單';
        });
    });
    // 點擊容器以外的地方，自動關閉
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.tag-list-container.active').forEach(container => {
            const toggleBtn = container.previousElementSibling;
            const searchBox = toggleBtn.previousElementSibling;
            // 如果點擊的目標不是容器本身，也不是它的兄弟按鈕，也不是搜尋框，就關閉它
            if (!container.contains(e.target) && e.target !== toggleBtn && e.target !== searchBox) {
                container.classList.remove('active');
            }
        });
    });
    // 搜尋框事件
    searchBoxes.forEach(box => {
        box.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase().trim();
            currentPage = 1; // 每次搜尋都回到第一頁
            renderContent();
        });
    });
    // --- 分類列折疊開關 ---
    if (toggleNavButton && mainNavContainer) {
        toggleNavButton.addEventListener('click', () => {
            mainNavContainer.classList.toggle('collapsed');
            // 順便更新按鈕上的文字
            if (mainNavContainer.classList.contains('collapsed')) {
                toggleNavButton.textContent = '☰';
            } else {
                toggleNavButton.textContent = '☰';
            }
        });
    }
    // --- 初始啟動 ---
    // 手動觸發一次 HOME 按鈕的點擊事件，確保初始狀態正確
    homeButton.click();
});
