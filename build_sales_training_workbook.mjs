import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:/Users/18811/Desktop/摩托车相关/outputs/motorcycle-sales-20260906/摩托车销售车型清单_2026-09-06.xlsx";
const outputDir = "C:/Users/18811/Desktop/摩托车相关/outputs/motorcycle-sales-training-20260906";
const outputPath = `${outputDir}/摩托车销售与官网价格核验手册_2026-09-06.xlsx`;
const verifyDate = "2026-09-06";
const font = "Microsoft YaHei";

const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const sourceSheet = wb.worksheets.getItem("车型总表");
const sourceRows = sourceSheet.getRange("A5:O113").values;

const officialBrandUrl = {
  "本田":"https://www.honda.com.cn/motorcycle.html?type=list",
  "春风":"https://cn.cfmoto.com/motorcycles",
  "无极":"https://www.vogemotor.com/home/",
  "凯越":"https://www.kovemoto.com/",
  "升仕":"https://www.zontes.com/ch/Products/PersonalityCar.aspx",
  "贝纳利":"https://www.benelli.com/",
  "赛科龙":"https://www.cyclonemoto.com/",
  "KTM":"https://www.ktm.com/zh-cn/models.html",
  "宝马":"https://www.bmw-motorrad.com.cn/zh/models/modeloverview.html",
  "铃木":"https://www.globalsuzuki.com/motorcycle/",
  "川崎":"https://www.kawasaki-motors.cn/zh-cn/purchase-tools/compare-vehicles/motorcycle",
  "凯旋":"https://www.triumphmotorcycles.cn/bikes",
  "豪爵":"https://www.haojue.com/products.html",
  "QJMOTOR":"https://www.qjmotor.com/m/carlist.html?type=1",
  "哈雷戴维森":"https://www.harley-davidson.cn/cn/zh/motorcycles/index.html",
  "杜卡迪":"https://www.ducatichina.cn/",
  "雅马哈":"https://www.yamaha-motor.com.cn/mc/",
  "济南铃木":"https://www.qssuzuki.com.cn/",
  "新大洲本田":"https://www.honda-sundiro.com/index/product/product_fuel.html",
  "五羊本田":"https://www.wuyang-honda.com/home/cpzs/ryj/index.shtml",
  "三阳SYM":"https://www.xsmt.com/",
  "光阳":"https://www.kymco.com.cn/",
  "VESPA":"https://www.vespa.com/cn_ZH/",
  "比亚乔":"https://www.piaggio.com/cn_ZH/"
};

const verified = new Map();
const put = (brand, model, low, high, url, basis="官网现行建议零售价") => verified.set(`${brand}|${model}`, { low, high, url, basis, status:"官网价格已确认" });
const historical = (brand, model, low, high, url, basis) => verified.set(`${brand}|${model}`, { low, high, url, basis, status:"官网历史发布价，年款需复核" });

put("本田","NX500",31480,34480,"https://www.honda.com.cn/news/1419.html");
put("本田","CBR500R",32480,35480,"https://www.honda.com.cn/news/1419.html");
put("本田","CBR500R FOUR",44980,44980,"https://www.honda.com.cn/news/1419.html");
put("本田","NSS350",40880,40980,"https://www.honda.com.cn/news/1419.html");
put("本田","ADV350",42380,42480,"https://www.honda.com.cn/news/1419.html");
historical("本田","CBR650R",82800,82800,"https://www.honda.com.cn/news/20240913.html","Honda官网2024款发布价");
historical("本田","CRF1100L Africa Twin",185800,185800,"https://www.honda.com.cn/news/20240517.html","Honda官网2024款Adventure Sports ES发布价");

put("春风","450MT",32580,32580,"https://cn.cfmoto.com/motorcycles/450MT");
put("春风","700MT",33680,33680,"https://cn.cfmoto.com/motorcycles/700MT");
put("春风","800MT-X",53680,53680,"https://cn.cfmoto.com/motorcycles/800MT-X");
put("春风","1000MT-X",59680,59680,"https://cn.cfmoto.com/motorcycles/1000mt-x");
put("春风","250CL-C",14980,14980,"https://cn.cfmoto.com/motorcycles/250CL-C");
put("春风","450CL-C",21980,24380,"https://cn.cfmoto.com/motorcycles/450CL-C","官网手动/AMT/单座版价格区间");
put("春风","250SR",15980,18580,"https://cn.cfmoto.com/motorcycles/250sr","官网FUN版/单摇臂版价格区间");
put("春风","450SR",23980,27980,"https://cn.cfmoto.com/motorcycles/450SR","官网450SR/450SR-S价格区间");
put("春风","500SR",28980,28980,"https://cn.cfmoto.com/motorcycles/500sr");
put("春风","675SR-R",39580,39580,"https://cn.cfmoto.com/motorcycles/675SR-R");
put("春风","750SR-S",44980,44980,"https://cn.cfmoto.com/motorcycles/750SR-S");

put("豪爵","TR300",21980,23280,"https://www.haojue.com/TR300/jiage.html","官网都市版/旅行版建议零售价");
put("豪爵","AFR125",8980,10970,"https://www.haojue.com/AFR125/jiage.html","官网一口价/版本区间");
put("豪爵","UHR150",13780,14680,"https://www.haojue.com/2026UHR150/jiage.html","官网2026升级款扶手版/气囊减振尾箱版");
put("豪爵","UFR150",16680,17380,"https://www.haojue.com/UFR1504ValvesVVL/jiage.html","官网四气门VVL扶手版/箱杠版");
put("豪爵","旅行者 TVL350",28980,29980,"https://www.haojue.com/TVL350/jiage.html","官网扶手版/箱杠版");

put("川崎","Versys 650",79800,79800,"https://www.kawasaki-motors.cn/zh-cn/motorcycle/versys/adventure-touring/versys-650/2026-versys-650");
put("川崎","Eliminator 500",42800,48800,"https://www.kawasaki-motors.cn/zh-cn/motorcycle/eliminator/street-cruiser/eliminator","官网当前页面各版本价格区间");
put("川崎","Vulcan S",69800,69800,"https://www.kawasaki-motors.cn/zh-cn/motorcycle/vulcan/sport-cruiser/vulcan-s/2026-vulcan-s");
put("川崎","Ninja 500",45800,49800,"https://www.kawasaki-motors.cn/zh-cn/motorcycle/ninja/sport/ninja-500","官网标准/SE版本区间");
put("川崎","Ninja ZX-4R",59800,64800,"https://www.kawasaki-motors.cn/zh-cn/motorcycle/ninja/supersport/ninja-zx-4r","官网2026 ZX-4R/ZX-4RR价格区间");
put("川崎","Ninja ZX-6R",109800,109800,"https://www.kawasaki-motors.cn/zh-cn/motorcycle/ninja/supersport/ninja-zx-6r/2026-ninja-zx-6r");
put("川崎","Ninja ZX-10R",199800,199800,"https://www.kawasaki-motors.cn/zh-cn/motorcycle/ninja/supersport/ninja-zx-10r/2026-ninja-zx-10r");

put("宝马","F 800 GS",99900,99900,"https://www.bmw-motorrad.com.cn/zh/models/adventure/f800gs.html","官网厂商建议零售价起");
put("宝马","R 1300 GS",225900,225900,"https://www.bmw-motorrad.com.cn/zh/models/adventure/r1300gs.html","官网厂商建议零售价起");
put("宝马","S 1000 RR",249900,249900,"https://www.bmw-motorrad.com.cn/zh/models/sport/s1000rr.html","官网厂商建议零售价起");

put("凯旋","Tiger 900",99900,139900,"https://www.triumphmotorcycles.cn/bikes/adventure/tiger-900/models","官网GT/Rally Pro含税起售价区间");
put("五羊本田","NWT150",14980,null,"https://www.wuyang-honda.com/home/cpzs/ryj/tbj/detail-1632.shtml","官网建议零售价起");
put("五羊本田","NWG150",16180,null,"https://www.wuyang-honda.com/home/cpzs/ryj/tbj/detail-1731.shtml","官网建议零售价起");
put("新大洲本田","NS125LA",10480,12980,"https://www.honda-sundiro.com/product_details/NS125LA_2025MY_94.html","官网2025款CBS/ABS版本区间");
put("新大洲本田","NS150GX",15980,17480,"https://www.honda-sundiro.com/product_details/NS150GX_99.html","官网标准/高配及魅力版区间");
put("QJMOTOR","鸿250ADV",15999,15999,"https://www.qjmotor.com/car.html?id=98","官网动态车型页官方指导价");
put("杜卡迪","Panigale V4",239900,299900,"https://www.ducatichina.cn/news/panigale-v4-v4s-officially-price-announced","官网V4/V4 S建议零售价");

function priceText(low, high) {
  if (low == null) return "—";
  if (high == null) return `¥${Number(low).toLocaleString("zh-CN")}起`;
  return low === high ? `¥${Number(low).toLocaleString("zh-CN")}` : `¥${Number(low).toLocaleString("zh-CN")}–¥${Number(high).toLocaleString("zh-CN")}`;
}
function differenceText(cLow, cHigh, o) {
  if (!o || o.low == null) return "原价格仅作渠道参考；报价前电话/系统复核门店年款、颜色、库存与活动。";
  if (o.high == null) return `官网只公开${priceText(o.low, null)}；原渠道区间${priceText(cLow,cHigh)}，高配价需门店确认。`;
  if (Number(cLow) === Number(o.low) && Number(cHigh) === Number(o.high)) return "与原清单一致。";
  return `官网${priceText(o.low,o.high)}；原渠道${priceText(cLow,cHigh)}。以官网现行页面和门店书面报价为准。`;
}

const auditRows = sourceRows.map((r) => {
  const [idx, category, brand, model, cc, cLow, cHigh, basis,,,,,,channelUrl] = r;
  const o = verified.get(`${brand}|${model}`);
  const status = o?.status ?? "官网未检出可公开读取的现行售价";
  return [idx, category, brand, model, cc, cLow, cHigh, o?.low ?? null, o?.high ?? null, status, o?.basis ?? "保留原渠道参考价；成交前向授权门店复核", o?.url ?? officialBrandUrl[brand] ?? "", channelUrl, differenceText(cLow,cHigh,o), verifyDate];
});

const confirmedCount = auditRows.filter(r => r[9] === "官网价格已确认").length;
const historicalCount = auditRows.filter(r => r[9].startsWith("官网历史")).length;
const unpublishedCount = auditRows.length - confirmedCount - historicalCount;

const audit = wb.worksheets.add("官网核验明细");
audit.showGridLines = false;
audit.getRange("A1:O1").merge();
audit.getRange("A1").values = [["109款车型 · 官网价格核验明细"]];
audit.getRange("A2:O2").merge();
audit.getRange("A2").values = [[`核验日期：${verifyDate}。官网明确展示人民币建议零售价才计为“已确认”；官网无公开价时保留渠道参考，不视为官方报价。`]];
const auditHeaders = ["序号","品类","品牌","车型","排量(cc)","渠道参考下限","渠道参考上限","官网价下限","官网价上限","官网核验状态","官网价格口径","官网URL","原渠道URL","差异/报价提示","核验日期"];
audit.getRange("A4:O4").values = [auditHeaders];
audit.getRange(`A5:O${4+auditRows.length}`).values = auditRows;
const auditTable = audit.tables.add(`A4:O${4+auditRows.length}`, true, "OfficialPriceAuditTable");
auditTable.style = "TableStyleMedium2";
audit.freezePanes.freezeRows(4); audit.freezePanes.freezeColumns(4);
audit.getRange(`E5:I${4+auditRows.length}`).format.numberFormat = "#,##0";
audit.getRange(`F5:I${4+auditRows.length}`).setNumberFormat('¥#,##0');
audit.getRange(`A4:O4`).format = { fill:"#1F4E78", font:{name:font,bold:true,color:"#FFFFFF"}, horizontalAlignment:"center", verticalAlignment:"center", wrapText:true };
audit.getRange(`A1`).format.font = {name:font,size:17,bold:true,color:"#102A43"};
audit.getRange(`A2`).format.font = {name:font,size:9,italic:true,color:"#64748B"};
audit.getRange(`A5:O${4+auditRows.length}`).format = {font:{name:font,size:9,color:"#1F2937"},verticalAlignment:"top"};
audit.getRange(`J5:O${4+auditRows.length}`).format.wrapText = true;
audit.getRange(`5:${4+auditRows.length}`).format.rowHeight = 38;
audit.getRange(`J5:J${4+auditRows.length}`).conditionalFormats.add("containsText", {text:"已确认",format:{fill:"#DCFCE7",font:{color:"#166534",bold:true}}});
audit.getRange(`J5:J${4+auditRows.length}`).conditionalFormats.add("containsText", {text:"历史",format:{fill:"#FEF3C7",font:{color:"#92400E",bold:true}}});
audit.getRange(`J5:J${4+auditRows.length}`).conditionalFormats.add("containsText", {text:"未检出",format:{fill:"#FEE2E2",font:{color:"#991B1B",bold:true}}});
for (const [col,w] of [["A:A",7],["B:B",9],["C:C",13],["D:D",24],["E:I",14],["J:J",25],["K:K",30],["L:M",48],["N:N",48],["O:O",13]]) audit.getRange(col).format.columnWidth=w;
audit.getRange("1:4").format.rowHeight=25;

const summary = wb.worksheets.add("官网核验汇总");
summary.showGridLines=false;
summary.getRange("A1:G1").merge(); summary.getRange("A1").values=[["官网价格核验汇总与报价规则"]];
summary.getRange("A2:G2").merge(); summary.getRange("A2").values=[[`共 ${auditRows.length} 款：官网现行价已确认 ${confirmedCount} 款；官网历史发布价 ${historicalCount} 款；官网未公开/未稳定读取 ${unpublishedCount} 款。`]];
summary.getRange("A4:C4").values=[["核验状态","数量","销售动作"]];
summary.getRange("A5:C7").values=[
  ["官网价格已确认",confirmedCount,"可引用官网建议零售价；仍需复核门店库存、年款、颜色、活动与落地费用。"],
  ["官网历史发布价，年款需复核",historicalCount,"只能说明历史官方发布；必须确认当前年款和门店书面报价。"],
  ["官网未检出可公开读取的现行售价",unpublishedCount,"不得称为官网价；保留渠道参考，向授权门店/品牌系统核价。"]
];
summary.getRange("A9:G9").merge(); summary.getRange("A9").values=[["新人报价四步"]];
summary.getRange("A10:G14").values=[
  ["1","确认车型","年款、版本、颜色、是否现车","说法","先确认是哪个版本，再谈价格。",null,null],
  ["2","拆开四价","官网指导价、门店成交价、活动价、落地总价","说法","我把四个口径分开写，避免后面出现理解差异。",null,null],
  ["3","列落地项","购置税适用、交强险/商业险、上牌、精品、金融成本","说法","裸车价不是最终支出，我给您看完整总成本。",null,null],
  ["4","写有效期","库存/VIN、政策截止日、交车条件、赠品明细","说法","这份报价有效到×日，变化项我会提前说明。",null,null],
  ["底线","不得承诺","不说最低价、绝对安全、零故障、必保值、肯定质保","替代","说可核实事实，给官网/工单/书面报价。",null,null]
];
summary.getRange("A16:G16").merge(); summary.getRange("A16").values=[["重点官网入口（可直接复制到浏览器）"]];
summary.getRange("A17:C26").values=[
  ["本田","车型与官方发布","https://www.honda.com.cn/motorcycle.html?type=list"],
  ["春风","车型页直接标价","https://cn.cfmoto.com/motorcycles"],
  ["豪爵","配置与价格","https://www.haojue.com/products.html"],
  ["川崎","车型对比与建议零售价","https://www.kawasaki-motors.cn/zh-cn/purchase-tools/compare-vehicles/motorcycle"],
  ["宝马","全部车型与起售价","https://www.bmw-motorrad.com.cn/zh/models/modeloverview.html"],
  ["凯旋","车型与含税建议价","https://www.triumphmotorcycles.cn/bikes"],
  ["五羊本田","燃油踏板车型","https://www.wuyang-honda.com/home/cpzs/ryj/index.shtml"],
  ["新大洲本田","燃油车型","https://www.honda-sundiro.com/index/product/product_fuel.html"],
  ["杜卡迪","中国车型/新闻","https://www.ducatichina.cn/"],
  ["其余品牌","见“官网核验明细”逐车URL","成交前使用授权门店系统复核"]
];
summary.getRange("A1:G30").format.font={name:font,size:10,color:"#1F2937"};
summary.getRange("A1").format.font={name:font,size:17,bold:true,color:"#102A43"};
summary.getRange("A4:C4").format={fill:"#1F4E78",font:{name:font,bold:true,color:"#fff"},horizontalAlignment:"center"};
summary.getRange("A9:G9").format={fill:"#DCEAF7",font:{name:font,bold:true,color:"#102A43"}};
summary.getRange("A16:G16").format={fill:"#DCEAF7",font:{name:font,bold:true,color:"#102A43"}};
summary.getRange("A2:G26").format.wrapText=true;
summary.getRange("5:7").format.rowHeight=36; summary.getRange("10:14").format.rowHeight=34; summary.getRange("17:26").format.rowHeight=30;
for (const [col,w] of [["A:A",14],["B:B",18],["C:C",60],["D:D",12],["E:E",56],["F:G",12]]) summary.getRange(col).format.columnWidth=w;

const knowledge = wb.worksheets.add("车型与排量速记");
knowledge.showGridLines=false;
knowledge.getRange("A1:G1").merge(); knowledge.getRange("A1").values=[["车型与排量：新人销售速记"]];
knowledge.getRange("A2:G2").merge(); knowledge.getRange("A2").values=[["排量不是难度的唯一指标；车重、重心、座高、油门响应、转向角和骑姿同样决定新手友好度。"]];
knowledge.getRange("A4:G4").values=[["分类/排量","典型用途","客户收益","必须确认","容易踩坑","不适合优先推荐给","关键首问"]];
knowledge.getRange("A5:G12").values=[
  ["ADV","通勤+摩旅+轻度非铺装","视野高、续航/装载空间好","座高、满油车重、重心、19/21寸轮、三箱双载","只看外观和排量；忽略原地挪车","身高/力量不足且不愿试坐；纯市区窄路","铺装、碎石、泥地各占多少？双载和三箱是刚需吗？"],
  ["巡航","城市休闲、短途巡游、风格表达","座高低、坐姿舒展、造型强","轴距、前伸脚踏、转弯半径、后座和后减震","把低座等同于轻松；忽略整备质量","频繁掉头窄巷、重度通勤且怕车重","更看重低座、双载舒适，还是品牌和声浪？"],
  ["仿赛","跑山、运动通勤、赛道体验","操控直接、外形战斗、风阻小","手腕腰背、转向角、热量、壳件与保险成本","先讲极速马力，没问骑姿接受度","每天拥堵通勤且腰腕敏感的新手","通勤、跑山、赛道各占多少？能接受前倾骑姿吗？"],
  ["踏板","城市通勤、买菜接娃、中短途","自动挡、储物强、上手快","平踏/龙骨、轮径、座桶、风挡、皮带保养","把好骑说成绝对安全；忽略小轮颠簸","长距离高速且要求强非铺装能力","每天几公里？要放全盔、载人、带货或跑快速路吗？"],
  ["≤150cc","高频通勤、短距离代步","油耗/税费/维护通常较低","制动配置、轮胎、坐姿、载重","“小排量就不会危险”","长期高速、重载双载","每天里程、最高常用速度和载重是多少？"],
  ["250–400cc","入门玩乐、近郊、轻摩旅","动力余量与可控性较平衡","整备质量、油门、离合、座高","只按cc判断新手友好","完全无骑行基础又拒绝培训","是否骑过挡车？原地挪车能否稳定控制？"],
  ["450–700cc","进阶摩旅、跑山、高速","中高速余量、双载能力更强","热量、轮胎/保险/保养成本、电控","只卖参数，不算长期成本","预算只够买车、不够装备和维护","一年预计里程？能接受每年轮胎保养保险开销吗？"],
  ["800cc+","旗舰体验、长途、性能/品牌升级","动力、配置、品牌体验","重量、热量、停车挪车、维修件周期","因预算高就直接推大排","新手、空间受限、维护预算不足","为什么需要800+？哪项需求是中排量满足不了的？"]
];
knowledge.getRange("A1:G20").format.font={name:font,size:10,color:"#1F2937"};
knowledge.getRange("A1").format.font={name:font,size:17,bold:true,color:"#102A43"};
knowledge.getRange("A4:G4").format={fill:"#1F4E78",font:{name:font,bold:true,color:"#fff"},wrapText:true,horizontalAlignment:"center"};
knowledge.getRange("A5:G12").format={wrapText:true,verticalAlignment:"top"};
knowledge.getRange("5:12").format.rowHeight=56;
for (const [c,w] of [["A:A",16],["B:B",22],["C:C",26],["D:D",34],["E:E",33],["F:F",33],["G:G",42]]) knowledge.getRange(c).format.columnWidth=w;
knowledge.freezePanes.freezeRows(4);

const manual = wb.worksheets.add("新人销售手册");
manual.showGridLines=false;
manual.getRange("A1:F1").merge(); manual.getRange("A1").values=[["新人销售手册：六问、三车、一复核"]];
manual.getRange("A2:F2").merge(); manual.getRange("A2").values=[["目标不是把最大排量卖出去，而是减少买错、退订、投诉和售后扯皮，让客户愿意复购与转介绍。"]];
manual.getRange("A4:F4").values=[["阶段","你的动作","必须问/查","输出物","经验提醒","示例说法"]];
manual.getRange("A5:F17").values=[
  ["迎宾","20秒建立低压力感","今天先看用途还是总预算","客户愿意讲真实需求","不要一上来报最低价或推库存车","您先随便看，我先了解用途和总预算，不急着推排量。"],
  ["需求1","确认使用结构","通勤/跑山/摩旅/双载/赛道占比","主场景+次场景","按80%高频场景选车","如果十次骑行里有八次通勤，我们先把通勤舒服和停车方便守住。"],
  ["需求2","确认总预算","裸车还是含税险牌装备金融成本","价格边界","问月供必须同步总成本和期限","您的预算是裸车，还是希望车、牌、险、护具全部控制在这个数？"],
  ["需求3","确认人车适配","身高腿长、力量、骑龄、旧车","静态试坐记录","身高不是唯一标准，腿长与力量更重要","我们先试坐和原地扶正，脚着地与挪车感受比参数表更诚实。"],
  ["需求4","确认生活需求","双载、储物、车位、充电/油品、路况","硬约束清单","家里反对常来自安全和费用不透明","平时是否载人？要放全盔吗？车位转弯和进出宽度怎样？"],
  ["需求5","确认维护接受度","年里程、保养半径、配件周期、品牌偏好","拥有成本边界","卖前说清维护，售后少争议","除了购车价，您对保险、轮胎和保养的年度预算大约多少？"],
  ["推荐","只给三台形成对比","稳妥/均衡/升级各一台","三车型卡片","每台说明适合与不适合","我给您三台，不是让您选最贵，而是看哪台取舍最符合您。"],
  ["证据","把参数变成体验","座高、车重、储物、骑姿、官网价","可验证证据","不要背配置；让客户坐、扶、看、量","这台低座但不轻，我们实际扶正一次，您再判断是否轻松。"],
  ["试驾","按门店流程核证件护具路线","驾照、签署、车辆检查、路线","试驾记录","试驾不是证明极速，是验证低速与制动信心","重点感受起步、掉头、刹停和热量，先不追求速度。"],
  ["报价","拆开官网/门店/活动/落地","版本、库存、VIN、截止日、赠品","书面报价单","口头优惠最易引发纠纷","官网建议价是×，门店政策是×，落地项目我逐项列给您。"],
  ["异议","复述顾虑→找证据→给下一步","价格/动力/售后/家人顾虑","待解决问题","先处理问题，不急着反驳","您不是单纯嫌贵，是担心多花的钱没有换来长期价值，对吗？"],
  ["成交","复核所有边界","年款颜色、交车日、票据、保修、赠品","签字确认清单","无法确定的写“待确认”","这四项我现在能确认；另外两项我向库管和售后核实后再写进单据。"],
  ["交车/回访","讲安全、首保、故障联络和改装边界","说明书、工具、钥匙、工单渠道","交车清单+3天/30天回访","交车教育决定后续满意度","前三次骑行先熟悉低速和制动；异常先拍视频并联系我建工单。"]
];
manual.getRange("A1:F25").format.font={name:font,size:10,color:"#1F2937"}; manual.getRange("A1").format.font={name:font,size:17,bold:true,color:"#102A43"};
manual.getRange("A4:F4").format={fill:"#1F4E78",font:{name:font,bold:true,color:"#fff"},wrapText:true,horizontalAlignment:"center"}; manual.getRange("A5:F17").format={wrapText:true,verticalAlignment:"top"};
manual.getRange("5:17").format.rowHeight=44;
for (const [c,w] of [["A:A",14],["B:B",25],["C:C",32],["D:D",24],["E:E",34],["F:F",52]]) manual.getRange(c).format.columnWidth=w; manual.freezePanes.freezeRows(4);

const scripts = wb.worksheets.add("聊天话术");
scripts.showGridLines=false; scripts.getRange("A1:E1").merge(); scripts.getRange("A1").values=[["摩托车销售聊天话术：可直接复制，不靠压单"]];
scripts.getRange("A2:E2").merge(); scripts.getRange("A2").values=[["结构：先复述客户真实顾虑，再给证据或体验，最后约一个小步骤。避免贬低竞品和绝对化承诺。"]];
scripts.getRange("A4:E4").values=[["场景","客户常说","推荐回应","下一步","不要说"]];
scripts.getRange("A5:E17").values=[
  ["第一次到店","我就随便看看","没问题，您先看。我只问一个：主要通勤还是周末玩？这样我不拿不相关的车打扰您。","按用途带看2–3台","今天订最便宜"],
  ["新手怕动力不够","250以后会不会后悔","后不后悔不只看排量。先看您80%的路况、车重和油门是否好控，再比较中高速余量。","试坐+低速试驾两台","一步到位上大排"],
  ["只问最低价","最低多少","我可以给实价，但先确认年款、版本、颜色和是否现车。同名车型不同版本差价很大。","出含有效期书面报价","别人都卖不了这个价"],
  ["网上更便宜","平台比你便宜","我们把口径对齐：是否同年款、同版本、含不含运费上牌和赠品。对齐后我再说明门店差异。","逐项对价","网上都是假的"],
  ["纠结两品牌","A和B哪个好","没有脱离用途的绝对更好。您最在意的三项是什么？我按这三项做并列比较，也把各自短板写上。","做三项对比卡","我们品牌肯定最好"],
  ["家人反对","家里觉得危险","这个顾虑合理。我们先把培训、护具、排量、ABS、常用路线和年度费用做成计划，让家人看到风险怎么管理。","邀请家人看车/试坐","骑慢点就绝对安全"],
  ["担心售后","坏了找谁","销售不替技师下结论，但我会负责建工单、把症状整理完整、跟进诊断和时间节点。保修按厂家条款与检测结果执行。","展示售后流程和联系人","肯定免费修"],
  ["车太高/太重","我怕扶不住","先不看数字，我们按满油状态试坐、扶正、倒车和掉头姿势。低座也可能重，高座也可通过座垫与技巧改善。","静态四项测试","身高××一定能骑"],
  ["马上要优惠","今天订有什么","我先把确定的优惠、赠品价值和条件分开写。限时政策我标截止日，不用口头制造紧迫感。","核库存与政策截止日","最后一天，不买就没了"],
  ["分期","月供最低多少","月供之外还要看首付、期限、年化利率/费率、总还款和提前结清条件，我把五项一起算。","提供完整金融披露","一天一杯奶茶钱"],
  ["试驾后犹豫","感觉都差不多","我们只复盘四点：低速、刹停、骑姿、热量。哪一点最影响您每天使用？","对症二次体验","都试了还不订"],
  ["准备成交","我回去想想","可以。我把适合您的理由、需要接受的短板和有效报价发您。您回去只判断：这些短板能不能长期接受。","约明确回访时间","过了今天涨价"],
  ["售后回访","有点异响","先别猜原因。请告诉我冷车还是热车、速度/转速、路面、出现频率、是否改装；能安全拍视频的话一并发我，我马上建记录给技师。","建立工单","这是通病/正常的"]
];
scripts.getRange("A1:E24").format.font={name:font,size:10,color:"#1F2937"}; scripts.getRange("A1").format.font={name:font,size:17,bold:true,color:"#102A43"}; scripts.getRange("A4:E4").format={fill:"#1F4E78",font:{name:font,bold:true,color:"#fff"},wrapText:true,horizontalAlignment:"center"}; scripts.getRange("A5:E17").format={wrapText:true,verticalAlignment:"top"};
scripts.getRange("5:17").format.rowHeight=48;
for (const [c,w] of [["A:A",17],["B:B",24],["C:C",62],["D:D",29],["E:E",28]]) scripts.getRange(c).format.columnWidth=w; scripts.freezePanes.freezeRows(4);

const service = wb.worksheets.add("售后技师沟通");
service.showGridLines=false; service.getRange("A1:F1").merge(); service.getRange("A1").values=[["销售 ↔ 售后技师：故障交接与客户闭环"]];
service.getRange("A2:F2").merge(); service.getRange("A2").values=[["销售的职责是记录事实、组织证据、协调节点和翻译流程；诊断、保修判定与维修方案由技师/厂家按工单作出。"]];
service.getRange("A4:F4").values=[["模块","必须记录","好例子","坏例子","给技师的问题","给客户的回应"]];
service.getRange("A5:F13").values=[
  ["车辆身份","品牌车型/年款/VIN/里程/购车与保养日期","2026款××，VIN后6位123456，1280km，首保完成","那台黑车","需要完整VIN或车架号吗？","我先把车辆身份和保养记录核齐。"],
  ["首次时间","首次出现日期、冷/热车、持续多久","热车20分钟后首次出现，每次约3秒","最近有点问题","是否与温度或骑行时长相关？","我记录首次时间和触发条件，不先判断原因。"],
  ["运行工况","挡位/转速/速度/油门/刹车/路面/载重","2挡3500–4200rpm轻给油，平路单人","一加油就响","需要路试复现哪段工况？","请告诉我出现时速度、转速和操作。"],
  ["现象事实","声音/振动/气味/漏液/故障灯/位置","左前方金属敲击声，约每秒2次，无报码","发动机坏了","是否需要读取故障码/检查紧固件？","目前确认的是声音现象，原因等检测。"],
  ["复现概率","每次/偶发，次数，能否原地复现","10次约出现7次，原地空挡不出现","时有时无","建议先静态检查还是安排路试？","偶发问题也可建工单，我们记录复现概率。"],
  ["变量","改装、摔车、涉水、洗车、油品、近期维修","加装护杠；两周前低速倒车；95号油","什么都没动","哪些改装需先恢复原厂状态？","改装不等于一定相关，但必须如实提供。"],
  ["证据","照片/视频/录音/报码截图/漏点位置","视频含仪表转速、声音和路况，原文件","网上也有人说","视频是否足够，是否要客户到店？","保证安全前提下拍原视频，不边骑边操作手机。"],
  ["工单闭环","工单号/接车人/诊断/方案/配件ETA/回访","工单A123，9/8复检，配件ETA待厂家确认","我帮你问问","何时给初检结果？等待期间能否骑行？","我在×日×时前给您一次明确进展；无进展也说明原因。"],
  ["承诺边界","不判通病、不先承诺质保、不删除不利事实","保修以检测、条款和厂家审批为准","肯定免费/一定没事","保修判定需要哪些证据和审批？","我负责推进，但不越过检测提前承诺结论。"]
];
service.getRange("A15:F15").merge(); service.getRange("A15").values=[["一段可复制的技师交接模板"]];
service.getRange("A16:F19").merge(); service.getRange("A16").values=[["车型/年款：____；VIN后6位：____；里程：____km；保养：____。首次发生：____。工况：冷/热车____分钟，____挡，____rpm，____km/h，操作____，路面____，载重____。现象：位置____，声音/振动/报码____，每10次约____次，能/不能原地复现。近期改装/摔车/涉水/维修：____。证据：照片____、视频____、报码____。请确认：①是否可继续骑行；②需要哪些检查；③何时出初检；④保修/配件流程。"]];
service.getRange("A1:F24").format.font={name:font,size:10,color:"#1F2937"}; service.getRange("A1").format.font={name:font,size:17,bold:true,color:"#102A43"}; service.getRange("A4:F4").format={fill:"#1F4E78",font:{name:font,bold:true,color:"#fff"},wrapText:true,horizontalAlignment:"center"}; service.getRange("A5:F19").format={wrapText:true,verticalAlignment:"top"}; service.getRange("A15:F15").format={fill:"#DCEAF7",font:{name:font,bold:true,color:"#102A43"}}; service.getRange("A16:F19").format.rowHeight=32;
service.getRange("5:13").format.rowHeight=48; service.getRange("16:19").format.rowHeight=38;
for (const [c,w] of [["A:A",15],["B:B",35],["C:C",45],["D:D",25],["E:E",37],["F:F",45]]) service.getRange(c).format.columnWidth=w; service.freezePanes.freezeRows(4);

const mapIndex = wb.worksheets.add("思维导图索引");
mapIndex.showGridLines=false; mapIndex.getRange("A1:D1").merge(); mapIndex.getRange("A1").values=[["摩托车新人销售思维导图"]];
mapIndex.getRange("A3:B9").values=[
  ["高清PNG","C:/Users/18811/Desktop/摩托车相关/diagram/motorcycle-sales-newbie/摩托车新人销售思维导图@2x.png"],
  ["可编辑SVG","C:/Users/18811/Desktop/摩托车相关/diagram/motorcycle-sales-newbie/摩托车新人销售思维导图.svg"],
  ["主干1","车型×排量知识：ADV / 巡航 / 仿赛 / 踏板"],
  ["主干2","六问需求诊断：用途、总预算、身体、储物双载、路况里程、售后偏好"],
  ["主干3","三车阶梯 + 四价分开 + 成交前复核"],
  ["主干4","售后技师沟通：身份、工况、事实、变量、证据、闭环"],
  ["主干5","安全边界：新手不只看cc，诊断前不承诺结论"]
];
mapIndex.getRange("A1:D15").format.font={name:font,size:11,color:"#1F2937"}; mapIndex.getRange("A1").format.font={name:font,size:18,bold:true,color:"#102A43"}; mapIndex.getRange("A3:A9").format={fill:"#DCEAF7",font:{name:font,bold:true,color:"#102A43"}}; mapIndex.getRange("A3:B9").format.wrapText=true; mapIndex.getRange("A:A").format.columnWidth=20; mapIndex.getRange("B:B").format.columnWidth=100;

for (const sh of [audit,summary,knowledge,manual,scripts,service,mapIndex]) {
  sh.getRange("1:2").format.rowHeight=28;
}

await fs.mkdir(`${outputDir}/previews`, {recursive:true});
for (const [sheetName,range,file] of [
  ["官网核验汇总","A1:G26","summary.png"],
  ["官网核验明细","A1:O16","audit.png"],
  ["车型与排量速记","A1:G12","knowledge.png"],
  ["新人销售手册","A1:F17","manual.png"],
  ["聊天话术","A1:E17","scripts.png"],
  ["售后技师沟通","A1:F19","service.png"],
  ["思维导图索引","A1:B9","map-index.png"]
]) {
  const png = await wb.render({sheetName,range,scale:1.1,format:"png"});
  await fs.writeFile(`${outputDir}/previews/${file}`, new Uint8Array(await png.arrayBuffer()));
}

console.log("AUDIT_SAMPLE");
console.log((await wb.inspect({kind:"table",range:"官网核验明细!A1:O14",include:"values,formulas",tableMaxRows:14,tableMaxCols:15})).ndjson);
console.log("MANUAL_SAMPLE");
console.log((await wb.inspect({kind:"table",range:"新人销售手册!A1:F10",include:"values,formulas",tableMaxRows:10,tableMaxCols:6})).ndjson);
console.log("ERROR_SCAN");
console.log((await wb.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",options:{useRegex:true,maxResults:300},summary:"final formula error scan"})).ndjson);

const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(outputPath);
console.log(JSON.stringify({outputPath, rows:auditRows.length, confirmedCount, historicalCount, unpublishedCount}));
