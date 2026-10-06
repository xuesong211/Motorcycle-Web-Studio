# 阶段 1.5：通过三重验证的能力单元

> 验证对象不是 114 条素材本身，而是将 28 个框架与 30 条原则去重、合并后的 24 个“独立能力提案”。案例、反例和术语分别作为后续 A1、B 与共享词典证据，不冒充独立能力。12 个提案通过，12 个提案降级；原始 58 个方法候选的去向见 `CANDIDATE_DISPOSITION.md`。

- id: v01
  title: 车型—版本—实车三点适用性门禁
  type: framework
  source_candidates: [f01, p01]
  V1_cross_domain:
    passed: true
    evidence:
      - 703F 手册提示产品改进会造成实车与手册不一致（PDF第2页）
      - ATR125 手册用工厂型号/识别信息限定维修数据（PDF第29页）
  V2_predictive_power:
    passed: true
    novel_question: 换装同排量另一年款节气门体前，能否直接照旧手册测针脚？
    derived_answer: 不能；先以 VIN、工厂型号、发动机号、零件号和插接器实物建立版本对应，差异未消除前停止通电测量。
  V3_exclusivity:
    passed: true
    why_not_common: 它不是泛泛“先看说明书”，而是用三组可核验标识决定数据是否具备证据资格。
  stage2_scope: 建立接车资料适用性检查表和差异升级路径。

- id: v02
  title: 时间—里程双触发与恶劣工况修正
  type: decision-framework
  source_candidates: [f03, f04, p19]
  V1_cross_domain:
    passed: true
    evidence:
      - SRV300V 周期表按时间与里程并列设置维护触发（PDF第40页）
      - 150/175T-V 与 450 Rally Pro 分别要求按工况缩短周期（PDF第27页、第37页）
  V2_predictive_power:
    passed: true
    novel_question: 一辆年里程很低但长期短途、尘土路和拥堵热车的踏板，能否只按里程保养？
    derived_answer: 不能；时间项先到先做，并按尘土、高温、短途等实际工况缩短空气滤芯、油液和传动检查周期。
  V3_exclusivity:
    passed: true
    why_not_common: 关键不是“定期保养”，而是双时钟加工况倍率，能解决低里程高损耗的反直觉情况。
  stage2_scope: 形成按品牌/车型读取原表、再做工况修正的保养计划器。

- id: v03
  title: 接车取证—症状复现—物理分区
  type: workflow
  source_candidates: [f05, f06, f09, f25]
  V1_cross_domain:
    passed: true
    evidence:
      - SRV700 与 ATR125 故障表要求先记录工况并确认症状（PDF第471页、第173页）
      - 703T 冷却故障与 450 Rally 怠速/加速故障均按物理系统分区（PDF第99页、第123-124页）
  V2_predictive_power:
    passed: true
    novel_question: 顾客说“偶尔骑半小时后顿一下”，接车时车辆完全正常，先换哪个件？
    derived_answer: 暂不换件；先锁定温度、车速、负载、油量、路况和报码状态，再设计安全复现，按空气、燃油、点火、机械和电气分区取证。
  V3_exclusivity:
    passed: true
    why_not_common: 它把模糊口述变成可复现实验，并规定偶发故障不能被“当前正常”直接否定。
  stage2_scope: 接车问诊表、复现矩阵、症状到物理系统的首轮分流。

- id: v04
  title: 不起动故障的状态分层诊断
  type: diagnostic-framework
  source_candidates: [f07, f08]
  V1_cross_domain:
    passed: true
    evidence:
      - SQ16 把不起动拆为不转、转但不着、着车后熄火等状态（PDF第163页）
      - 凯越450与升仕368T-G分别按燃压、火花、传感器、缸压逐层排查（PDF第122页、第89页）
  V2_predictive_power:
    passed: true
    novel_question: 起动机转得快、油泵有声、偶尔回火，第一步是否更换火花塞？
    derived_answer: 先定义为“能转但不着且有回火”，核对基础电压与联锁，再测燃压、有效火花和机械正时；油泵声不等于燃压合格。
  V3_exclusivity:
    passed: true
    why_not_common: 它用起动状态决定测试树，避免把所有“不着车”当成同一种故障。
  stage2_scope: 钱江踏板/巡航、凯越ADV、升仕踏板/ADV共用的不着车首轮诊断卡。

- id: v05
  title: 故障码读—证据链隔离—清码—触发复验
  type: workflow
  source_candidates: [f10, f11, p22, p23, p24]
  V1_cross_domain:
    passed: true
    evidence:
      - 703F 氧传感器流程要求数据流、端子和线路连续性验证（PDF第97页）
      - SRV300 与 368T-G 按接插件、线路、元件、控制器逐层隔离（PDF第176页、第47页）
      - LTR125/703F 要求修复后清码并重新验证（PDF第154页、第86-87页）
  V2_predictive_power:
    passed: true
    novel_question: 新换传感器后报码不变，而插头晃动时数据跳变，下一步是什么？
    derived_answer: 停止继续换件；保存报码与数据流，断电检查端子张力、供电/搭铁和线路开短路，修复后清码并按原触发条件复验。
  V3_exclusivity:
    passed: true
    why_not_common: 它明确 DTC 是监测线索而非坏件判决，并给出可执行的隔离层级与闭环出口。
  stage2_scope: 电喷/ABS电气报码通用诊断记录模板。

- id: v06
  title: 标准值—极限—最不利点—配合归因测量引擎
  type: decision-framework
  source_candidates: [f12, f13, f14, p27]
  V1_cross_domain:
    passed: true
    evidence:
      - ATR125 与升仕368发动机区分标准值和维修极限（PDF第20页、第10页）
      - 升仕发动机要求多高度/方向测量并按配合间隙追溯磨损件（PDF第13页、第24页）
      - 350系列活塞气缸以A/B/C尺寸组约束装配（PDF第21页）
  V2_predictive_power:
    passed: true
    novel_question: 单点缸径在标准范围，但另一个方向接近极限，活塞本身正常，能否继续使用？
    derived_answer: 不能用“平均正常”放行；以最不利位置计算椭圆/锥度和配合间隙，再按极限及分组决定缸体与活塞处置。
  V3_exclusivity:
    passed: true
    why_not_common: 它把四种常被混淆的判断——基准、判废线、局部最差值、磨损归因——合成一个测量决策算法。
  stage2_scope: 尺寸、间隙、跳动、磨损类统一记录和换件判定表。

- id: v07
  title: 拆卸即取证与配对件可追溯管理
  type: workflow
  source_candidates: [f15, p09, p10, p29]
  V1_cross_domain:
    passed: true
    evidence:
      - 钱江手册要求拆下件按顺序清洁存放并保持磨合配对件关系（SRV550ST PDF第13页）
      - 升仕ADV发动机要求调整垫、挺柱、摇臂和摇臂轴回到原位（PDF第40页）
      - ATR125/升仕368要求拆卸阶段记录状态并洁净隔离（PDF第20页、第33页）
  V2_predictive_power:
    passed: true
    novel_question: 四缸气门机构要统一清洗，怎样避免洗完后只能“凭感觉装回”？
    derived_answer: 拆前拍照和测量，按缸号、进排气、左右和方向分格编号；清洗不取消身份，复装逐件核销。
  V3_exclusivity:
    passed: true
    why_not_common: 它把拆卸定义为诊断证据采集，而不是单纯把零件取下；身份链本身是维修质量数据。
  stage2_scope: 拆前照片、零件分格、原位标识、异常痕迹记录规范。

- id: v08
  title: 复装四门禁：清洁换新、润滑、顺序定扭、静态验收
  type: checklist
  source_candidates: [f16, f17, f18, p04, p05, p06, p07, p26, p28]
  V1_cross_domain:
    passed: true
    evidence:
      - 凯越450规定清洁、润滑并在复装后检查安装和功能（PDF第7页）
      - 钱江踏板规定对角渐进定扭且错误扭矩会造成严重损坏（ATR125第21页、LTM125第17页）
      - 升仕发动机规定缸头/凸轮轴座盖按序预紧并锁定正时（PDF第13页、第21页）
  V2_predictive_power:
    passed: true
    novel_question: 缸盖换垫后不漏油，是否已经可以交车？
    derived_answer: 还不行；需核对换新件、润滑点、正时、紧固顺序与最终扭矩，静态检查油液、干涉、泄漏和功能后才进入动态验证。
  V3_exclusivity:
    passed: true
    why_not_common: 它把复装从“逆序装回”改造成四个不可跳过的质量门，每一门都有可记录的验收证据。
  stage2_scope: 发动机、底盘和车身复装通用完工卡。

- id: v09
  title: 基础制动—液压排气—ABS—动态验证四层闭环
  type: safety-workflow
  source_candidates: [f19, f21, p15, p17, p18, p25]
  V1_cross_domain:
    passed: true
    evidence:
      - ATR125/LTR125要求先排除基础制动故障再解释ABS（PDF第395页、第159页）
      - 钱江巡航规定制动液兼容与防水，升仕703F规定新盘片先建立压力（PDF第92/128页、第55页）
      - 凯越450/LTR125要求清码后做安全动态验证（PDF第51页、第154页）
  V2_predictive_power:
    passed: true
    novel_question: ABS灯灭了但手柄发软，能否判为修复？
    derived_answer: 不能；灯灭只说明自检条件暂时通过，先查泄漏、液位、摩擦件与空气，排气建立稳定手感，再在安全条件下验证ABS。
  V3_exclusivity:
    passed: true
    why_not_common: 它阻止用电子自检替代机械/液压制动能力，并规定动态测试只能位于闭环末端。
  stage2_scope: 制动故障、换液、换盘片和ABS维修的放行标准。

- id: v10
  title: CVT症状—传力链映射诊断
  type: diagnostic-framework
  source_candidates: [f22]
  V1_cross_domain:
    passed: true
    evidence:
      - ZT1P77MP发动机把起步、加速和最高车速症状映射到滚子、皮带、离合器（PDF第33页）
      - 150T-M/D发动机对同一传力链给出拆检与磨损判据（PDF第29页）
      - ATR125给出传动带测量换件案例（PDF第63页）
  V2_predictive_power:
    passed: true
    novel_question: 踏板车转速升高但车速跟不上，皮带外观无裂纹，应先换离合器吗？
    derived_answer: 不先定件；记录起步与中高速差异，检查皮带宽度/污染、主动盘滚子与滑道、从动盘夹持和离合器接合痕迹后定位失效段。
  V3_exclusivity:
    passed: true
    why_not_common: 它把CVT视为连续传力链，利用症状发生区间定位环节，而非“拆开看到什么换什么”。
  stage2_scope: 钱江/升仕踏板车起步抖、加速弱、转速车速不匹配诊断树。

- id: v11
  title: 供电—负载—控制—联锁四层电气诊断
  type: diagnostic-framework
  source_candidates: [f23, f24]
  V1_cross_domain:
    passed: true
    evidence:
      - 703T充电故障按蓄电池、发电、整流调压、线路分层（PDF第112-113页）
      - 703T和SRC500起动回路均包含保险、开关、继电器、联锁与起动机（PDF第91页、第70页）
      - 703F把充电异常与线束/负载共同验证（PDF第145页）
  V2_predictive_power:
    passed: true
    novel_question: 新电瓶隔夜又亏电，换整流器是否最省时间？
    derived_answer: 不是；先确认静态电压与压降、熄火漏电和负载，再测规定转速充电输出、发电线圈与整流调压线路，最后才判定部件。
  V3_exclusivity:
    passed: true
    why_not_common: 它区分能量源、传输路径、负载和控制许可，能防止把“没电”和“起动联锁未许可”混为一谈。
  stage2_scope: 亏电、不充电、不转机和间歇断电通用诊断表。

- id: v12
  title: 密闭流体系统的安全恢复闭环
  type: safety-workflow
  source_candidates: [f20, f26, f27, p12, p13]
  V1_cross_domain:
    passed: true
    evidence:
      - 燃油维修要求断电、通风、禁火、泄压、封堵并在起动前检漏（MTX125第128页、ATR125第133页）
      - 冷却系统要求加液、排气、升温、冷却后回查液位和泄漏（ATR125第91页、703T第38页）
      - 制动系统要求持续补液排气直至无气泡与手感稳定（450 Rally第50页、703F第59页）
  V2_predictive_power:
    passed: true
    novel_question: 更换一段水管后静态不漏，但热车后液位下降，能否只补液交车？
    derived_answer: 不能；需把下降区分为排出残余空气还是泄漏，完成升温循环、冷却回查、压力/密封复验并记录液位稳定后放行。
  V3_exclusivity:
    passed: true
    why_not_common: 它抽象出跨燃油、冷却、制动三种系统的同一恢复逻辑：控制能量、保持洁净、排除气体、恢复压力、检漏与回查。
  stage2_scope: 燃油/冷却/制动开路作业后的安全完工流程。

## 支撑材料去向

- `candidates/cases.md`：18 条全部保留，后续分配到 v03-v12 的 A1 实战案例。
- `candidates/counter-examples.md`：18 条全部保留，后续分配到各能力的 B 边界与禁忌。
- `candidates/glossary.md`：20 条全部保留，在阶段 3 整理为共享 `GLOSSARY.md`，不独立成 skill。
