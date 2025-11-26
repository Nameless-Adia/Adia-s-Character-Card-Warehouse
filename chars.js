// data.js
const characters = [
  {
    id: "fantasy-caroline",
    category: "fantasy-east",
    name: "Caroline",
    image: "char-pic/Caroline.jpg",
    tags: ["SillyTavern", "單人卡", "女性 OC", "AnyPOV", "黑暗", "魔法", "焦慮", "緩慢燃燒", "貴族", "Sub", "中世紀"],
    description: "她曾是溫室中被精心呵護的花朵，如今卻被移出庇護，以帝王權術澆灌，並戴上了名為統治者的枷鎖。她自身的責任心，加上來自群眾沉重的期望，使她幾乎喘不過氣。更別提邊境戰火愈發猛烈，半數公爵的失蹤與叛逃，正讓她與整個王國的處境，變得更加岌岌可危……<br>而你又會為她的命運帶來如何的變數？",
    reminder: "內嵌補充世界觀的知識書，不匯入亦可。",
    warning: "死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fantasy-colby",
    category: "fantasy-east",
    name: "Colby",
    image: "char-pic/Colby.jpg",
    tags: ["SillyTavern", "單人卡", "男性 OC", "AnyPOV", "黑暗", "魔法", "超自然", "非合意", "焦慮", "貴族", "邪惡", "Dom", "中世紀"],
    description: "他是殘忍又嗜虐的黑魔法狂信者，亦是自戀且高傲的支配者，甚至妄圖掌控世界的法則，將疾病與死亡納入手掌之中。<br>而當你的命運不幸的與他糾葛在一起時，你會做出如何的選擇？",
    reminder: "內嵌補充世界觀的知識書，不匯入亦可。",
    warning: "NSFL、極端行為角色、黑魔法獻祭、嚴重的殺人和虐待、人口販賣、死鴿子 🗡🕊 ️要素。"
  },

  {
    id: "fantasy-shano-and-ray",
    category: "fantasy-east",
    name: "Shano & Ray",
    image: "char-pic/Shano and Ray [DC].jpg",
    tags: ["SillyTavern", "多人卡", "男性 OC", "AnyPOV", "黑暗", "魔法", "Dom", "中世紀"],
    description: "曾經王國的公爵 Shano 與 Ray，在王國面臨生死存亡的危機時，義無反顧地放棄了王國，選擇與你出走。<br>如今戰亂四起，你的血親 Shano 與你的法定伴侶 Ray 卻籌組了馬戲團，藉著巡迴演出的名義，與你共同遊歷四方。",
    reminder: "",
    warning: "骨科、死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fantasy-super-nude-apron",
    category: "fantasy-east",
    name: "超級 ⛤ 裸體圍裙 ～♡",
    image: "char-pic/Super ⛤ Nude Apron ～♡.jpg",
    tags: ["SillyTavern", "單人卡", "男性 OC", "AnyPOV", "魔法", "喜劇", "Dom", "現代"],
    description: "出身文史豪門的 Ray，他曾對你一見鍾情，甚至當下對你求婚。<br>而無論你的答覆為何，他已經立誓將用盡一生去珍惜與守護你，也渴望與你建立幸福美滿的家庭，哪怕他如今就正在你的眼前出盡洋相。",
    reminder: "內嵌補充世界觀的知識書，不匯入亦可。",
    warning: ""
  },
  {
    id: "fantasy-lybis",
    category: "fantasy-east",
    name: "Lybis",
    image: "char-pic/Lybis [ALT].jpg",
    tags: ["SillyTavern", "單人卡", "女性 OC", "AnyPOV", "黑暗", "魔法", "焦慮", "奴隸", "Sub", "中世紀"],
    description: "首都最頂級的酒館，她身為其中的頭牌姑娘兼舞孃，被老闆視作向精英階層諂媚的籌碼，不只利用她的身體，更利用她的預知能力來獲取利益。<br>但她並沒有放棄，仍保有從社會底層翻身至上流社會的野心，而你將會是那位幫助她的貴人嗎？",
    reminder: "",
    warning: "感情利用與欺騙、死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fantasy-mauro",
    category: "fantasy-south",
    name: "Mauro",
    image: "char-pic/Mauro.jpg",
    tags: ["SillyTavern", "單人卡", "男性 OC", "AnyPOV", "黑暗", "魔法", "焦慮", "皇室", "Dom", "文藝復興"],
    description: "終結戰亂帶來盛世的黑衣大帝，亦是被稱作不死大帝的他，坐擁巨大的權勢與愛戴，但他的心卻已經千瘡百孔。沒能保護好妹妹 Janice 這件事成為他恆久的夢魘，讓他被無盡的自責與愧疚折磨了數百年。<br>而你卻讓他感受到獲得救贖與被原諒的可能性，僅僅因為他能在你的身上看見曾經 Janice 的身影。",
    reminder: "內嵌補充世界觀的知識書，不匯入亦可。",
    warning: "嚴重的移情傾向、偽骨科、死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fantasy-rosalind-fang",
    category: "fantasy-south",
    name: "方紅綾",
    image: "char-pic/方紅綾.jpg",
    tags: ["SillyTavern", "單人卡", "女性 OC", "AnyPOV", "黑暗", "魔法", "焦慮", "皇室", "Sub", "中世紀"],
    description: "她是被預言為『救國福兆』的公主，卻在誕生時遭逢了場三天三夜的紅雨，頓時成了舉國認定的『災厄』。然而戰火肆虐之下，民眾同時矛盾的期望著『救國福兆』的預言仍然可以成真，這才保住了她的性命，卻也使她的生命中再無關愛與自由，只剩疏離與禁錮。<br>而你又會為她的命運帶來如何的變數？",
    reminder: "內嵌補充世界觀的知識書，不匯入亦可。",
    warning: "嚴重的憂鬱傾向、死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fictional-ei",
    category: "fictional-gods",
    name: "翳",
    image: "char-pic/Ei.jpg",
    tags: ["SillyTavern", "單人卡", "男性 OC", "AnyPOV", "黑暗", "超自然", "非合意", "焦慮", "反派", "Dom", "現代日本"],
    description: "從人類負面情感誕生並成長的邪神，他偽裝成人類，盤踞在曾被瘟疫肆虐過的深山村落，以教主的身份宣揚由他所創的邪教，渴望著茁壯實力以躲過諸神的追殺。<br>而當你的命運與他糾葛在一起時，你又會作出如何的選擇？",
    reminder: "",
    warning: "極端行為角色、病態的控制狂、死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fictional-yakuichi-alt",
    category: "fictional-gods",
    name: "亦壹",
    image: "char-pic/Yakuichi [ALT].jpg",
    tags: ["SillyTavern", "單人卡", "男性 OC", "AnyPOV", "黑暗", "超自然", "敵人至戀人", "非合意", "Dom", "現代日本"],
    description: "從人類負面情感誕生並成長的邪神，與從人類願望中誕生並隨信仰成長的神明，是彼此從誕生起就注定敵對的存在。<br>而你，一名新生的邪神，不幸的誕生在他這位千年河神所庇護的小鎮之中，你將會採取如何的行動？",
    reminder: "",
    warning: "死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fictional-yakuichi-alt2",
    category: "fictional-gods",
    name: "亦壹",
    image: "char-pic/Yakuichi [ALT2].jpg",
    tags: ["SillyTavern", "單人卡", "男性 OC", "AnyPOV", "超自然", "Dom", "現代日本"],
    description: "他，一名地方小鎮的風流河神。<br>而你與他在網路上相遇，並引起了他的興趣，在他心滿意足前，他不會輕易的放你走。",
    reminder: "內嵌娛樂性的正規式，務必匯入。",
    warning: "死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fictional-yakuichi",
    category: "fictional-gods",
    name: "亦壹",
    image: "char-pic/Yakuichi.jpg",
    tags: ["SillyTavern", "奶茶店 bot 店員", "大冰奶角色卡", "單人卡", "男性 OC", "AnyPOV", "超自然", "Dom", "現代日本"],
    description: "他，一名地方小鎮的風流河神。<br>而你與他偶然相遇，並引起了他的興趣，在他心滿意足前，他不會輕易的放你走。",
    reminder: "",
    warning: "死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fictional-ivansylth-alt",
    category: "fictional-humans",
    name: "Ivansylth",
    image: "char-pic/Ivansylth [ALT].jpg",
    tags: ["SillyTavern", "群聊卡: Aldousylvan 兄弟", "男性 OC", "AnyPOV", "黑暗", "敵人至戀人", "Dom", "近代英國", "工業時代"],
    description: "謠傳與黑魔法有所牽扯的古老公爵家族 Aldousylvan，如今由正一對兄弟把持著著。<br>哥哥 Ivansylth 高傲且殘酷，既是家族當家亦是上議院議員，手握堅實的人脈資源，他帶著『目的』接近你，並打算為了報復與折磨弟弟而毀掉你。",
    reminder: "亦可單聊，但其他角色會影薄。",
    warning: "極端行為角色、死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fictional-shano-alt",
    category: "fictional-humans",
    name: "Shano",
    image: "char-pic/Shano [ALT].jpg",
    tags: ["SillyTavern", "群聊卡: Aldousylvan 兄弟", "男性 OC", "AnyPOV", "黑暗", "Dom", "近代英國", "工業時代"],
    description: "謠傳與黑魔法有所牽扯的古老公爵家族 Aldousylvan，如今由正一對兄弟把持著著。<br>弟弟 Shano 紳士而病態，身為國內最大間製藥企業的老闆，擁有無與倫比的財富，他對你無比的癡迷與迷戀，並想將你徹底占為己有。",
    reminder: "亦可單聊，但其他角色會影薄。",
    warning: "病態的癡迷與迷戀、死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fictional-shano-alt2",
    category: "fictional-humans",
    name: "夏諾",
    image: "char-pic/Shano [ALT2].jpg",
    tags: ["SillyTavern", "單人卡", "男性 OC", "AnyPOV", "黑暗", "非合意", "反派", "Dom", "現代台灣"],
    description: "你青梅竹馬的鄰家哥哥／弟弟在失蹤了三年後再次回到了你的生活之中。<br>他看上去變化不大，仍是你記憶中那位溫柔的鄰家哥哥／弟弟，卻偶爾會流露出你記憶中所沒有的冰冷與無情……",
    reminder: "",
    warning: "黑社會、死鴿子 🗡🕊 ️要素。"
  },
  {
    id: "fictional-tan-lewang",
    category: "fictional-humans",
    name: "譚樂望",
    image: "char-pic/譚樂望.jpg",
    tags: ["SillyTavern", "單人卡", "男性 OC", "AnyPOV", "仙俠", "超自然", "Dom", "現代台灣"],
    description: "從民國初年至現代，從中國東北至台灣，歷經了戰火與歲月的磨礪，他，一名無名半仙，卻依舊保有初心，堅持著他的俠義心腸。<br>而你與這樣的他相遇了……",
    reminder: "",
    warning: "可能涉及歷史爭議與敏感政治議題。<br>所有情節、觀點與對話，皆為角色塑造所需，其生成內容亦受 AI 模型之不確定性影響，均不代表作者本人之立場。"
  },
];
