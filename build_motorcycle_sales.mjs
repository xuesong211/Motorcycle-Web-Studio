import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "C:/Users/18811/Desktop/摩托车相关/outputs/motorcycle-sales-20260906";
const outputPath = `${outputDir}/摩托车销售车型清单_2026-09-06.xlsx`;
const fontFamily = "Microsoft YaHei";
const asOf = "2026-09-06";

const urls = {
  hondaOfficial: "https://www.honda.com.cn/news/1419.html",
  hondaList: "https://www.honda.com.cn/motorcycle.html?type=list",
  hondaDb: "https://m.58moto.com/brand/470",
  cfmoto450mt: "https://cn.cfmoto.com/motorcycles/450MT",
  cfmoto700mt: "https://cn.cfmoto.com/motorcycles/700MT",
  cfmoto800mtx: "https://www.cfmoto.com/motorcycles/800MT-X",
  cfmoto1000mtx: "https://cn.cfmoto.com/motorcycles/1000mt-x",
  cfmoto450clc: "https://cn.cfmoto.com/motorcycles/450CL-C",
  cfmoto500sr: "https://cn.cfmoto.com/motorcycles/500sr",
  cfmoto675: "https://cn.cfmoto.com/motorcycles/675SR-R",
  cfmotoDb: "https://m.58moto.com/brand/18",
  voge: "https://m.58moto.com/brand/383",
  kove: "https://m.58moto.com/brand/206",
  zontes: "https://www.zontes.com/ch/Home2/Default.aspx",
  zontes703f: "https://m.58moto.com/news/11915039",
  zontes703rr: "https://m.58moto.com/news/12227551",
  benelli: "https://m.58moto.com/garage/dealer/dealer-salecar/276686",
  cyclone: "https://m.58moto.com/garage/dealer/dealer-salecar/249665",
  ktmAdv: "https://m.58moto.com/garage/detail/6556",
  ktmRc: "https://m.58moto.com/garage/detail/5800?type=news",
  bmw: "https://m.58moto.com/garage/dealer/dealer-salecar/57819",
  suzuki: "https://m.58moto.com/brand/272",
  kawasaki: "https://m.58moto.com/garage/dealer/dealer-salecar/348",
  triumph: "https://m.58moto.com/garage/dealer/dealer-salecar/263172",
  haojue: "https://m.58moto.com/brand/201",
  qjmotor: "https://www.qjmotor.com/",
  qjmotorDb: "https://m.58moto.com/brand/449",
  harley: "https://m.58moto.com/brand/186",
  ducati: "https://m.58moto.com/brand/251",
  yamaha: "https://m.58moto.com/brand/208",
  jnSuzuki: "https://m.58moto.com/news/12364780",
  sundiro: "https://m.58moto.com/news/12383233",
  wuyang: "https://m.58moto.com/news/12448003",
  wuyangNwg: "https://m.58moto.com/news/12148766",
  sym: "https://m.58moto.com/brand/245",
  kymco: "https://m.58moto.com/news/12222001",
  kymcoSt: "https://m.58moto.com/news/12188462",
  vespa: "https://m.58moto.com/brand/280",
  piaggio: "https://m.58moto.com/news/11493932",
};

const models = [];
function add(category, brand, model, cc, low, high, priceBasis, grade, source) {
  const avg = (low + high) / 2;
  const role = avg < 15000 ? "引流" : avg < 40000 ? "主销" : avg < 100000 ? "升级" : "形象";
  let persona = "";
  let pitch = "";
  let question = "";
  if (category === "ADV") {
    persona = avg < 40000 ? "初次摩旅、通勤兼周末出游" : avg < 100000 ? "进阶摩旅、长途和轻度非铺装" : "品牌升级、长途探险和旗舰体验";
    pitch = `${cc}cc级ADV，先用身高、路况和双载需求筛选，避免只按排量推荐。`;
    question = "主要跑铺装路还是非铺装？身高、双载和三箱需求怎样？";
  } else if (category === "巡航") {
    persona = avg < 30000 ? "新手、低座需求、重视造型" : avg < 100000 ? "中排升级、城市休闲和短途巡航" : "品牌型客户、收藏和长途巡航";
    pitch = `${cc}cc级巡航，卖点应围绕坐姿、座高、声浪和造型，不只讲马力。`;
    question = "更看重低座易控、双载舒适，还是品牌和声浪？";
  } else if (category === "仿赛") {
    persona = avg < 30000 ? "入门跑山、颜值和操控体验" : avg < 100000 ? "进阶跑山、性能和赛道体验" : "进口性能、品牌和收藏型客户";
    pitch = `${cc}cc级仿赛，先确认骑姿接受度与使用场景，再谈动力和电控。`;
    question = "日常通勤、跑山、赛道各占多少？能否接受偏战斗骑姿？";
  } else {
    persona = avg < 10000 ? "高频通勤、买菜接娃、成本敏感" : avg < 20000 ? "品质通勤、新手和城市全能" : avg < 50000 ? "城市通勤兼中短途摩旅" : "高端踏板、品牌和舒适升级";
    pitch = `${cc}cc级踏板，优先围绕平踏/龙骨、储物、双载和日均里程成交。`;
    question = "每天骑多远？需要平踏、放全盔、双载或跑快速路吗？";
  }
  models.push({ category, brand, model, cc, low, high, priceBasis, role, persona, pitch, question, grade, source });
}

// ADV
add("ADV","本田","NX400",399,29980,35980,"平台指导价","B",urls.hondaDb);
add("ADV","本田","NX500",471,31480,34480,"厂商建议零售价","A",urls.hondaOfficial);
add("ADV","本田","XL750 Transalp",755,88800,88800,"平台指导价","B",urls.hondaDb);
add("ADV","本田","CRF1100L Africa Twin",1084,150800,185800,"平台指导价","B",urls.hondaDb);
add("ADV","春风","450MT",449,30580,32580,"2026款参考价","A",urls.cfmoto450mt);
add("ADV","春风","700MT",693,29980,33680,"版本价格区间","A",urls.cfmoto700mt);
add("ADV","春风","800MT-X",799,53680,53680,"厂商售价","A",urls.cfmoto800mtx);
add("ADV","春风","1000MT-X",946,59680,59680,"厂商售价","A",urls.cfmoto1000mtx);
add("ADV","无极","DS500X",494,26999,29499,"标准/三箱版","B",urls.voge);
add("ADV","无极","DS625X",581,31980,35980,"2026款标准/电减版；活动另询","B",urls.voge);
add("ADV","无极","DS800X",798,39980,43980,"平台指导价","B",urls.voge);
add("ADV","凯越","525X",494,28500,33280,"平台指导价","B",urls.kove);
add("ADV","凯越","625X",580,31777,35777,"平台指导价","B",urls.kove);
add("ADV","凯越","800X",799,41800,49800,"2026款版本区间","B",urls.kove);
add("ADV","升仕","703F",699,43800,43800,"2026款21寸版报道价","C",urls.zontes703f);
add("ADV","贝纳利","TRK552",549,29880,36880,"渠道在售区间","B",urls.benelli);
add("ADV","赛科龙","RX600",550,27988,31988,"渠道版本区间","B",urls.cyclone);
add("ADV","KTM","790 Adventure",799,81800,96800,"厂商指导价区间","B",urls.ktmAdv);
add("ADV","宝马","F 800 GS",895,99900,99900,"渠道指导价起","B",urls.bmw);
add("ADV","宝马","R 1300 GS",1300,225900,304900,"版本价格区间","B",urls.bmw);
add("ADV","铃木","V-Strom 800",776,99800,105800,"2026款指导价","B",urls.suzuki);
add("ADV","川崎","Versys 650",649,79800,79800,"渠道指导价起","B",urls.kawasaki);
add("ADV","凯旋","Tiger 900",888,99900,99900,"渠道指导价起","B",urls.triumph);

// 巡航
add("巡航","豪爵","TR300",298,21980,23280,"平台指导价","B",urls.haojue);
add("巡航","本田","CM300",286,20980,21680,"平台指导价","B",urls.hondaDb);
add("巡航","本田","CM500",471,59800,59800,"平台指导价","B",urls.hondaDb);
add("巡航","本田","CM1100",1084,122800,122800,"平台指导价","B",urls.hondaDb);
add("巡航","春风","250CL-C",249,14980,14980,"平台指导价","B",urls.cfmotoDb);
add("巡航","春风","450CL-C",449,21980,24380,"手动/AMT/单座版本","A",urls.cfmoto450clc);
add("巡航","春风","550CL-C",549,25880,25880,"平台指导价","B",urls.cfmotoDb);
add("巡航","无极","CU250",249,16480,19980,"2026款版本区间","B",urls.voge);
add("巡航","无极","CU525",494,21980,27188,"链条/皮带等版本区间","B",urls.voge);
add("巡航","无极","CU625",581,25980,27980,"平台指导价","B",urls.voge);
add("巡航","QJMOTOR","闪250",249,18999,18999,"官方/平台指导价","B",urls.qjmotorDb);
add("巡航","QJMOTOR","闪300",296,20999,23999,"2026款版本区间","B",urls.qjmotorDb);
add("巡航","QJMOTOR","闪400",400,19999,19999,"2026款指导价","B",urls.qjmotorDb);
add("巡航","QJMOTOR","闪600",560,24999,35999,"V2/V4/AMT版本区间","B",urls.qjmotorDb);
add("巡航","凯越","625V 枪骑兵",580,24980,24980,"平台指导价","B",urls.kove);
add("巡航","赛科龙","RA600",550,23988,24988,"版本/渠道区间","B",urls.cyclone);
add("巡航","川崎","Eliminator 500",451,42800,46800,"版本/渠道区间","B",urls.kawasaki);
add("巡航","川崎","Vulcan S",649,69800,69800,"渠道指导价起","B",urls.kawasaki);
add("巡航","哈雷戴维森","Nightster",975,75800,103480,"年款/版本区间","B",urls.harley);
add("巡航","哈雷戴维森","Sportster S",1252,105800,107780,"版本区间","B",urls.harley);
add("巡航","凯旋","Bonneville Bobber",1200,128900,128900,"渠道指导价起","B",urls.triumph);
add("巡航","杜卡迪","Diavel V4",1158,228000,231000,"版本区间","B",urls.ducati);

// 仿赛
add("仿赛","本田","CBR400R",399,30980,30980,"平台指导价","B",urls.hondaDb);
add("仿赛","本田","CBR500R",471,32480,35480,"厂商建议零售价","A",urls.hondaOfficial);
add("仿赛","本田","CBR500R FOUR",502,44980,44980,"厂商建议零售价","A",urls.hondaOfficial);
add("仿赛","本田","CBR650R",649,82800,82800,"厂商建议零售价","A",urls.hondaList);
add("仿赛","雅马哈","YZF-R3",321,43800,43800,"平台指导价","B",urls.yamaha);
add("仿赛","雅马哈","YZF-R7",689,109800,109800,"平台指导价","B",urls.yamaha);
add("仿赛","雅马哈","YZF-R9",890,139800,143800,"版本区间","B",urls.yamaha);
add("仿赛","雅马哈","YZF-R1",998,229800,299800,"2026款版本区间","B",urls.yamaha);
add("仿赛","川崎","Ninja 500",451,39800,45800,"版本/渠道区间","B",urls.kawasaki);
add("仿赛","川崎","Ninja ZX-4R",399,59800,64800,"ZX-4R/4RR区间","B",urls.kawasaki);
add("仿赛","川崎","Ninja ZX-6R",636,109800,109800,"渠道指导价起","B",urls.kawasaki);
add("仿赛","川崎","Ninja ZX-10R",998,199800,199800,"渠道指导价起","B",urls.kawasaki);
add("仿赛","铃木","GSX-8R",776,99800,99800,"2026款指导价","B",urls.suzuki);
add("仿赛","春风","250SR",249,15980,18580,"2026款版本区间","B",urls.cfmotoDb);
add("仿赛","春风","450SR",449,23980,28580,"版本区间","A",urls.cfmotoDb);
add("仿赛","春风","500SR",500,28980,28980,"厂商售价","A",urls.cfmoto500sr);
add("仿赛","春风","675SR-R",675,39580,39580,"厂商售价","A",urls.cfmoto675);
add("仿赛","春风","750SR-S",749,44980,44980,"平台指导价","B",urls.cfmotoDb);
add("仿赛","QJMOTOR","赛550",550,24999,24999,"官方/平台指导价","B",urls.qjmotorDb);
add("仿赛","QJMOTOR","赛600",600,29999,38999,"版本区间","B",urls.qjmotorDb);
add("仿赛","QJMOTOR","赛800",778,42999,42999,"2026款指导价","B",urls.qjmotorDb);
add("仿赛","无极","RR500S",494,28980,30980,"版本区间","B",urls.voge);
add("仿赛","无极","RR660S",660,37666,37666,"平台指导价","B",urls.voge);
add("仿赛","升仕","703RR",699,37800,40300,"2026款制动版本区间","C",urls.zontes703rr);
add("仿赛","凯越","450RR",443,25777,26577,"2026款版本区间","B",urls.kove);
add("仿赛","赛科龙","RC600",550,25988,25988,"渠道指导价起","B",urls.cyclone);
add("仿赛","KTM","RC 390",373,39980,39980,"平台指导价","B",urls.ktmRc);
add("仿赛","宝马","S 1000 RR",999,224900,274900,"版本价格区间","B",urls.bmw);
add("仿赛","杜卡迪","Panigale V2",890,138900,158900,"版本区间","B",urls.ducati);
add("仿赛","杜卡迪","Panigale V4",1103,242900,303900,"版本区间","B",urls.ducati);

// 踏板
add("踏板","济南铃木","UY125",125,8580,9980,"普通版至2026 ABS版","B",urls.jnSuzuki);
add("踏板","豪爵","AFR125",125,8680,10580,"版本区间","B",urls.haojue);
add("踏板","豪爵","UHR150",149,13380,14680,"2026款版本区间","B",urls.haojue);
add("踏板","豪爵","UFR150",149,15280,17380,"2026款版本区间","B",urls.haojue);
add("踏板","豪爵","旅行者 TVL350",350,28980,29980,"版本区间","B",urls.haojue);
add("踏板","新大洲本田","NS125LA",125,9980,12480,"平台指导价","B","https://m.58moto.com/home-rank");
add("踏板","新大洲本田","NS150GX",150,15280,16880,"2026款指导价","C",urls.sundiro);
add("踏板","五羊本田","NWT150",150,14980,17980,"2026款标准/高配/Pro","C",urls.wuyang);
add("踏板","五羊本田","NWG150",150,16180,17380,"2026款版本区间","C",urls.wuyangNwg);
add("踏板","本田","NSS350",330,40880,40980,"厂商建议零售价","A",urls.hondaOfficial);
add("踏板","本田","ADV350",330,42380,42480,"厂商建议零售价","A",urls.hondaOfficial);
add("踏板","本田","NSS750",745,126800,126800,"平台指导价","B",urls.hondaDb);
add("踏板","本田","X-ADV 750",745,129800,129800,"2026款市场价","B",urls.hondaList);
add("踏板","雅马哈","NMAX 155",155,27800,28000,"2026款/纪念版","B",urls.yamaha);
add("踏板","雅马哈","XMAX 300",292,49800,51800,"2026款版本区间","B",urls.yamaha);
add("踏板","雅马哈","TMAX 560",562,140800,141800,"版本区间","B",urls.yamaha);
add("踏板","QJMOTOR","鸿125",125,7699,8999,"2026款版本区间","B",urls.qjmotorDb);
add("踏板","QJMOTOR","鸿150GT",150,11999,12299,"2026款版本区间","B",urls.qjmotorDb);
add("踏板","QJMOTOR","鸿250ADV",249,15999,15999,"官方指导价","A","https://www.qjmotor.com/car.html?id=98");
add("踏板","无极","SR150S",150,12980,12980,"平台指导价","B",urls.voge);
add("踏板","无极","SR250GT",249,15980,17980,"2026款版本区间","B",urls.voge);
add("踏板","无极","SR4 Max",349,29999,31766,"版本区间","B",urls.voge);
add("踏板","无极","SR450X",398,34980,34980,"平台指导价","B",urls.voge);
add("踏板","升仕","368G",368,33800,33800,"平台指导价","B","https://m.58moto.com/home-rank");
add("踏板","三阳SYM","Fiddle",125,10980,13980,"2026款版本区间","B",urls.sym);
add("踏板","三阳SYM","巡弋 Cruisym250",249,21980,21980,"2026款指导价","B",urls.sym);
add("踏板","三阳SYM","哈士奇 Husky ADV300",278,24980,24980,"2026款指导价","B",urls.sym);
add("踏板","光阳","Racing H150",150,13980,15480,"指导价；活动另询","C",urls.kymco);
add("踏板","光阳","赛艇 S250",246,23500,23500,"当前平台指导价","B","https://m.58moto.com/garage/detail/19965?type=news");
add("踏板","光阳","赛艇 ST250",246,21999,21999,"2026款指导价；活动另询","C",urls.kymcoSt);
add("踏板","VESPA","Primavera 180",174,28800,31300,"2026款版本区间","B",urls.vespa);
add("踏板","VESPA","Sprint 180",174,29300,31800,"2026款版本区间","B",urls.vespa);
add("踏板","VESPA","GTS 310",310,45800,48000,"2026款版本区间","B",urls.vespa);
add("踏板","比亚乔","Medley 150",155,24800,25800,"2025/2026渠道参考","C",urls.piaggio);

const workbook = Workbook.create();
const summary = workbook.worksheets.add("销售导航");
const data = workbook.worksheets.add("车型总表");
const brandSheet = workbook.worksheets.add("品牌视图");
const notes = workbook.worksheets.add("口径与用法");

for (const sheet of [summary, data, brandSheet, notes]) {
  sheet.showGridLines = false;
  sheet.getRange("A1:Z300").format.font = { name: fontFamily, size: 10, color: "#1F2937" };
}

// 车型总表
data.getRange("A1:O1").merge();
data.getRange("A1").values = [["中国市场主流摩托车销售车型总表"]];
data.getRange("A1").format.font = { name: fontFamily, size: 16, bold: true, color: "#111827" };
data.getRange("A2:O2").merge();
data.getRange("A2").values = [[`范围：2026年中国大陆主流渠道在售/重点车型；数据日期：${asOf}。价格不含购置税、保险、上牌及改装，成交前须向当地授权门店复核。`]];
data.getRange("A2").format.font = { name: fontFamily, size: 9, italic: true, color: "#6B7280" };
const headers = ["序号","品类","品牌","车型","排量(cc)","指导价下限(元)","指导价上限(元)","价格口径","建议角色","目标客户","销售切入点","首问","核验等级","来源URL","数据日期"];
data.getRange("A4:O4").values = [headers];
const dataRows = models.map((m, i) => [i + 1, m.category, m.brand, m.model, m.cc, m.low, m.high, m.priceBasis, m.role, m.persona, m.pitch, m.question, m.grade, m.source, asOf]);
data.getRange(`A5:O${4 + dataRows.length}`).values = dataRows;
const dataTable = data.tables.add(`A4:O${4 + dataRows.length}`, true, "MotorcycleSalesTable");
dataTable.style = "TableStyleMedium2";
dataTable.showFilterButton = true;
data.freezePanes.freezeRows(4);
data.freezePanes.freezeColumns(4);
data.getRange(`E5:E${4 + dataRows.length}`).format.numberFormat = "#,##0";
data.getRange(`F5:G${4 + dataRows.length}`).setNumberFormat('¥#,##0');
data.getRange(`A4:O4`).format = { fill: "#1F4E78", font: { name: fontFamily, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true };
data.getRange(`A5:O${4 + dataRows.length}`).format.verticalAlignment = "top";
data.getRange(`H5:N${4 + dataRows.length}`).format.wrapText = true;
data.getRange(`B5:B${4 + dataRows.length}`).conditionalFormats.add("containsText", { text: "ADV", format: { fill: "#E0F2FE", font: { color: "#075985", bold: true } } });
data.getRange(`B5:B${4 + dataRows.length}`).conditionalFormats.add("containsText", { text: "巡航", format: { fill: "#FEF3C7", font: { color: "#92400E", bold: true } } });
data.getRange(`B5:B${4 + dataRows.length}`).conditionalFormats.add("containsText", { text: "仿赛", format: { fill: "#FEE2E2", font: { color: "#991B1B", bold: true } } });
data.getRange(`B5:B${4 + dataRows.length}`).conditionalFormats.add("containsText", { text: "踏板", format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } } });
data.getRange(`I5:I${4 + dataRows.length}`).conditionalFormats.add("containsText", { text: "主销", format: { fill: "#DBEAFE", font: { color: "#1D4ED8", bold: true } } });
data.getRange(`I5:I${4 + dataRows.length}`).conditionalFormats.add("containsText", { text: "形象", format: { fill: "#EDE9FE", font: { color: "#6D28D9", bold: true } } });
data.getRange("A:O").format.autofitColumns();
data.getRange("A:A").format.columnWidth = 7;
data.getRange("B:B").format.columnWidth = 9;
data.getRange("C:C").format.columnWidth = 14;
data.getRange("D:D").format.columnWidth = 23;
data.getRange("E:G").format.columnWidth = 15;
data.getRange("H:H").format.columnWidth = 23;
data.getRange("I:I").format.columnWidth = 10;
data.getRange("J:J").format.columnWidth = 28;
data.getRange("K:K").format.columnWidth = 38;
data.getRange("L:L").format.columnWidth = 38;
data.getRange("M:M").format.columnWidth = 10;
data.getRange("N:N").format.columnWidth = 52;
data.getRange("O:O").format.columnWidth = 13;
data.getRange("1:4").format.rowHeight = 24;

// 销售导航
summary.getRange("A1:G1").merge();
summary.getRange("A1").values = [["摩托车销售选型导航"]];
summary.getRange("A1").format.font = { name: fontFamily, size: 16, bold: true, color: "#111827" };
summary.getRange("A2:G2").merge();
summary.getRange("A2").values = [[`基于 ${models.length} 款主流车型；先按用途和预算筛选，再核对座高、骑姿、储物与门店库存。更新：${asOf}`]];
summary.getRange("A2").format.font = { name: fontFamily, size: 9, italic: true, color: "#6B7280" };
summary.getRange("A4:F4").values = [["品类","车型数","品牌数","最低参考价","最高参考价","销售切入"]];
const cats = ["ADV","巡航","仿赛","踏板"];
const catPitch = {
  ADV: "路况、身高、双载、三箱与续航",
  巡航: "低座、坐姿、造型、声浪与双载",
  仿赛: "骑姿、通勤/跑山/赛道占比与保险预算",
  踏板: "平踏/龙骨、储物、日均里程与快速路需求",
};
const catRows = cats.map(cat => {
  const subset = models.filter(m => m.category === cat);
  return [cat, null, new Set(subset.map(m => m.brand)).size, Math.min(...subset.map(m => m.low)), Math.max(...subset.map(m => m.high)), catPitch[cat]];
});
summary.getRange("A5:F8").values = catRows;
summary.getRange("B5").formulas = [[`=COUNTIF('车型总表'!$B$5:$B$${4 + dataRows.length},A5)`]];
summary.getRange("B5:B8").fillDown();
summary.getRange("D5:E8").setNumberFormat('¥#,##0');
summary.getRange("A4:F8").format.borders = { preset: "outside", style: "thin", color: "#CBD5E1" };
summary.getRange("A4:F4").format = { fill: "#1F4E78", font: { name: fontFamily, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", verticalAlignment: "center" };
summary.getRange("A5:F8").format.verticalAlignment = "center";
summary.getRange("F5:F8").format.wrapText = true;

summary.getRange("A11:G11").merge();
summary.getRange("A11").values = [["按预算快速分流"]];
summary.getRange("A11").format.font = { name: fontFamily, size: 12, bold: true, color: "#1F4E78" };
summary.getRange("A12:G12").values = [["预算带","主推方向","代表车型","常见客户","成交动作","注意事项","入选车型数"]];
const budgetRows = [
  ["1万元内","125踏板","UY125、鸿125、AFR125基础版","高频通勤、买菜接娃","算一年油耗和保养总成本","确认当地上牌与ABS版本"],
  ["1万–2万元","150踏板/入门巡航/入门仿赛","NWT150、UHR150、250CL-C、250SR","新手、第一辆车","先试坐再比较配置","不要只按排量推荐"],
  ["2万–4万元","国产中排主战场","NX500、450CL-C、450SR、DS625X","通勤兼玩乐、首次升级","安排同价位三车试驾","核对版本与活动价"],
  ["4万–8万元","中大排/进口入门","800MT-X、ZX-4R、Eliminator 500","进阶骑士、品牌升级","比较骑姿和后期费用","提前说明保险、轮胎和保养"],
  ["8万–15万元","进口中高端","XL750、CBR650R、R7、Panigale V2","品牌与性能并重","提供金融、置换和精品包方案","确认交期和授权售后"],
  ["15万元以上","旗舰与形象车型","R 1300 GS、S 1000 RR、Diavel V4、哈雷","高净值、收藏和长途旗舰","一对一试驾与置换评估","价格受版本和选装影响大"],
];
summary.getRange("A13:F18").values = budgetRows;
const budgetFormulas = [
  `=COUNTIF('车型总表'!$F$5:$F$${4 + dataRows.length},"<=10000")`,
  `=COUNTIFS('车型总表'!$F$5:$F$${4 + dataRows.length},">10000",'车型总表'!$F$5:$F$${4 + dataRows.length},"<=20000")`,
  `=COUNTIFS('车型总表'!$F$5:$F$${4 + dataRows.length},">20000",'车型总表'!$F$5:$F$${4 + dataRows.length},"<=40000")`,
  `=COUNTIFS('车型总表'!$F$5:$F$${4 + dataRows.length},">40000",'车型总表'!$F$5:$F$${4 + dataRows.length},"<=80000")`,
  `=COUNTIFS('车型总表'!$F$5:$F$${4 + dataRows.length},">80000",'车型总表'!$F$5:$F$${4 + dataRows.length},"<=150000")`,
  `=COUNTIF('车型总表'!$F$5:$F$${4 + dataRows.length},">150000")`,
];
summary.getRange("G13:G18").formulas = budgetFormulas.map(f => [f]);
summary.getRange("A12:G18").format.borders = { preset: "outside", style: "thin", color: "#CBD5E1" };
summary.getRange("A12:G12").format = { fill: "#374151", font: { name: fontFamily, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true };
summary.getRange("A13:G18").format.wrapText = true;
summary.getRange("A13:G18").format.verticalAlignment = "top";
summary.getRange("A21:G21").merge();
summary.getRange("A21").values = [["推荐顺序：用途 → 预算 → 身高/骑姿 → 双载与储物 → 试驾 → 当日价格和库存复核"]];
summary.getRange("A21").format = { fill: "#EFF6FF", font: { name: fontFamily, bold: true, color: "#1E40AF" }, wrapText: true };
summary.getRange("A:G").format.autofitColumns();
summary.getRange("A:A").format.columnWidth = 14;
summary.getRange("B:B").format.columnWidth = 23;
summary.getRange("C:C").format.columnWidth = 42;
summary.getRange("D:D").format.columnWidth = 30;
summary.getRange("E:E").format.columnWidth = 30;
summary.getRange("F:F").format.columnWidth = 31;
summary.getRange("G:G").format.columnWidth = 12;
summary.getRange("1:2").format.rowHeight = 24;
summary.getRange("13:18").format.rowHeight = 48;

// 品牌视图
const origin = {
  "本田":"日本","春风":"中国","无极":"中国","凯越":"中国","升仕":"中国","贝纳利":"意大利品牌/中国集团","赛科龙":"中国","KTM":"奥地利","宝马":"德国","铃木":"日本","川崎":"日本","凯旋":"英国","豪爵":"中国","QJMOTOR":"中国","哈雷戴维森":"美国","杜卡迪":"意大利","雅马哈":"日本","济南铃木":"中日合资","新大洲本田":"中日合资","五羊本田":"中日合资","三阳SYM":"中国台湾","光阳":"中国台湾","VESPA":"意大利","比亚乔":"意大利"
};
const positioning = {
  "本田":"均衡、可靠、覆盖多用途","春风":"国产中大排与运动化主力","无极":"国产中排与高配置","凯越":"轻量化、ADV和仿赛","升仕":"科技配置与三缸平台","贝纳利":"中排ADV与品牌认知","赛科龙":"多品类高性价比","KTM":"运动与硬派ADV","宝马":"高端ADV和品牌旗舰","铃木":"进口中排、成熟机械","川崎":"四缸仿赛和进口运动","凯旋":"英伦品牌与ADV/复古","豪爵":"通勤品质和稳健渠道","QJMOTOR":"国产多品类与价格覆盖","哈雷戴维森":"美式巡航与社群","杜卡迪":"意式性能与高端形象","雅马哈":"运动和MAX踏板","济南铃木":"国民通勤踏板","新大洲本田":"合资通勤踏板","五羊本田":"合资通勤和全能踏板","三阳SYM":"台系踏板全排量覆盖","光阳":"成熟中大踏板","VESPA":"意式经典与生活方式","比亚乔":"欧系大轮踏板"
};
const brands = [...new Set(models.map(m => m.brand))].sort((a,b) => a.localeCompare(b,"zh-CN"));
brandSheet.getRange("A1:H1").merge();
brandSheet.getRange("A1").values = [["品牌覆盖视图"]];
brandSheet.getRange("A1").format.font = { name: fontFamily, size: 16, bold: true, color: "#111827" };
brandSheet.getRange("A2:H2").merge();
brandSheet.getRange("A2").values = [["用于盘点品牌结构和品类空缺；数字来自“车型总表”的入选车型数，不代表销量或市场份额。"]];
brandSheet.getRange("A2").format.font = { name: fontFamily, size: 9, italic: true, color: "#6B7280" };
brandSheet.getRange("A4:H4").values = [["品牌","来源地区","ADV","巡航","仿赛","踏板","合计","销售定位"]];
brandSheet.getRange(`A5:B${4 + brands.length}`).values = brands.map(b => [b, origin[b] ?? "待补充"]);
brandSheet.getRange(`H5:H${4 + brands.length}`).values = brands.map(b => [positioning[b] ?? "按门店实际定位"]);
const endData = 4 + dataRows.length;
const brandFormulaRows = brands.map((_, idx) => {
  const r = idx + 5;
  return [
    `=COUNTIFS('车型总表'!$C$5:$C$${endData},$A${r},'车型总表'!$B$5:$B$${endData},C$4)`,
    `=COUNTIFS('车型总表'!$C$5:$C$${endData},$A${r},'车型总表'!$B$5:$B$${endData},D$4)`,
    `=COUNTIFS('车型总表'!$C$5:$C$${endData},$A${r},'车型总表'!$B$5:$B$${endData},E$4)`,
    `=COUNTIFS('车型总表'!$C$5:$C$${endData},$A${r},'车型总表'!$B$5:$B$${endData},F$4)`,
    `=SUM(C${r}:F${r})`,
  ];
});
brandSheet.getRange(`C5:G${4 + brands.length}`).formulas = brandFormulaRows;
const brandTable = brandSheet.tables.add(`A4:H${4 + brands.length}`, true, "BrandCoverageTable");
brandTable.style = "TableStyleMedium4";
brandTable.showFilterButton = true;
brandSheet.getRange("A4:H4").format = { fill: "#374151", font: { name: fontFamily, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", verticalAlignment: "center" };
brandSheet.getRange(`C5:G${4 + brands.length}`).format.horizontalAlignment = "center";
brandSheet.getRange(`H5:H${4 + brands.length}`).format.wrapText = true;
brandSheet.freezePanes.freezeRows(4);
brandSheet.getRange("A:H").format.autofitColumns();
brandSheet.getRange("A:A").format.columnWidth = 18;
brandSheet.getRange("B:B").format.columnWidth = 20;
brandSheet.getRange("C:G").format.columnWidth = 10;
brandSheet.getRange("H:H").format.columnWidth = 34;

// 口径与用法
notes.getRange("A1:F1").merge();
notes.getRange("A1").values = [["清单口径与销售用法"]];
notes.getRange("A1").format.font = { name: fontFamily, size: 16, bold: true, color: "#111827" };
const noteRows = [
  ["清单边界","面向中国大陆新车销售，收录主流渠道在售及2026重点车型；不是全市场全量目录，也不含纯越野、街车、复古街车和电摩。"],
  ["价格口径","均为指导价、建议零售价或公开渠道参考价。不同年款、配色、套件、金融和地区政策会改变成交价。"],
  ["A 级","厂商官网或厂商官方产品页直接确认车型/售价。"],
  ["B 级","当前车型数据库或授权渠道在售页确认；销售前应向本地授权店再次核对。"],
  ["C 级","近期上市报道或促销报道确认；时效性最强，必须复核活动是否仍有效。"],
  ["ADV 定义","以跨骑探险/拉力用途为主。跨界踏板（如 X-ADV、鸿250ADV）统一放在踏板，便于销售按变速形式筛选。"],
  ["巡航定义","包含传统太子、美式巡航、运动巡航和动力巡航。旅行巡航未全面展开。"],
  ["仿赛定义","以全包围运动/跑车为主；不把普通街车纳入。"],
  ["踏板定义","包含小踏板、中大型踏板和跨界ADV踏板。"],
];
notes.getRange("A4:B12").values = noteRows;
notes.getRange("A4:A12").format = { fill: "#E5E7EB", font: { name: fontFamily, bold: true, color: "#111827" }, verticalAlignment: "top" };
notes.getRange("A4:B12").format.wrapText = true;
notes.getRange("A4:B12").format.borders = { preset: "outside", style: "thin", color: "#CBD5E1" };
notes.getRange("A15:B15").merge();
notes.getRange("A15").values = [["接待时六个必问"]];
notes.getRange("A15").format.font = { name: fontFamily, size: 12, bold: true, color: "#1F4E78" };
const questions = [
  [1,"主要用途：通勤、跑山、摩旅、双载还是赛道？"],
  [2,"预算是裸车预算还是含税、保险、上牌、装备的总预算？"],
  [3,"驾照类型、骑行经验、身高和能否接受高座/重车？"],
  [4,"对平踏、储物、三箱、风挡、加热、快排或自动挡有没有硬要求？"],
  [5,"更看重品牌保值、动力、配置、售后网络还是外观？"],
  [6,"是否愿意试坐/试驾，并接受同预算跨品类比较？"],
];
notes.getRange("A16:B21").values = questions;
notes.getRange("A16:A21").format = { fill: "#DBEAFE", font: { name: fontFamily, bold: true, color: "#1D4ED8" }, horizontalAlignment: "center" };
notes.getRange("A16:B21").format.wrapText = true;
notes.getRange("A24:B24").merge();
notes.getRange("A24").values = [["门店使用提醒"]];
notes.getRange("A24").format.font = { name: fontFamily, size: 12, bold: true, color: "#1F4E78" };
notes.getRange("A25:B28").values = [
  ["每日","开店前更新活动价、现车颜色和交期。"],
  ["每周","复核停产/换款、金融政策和置换补贴。"],
  ["每月","结合真实询单、试驾和成交数据，调整“引流/主销/升级/形象”角色。"],
  ["成交前","以授权门店报价单和最终购车合同为准；不要承诺未确认的交期、赠品或落地价。"],
];
notes.getRange("A25:A28").format = { fill: "#FEF3C7", font: { name: fontFamily, bold: true, color: "#92400E" } };
notes.getRange("A25:B28").format.wrapText = true;
notes.getRange("A:B").format.autofitColumns();
notes.getRange("A:A").format.columnWidth = 18;
notes.getRange("B:B").format.columnWidth = 100;
notes.getRange("4:12").format.rowHeight = 36;
notes.getRange("16:21").format.rowHeight = 30;
notes.getRange("25:28").format.rowHeight = 30;

await fs.mkdir(outputDir, { recursive: true });

const inspectData = await workbook.inspect({ kind: "table", range: `车型总表!A1:O12`, include: "values,formulas", tableMaxRows: 12, tableMaxCols: 15 });
console.log("DATA_INSPECT");
console.log(inspectData.ndjson);
const inspectSummary = await workbook.inspect({ kind: "table", range: "销售导航!A1:G21", include: "values,formulas", tableMaxRows: 25, tableMaxCols: 8 });
console.log("SUMMARY_INSPECT");
console.log(inspectSummary.ndjson);
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" });
console.log("ERROR_SCAN");
console.log(errors.ndjson);

for (const [sheetName, range, file] of [
  ["销售导航", "A1:G21", "preview_sales.png"],
  ["车型总表", "A1:O18", "preview_models.png"],
  ["品牌视图", `A1:H${Math.min(20, 4 + brands.length)}`, "preview_brands.png"],
  ["口径与用法", "A1:B28", "preview_notes.png"],
]) {
  const preview = await workbook.render({ sheetName, range, scale: 1.2, format: "png" });
  await fs.writeFile(`${outputDir}/${file}`, new Uint8Array(await preview.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(`OUTPUT=${outputPath}`);
console.log(`MODEL_COUNT=${models.length}`);
