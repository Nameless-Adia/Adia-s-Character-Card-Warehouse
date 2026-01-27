// prompts.js
const prompts = [
    {
        id: "wonton-prompt",
        mainName: "餛飩提示詞",
        subName: "Adia-🥟-WontoNnnnnnn",
        latestVersion: {
            versionName: "1.1.1",
            compatibility: "Gemini-3.0-Flash / DeepSeek3.2 及常見商業 / 開源模型。",
            features: "泛用型寫作提示詞，強調情感敘述與描寫，多樣指令項目與附加娛樂項目可自由啟用關閉，提供搭配的正規表示式。",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1465584090752356548" }]
        },
        oldVersions: [
            {
                versionName: "0.11",
                compatibility: "Gemini-2.5-Pro 及常見商業 / 開源模型。",
                features: "泛用型寫作提示詞，多樣指令項目與附加娛樂項目可自由啟用關閉，提供搭配的正規表示式。",
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1440765707263545418" }]
            },
            {
                versionName: "0.3.1",
                compatibility: "Gemini-2.5-Pro-Exp-0325 (降智版)。",
                features: "泛用型寫作提示詞，提供指令項目與附加娛樂項目可自由啟用關閉。",
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1370587540054081566" }]
            },
            {
                versionName: "0.3",
                compatibility: "Gemini-2.5-Pro-Exp-0325 (滿血版)。",
                features: "泛用型寫作提示詞，提供指令項目與附加娛樂項目可自由啟用關閉。",
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1367731951255031850" }]
            }
        ]
    },
    {
        id: "bowl-ice-prompt",
        mainName: "碗公冰提示詞",
        subName: "Adia-🍨-Loacl-in-Chat",
        latestVersion: {
            versionName: "0.2.1",
            compatibility: "多數開源 / 商業模型。",
            features: "泛用型寫作提示詞，精簡版的餛飩提示詞，保留更多其結構格式，多樣指令項目與附加娛樂項目可自由啟用關閉，提供搭配的正規表示式。",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1465585939035459584" }]
        },
        oldVersions: [
            {
                versionName: "0.1",
                compatibility: "多數開源 / 商業模型。",
                features: "泛用型寫作提示詞，精簡版的餛飩提示詞，保留更多本地提示詞結構格式，提供指令項目與附加娛樂項目可自由啟用關閉。",
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1451871841584156683" }]
            }
        ]
    },
    {
        id: "local-prompt",
        mainName: "本地提示詞",
        subName: "Adia-🍨-Local",
        latestVersion: {
            versionName: "0.4.1",
            compatibility: "多數本地模型 (消費級電腦可運行者)。",
            features: "泛用型寫作提示詞，精簡版的餛飩提示詞，依是否為思考模型與是否需處理正面傾向問題細分成四種小版本。",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1449072115792875562" }],
            guide: {
                text: "需依模型調整，範例格式： ",
                link: { name: "Mistral-V7-Tekken", url: "https://discord.com/channels/1327283064476270603/1449077398095008026/1449077398095008026" }
            }
        },
        oldVersions: [
            {
                versionName: "Dirty-0.4",
                compatibility: "多數本地模型 (消費級電腦可運行者)。",
                features: "泛用型寫作提示詞，改寫自 Dolfino aka Dirty D 的 save the kittens 版本。",
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1342363740519137300" }],
                guide: {
                    text: "需依模型調整，範例格式： ",
                    link: { name: "ChatML", url: "https://discord.com/channels/1327283064476270603/1342398947578216530/1342398947578216530" }
                }
            }
        ]
    },
    {
        id: "system-prompt",
        mainName: "純助手型提示詞",
        subName: "Adia-🧂-System",
        latestVersion: {
            versionName: "0.1",
            compatibility: "任何模型。",
            features: "允許透過 SillyTavern 內建的角色定義、知識書、摘要等等欄位，讓LLM助手擁有非常私人化的背景、性格、記憶。",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1389976248838524959/1389976248838524959" }]
        },
        oldVersions: [] // 沒有舊版本
    },
    {
        id: "summary-prompt",
        mainName: "摘要總結提示詞",
        subName: "Adia-🍇-Summary",
        latestVersion: {
            versionName: "0.1",
            compatibility: "Gemini-2.5 或上下文大、不易注意力發散的模型。",
            features: "配合 SillyTavern 內建的摘要欄位，無須安裝擴充功能，輸出摘要正文並列出關鍵地點、物件、人物的簡敘清單。",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1406279608973791345/1406279608973791345" }]
        },
        oldVersions: []
    }
];
