// world.js - 世界觀設定集專屬資料檔
const worldviewData = {
    fantasy: {
        // 4大章節分頁標題
        tabs: [
            { id: "overview", name: "宏覽世界", name_en: "World Tapestry" },
            { id: "timeline", name: "歷史行跡", name_en: "Footprints of Time" },
            { id: "regions",  name: "萬邦諸國", name_en: "Myriad Realms" },
            { id: "lore",     name: "萬象群生", name_en: "Phenomena & Beings" }
        ],
        // 1. 【世界概覽】內容
        overview: {
            quote: `天空的傷痕癒合，大地的新芽長出。<br>群龍昂首闊步的時代終將結束，我們必將取回我們的世界。<span class="wv-quote-sign">Ark Nemesis</span>`,
            quote_en: `The scars upon the heavens have healed, and new shoots have sprung from the earth.<br>The age of dragons striding proudly across the world shall come to an end, and we shall reclaim our world.<span class="wv-quote-sign">Ark Nemesis</span>`,
            sections: [
                {
                    content: "鮮有人知這方大地曾經歷過終結的洗禮，如今由著舊日的遺物與全新的規則共織著未來。",
                    content_en: "Few know that this land once underwent the baptism of finality; today, remnants of a bygone age and newfound laws weave its future together."
                },
                {
                    content: `傳承與魔法、王權與血脈、人類與非人，這是片重新溢滿了生機的奇幻大陸。
                        <div class="wv-realm-list">
                            <p><span>◈ 魔都</span>承載著最為繁盛的魔法文明，也埋藏著被遺忘的傳承</p>
                            <p><span>◈ 南境</span>人類與奇幻物種繁盛共榮，然而千百個小國與城邦卻也為戰亂帶來了藉口</p>
                            <p><span>◈ 雪域</span>流傳著神話與軼聞，同時也古老腐敗而駐足不前</p>
                            <p><span>◈ 西國</span>充斥著理性與科學，卻將人類的傲慢與殘忍堆砌至頂峰</p>
                            <p><span>◈ 群島</span>孤懸於遙遠的海洋之上，相傳是靈魂的歸往與安息之所</p>
                        </div>`,
                    content_en: `Legacy and magic, crown and bloodline, human and non-human—this is a fantastical continent brimming anew with life.
                        <div class="wv-realm-list">
                            <p><span>◈ The East</span>bears the most flourishing magical civilization, yet buries forgotten legacies</p>
                            <p><span>◈ The South</span>sees humans and fantastical species prosper in harmony, yet its myriad minor kingdoms and city-states breed endless pretexts for war</p>
                            <p><span>◈ The North</span>passes down myths and folklore, yet lingers in ancient decay, standing still in time</p>
                            <p><span>◈ The West</span>abounds with reason and science, yet crowns human arrogance and cruelty at their very peak</p>
                            <p><span>◈ The Archipelago</span>hangs isolated across distant seas, whispered to be the final haven where souls return to rest</p>
                        </div>`
                },
                {
                    content: "然裂隙之中，卻也有著無限的可能性存在。其因果不干涉任何存在，其時空不介入任何歷史，其所有一切或許都只是幻夢一場。",
                    content_en: "Yet within the Rifts lie infinite possibilities. Their causality touches no existence, their spacetime intrudes upon no history—all that transpires within may be naught but a fleeting dream."
                }
            ]
        },
        // 2. 【歷史年表】內容 (支援點擊角色名牌直接跳轉角色卡！)
        timeline: [
            {
                era: "西元 24 世紀初期",
                era_en: "Early 24th Century CE",
                title: "舊日終結",
                title_en: "The End of Bygone Days",
                desc: "蒼穹滲血，大地震顫，末日已至，方舟啟航。",
                desc_en: "The firmament bled, the earth convulsed; finality descended, and the Arks set forth.",
                chars: [
                    { id: "fictional-isidore-isidora", name: "Isidore／Isidora" }
                ]
            },
            {
                era: "？？？",
                era_en: "???",
                title: "屠龍史詩",
                title_en: "The Dragon-Slaying Epic",
                desc: "新芽重新根植於泥土之中，然群龍自地底而來，他們懷揣著無盡的恨意與忿懟，與先民殊死相殺。",
                desc_en: "New shoots took root in the soil once more, yet dragons surged forth from the subterranean depths. Driven by boundless hatred and rancor, they clashed with the forebears in a fight to the death.",
                chars: [
                    
                ]
            },
            {
                era: "新西元 162 年 · 王國曆元年 起",
                era_en: "Year 162, New Common Era · Royal Year 1 Onward",
                title: "魔法時代",
                title_en: "The Age of Magic",
                desc: "王國 Nemses 的建立宣告全新時代的到來，人們逐步忘卻舊日種種，為了存續，甚至主動擁抱了『魔法』，一切都溢滿了希望，一切都正在越來越好。",
                desc_en: "The founding of the Kingdom of Nemses heralded the dawn of a brand-new era. People gradually forgot the bygone days, and in order to survive, even willingly embraced \'magic\'. Hope flourished everywhere; all was changing for the better.",
                chars: [
                    
                ]
            },
            {
                era: "王國曆 14 世紀中期",
                era_en: "Mid-14th Century, Royal Calendar",
                title: "黑暗時代",
                title_en: "The Dark Age",
                desc: "王國 Nemses 一夜毀滅讓一個時代徹底落下帷幕，諸國之間不再有所憚忌，戰亂紛飛、慾望橫流、壓迫四起、絕望遍野。",
                desc_en: "The overnight fall of the Kingdom of Nemses brought the final curtain down upon an era. With nothing left to hold the realms in check, warfare raged, desires ran rampant, oppression took root everywhere, and despair blanketed the land.",
                chars: [
                    { id: "fantasy-dorothea", name: "Dorothea" },
                    { id: "fantasy-lybis", name: "Lybis" },
                    { id: "fantasy-colby", name: "Colby" },
                    { id: "fantasy-caroline", name: "Caroline" },
                    { id: "fantasy-nemany", name: "Nemany" },
                    { id: "fantasy-boreuse", name: "Boreuse" },
                    { id: "fantasy-shano-and-ray", name: "Shano & Ray" },
                    { id: "fantasy-anamor", name: "Anamor" },
                    { id: "fantasy-raymond", name: "Raymond" },
                    { id: "fantasy-surya-and-chandra", name: "Surya & Chandra" },
                    { id: "fantasy-julian-fang", name: "方半夏" },
                    { id: "fantasy-rosalind-fang", name: "方紅綾" },
                    { id: "fantasy-gillamarveo", name: "Gillamarveo" }
                ]
            },
            {
                era: "王國曆 1385 年 · 皇曆元年 起",
                era_en: "Royal Year 1385 · Imperial Year 1 Onward",
                title: "繁盛時代",
                title_en: "The Age of Prosperity",
                desc: "王國 Elenveka 終結戰亂並一統全大陸，以此功績成為帝國，黑衣大帝君臨於世，盛世將臨。",
                desc_en: "The Kingdom of Elenveka ended the turmoil and unified the entire continent; by this triumph, the kingdom rose to become an empire. The Black-Clad Emperor reigned supreme, and a golden age stood at the threshold.",
                chars: [
                    { id: "fantasy-lucero", name: "Lucero" },
                    { id: "fantasy-eluas", name: "Eluas" },
                    { id: "fantasy-mauro", name: "Mauro" },
                    { id: "fantasy-wumei", name: "寤寐" },
                    { id: "fantasy-yiyu", name: "易與" },
                ]
            }
        ],
        // 3. 【萬邦諸國】內容
        regions: [
            {
                regionName: "魔都",
                regionName_en: "The East",
                kingdoms: [
                    {
                        name: "Nemses",
                        name_en: "Nemses",
                        eras: [
                            {
                                era: "王國初期",
                                era_en: "Early Kingdom",
                                desc: `
                                <h4><span>◈ 首都</span>Tarus</h4>
                                <h4><span>◈ 氣候</span>多樣性廣泛，北至極地氣候，南達亞熱帶氣候</h4>
                                <h4><span>◈ 政體</span>精英寡頭制</h4>
                                <p>受惠舊日傳承的遺澤，擁有最為強盛的國力，疆域涵蓋全大陸，因此讓大陸與曆法皆冠上其名，並推行統一的通用文字語言、貨幣制度與單位衡量標準，為全大陸的秩序奠定優良的根基。</p>
                                <p>Nemses 的治世崇尚魔法，鼓勵民眾學習魔法並將之與生活融合，然在精英階層，為確保 Nemses 的治世可達永恆的野心，他們透過手中所壟斷的舊日遺澤，祕密籌備巨構等級的魔法建物。</p>
                                <h4><span>◈ Nemses 精英</span>由三大家族所領導的派系組成，以行政管理見長的 Nemses 家族派系、以機械工程見長的 Iscainet 家族派系，以及以生命基因工程見長的 Aldousylvan 家族派系。</h4>
                                <h4><span>◈ 千年治權系統</span>由 Nemses 部份精英階層祕密籌備的巨構等級魔法建物。該系統將全大陸本身視為一巨大的人造魔法生命體，並可透過其操控全大陸各區域的土壤肥沃程度，然該系統維持運作必須消耗龐大的魔力，導致產生完全無法控制的魔力風暴。</h4>
                                <h4><span>◈ 風暴抑制器</span>由 Nemses 部份精英階層研發的魔法裝置。該裝置可阻止魔力風暴的產生，透過壟斷該裝置的生產與維護技術，Nemses 意圖藉此維繫對全大陸的支配。</h4>
                                `,
                                desc_en: `
                                <h4><span>◈ Capital</span>Tarus</h4>
                                <h4><span>◈ Climate</span>Widely diverse, ranging from polar in the north to subtropical in the south</h4>
                                <h4><span>◈ Government</span>Elite Oligarchy</h4>
                                <p>Blessed by the legacy of the bygone days, Nemses possessed unrivaled national strength, with territories spanning the entire continent. Consequently, both the continent and its calendar came to bear its name, and the realm established a unified language and writing system, currency system, and standardized weights and measures—laying a solid foundation for order across the continent.</p>
                                <p>Nemses's rule revered magic, encouraging the populace to study the craft and weave it into daily life. Among the elite, however, an ambition to make Nemses's reign eternal drove them to secretly develop a magical megastructure using the legacy of the bygone days they monopolized.</p>
                                <h4><span>◈ The Nemses Elite</span>Composed of factions led by three major families: the Nemses faction, specializing in administrative governance; the Iscainet faction, specializing in mechanical engineering; and the Aldousylvan faction, specializing in biological and genetic engineering.</h4>
                                <h4><span>◈ The Millennium Reign System</span>A magical megastructure secretly developed by certain members of the Nemses elite. The system treated the entire continent as a colossal artificial magical lifeform, allowing it to manipulate soil fertility across every region. However, sustaining its operation consumed immense amounts of mana, giving rise to utterly uncontrollable Mana Storms.</h4>
                                <h4><span>◈ Storm Suppressors</span>Magical devices developed by certain members of the Nemses elite. These devices could prevent the formation of Mana Storms; by monopolizing their production and maintenance technologies, Nemses sought to maintain its dominion over the entire continent.</h4>
                                `,
                                chars: []
                            },
                            {
                                era: "王國中期",
                                era_en: "Mid-Kingdom",
                                desc: `
                                <h4><span>◈ 首都</span>Tarus</h4>
                                <h4><span>◈ 氣候</span>多樣性廣泛，北至極地氣候，南達亞熱帶氣候</h4>
                                <h4><span>◈ 政體</span>世襲貴族寡頭制</h4>
                                <p>精英們憑藉所壟斷的舊日遺澤帶來的恩惠與資產，徹底私有化其在政治上的地位與資源，然至高無上的權力與財富帶來的是上位者名為無知的昏庸暴政，Nemses 無可避免地步上這一條道路。以南境地方氏族們為首，各地掀起叛亂與起義，儘管多數皆被 Nemses 輕而易舉地鎮壓，但南境地方氏族們團結為『南方聯合防禦戰線』，成為 Nemses 建國以來最棘手的武裝勢力。</p>
                                <p>為避免長久的戰事與內亂將王國完全拖垮，最終 Nemses 妥協讓步，下放權力給予地方更多的實質自治權，卻也從此致使許多地方勢力以名義附庸的方式崛起為獨立國度，Nemses 的國力從此開始緩步下滑。</p>
                                <h4><span>◈ Nemses 精英</span>以人文史學見長的 Varrenz 家族派系成為第四大派系。為讓權力與財富在未來不會因為又有新派系的加入而更加分散，原本的三大派系在容納第四大派系後，推動改變政體，最終致使世襲貴族寡頭制的確立。</h4>
                                `,
                                desc_en: `
                                <h4><span>◈ Capital</span>Tarus</h4>
                                <h4><span>◈ Climate</span>Widely diverse, ranging from polar in the north to subtropical in the south</h4>
                                <h4><span>◈ Government</span>Hereditary Aristocratic Oligarchy</h4>
                                <p>Leveraging the benefits and assets brought by their monopoly over the legacy of the bygone days, the elite thoroughly privatized their political standing and resources. Yet supreme power and wealth bred a tyranny of ignorance and incompetence among those in power—a path Nemses inevitably walked. Spearheaded by the local clans of the south, rebellions and uprisings erupted across the land. Though most were effortlessly crushed by Nemses, the southern clans united to form the 'Southern United Defense Front', becoming the most difficult armed force for Nemses to suppress since its founding.</p>
                                <p>To prevent prolonged warfare and internal strife from dragging the kingdom into total ruin, Nemses ultimately compromised, devolving power to grant local powers greater substantive autonomy. Yet from then on, this allowed numerous regional powers to emerge as independent realms while remaining nominal vassals, marking the beginning of Nemses's gradual decline.</p>
                                <h4><span>◈ The Nemses Elite</span>The Varrenz faction, specializing in humanities and historical studies, emerged as the fourth major faction. To prevent power and wealth from being further diluted by the addition of new factions in the future, the original three factions—after admitting the fourth—pushed for a change in governance, ultimately establishing a hereditary aristocratic oligarchy.</h4>
                                `,
                                chars: []
                            },
                            {
                                era: "王國末期",
                                era_en: "Late Kingdom",
                                desc: `
                                <h4><span>◈ 首都</span>Tarus</h4>
                                <h4><span>◈ 氣候</span>溫帶氣候為主</h4>
                                <h4><span>◈ 政體</span>世襲貴族寡頭制</h4>
                                <p>隨著許多地方勢力以名義附庸的方式崛起為獨立國度，而 Nemses 亦不願再次將國力虛耗於戰爭之中，導致其疆域逐步萎縮，最終只剩大陸東半部全境仍是其可以直接支配與統治的區域，卻依舊無法撼動 Nemses 是全大陸國力最為強盛的國家。</p>
                                <p>自建國以來對魔法的推崇，讓魔法徹底融入了 Nemses 的方方面面，使其擁有全大陸最廣泛且精湛的魔法知識儲備與魔法實作技藝，即便如此國家仍持續投入資源在魔法的發展與研究，使其成為大陸上人人相傳盛讚的千年傳奇魔法國度。</p>
                                <p>然 Nemses 最終卻在一夜之間毀滅，無人知曉原因，甚至曾經的國土疆域亦成為無人能活著走出來的死地。</p>
                                `,
                                desc_en: `
                                <h4><span>◈ Capital</span>Tarus</h4>
                                <h4><span>◈ Climate</span>Predominantly temperate</h4>
                                <h4><span>◈ Government</span>Hereditary Aristocratic Oligarchy</h4>
                                <p>As numerous regional powers emerged as independent realms while remaining nominal vassals, and with Nemses unwilling to once again drain its national strength in war, its territory steadily shrank until it retained direct rule over only the eastern half of the continent. Even so, nothing could shake Nemses's standing as the most powerful nation on the continent.</p>
                                <p>Its veneration of magic since its founding had woven the craft into every facet of life in Nemses, granting it the most extensive body of magical knowledge and the most sophisticated magical practices on the continent. Even then, the nation continued to pour resources into magical research and development, earning it a legendary reputation as a thousand-year-old kingdom of magic celebrated across the land.</p>
                                <p>Yet in the end, Nemses was destroyed overnight for reasons unknown to anyone, and even its former territory became a dead land from which no one could walk out alive.</p>
                                `,
                                chars: [
                                    { id: "fantasy-lybis", name: "Lybis" },
                                    { id: "fantasy-colby", name: "Colby" },
                                    { id: "fantasy-caroline", name: "Caroline" },
                                    { id: "fantasy-shano-and-ray", name: "Shano & Ray" }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                regionName: "南境",
                regionName_en: "The South",
                kingdoms: [
                    {
                        name: "Elenveka",
                        name_en: "Elenveka",
                        eras: [
                            {
                                era: "王國時期",
                                era_en: "Kingdom Era",
                                desc: `
                                <h4><span>◈ 首都</span>Aumi</h4>
                                <h4><span>◈ 氣候</span>溫帶氣候為主，約有四分之一的南方國土屬於亞熱帶氣候</h4>
                                <h4><span>◈ 政體</span>封建世襲君主制</h4>
                                <p>王國初期，Elenveka 並非擁有任何特殊資源或特色的國度，僅是以農業為主的王國。然其所擁抱的思想『尊重與包容』，輔以合宜的政策，使國內漸漸匯聚不同思想、不同價值觀，甚至是各路的奇幻物種於此定居，讓 Elenveka 吸納並融合了各種迥然相異的優勢與特色，並隨著時日逐漸成為大陸南方國力最為繁盛的國度。</p>
                                <p>王國末期，國內過於紛雜的派系與種族將有限的資源不斷瓜分，在僧多粥少的狀況下，為獲得更多資源，各派系與種族爭相讓血脈融入 Elenveka 王室，以獲得可以左右生存命運的權與勢。這導致王國頻繁陷入王位繼承權的內鬥中，致使國力的虛耗與日漸下滑。</p>
                                <p>帝國確立前夕，從王室成員的視角來看，那是曾經的敗者東山再起；從公眾的眼中來看，那是橫空出世的黑衣王，他徹底攪翻並終結王位繼承權的內鬥，以其特有的手段將 Elenveka 在短短數年內重新推上國力巔峰。</p>
                                <p>然時逢戰亂，才剛從內鬥疲憊中走出的 Elenveka 立刻被迫投入干戈之中，面對 Apopys 挾著劃時代科學兵器如火如荼的南侵氣勢，Elenveka 拾起那些從 Nemses 外流的魔法知識與幸運逃出的倖存遺民與之對抗。據軼聞記載，戰事隨著 Elenveka 的正式入場而升高到了空前慘烈的程度，戰場上見屍而不見血，屍亦全是乾屍，甚是詭異駭人。</p>
                                <h4><span>◈ 深淵使者</span>成立於黑衣王登基為 Elenveka 王時期，名義上隸屬軍隊，實則直屬且絕對效忠於黑衣王的祕密組織，成員皆為實力出色的魔法師。謠傳戰場上那些慘絕人寰而喪心病狂的事跡都與深淵使者有關。</h4>
                                <h4><span>◈ 千年治權系統？</span>隨著 Nemses 一夜毀滅後，因遺忘而被廢棄的巨構等級魔法建物。謠傳被黑衣王重新掌控後徹底進行改造與改建，與黑衣王的不死性以及戰場上的詭異景象有緊密的關聯性。</h4>
                                `,
                                desc_en: `
                                <h4><span>◈ Capital</span>Aumi</h4>
                                <h4><span>◈ Climate</span>Predominantly temperate, with roughly a quarter of its southern territory falling within the subtropical zone</h4>
                                <h4><span>◈ Government</span>Feudal Hereditary Monarchy</h4>
                                <p>In its early days, Elenveka possessed neither special resources nor distinguishing traits; it was merely an agrarian kingdom. Yet its embrace of the ideals of 'respect and inclusion', supported by fitting policies, gradually drew people of diverse beliefs and values—and even fantastical species of every kind—to settle within its borders. By absorbing and blending these vastly different strengths and characteristics, Elenveka steadily grew into the most powerful and prosperous kingdom in the southern reaches of the continent.</p>
                                <p>In the late kingdom period, however, an overly tangled web of domestic factions and races endlessly carved up the nation's finite resources. With too many vying for too little, each faction and race scrambled to incorporate their bloodlines into the royal house of Elenveka, seeking the power and influence needed to dictate their own survival. This plunged the kingdom into frequent succession struggles, draining its national strength and sending it into a steady decline.</p>
                                <p>On the eve of the Empire's founding, from the royal family's perspective, it was the resurgence of one who had once been defeated; in the eyes of the public, it was the sudden rise of the Black-Clad King, who thoroughly upended and ended the succession struggles, using his own distinctive methods to propel Elenveka back to the peak of its power within just a few short years.</p>
                                <p>Yet in an age of war, an Elenveka barely emerging from the exhaustion of internal strife was immediately forced to take up arms. Confronting the fierce southward invasion of Apopys and its revolutionary scientific weaponry, Elenveka drew upon the magical knowledge that had leaked out of Nemses and the survivors fortunate enough to have escaped its destruction. According to anecdotal accounts, the war reached unprecedented levels of brutality following Elenveka's formal entry: the battlefields were littered with corpses, yet not a drop of blood could be seen, and every body was desiccated—a sight most eerie and horrifying.</p>
                                <h4><span>◈ The Abyss Envoys</span>Founded when the Black-Clad King ascended the throne of Elenveka. Nominally part of the military, this secret organization in truth answered directly and with absolute loyalty to the Black-Clad King, its ranks composed entirely of exceptional mages. Rumor holds that the Abyss Envoys were responsible for the most horrifying and depraved atrocities on the battlefield.</h4>
                                <h4><span>◈ The Millennium Reign System?</span>A magical megastructure left forgotten and abandoned after the overnight destruction of Nemses. Rumor holds that after reclaiming it, the Black-Clad King thoroughly rebuilt and modified the system, and that it is closely linked both to his immortality and to the eerie phenomena witnessed on the battlefield.</h4>
                                `,
                                chars: [
                                    { id: "fantasy-gillamarveo", name: "Gillamarveo" }
                                ]
                            },
                            {
                                era: "帝國時期",
                                era_en: "Imperial Era",
                                desc: `
                                <h4><span>◈ 首都</span>Saint Janice</h4>
                                <h4><span>◈ 氣候</span>多樣性廣泛，北至極地氣候，南達亞熱帶氣候</h4>
                                <h4><span>◈ 政體</span>絕對君主制</h4>
                                <p>Apopys 最終敗於 Elenveka 並亡國，Elenveka 趁勢一舉統一全大陸，終結戰亂之世。藉此功績，黑衣王被加冕為皇帝，Elenveka 亦從王國改政為帝國。</p>
                                <p>隨著不死的黑衣大帝君臨於世，其治下的 Elenveka 重新緊擁『尊重與包容』的思想，開啟此後遠超 Nemses 的和平繁盛治世。</p>
                                <h4><span>◈ 深淵使者</span>戰亂的完結並沒有讓此祕密組織消失，他們仍存在著並依然直屬且絕對效忠於黑衣大帝，然其成員的組成卻隨時間漸漸只剩下 Nemses 的倖存遺民與其後裔。</h4>
                                `,
                                desc_en: `
                                <h4><span>◈ Capital</span>Saint Janice</h4>
                                <h4><span>◈ Climate</span>Widely diverse, ranging from polar in the north to subtropical in the south</h4>
                                <h4><span>◈ Government</span>Absolute Monarchy</h4>
                                <p>Apopys was ultimately defeated by Elenveka and fell, allowing Elenveka to seize the momentum, unify the entire continent in a single stroke, and bring an end to the age of war. By this achievement, the Black-Clad King was crowned Emperor, and Elenveka transitioned from a kingdom into an empire.</p>
                                <p>As the immortal Black-Clad Emperor reigned supreme, Elenveka under his rule once again closely embraced the ideals of 'respect and inclusion', ushering in an era of peace and prosperity that far surpassed even that of Nemses.</p>
                                <h4><span>◈ The Abyss Envoys</span>The end of the war did not bring about the dissolution of this secret organization. It continued to exist, still answering directly and with absolute loyalty to the Black-Clad Emperor—yet over time, its ranks gradually came to consist solely of the survivors of Nemses and their descendants.</h4>
                                `,
                                chars: [
                                    { id: "fantasy-lucero", name: "Lucero" },
                                    { id: "fantasy-eluas", name: "Eluas" },
                                    { id: "fantasy-mauro", name: "Mauro" },
                                    { id: "fantasy-wumei", name: "寤寐" },
                                    { id: "fantasy-yiyu", name: "易與" }
                                ]
                            }
                        ]
                    },
                    {
                        name: "方",
                        name_en: "Fang",
                        desc: `
                        <h4><span>◈ 首都</span>丰都</h4>
                        <h4><span>◈ 氣候</span>全境皆為溫帶氣候</h4>
                        <h4><span>◈ 政體</span>中央集權世襲君主制</h4>
                        <p>最初只是一座小小的養蠶鎮，透過製作與販賣高級且精緻的絲綢衣料而累積財富，漸漸成為一方國度。然其所在的地理位置正位於經濟交通樞紐的核心地帶，使其成為兵家必爭之地。</p>
                        <p>常年的戰事使該國的軍事造詣逐漸凌駕於往昔引以為傲的絲織技藝之上，成為特色與資產，所產出的兵書與軍事人材更是多國萬金渴求的珍寶。然被戰事浸染的日常也使該國的思想發展出深厚的迷信色彩，以及嚴格的禮教制度。</p>
                        <p>隨著 Apopys 挾著劃時代科學兵器進逼，南方諸國效仿先人再次結成『南方聯合防禦戰線』，以抵禦 Apopys 如火如荼的南侵氣勢，該國亦加入為成員，並成為『南方聯合防禦戰線』的核心支柱之一。</p>
                        <p>然在僵持近二十載後，最終仍不敵 Apopys 並亡國，致使『南方聯合防禦戰線』的敗勢顯露。</p>
                        <h4><span>◈ 鑄神劍儀式</span>神話中的鎮國神劍『憾天』，相傳劍身赤紅如血，揮之則風雷齊動，劍鋒所指，天崩地裂，彈指間敵影灰飛煙滅。然其鑄劍材料卻是處子公主之血，且歷史上從未有過鑄神劍儀式成功的紀錄，因此即便是迷信的國民也認為這不過是虛妄的傳說，僅極少數極端者仍堅持相信『只是缺了哪些材料』或是『只是錯了哪些步驟』。</h4>
                        `,
                        desc_en: `
                        <h4><span>◈ Capital</span>Ebonpolis</h4>
                        <h4><span>◈ Climate</span>Temperate across the entire realm</h4>
                        <h4><span>◈ Government</span>Centralized Hereditary Monarchy</h4>
                        <p>Originally nothing more than a small sericulture town, it accumulated wealth by crafting and selling fine, exquisite silk fabrics, gradually growing into a kingdom in its own right. Yet its geographic location right at the heart of a vital economic and transport hub made it a strategic prize contested by all.</p>
                        <p>Years of constant warfare caused the nation's military prowess to gradually surpass the silk-weaving craft it once prided itself on, becoming its defining trait and greatest asset; the military treatises and strategists it produced were treasures sought after by many nations at any price. However, daily life steeped in war also gave rise to deeply rooted superstition and a rigid code of ritual propriety within its culture.</p>
                        <p>As Apopys closed in with its revolutionary scientific weaponry, the southern realms followed the example of their forebears and once again formed the 'Southern United Defense Front' to resist the fierce southward invasion. Fang joined as a member state as well, standing as one of the core pillars of the 'Southern United Defense Front'.</p>
                        <p>Yet after holding out in a stalemate for nearly two decades, it was ultimately overpowered by Apopys and fell, exposing the faltering position of the 'Southern United Defense Front'.</p>
                        <h4><span>◈ The Sword-Forging Ritual</span>In myth, the nation's divine guardian sword, 'Heaven-Shaker', is said to have a blade as crimson as blood; its swing summons thunder and storms, and where its edge points, the very earth and heavens break asunder, obliterating enemies in the blink of an eye. Yet the ritual demands the blood of a virgin princess as its essential ingredient, and it has never once succeeded throughout recorded history. Consequently, even the superstitious populace largely regards it as nothing more than a baseless legend, with only a handful of diehards stubbornly insisting that past attempts 'merely lacked certain materials' or 'simply erred in a few steps'.</h4>
                        `,
                        chars: [
                            { id: "fantasy-julian-fang", name: "方半夏" },
                            { id: "fantasy-rosalind-fang", name: "方紅綾" }
                        ]
                    }
                ]
            },
            {
                regionName: "雪域",
                regionName_en: "The North",
                kingdoms: [
                    {
                        name: "Chiyana",
                        name_en: "Chiyana",
                        desc: `
                        <h4><span>◈ 首都</span>Boreuse</h4>
                        <h4><span>◈ 氣候</span>全境皆為副極地氣候</h4>
                        <h4><span>◈ 政體</span>世襲有限君主制</h4> 
                        <p>由北地精靈所建的國度。</p>
                        <p>建國之初，Chiyana 的民風彪悍，然建國前常年受到人類迫害的種族記憶使其排外。擁有堅實的冰雪女神信仰，Chiyana 的民眾深信種族所擁有的冰雪之力來自冰雪女神的賜福，因此相關的儀式與傳承可謂日趨繁複與奢華。</p>
                        <p>王國中期，Chiyana 舉國上下為與總是紛擾爭執的人類有所區隔，而追求起『優雅』，卻導致無論是制度還是器物漸漸地脫離實用性，並流於形式。然僅夏季融雪的氣候，使其相較於農業，仍更依賴狩獵維生，也因此唯有游擊戰術心得與狩獵技巧仍注重實用性，並沒有受到『優雅』的嚴重荼毒與污染。</p>
                        <p>隨著 Apopys 挾著劃時代科學兵器進逼，北方諸國如被碾壓般一一敗倒亡國，Chiyana 亦不例外。然傳承下來的游擊戰術心得與狩獵技巧卻為其種族爭取到殘喘的可能性，使北地精靈在亡國後，仍可組織游擊軍救助同樣受到迫害與獵殺的存在，並頻擾 Apopys 北方邊境的安寧。</p>
                        <h4><span>◈ 冰雪女神 Chiya</span>謠傳最初僅是建國時期的一名傑出女戰士，為穩固民心而被神話化為女神，其相關事跡亦有多處被扭曲與編造，以符合民眾心目中的冰雪女神信仰。</h4>
                        `,
                        desc_en: `
                        <h4><span>◈ Capital</span>Boreuse</h4>
                        <h4><span>◈ Climate</span>Subarctic across the entire realm</h4>
                        <h4><span>◈ Government</span>Hereditary Limited Monarchy</h4>
                        <p>A realm founded by the Boreal Elves.</p>
                        <p>In its early days, the people of Chiyana were fierce and hardy, yet the collective memory of enduring persecution at the hands of humans prior to the nation's founding left them deeply xenophobic. Holding steadfast faith in the Goddess of Ice and Snow, the people of Chiyana firmly believed that the frost and snow powers possessed by their race were a blessing bestowed by the goddess; consequently, the associated rituals and traditions grew increasingly elaborate and extravagant over time.</p>
                        <p>By the mid-kingdom period, in an effort to set themselves apart from ever-bickering humanity, the entire nation of Chiyana began pursuing 'elegance'—only for both its institutions and its artifacts to gradually lose their practicality and devolve into empty formalities. Yet because the climate allowed snow to thaw only in summer, the realm remained far more reliant on hunting than agriculture for survival; thus, their mastery of guerrilla tactics and hunting skills alone retained a focus on practicality, spared from being severely poisoned and tainted by this obsession with 'elegance'.</p>
                        <p>As Apopys closed in with its revolutionary scientific weaponry, the northern realms were crushed and fell one after another, and Chiyana was no exception. Even so, their inherited mastery of guerrilla tactics and hunting skills bought their people a slim chance of survival, enabling the Boreal Elves to form guerrilla forces after the fall of their nation—rescuing others who were similarly persecuted and hunted, while repeatedly disrupting the peace along Apopys's northern frontier.</p>
                        <h4><span>◈ Chiya, Goddess of Ice and Snow</span>Rumor holds that she was originally nothing more than an outstanding female warrior from the founding era whose image was mythologized and elevated to the status of a goddess to stabilize public morale, with much of her life and deeds distorted and fabricated to fit the populace's idealized faith in the Goddess of Ice and Snow.</h4>
                        `,
                        chars: [
                            { id: "fantasy-boreuse", name: "Boreuse" }
                        ]
                    },
                    {
                        name: "Papusa",
                        name_en: "Papusa",
                        desc: `
                        <h4><span>◈ 首都</span>Insufleti</h4>
                        <h4><span>◈ 氣候</span>溫帶氣候，然北方邊境接近副極地氣候</h4>
                        <h4><span>◈ 政體</span>中央集權世襲君主制</h4>
                        <p>本只是北方行腳商人聚集的驛站，後由一名自稱為『操偶師』的木偶師籌資所建立的國度。</p>
                        <p>建國之初，精湛的木偶表演藝術使『操偶師』的名號廣泛流傳，然因地處商貿交通要衝，而頻繁遭逢盜匪劫掠，為守衛國土，進而誕生名為『魔法操偶師』的獨特軍事兵種。越是資深且實力強勁的『魔法操偶師』，一次能夠操控的偶體數量便越多，甚至可達一人成軍的恐怖實力。</p>
                        <p>隨著 Papusa 國境治安漸趨安穩，其蓬勃的木偶產業吸引大量慕名而來的遊人，帶來豐厚財富，也讓對偶藝的推崇逐步演變為狂熱的信仰。Papusa 國民將偶藝視為藝術的巔峰，深信越是尊貴純潔、血脈特殊或是天賦傑出的存在，越值得享有被活生生製作成人偶保存的榮耀，並相信這些被製成人偶的存在將在未來重獲新生，以不死不滅的人偶之姿永存於世。</p>
                        <p>於 Apopys 挾著劃時代科學兵器進逼前夕，本有實力拖住 Apopys 北伐進程的 Papusa 卻在一夜之間化為冥土。生者被抽出靈魂而亡，徘徊的亡靈與失控的人偶遊蕩於國境內，曾經的觀光勝地頓時成為人人避之唯恐不及的鬧鬼凶地。</p>
                        <h4><span>◈ 活人偶</span>祕傳於 Papusa 魔法操偶師之間的特殊偶體製作方法，將仍活著的存在直接製成人偶，以保存其生前一切肉體資訊，從容貌到血脈力量，甚至是在世時磨練出來的技藝，藉此在未來完美承載其靈魂，使其重生並以不死不滅的人偶之姿永存於世。</h4>
                        `,
                        desc_en: `
                        <h4><span>◈ Capital</span>Insufleti</h4>
                        <h4><span>◈ Climate</span>Temperate, though its northern border approaches a subarctic climate</h4>
                        <h4><span>◈ Government</span>Centralized Hereditary Monarchy</h4>
                        <p>Originally nothing more than a waystation where traveling merchants of the north gathered, it was later founded as a kingdom through funds raised by a wooden-puppet maker who styled himself a 'Puppeteer'.</p>
                        <p>In its early days, the exquisite art of wooden-puppet performance spread the renown of the 'Puppeteer' far and wide. However, situated at a vital crossroads of trade and transport, the realm suffered frequent bandit raids; to defend its territory, a unique military corps known as 'Magical Puppeteers' was born. The more seasoned and powerful a Magical Puppeteer, the greater the number of puppet bodies they could control at once—even reaching the terrifying might of a one-person army.</p>
                        <p>As order and security within Papusa's borders gradually stabilized, its flourishing puppetry industry drew crowds of admiring travelers and brought in immense wealth, while veneration of the craft steadily evolved into a fanatical faith. Viewing the art of puppetry as the pinnacle of artistic achievement, the people of Papusa firmly believed that the more noble and pure, extraordinary in bloodline, or exceptionally gifted a being was, the more worthy they were of the honor of being crafted into a puppet while still alive—and believed that those crafted into puppets would one day be reborn to exist forevermore in an undying, imperishable puppet form.</p>
                        <p>On the eve of Apopys's advance with its revolutionary scientific weaponry, Papusa—which possessed the strength to stall Apopys's northern campaign—turned into a realm of the dead overnight. The living perished as their souls were ripped from their bodies, leaving restless spirits and berserk puppets to roam within its borders; overnight, the former tourist haven became a haunted, accursed land shunned by all.</p>
                        <h4><span>◈ Living Puppets</span>A secret method of puppet-crafting passed down among the Magical Puppeteers of Papusa, in which a living being is directly crafted into a puppet while still alive so as to preserve every physical trait from their life—from their appearance and bloodline power to the skills honed during their lifetime—thereby allowing the puppet to serve as a perfect vessel for their soul in the future, so they may be reborn and exist forevermore in an undying, imperishable puppet form.</h4>
                        `,
                        chars: [
                            { id: "fantasy-dorothea", name: "Dorothea" }
                        ]
                    }
                ]
            },
            {
                regionName: "西國",
                regionName_en: "The West",
                kingdoms: [
                    {
                        name: "Apopys",
                        name_en: "Apopys",
                        eras: [
                            {
                                era: "王國時期",
                                era_en: "Kingdom Era",
                                desc: `
                                <h4><span>◈ 首都</span>Epep</h4>
                                <h4><span>◈ 氣候</span>全境皆為溫帶氣候</h4>
                                <h4><span>◈ 政體</span>封建世襲君主制</h4>
                                <p>王國初期，Apopys 是以農業建國的王國，儘管土地貧瘠，然種出的特殊作物卻能以奢侈品的名目賣至國外，為王國帶來不小的財富，使其得以透過土地併購的方式，緩慢的擴展國土面積範圍，逐步的成為大陸西方國力最為強大的國度。</p>
                                <p>然王國的強盛並不代表全體國民的富裕，權貴將資源與財富緊攥手中，吝於分享，並立下魔法為貴族特權的法律，以及觸碰科學即為死罪的規則。國內的貧富差距因此逐年增加，民怨也在年年嚴重的壓榨與剝削中不斷累積，最終導致民眾的起義以及王權的隕落。</p>
                                `,
                                desc_en: `
                                <h4><span>◈ Capital</span>Epep</h4>
                                <h4><span>◈ Climate</span>Temperate across the entire realm</h4>
                                <h4><span>◈ Government</span>Feudal Hereditary Monarchy</h4>
                                <p>In its early days, Apopys was founded as an agrarian kingdom. Despite its barren soil, the special crops it cultivated could be sold abroad as luxury goods, bringing considerable wealth to the realm and enabling it to slowly expand its territory through land acquisitions, gradually becoming the most powerful kingdom in the western reaches of the continent.</p>
                                <p>Yet the kingdom's strength did not mean prosperity for all its citizens. Those in power tightly monopolized resources and wealth, refusing to share them, while enacting laws that made magic a privilege reserved for the nobility and delving into science a capital offense. Consequently, the domestic wealth gap widened year by year, and public resentment mounted under relentless oppression and exploitation, ultimately culminating in a popular uprising and the fall of the crown.</p>
                                `,
                                chars: []
                            },
                            {
                                era: "共和國時期",
                                era_en: "Republic Era",
                                desc: `
                                <h4><span>◈ 首都</span>Centrumundi</h4>
                                <h4><span>◈ 氣候</span>溫帶氣候為主</h4>
                                <h4><span>◈ 政體</span>軍事寡頭制</h4>
                                <p>盛怒的民眾絞死了權貴與王室，然強烈的情緒卻還未宣洩完畢，民眾將曾經壓迫他們的魔法視為異端邪法，更將比人類還精通魔法的奇幻物種一律視為這個世界的錯誤，展開所謂『糾錯』的狂熱潮。</p>
                                <p>利用群眾非理性的衝動，一群懷抱野心的軍事家上位篡國。他們組織零散的民眾，刻意加深其對魔法還有奇幻物種的仇恨，並推廣科學，宣揚觸碰科學之所以被王權視為死罪，是因為科學乃魔法的剋星，利用仇恨心理讓民眾研究科學並發明許多劃時代的科學兵器，以達成快速擴展軍備實力的目標。</p>
                                <p>隨著國內的奇幻物種幾乎被殺盡，軍事寡頭們號召民眾從軍，以『正義』之名行『糾錯』之舉，實則展開對他國的侵略行徑。大陸西方的小國實力皆比不上 Apopys，古老而落後的大陸北方諸國亦非 Apopys 敵手，很快便全數被 Apopys 征服。</p>
                                <p>然本該成為遏止 Apopys 繼續侵略行徑的大陸東方強權，也是當時全大陸最強大的國度 Nemses 在一夜之間的毀滅，使 Apopys 的野心與自信心得到極大的激勵，絲毫不將雖繁盛卻毫不團結的大陸南方諸國放在眼中，毫無憚忌地揮軍展開南侵。</p>
                                <p>此舉卻將 Apopys 拖入意想不到的情境中，南方諸國結成的『南方聯合防禦戰線』削減了 Apopys 的侵略氣燄，更將其拖入數十年的長期戰爭泥沼中。國庫近乎全投入軍事中的 Apopys 根本無暇顧及民生，長久的戰事讓這問題越發明顯，民怨再起。</p>
                                <p>為鎮壓內亂，Apopys 的南侵腳步不得不放緩，儘管仍在最後關頭攻破『南方聯合防禦戰線』，隨後要面對的卻是已然完全重整旗鼓的 Elenveka，最終 Apopys 的國力徹底被戰爭拖垮並敗亡於 Elenveka。</p>
                                <h4><span>◈ 奇幻物種獵殺狂潮</span>始於民間的仇恨心理，後被 Apopys 軍方利用與煽動，成為席捲大陸西方與北方的風潮，直至 Apopys 亡國方才終結。狂潮期間，大量奇幻物種被捕捉並被公開行刑或是殘忍私刑殺害，部份被視為私產或奴隸對待，導致最終狂潮結束後，大陸上的奇幻物種幾乎絕跡，其中大半是被殺害，殘存者也多數不敢再輕易接近人類而隱去蹤跡。</h4>
                                `,
                                desc_en: `
                                <h4><span>◈ Capital</span>Centrumundi</h4>
                                <h4><span>◈ Climate</span>Predominantly temperate</h4>
                                <h4><span>◈ Government</span>Military Oligarchy</h4>
                                <p>The enraged populace hanged the nobility and the royal family, yet their fierce emotions were far from spent. Viewing the magic that had once oppressed them as heretical sorcery, the people branded all fantastical species—who were even more adept at magic than humans—as errors in this world, unleashing a fanatical wave of so-called 'Correction'.</p>
                                <p>Exploiting the irrational impulses of the masses, a group of ambitious militarists rose to power and usurped the state. Organizing the scattered populace, they deliberately deepened hatred toward magic and fantastical species while promoting science—proclaiming that delving into science had been made a capital offense by the crown precisely because science was the natural counter to magic. Weaponizing this hatred, they mobilized the populace to pursue scientific research and invent numerous revolutionary scientific weapons in order to rapidly expand their military might.</p>
                                <p>Once the fantastical species within their borders had been almost entirely slaughtered, the military oligarchs rallied the populace to enlist, carrying out 'Correction' in the name of 'justice' while in truth waging wars of aggression against other nations. None of the minor realms in the west could match Apopys in strength, nor were the ancient and backward kingdoms of the north any match for it; before long, all were conquered by Apopys.</p>
                                <p>Meanwhile, the overnight destruction of Nemses—the eastern superpower and strongest nation on the continent that should have deterred Apopys's further aggression—greatly emboldened Apopys's ambition and confidence. Dismissing the prosperous yet fractured realms of the south entirely, Apopys marched south without hesitation.</p>
                                <p>Yet this move dragged Apopys into an unforeseen predicament. The 'Southern United Defense Front' formed by the southern realms blunted Apopys's aggressive momentum and pulled it into a decades-long quagmire of war. With its treasury poured almost entirely into the military, Apopys had no capacity to care for the livelihood of its people—a problem that grew ever more glaring as the war dragged on, sparking public resentment once more.</p>
                                <p>To suppress domestic unrest, Apopys was forced to slow its southern advance. Though it still managed to break through the 'Southern United Defense Front' at the very last moment, it was immediately confronted by a fully revitalized Elenveka; in the end, Apopys's national strength was utterly exhausted by war, and it was defeated and destroyed by Elenveka.</p>
                                <h4><span>◈ The Great Hunt of Fantastical Species</span>A hunting frenzy born from popular hatred and subsequently exploited and stoked by the Apopys military, sweeping across the western and northern reaches of the continent until it finally ended with the fall of Apopys. During the frenzy, vast numbers of fantastical species were captured and subjected to public executions or brutal lynchings, with some treated as private property or slaves. By the time it ended, fantastical species had been driven nearly to extinction across the continent—most having been slaughtered, while the majority of the survivors vanished into hiding, no longer daring to readily approach humans.</h4>
                                `,
                                chars: [
                                    { id: "fantasy-nemany", name: "Nemany" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        // 4. 【萬象群生】內容 (分為「群生 beings」與「萬象 phenomena」雙卷)
        lore: {
            beings: [
                {
                    name: "人類",
                    subtitle: "Human",
                    desc: `
                    <h4><span>◈ 分佈</span>大陸全域，隨處可見</h4>
                    <p>一切的基石，一切的源點。</p>
                    `,
                    desc_en: `
                    <h4><span>◈ Distribution</span>Widespread throughout the entire continent; a common sight</h4>
                    <p>The cornerstone of all things; the origin of all.</p>
                    `,
                    chars: [
                        { id: "fantasy-lybis", name: "Lybis" },
                        { id: "fantasy-colby", name: "Colby" },
                        { id: "fantasy-caroline", name: "Caroline" },
                        { id: "fantasy-nemany", name: "Nemany" },
                        { id: "fantasy-shano-and-ray", name: "Ray" },
                        { id: "fantasy-julian-fang", name: "方半夏" },
                        { id: "fantasy-rosalind-fang", name: "方紅綾" },
                        { id: "fantasy-lucero", name: "Lucero" },
                        { id: "fantasy-super-nude-apron", name: "超級 ⛤ 裸體圍裙 ～♡" }
                    ]
                },
                {
                    name: "北地精靈",
                    subtitle: "Boreal Elf",
                    desc: `
                    <h4><span>◈ 主支</span>精靈</h4>
                    <h4><span>◈ 分佈</span>主要現蹤於北方雪原覆蓋處，在奇幻物種獵殺狂潮後數量銳減，近乎絕跡，謠傳在極地的群山冰川處還有可能瞧見其蹤影</h4>
                    <p>被視為所有精靈的源點，能夠使用冰雪系的魔法，因此也被稱作冰雪精靈。其中純血個體擁有淺淡髮色與藍色系瞳孔。</p>
                    `,
                    desc_en: `
                    <h4><span>◈ Lineage</span>Elf</h4>
                    <h4><span>◈ Distribution</span>Primarily sighted across the snow-covered expanses of the north. Following the great hunting frenzy against fantastical species, their numbers plummeted to the brink of extinction, though rumors persist that a few may still survive among the polar mountains and glaciers</h4>
                    <p>Regarded as the origin of all elves. Capable of wielding ice and snow magic, they are also known as Ice Elves. Pureblooded individuals possess pale hair and eyes in shades of blue.</p>
                    `,
                    chars: [
                        { id: "fantasy-boreuse", name: "Boreuse" },
                        { id: "fantasy-surya-and-chandra", name: "Surya" }
                    ]
                },
                {
                    name: "熾血精靈",
                    subtitle: "Blazeblooded Elf",
                    desc: `
                    <h4><span>◈ 主支</span>精靈</h4>
                    <h4><span>◈ 分佈</span>主要現蹤於群島，偶有零星漂流至大陸的個體出現於大陸南方</h4>
                    <p>被視為北地精靈與龍種混血後的族裔，擁有強健的肉體與赤紅色的蛇瞳，但多數個體因此喪失使用魔法的能力。</p>
                    `,
                    desc_en: `
                    <h4><span>◈ Lineage</span>Elf</h4>
                    <h4><span>◈ Distribution</span>Primarily sighted across the archipelago, with occasional stray individuals drifting ashore in the southern reaches of the continent</h4>
                    <p>Regarded as having descended from the mingling of Boreal Elf and dragonkind bloodlines. This mixed heritage grants them robust physiques and crimson, serpent-like eyes, though most have consequently lost the ability to wield magic.</p>
                    `,
                    chars: [
                        { id: "fantasy-surya-and-chandra", name: "Chandra" }
                    ]
                },
                {
                    name: "食腐女妖",
                    subtitle: "Carrion Banshee",
                    desc: `
                    <h4><span>◈ 主支</span>精靈</h4>
                    <h4><span>◈ 分佈</span>遊牧於墓地與古戰場之間，已近乎被獵殺殆盡，於大陸南方較容易見著其身影</h4>
                    <p>被視為熾血精靈受到詛咒污染後的族裔，失去強健的肉體與赤紅色的蛇瞳，瞳色轉變成橘紅色，飲食上偏愛腐食與鮮血，畏光。</p>
                    <p>食腐女妖只有女性，也只會誕下女性的後代，因此食腐女妖會誘捕外族男性來進行強制繁衍。</p>
                    `,
                    desc_en: `
                    <h4><span>◈ Lineage</span>Elf</h4>
                    <h4><span>◈ Distribution</span>Wandering between graveyards and ancient battlefields, they have been hunted nearly to extinction, though they are more commonly encountered in the southern reaches of the continent</h4>
                    <p>Regarded as a lineage of Blazeblooded Elves tainted by curses. They have lost the robust physiques of their ancestors, and their crimson, serpent-like eyes have shifted to an orange-red hue. They favor carrion and fresh blood in their diet, and are sensitive to light.</p>
                    <p>Carrion Banshees are exclusively female and bear only female offspring; consequently, they lure and abduct males of other races, forcing them to sire their young.</p>
                    `,
                    chars: [
                        { id: "fantasy-eluas", name: "Eluas" }
                    ]
                },
                {
                    name: "元初古龍",
                    subtitle: "Primordial Dragon",
                    desc: `
                    <h4><span>◈ 主支</span>龍種？</h4>
                    <h4><span>◈ 分佈</span>謠傳近乎全數滅絕，還活著的則沉眠於地底深處</h4>
                    <p>神話中模糊的記載著牠們是純血龍的『母親』，並且當牠們重回地面上時，將是這片大地已經迎接終結之後的事。</p>
                    `,
                    desc_en: `
                    <h4><span>◈ Lineage</span>Dragonkind?</h4>
                    <h4><span>◈ Distribution</span>Rumored to be nearly extinct, with any surviving individuals said to slumber in the deepest reaches beneath the earth</h4>
                    <p>Myths speak of them only vaguely as the 'mothers' of True Dragons, and foretell that they will not return to the surface until this land has met its end.</p>
                    `,
                    chars: []
                },
                {
                    name: "純血龍",
                    subtitle: "True Dragon",
                    desc: `
                    <h4><span>◈ 主支</span>龍種？</h4>
                    <h4><span>◈ 分佈</span>於屠龍時代幾乎被獵殺殆盡，然謠傳仍有零星的個體潛藏於世間</h4>
                    <p>神話中他們是會移動的災厄，他們是擁有智慧的天災，他們懷揣著無盡的恨意與忿懟，沒有對話與和解的可能性，與先民殊死相殺，直至其中一方率先滅絕。</p>
                    `,
                    desc_en: `
                    <h4><span>◈ Lineage</span>Dragonkind?</h4>
                    <h4><span>◈ Distribution</span>Hunted nearly to extinction during the Dragon-Slaying Era, though rumors persist that a few scattered individuals still lurk in the world</h4>
                    <p>In myth, they are walking calamities and sentient natural disasters. Harboring boundless hatred and rancor, there could be no dialogue or reconciliation with them; they were locked in a fight to the death with the forebears until one side was driven to extinction.</p>
                    `,
                    chars: []
                },
                {
                    name: "龍族",
                    subtitle: "Dragonborn",
                    desc: `
                    <h4><span>◈ 主支</span>龍種</h4>
                    <h4><span>◈ 分佈</span>個體數量極度稀少，極難尋得其蹤跡</h4>
                    <p>外貌必擁有龍的特徵，體格強健、魔法天賦特出且皆有獨屬的權能。於現存所有物種中，是立於最頂點的存在。</p>
                    `,
                    desc_en: `
                    <h4><span>◈ Lineage</span>Dragonkind</h4>
                    <h4><span>◈ Distribution</span>Extremely rare, and seldom encountered</h4>
                    <p>Every individual bears unmistakable draconic features and possesses a formidable physique, exceptional magical aptitude, and a unique authority of their own. Among all extant species, they stand at the absolute apex.</p>
                    `,
                    chars: [
                        { id: "fantasy-wumei", name: "寤寐" },
                        { id: "fantasy-yiyu", name: "易與" }
                    ]
                },
                {
                    name: "龍血族",
                    subtitle: "Dragonblooded",
                    desc: `
                    <h4><span>◈ 主支</span>龍種</h4>
                    <h4><span>◈ 分佈</span>個體數量不算少見，然可遇不可求</h4>
                    <p>僅擁有龍的部份特性，外貌亦非必擁有龍的特徵，通常體格強健或是魔法天賦特出。多為人造產物或是返祖個體，少有組織化傳承的血脈群體。</p>
                    <p>廣義來說，含有龍種血脈都該算作龍血族，然實際上採用狹義定義，即除了含有龍種血脈此一條件外，龍種血脈還必須是該個體的唯一顯性血脈，才會被視作龍血族。</p>
                    `,
                    desc_en: `
                    <h4><span>◈ Lineage</span>Dragonkind</h4>
                    <h4><span>◈ Distribution</span>Not especially rare, yet seldom encountered except by chance</h4>
                    <p>Possessing only partial draconic traits—and not necessarily bearing draconic features in appearance—they typically boast either a robust physique or exceptional magical aptitude. Most are artificial creations or atavistic individuals, with few belonging to established, hereditary bloodlines.</p>
                    <p>Broadly speaking, anyone carrying draconic blood could be considered Dragonblooded. In practice, however, a narrower definition applies: beyond merely carrying draconic blood, that draconic bloodline must be the individual's sole dominant bloodline for them to be recognized as Dragonblooded.</p>
                    `,
                    chars: [
                        { id: "fantasy-mars", name: "Mars" }
                    ]
                },
                {
                    name: "人造魔法生命體",
                    subtitle: "Artificial Magical Lifeform",
                    desc: `
                    <h4><span>◈ 分佈</span>通常難以得見</h4>
                    <p>經由人手製作出來的生命體，手段可能是透過舊日傳承的遺澤，亦有可能是透過操弄新世界的規則，或是雙管齊下來達成。</p>
                    `,
                    desc_en: `
                    <h4><span>◈ Distribution</span>Rarely encountered</h4>
                    <p>Lifeforms crafted by sentient hands, whether through the legacy inherited from the Old World, the manipulation of the laws of the New World, or a combination of both.</p>
                    `,
                    chars: [
                        { id: "fantasy-dorothea", name: "Dorothea" },
                        { id: "fantasy-shano-and-ray", name: "Shano" },
                        { id: "fantasy-anamor", name: "Anamor" },
                        { id: "fantasy-raymond", name: "Raymond" },
                        { id: "fantasy-surya-and-chandra", name: "Surya & Chandra" },
                        { id: "fantasy-gillamarveo", name: "Gillamarveo" },
                        { id: "fantasy-mauro", name: "Mauro" }
                    ]
                }
            ],
            phenomena: [
                {
                    name: "魔力風暴",
                    subtitle: "Mana Storms",
                    desc: `
                    <p>被廣泛視為成因不明的天災，少部份陰謀論者則認為是人造天災，僅極少數存在知曉魔力風暴的真面目。</p>
                    <p>魔力風暴會發生在大陸的任何角落，時間與地點完全隨機，形式各異，可能是極度強烈的魔法龍捲風、極具破壞性的魔力脈衝、威力巨大的魔法冰雹雨等諸多形態。</p>
                    `,
                    desc_en: `
                    <p>Widely regarded as natural disasters of unknown origin, Mana Storms are suspected by a handful of conspiracy theorists to be man-made calamities, while only a select few know their true nature.</p>
                    <p>Mana Storms can strike anywhere across the continent at entirely unpredictable times and locations. They manifest in a wide variety of forms, ranging from violent magical tornadoes and destructive mana pulses to devastating magical hailstorms.</p>
                    `,
                    chars: []
                }
            ]
        }
    }
};
