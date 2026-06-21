// prompts.js
const prompts = [
    {
        id: "bowl-ice-prompt",
        mainName: "碗公冰提示詞",
        mainName_en: "Bowl Ice Prompt",
        subName: "Adia-🍨-Loacl-in-Chat",
        latestVersion: {
            versionName: "0.2.2",
            compatibility: "多數開源 / 商業模型。",
            compatibility_en: "Most open-source & commercial models.",
            features: "泛用型寫作提示詞，精簡版的餛飩提示詞，保留更多其結構格式，多樣指令項目與附加娛樂項目可自由啟用關閉，提供搭配的正規表示式。",
            features_en: "A versatile writing prompt, a streamlined version of WontoNnnnnnn prompt, retaining more of its local format. Features multiple toggles for instructions & extra elements, comes with regex.",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1507647080942927915" },
                    { name: "直接下載", file: "prompt/Adia-🍨-Loacl-in-Chat-0.2.2.json" }],
            links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1507647080942927915" },
                       { name: "Download Prompt", file: "prompt/Adia-🍨-Loacl-in-Chat-0.2.2.json" }]
        },
        oldVersions: [
            {
                versionName: "0.1",
                compatibility: "多數開源 / 商業模型。",
                compatibility_en: "Most open-source & commercial models.",
                features: "泛用型寫作提示詞，精簡版的餛飩提示詞，保留更多本地提示詞結構格式，提供指令項目與附加娛樂項目可自由啟用關閉。",
                features_en: "Versatile writing prompt. A lightweight counterpart to WontoNnnnnnn prompt. Built for local setups, highly customizable.",
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1451871841584156683" }],
                links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1451871841584156683" }]
            }
        ]
    },
    {
        id: "wonton-prompt",
        mainName: "餛飩提示詞",
        mainName_en: "WontoNnnnnnn Prompt",
        subName: "Adia-🥟-WontoNnnnnnn",
        latestVersion: {
            versionName: "1.1.2",
            compatibility: "Gemini-3.5-Flash / Gemini-3.0-Flash 及常見商業 / 開源模型。",
            compatibility_en: "Gemini-3.5-Flash / Gemini-3.0-Flash and popular commercial / open-source models.",
            features: "泛用型寫作提示詞，強調情感敘述與描寫，多樣指令項目與附加娛樂項目可自由啟用關閉，提供搭配的正規表示式。",
            features_en: "A versatile writing prompt that emphasizes emotional narratives and descriptive details. Features various toggleable instruction clauses and extra elements, complete with matching regex configurations.",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1507644640692801620" },
                    { name: "直接下載", file: "prompt/Adia-🥟-WontoNnnnnnn-1.1.2.json" }],
            links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1507644640692801620" },
                       { name: "Download Prompt", file: "prompt/Adia-🥟-WontoNnnnnnn-1.1.2.json" }]
        },
        oldVersions: [
            {
                versionName: "0.11",
                compatibility: "Gemini-2.5-Pro 及常見商業 / 開源模型。",
                compatibility_en: "Gemini-2.5-Pro and popular commercial / open-source models.",
                features: "泛用型寫作提示詞，多樣指令項目與附加娛樂項目可自由啟用關閉，提供搭配的正規表示式。",
                features_en: "A versatile writing prompt with multiple toggles for instructions & extra elements, complete with matching regex configurations.",
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1440765707263545418" }],
                links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1440765707263545418" }]
            },
            {
                versionName: "0.3.1",
                compatibility: "Gemini-2.5-Pro-Exp-0325 (降智版)。",
                compatibility_en: "Gemini-2.5-Pro-Exp-0325 (Nerfed Version).",
                features: "泛用型寫作提示詞，提供指令項目與附加娛樂項目可自由啟用關閉。",
                features_en: "A versatile writing prompt with multiple highly customizable instruction modules and extra elements.",
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1370587540054081566" }],
                links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1370587540054081566" }]
            },
            {
                versionName: "0.3",
                compatibility: "Gemini-2.5-Pro-Exp-0325 (滿血版)。",
                compatibility_en: "Gemini-2.5-Pro-Exp-0325 (Full Version).",
                features: "泛用型寫作提示詞，提供指令項目與附加娛樂項目可自由啟用關閉。",
                features_en: "A versatile writing prompt with multiple highly customizable instruction modules and extra elements.",
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1367731951255031850" }],
                links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1367731951255031850" }]
            }
        ]
    },
    {
        id: "local-prompt",
        mainName: "本地提示詞",
        mainName_en: "Local Prompt",
        subName: "Adia-🍨-Local",
        latestVersion: {
            versionName: "0.4.1",
            compatibility: "多數本地模型 (消費級電腦可運行者)。",
            compatibility_en: "Most local models (runnable on consumer-grade hardware).",
            features: "泛用型寫作提示詞，精簡版的餛飩提示詞，依是否為思考模型與是否需處理正面傾向問題細分成四種小版本。",
            features_en: "A versatile writing prompt. A streamlined version of WontoNnnnnnn prompt, subdivided into 4 sub-versions based on whether you are using a reasoning model and whether positive bias handling is needed.",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1449072115792875562" }],
            links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1449072115792875562" }],
            guide: {
                text: "需依模型調整，範例格式： ",
                text_en: "Requires adjustment based on the model. Example format: ",
                link: { name: "Mistral-V7-Tekken",
                        name_en: "Mistral-V7-Tekken", 
                        url: "https://discord.com/channels/1327283064476270603/1449077398095008026/1449077398095008026" }
            }
        },
        oldVersions: [
            {
                versionName: "Dirty-0.4",
                compatibility: "多數本地模型 (消費級電腦可運行者)。",
                compatibility_en: "Most local models (runnable on consumer-grade hardware).",
                features: "泛用型寫作提示詞，改寫自 Dolfino aka Dirty D 的 save the kittens 版本。",
                features_en: "A versatile writing prompt adapted from Dolfino aka Dirty D's 'save the kittens' version.",
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1342363740519137300" }],
                links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1342363740519137300" }],
                guide: {
                    text: "需依模型調整，範例格式： ",
                    text_en: "Requires adjustment based on the model. Example format: ",
                    link: { name: "ChatML",
                            name_en: "ChatML", 
                            url: "https://discord.com/channels/1327283064476270603/1342398947578216530/1342398947578216530" }
                }
            }
        ]
    },
    {
        id: "system-prompt",
        mainName: "純助手型提示詞",
        mainName_en: "System Persona Prompt",
        subName: "Adia-🧂-System",
        latestVersion: {
            versionName: "0.1",
            compatibility: "任何模型。",
            compatibility_en: "Any model.",
            features: "允許透過 SillyTavern 內建的角色定義、知識書、摘要等等欄位，讓 LLM 助手擁有非常私人化的背景、性格、記憶。",
            features_en: "Allows the LLM assistant to develop highly personalized backgrounds, personalities, and memories leveraging SillyTavern's default character definitions, lorebooks, and summaries.",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1389976248838524959/1389976248838524959" }],
            links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1389976248838524959/1389976248838524959" }]
        },
        oldVersions: []
    },
    {
        id: "summary-prompt",
        mainName: "摘要總結提示詞",
        mainName_en: "Summary Prompt",
        subName: "Adia-🍇-Summary",
        latestVersion: {
            versionName: "0.1",
            compatibility: "Gemini-2.5 或上下文大、不易注意力發散的模型。",
            compatibility_en: "Gemini-2.5, or models with large context windows and strong attention retention.",
            features: "配合 SillyTavern 內建的摘要欄位，無須安裝擴充功能，輸出摘要正文並列出關鍵地點、物件、人物的簡敘清單。",
            features_en: "Designed for SillyTavern's native summary field without requiring extensions. Outputs the core narrative summary along with a catalog summarizing key locations, items, and figures.",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1406279608973791345/1406279608973791345" }],
            links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1406279608973791345/1406279608973791345" }]
        },
        oldVersions: []
    }
];
