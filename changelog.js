// changelog.js - 倉庫更新日誌專屬資料檔
const changelogData = {
    // 未來預定（若暫時沒有預定計畫，留空 "" 就會自動在手札裡隱藏）
    upcoming: "▪ 持續上架新角色卡。\n▪ 補完世界觀內容。",
    upcoming_en: "▪ Ongoing releases of new character cards.\n▪ Completing the worldview content.",
    // 歷史更新紀錄（最新的一筆放在最上面！首頁會自動抓取第一筆的 date 來顯示）
    logs: [
        {
            date: "2026.11.13",
            content: "▪ 新角色卡上架：Haytham、Usayd。\n▪ 提示詞更新：Adia-🍨-Loacl-in-Chat-0.4.1、Adia-🥟-WontoNnnnnnn-1.3.1。\n▪ 釋出世界觀。\n▪ 美化與排版微調。",
            content_en: "▪ New character cards released: Haytham, Usayd.\n▪ Prompt updates: Adia-🍨-Loacl-in-Chat-0.4.1, Adia-🥟-WontoNnnnnnn-1.3.1.\n▪ Worldview section released.\n▪ Visual polish and layout adjustments."
        }
        /* 之後有新更新，只要複製上面那塊 {...} 往最頂端塞就好，舊的紀錄會自動留在底下當歷史足跡！ */
    ]
};
