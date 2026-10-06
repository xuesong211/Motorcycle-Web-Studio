# 阶段 1 候选反例池

> 这些反例来自厂方明确的禁令、前提和后果，用于限制后续技师诊断能力的适用边界。数值与零件结论须回查对应车型原 PDF。

- id: ce01
  title: 拿近似车型或旧年款数据直接套实车
  type: counter-example
  source_chapter: 703F_2024与2026维修手册，PDF第2页
  source_quote: |
    "由于产品的不断改进提高，以及其它方面的改变，因此您的摩托车可能与本手册存在某些不一致的地方。"
  failure_mode: |
    只看车型俗称或排量相近，就套用扭矩、针脚、零件号和维修极限。
  mechanism: |
    同系列不同年款、排放版和配置版可能更换控制器、线束、紧固件或标定；错误资料会让正确测量得出错误结论。
  warning_signs: [VIN未核对, 年款排放版不明, 实车插头或零件号与图纸不同]
  bound_to: [车型与版本适用性门禁]
  tags: [counter-example, applicability, version]

- id: ce02
  title: 凭手感代替规定扭矩
  type: counter-example
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第21页
  source_quote: |
    "If the wrong torque is applied to a bolt, nut, or screw, it may cause serious damage."
  failure_mode: |
    不查扭矩表或不用合格扭矩扳手，按经验一次拧紧。
  mechanism: |
    过松会位移、渗漏或疲劳，过紧会拉伸螺栓、滑牙、压坏密封面；手感无法稳定复现预紧力。
  warning_signs: [没有扭矩记录, 只说差不多紧, 扭矩工具未校验]
  bound_to: [复装三门禁, 多紧固件渐进交叉定扭]
  tags: [counter-example, torque, reassembly]

- id: ce03
  title: 多螺栓无顺序一次到扭矩
  type: counter-example
  source_chapter: LTM125_QJ125T-27F_官方维修手册_英文，PDF第17页
  source_quote: |
    "tighten to the specified torque diagonally in incremental steps"
  failure_mode: |
    沿圆周顺拧，某一颗一次拧到终值，随后再处理其他紧固件。
  mechanism: |
    局部预紧会把结合面拉偏，使缸头、盖板或制动部件受力不均，造成变形、密封失败或裂纹。
  warning_signs: [没有紧固顺序图, 未分级预紧, 结合面一侧先压死]
  bound_to: [多紧固件渐进交叉定扭]
  tags: [counter-example, fasteners, distortion]

- id: ce04
  title: 拆过的密封件看着完好就复用
  type: counter-example
  source_chapter: 368T-G_2024与2026维修保养手册，PDF第12页
  source_quote: |
    "用于密封的O型圈、纸垫、铜垫、组件密封圈等装配前务必换新。"
  failure_mode: |
    以无裂纹、无破损为理由复用 O 形圈、纸垫或铜垫。
  mechanism: |
    密封件经压缩、受热和介质浸泡后回弹与表面贴合能力已变化，外观检查不能证明其仍能维持压力或真空。
  warning_signs: [旧密封件回到待装区, 无新密封件领用记录, 装后靠涂胶补漏]
  bound_to: [复装三门禁]
  tags: [counter-example, seal, leakage]

- id: ce05
  title: 配对磨合件混放后任意装回
  type: counter-example
  source_chapter: SRV550ST_QJ500-11D_官方维修手册_英文，PDF第13页
  source_quote: |
    "The matching parts must always be reused/replaced collectively."
  failure_mode: |
    挺柱、摇臂、齿轮、活塞等拆下后不编号，清洗后随机复装。
  mechanism: |
    原配件已形成对应接触斑与间隙，互换会破坏配合关系，导致异响、偏磨、间隙异常甚至咬死。
  warning_signs: [零件混在同一盒, 没有缸位或方向标记, 调整垫片无法追溯]
  bound_to: [拆卸即取证与洁净隔离, 配合间隙超限后的归因复测]
  tags: [counter-example, matched-parts, traceability]

- id: ce06
  title: 燃油系统带电且有点火源作业
  type: counter-example
  source_chapter: MTX125_QJ125T-23H_官方维修手册_英文，PDF第128页
  source_quote: |
    "Disconnect battery negative (-). No smoking!... any fire source or spark is strictly prohibited."
  failure_mode: |
    未断开电瓶负极、通风不足，附近仍有吸烟、明火或可能产生火花的设备。
  mechanism: |
    泄压和拆管产生的燃油蒸气遇火花可燃爆；带电插拔还可能损伤控制器或触发泵运行。
  warning_signs: [闻到浓烈汽油味, 电瓶仍连接, 地面有燃油且继续作业]
  bound_to: [燃油系统维修的泄压—封堵—检漏闭环]
  tags: [counter-example, fuel, fire-safety]

- id: ce07
  title: 燃油管复装后直接起动
  type: counter-example
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第133页
  source_quote: |
    "Before the engine runs, follow the Fuel Leak Inspection Process to check for leaks."
  failure_mode: |
    快接、油泵或油箱刚装好便启动，以发动机能否着车代替检漏。
  mechanism: |
    起动会建立燃压并制造高温与电火花；微漏可能在静态看不出，却在加压后喷出并引发火灾。
  warning_signs: [快接没有二次拉拔确认, 无干纸检漏, 启动后才闻汽油味]
  bound_to: [燃油系统维修的泄压—封堵—检漏闭环]
  tags: [counter-example, fuel-leak, post-repair]

- id: ce08
  title: 只听见油泵声就认定燃压正常
  type: counter-example
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第179页
  source_quote: |
    "Connect the fuel pressure gauge... Check if the fuel pressure is normal."
  failure_mode: |
    油泵有动作声便跳过压力和保压测量，直接换喷油器、点火件或 ECU。
  mechanism: |
    有声只证明电机可能转动，不证明泵流量、调压、滤网、管路和保压能力合格。
  warning_signs: [没有燃压表数据, 只记录有泵声, 连续替换电子件]
  bound_to: [不起动故障的状态分层, 电喷诊断的基础条件门禁]
  tags: [counter-example, fuel-pressure, no-start]

- id: ce09
  title: 把故障码直接当成坏件判决
  type: counter-example
  source_chapter: 703F_2024与2026维修手册，PDF第97页
  source_quote: |
    "如电压长时间不变，需要关机，将ECU插头取下检查插针。之后用万用表检查线路是否连通。"
  failure_mode: |
    看到氧传感器、喷油器或温度传感器故障码就直接订件更换。
  mechanism: |
    故障码描述监测到的电路或信号异常，根因还可能是插针松脱、开路、短路、供电或搭铁问题。
  warning_signs: [无数据流截图, 未测电阻和连续性, 换件后同码复现]
  bound_to: [故障码的读—修—清—复验闭环, 接插件—线路—元件—控制器逐层隔离]
  tags: [counter-example, DTC, parts-cannon]

- id: ce10
  title: 测试前提不成立却判定电器损坏
  type: counter-example
  source_chapter: 703F_2024与2026维修手册，PDF第84页
  source_quote: |
    "先检查车辆电压是否大于13.5V，电压不足则等电压至13.5以上测试加热功能。"
  failure_mode: |
    低电压、搭铁差或保险异常时测试负载功能，并把无动作归因于部件损坏。
  mechanism: |
    控制器会在电压不足时限功率或禁止输出，前提不满足使测试结果没有判别力。
  warning_signs: [测试前未记电压, 充电状态不明, 多个负载同时报码]
  bound_to: [电喷诊断的基础条件门禁, 充电系统四层诊断]
  tags: [counter-example, voltage, diagnostic-precondition]

- id: ce11
  title: ABS带电插拔或用冲水敲击处理
  type: counter-example
  source_chapter: LTM125_QJ125T-27F_官方维修手册_英文，PDF第182页
  source_quote: |
    "Turn the ignition switch to OFF before the ABS electrical connector is disconnected. Do not spray water... Do not hit the ABS parts with a hammer."
  failure_mode: |
    点火开启时插拔 ABS，用高压水清洁接插件，或敲击、跌落液压控制单元。
  mechanism: |
    带电瞬态、进水和机械冲击会造成端子、传感器或液压单元的二次损伤，并制造新的间歇故障。
  warning_signs: [点火未关闭, 插头有水迹, ABS单元有敲击或跌落痕]
  bound_to: [基础制动先于ABS自诊断, 安全系统清码后的动态验证]
  tags: [counter-example, ABS, secondary-damage]

- id: ce12
  title: 不明制动液直接补加或混用
  type: counter-example
  source_chapter: SRV700_QJ700-11A_官方维修手册_英文，PDF第92页、第128页
  source_quote: |
    "The mixture of different brake fluids may cause harmful chemical reactions and thus result in the reduction of brake system performance."
  failure_mode: |
    不确认规格与品牌便补液，使用开封过久或受潮液体，甚至把不同制动液混合。
  mechanism: |
    化学不兼容和吸水会降低制动液性能与沸点，可能损害密封并在高温制动时形成气阻。
  warning_signs: [储液罐液体来源不明, 容器未标开封日期, 液体浑浊分层]
  bound_to: [液压制动排气闭环]
  tags: [counter-example, brake-fluid, contamination]

- id: ce13
  title: 新制动件未建立压力就上路
  type: counter-example
  source_chapter: 703F_2024与2026维修手册，PDF第55页
  source_quote: |
    "刚更换新的制动盘或制动片后不得马上行驶。务必抓放几次制动手柄或踏板。"
  failure_mode: |
    更换制动盘、片或拆过卡钳后，未恢复手柄行程和接触便直接骑行。
  mechanism: |
    活塞回位与新件间隙会让首次制动行程过长；新摩擦副尚未贴合，制动力也低于正常状态。
  warning_signs: [手柄第一把触底, 车轮转动前未静态制动, 未告知磨合距离]
  bound_to: [复装后的静态功能验收, 安全系统清码后的动态验证]
  tags: [counter-example, brakes, pre-ride]

- id: ce14
  title: 传动皮带反折扭曲或挤压存放
  type: counter-example
  source_chapter: SRV700_QJ700-11A_官方维修手册_英文，PDF第87页
  source_quote: |
    "Do not excessively twist or bend the belt backwards. Do not reverse or wind the belt. Do not squeeze the belt."
  failure_mode: |
    为省空间把皮带反折、卷紧、压在重物下，或拆装时强行撬曲。
  mechanism: |
    内部帘线或齿根可在外观无明显裂纹时受损，装车后出现跑偏、跳齿、断裂或寿命骤减。
  warning_signs: [皮带有反向折痕, 用扎带勒紧成小圈, 拆装留下撬伤]
  bound_to: [CVT症状—传力链映射]
  tags: [counter-example, belt, handling]

- id: ce15
  title: 无证据预防性拆节气门传感器
  type: counter-example
  source_chapter: 368T-G_2024与2026维修保养手册，PDF第47页
  source_quote: |
    "正常情况下不应拆卸。"
  failure_mode: |
    只要怠速异常就先拆节气门体或传感器，没有先排除火花塞、高压线圈、进气漏气和供电。
  mechanism: |
    盲拆破坏原始故障证据，增加密封、端子、标定和人为装配问题，使单一故障变成复合故障。
  warning_signs: [没有首轮测量记录, 拆前未读数据流, 拆后故障现象改变]
  bound_to: [拆卸即取证与洁净隔离, 接插件—线路—元件—控制器逐层隔离]
  tags: [counter-example, throttle-body, evidence-first]

- id: ce16
  title: 凸轮轴装配中转动曲轴或座盖一次压紧
  type: counter-example
  source_chapter: ZT370MU-ADV发动机维修手册，PDF第21页
  source_quote: |
    "安装凸轮轴时不要转动曲轴，否则会改变正时，损坏缸头。"
  failure_mode: |
    凸轮轴未按正时稳定就转曲轴，或不先带入螺纹而把座盖某侧一次拧紧。
  mechanism: |
    正时改变可造成气门与活塞干涉；不均匀压紧会让凸轮轴受弯并损坏缸头螺纹或轴座。
  warning_signs: [正时标记未拍照, 曲轴未锁定, 座盖螺栓露出长度明显不一]
  bound_to: [多紧固件渐进交叉定扭, 复装后的静态功能验收]
  tags: [counter-example, timing, engine]

- id: ce17
  title: 活塞气缸只按排量不按组别装配
  type: counter-example
  source_chapter: 350系列_ZT184MP发动机维修手册，PDF第21页
  source_quote: |
    "组装到一起的活塞与气缸必须为同一组别。"
  failure_mode: |
    看到尺寸相近或零件名称一致便混装 A/B/C 组活塞与气缸。
  mechanism: |
    分组用于控制实际配合间隙；组别错配可能造成敲缸、窜气、机油消耗或热机拉缸。
  warning_signs: [未记录分组标记, 只量公称直径, 配合间隙未复测]
  bound_to: [标准值—维修极限双阈值判定, 配合间隙超限后的归因复测]
  tags: [counter-example, grading, piston-cylinder]

- id: ce18
  title: 复装结束不做静态确认便路试
  type: counter-example
  source_chapter: 450RALLY_维修手册_英文，PDF第7页；ATR125_QJ125T-23F_官方维修手册_英文，PDF第66页
  source_quote: |
    "After reassembly, check all parts for proper installation and operation."
  failure_mode: |
    把路试当作首次功能检查，未先确认制动、转向、油液、线束、紧固和泄漏。
  mechanism: |
    装配遗漏会在车辆运动、负载和温度上升后放大；公共道路无法安全承受首次失效。
  warning_signs: [无静态验收表, 工具零件未点数, 直接交车或上路]
  bound_to: [复装后的静态功能验收, 安全系统清码后的动态验证]
  tags: [counter-example, quality-gate, road-test]
