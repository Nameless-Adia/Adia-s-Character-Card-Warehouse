// script.js (全新進化 ⛤ 搜尋分頁魔法版)
document.addEventListener('DOMContentLoaded', () => {
    // --- 初始設定 & 變數宣告 ---
    const CARDS_PER_PAGE = 5; // ★★★ 每頁顯示幾張角色卡，妳可以改成任何妳喜歡的數字 ★★★
    let currentPage = 1;
    let currentFilter = 'all';
    let currentSearchTerm = '';

    const homeButton = document.getElementById('home-btn');
    const mainNavButtons = document.querySelectorAll('.main-nav-scroll .nav-btn');
    const mainContentSections = document.querySelectorAll('.content-section');
    const allSubNavs = document.querySelectorAll('.sub-nav');
    const searchBoxes = document.querySelectorAll('.search-box');
    // --- 核心魔法：渲染角色卡與分頁 ---
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
                                    char.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm));
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
            const cardHTML = `
                <div class="character-card" data-category="${char.category}">
                    <img src="${char.image}" alt="${char.name}的角色圖">
                    <div class="character-info">
                        <h3 class="character-name">${char.name}</h3>
                        <div class="character-tags">${tagsHTML}</div>
                        <p class="character-desc">${char.description}</p>
                        ${reminderHTML}
                        ${warningHTML}
                    </div>
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

                // 重設並觸發預設的「全部」按鈕
                const defaultAllButton = targetSubNav.querySelector('.sub-nav-btn');
                if (defaultAllButton) {
                    currentFilter = defaultAllButton.dataset.target;
                    currentPage = 1;
                    currentSearchTerm = ''; // 切換主分類時清空搜尋
                    const activeSearchBox = document.querySelector(`#${targetContentId} .search-box`);
                    if(activeSearchBox) activeSearchBox.value = '';
                    targetSubNav.querySelectorAll('.sub-nav-btn').forEach(btn => btn.classList.remove('active'));
                    defaultAllButton.classList.add('active');
                    renderContent();
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
            renderContent();
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
    // --- 初始啟動 ---
    // 手動觸發一次 HOME 按鈕的點擊事件，確保初始狀態正確
    homeButton.click();
});
