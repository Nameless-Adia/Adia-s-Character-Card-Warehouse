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
            features: "結構精簡，提示內容簡樸單純，以適應多數的模型並可方便地無痛進行切換。提供簡單的寫作文風微調、思維鏈選項、時間列選項、選項角功能與搞笑番外小劇場的項目，預設繁體中文輸出，可選英文輸出，允許配合 SillyTavern 內建的摘要總結功能。提供搭配的正規表示式。",
            features_en: "A lightweight and simple prompt structure designed to work well with most models, allowing smooth switching between different LLMs. Includes basic writing style adjustments, CoT options, timeline options, optional character choice features, and humorous side-story modules. Outputs Traditional Chinese by default, with optional English output support, and works well with SillyTavern's built-in summarization feature. Comes with matching regular expressions.",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1507647080942927915" },
                    { name: "直接下載", file: "prompt/Adia-🍨-Loacl-in-Chat-0.2.2.json" }],
            links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1342363740519137300/1507647080942927915" },
                       { name: "Download Prompt", file: "prompt/Adia-🍨-Loacl-in-Chat-0.2.2.json" }]
        },
        oldVersions: []
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
            features: "結構些許複雜，提示內容主要針對 Gemini 的特性進行撰寫，並強調情感敘述與描寫。提供寫作文風選項、思維鏈選項、時間列選項、好感列選項、選項角功能與多風格番外小劇場的項目，預設繁體中文輸出，可選英文輸出，允許配合 SillyTavern 內建的摘要總結功能。提供搭配的正規表示式。",
            features_en: "A more feature-rich prompt framework primarily designed around Gemini's strengths, with an emphasis on emotional narration and descriptive writing. It includes writing style options, CoT options, timeline options, affection meter options, optional character choice features, and multi-style bonus side stories. Traditional Chinese output is enabled by default, with optional English output support. It also works with SillyTavern's built-in summarization feature and comes with matching regular expressions.",
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
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1440765707263545418" }],
                links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1440765707263545418" }]
            },
            {
                versionName: "0.3.1",
                compatibility: "Gemini-2.5-Pro-Exp-0325 (降智版)。",
                compatibility_en: "Gemini-2.5-Pro-Exp-0325 (Nerfed Version).",
                links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1370587540054081566" }],
                links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1360563361087094904/1370587540054081566" }]
            },
            {
                versionName: "0.3",
                compatibility: "Gemini-2.5-Pro-Exp-0325 (滿血版)。",
                compatibility_en: "Gemini-2.5-Pro-Exp-0325 (Full Version).",
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
            features: "結構精簡，提示內容簡樸單純，以適應多數的模型。依是否配適思考模型與是否需處理正面傾向問題細分成四種小版本。",
            features_en: "A lightweight and simple prompt framework designed for broad compatibility with most models. It comes in four variants: for reasoning and non-reasoning models, with or without positive-bias handling.",
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
            features_en: "Allows the LLM assistant to be given highly personalized backgrounds, personalities, and memories through SillyTavern's built-in Character Definition, Lorebooks, Summary, and related fields.",
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
            features_en: "Designed for SillyTavern's built-in Summary field with no extensions required. Generates the main summary together with a concise reference list of key locations, items, and characters.",
            links: [{ name: "DC 下載", url: "https://discord.com/channels/1327283064476270603/1406279608973791345/1406279608973791345" }],
            links_en: [{ name: "DC Download", url: "https://discord.com/channels/1327283064476270603/1406279608973791345/1406279608973791345" }]
        },
        oldVersions: []
    }
];
