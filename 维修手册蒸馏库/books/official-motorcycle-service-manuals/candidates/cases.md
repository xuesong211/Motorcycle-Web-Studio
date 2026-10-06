# 阶段 1 候选案例池

> 将厂方给出的故障诊断流程、测量判定和拆检结论视为“操作案例”。本阶段只提取、不筛选；所有数值和判据仅适用于所列手册与车型版本，实修前必须回查原 PDF。

- id: c01
  title: 凯越 450 Rally 冷车或热车难起动的分层诊断
  type: case
  source_chapter: 450RALLY_维修手册_英文，PDF第122页
  source_quote: |
    "Connect the fuel pressure gauge... check whether the fuel pressure is around 300kPa... Pull out the ignition high-voltage wire... check whether there is blue and white high-voltage fire."
  summary: |
    对冷、热车均难起动，厂方先核对约 300 kPa 燃油压力和蓝白色高压火，再以替代电阻验证温度传感器、轻开节气门判断怠速气道、检测喷油器泄漏或堵塞，最后检查燃油品质、缸压及 EFI 供电线路。
  bound_to:
    - 起动困难的油压—点火—温度修正—缸压分层诊断
    - 先测量后换件
  outcome: |
    哪一层测量不合格，就进入相应供油、点火、传感器、喷油器或发动机机械维修；全部通过后再查 EFI 适配器供电与线路。
  tags: [case, KOVE, ADV, starting, EFI]

- id: c02
  title: 凯越 450 Rally 任意工况怠速不稳的排查顺序
  type: case
  source_chapter: 450RALLY_维修手册_英文，PDF第123页
  source_quote: |
    "Check if the air filter is clogged and if there are air leaks... Check if the idle speed regulator is stuck... Check the throttle body and idle bypass airway for carbon buildup."
  summary: |
    厂方把怠速不稳拆成进气堵塞或漏气、怠速调节器卡滞、火花塞规格与间隙、节气门和旁通气道积碳、喷油器流量、燃油品质、各缸压力差、机械点火正时及 EFI 线路九层检查。
  bound_to:
    - 怠速不稳的空气—点火—燃油—机械分区诊断
    - 由外到内避免无证据拆机
  outcome: |
    异常项分别导向清洁进气或怠速气道、调整或更换火花塞、检测或更换喷油器、处理燃油、检修机械缸压或点火正时。
  tags: [case, KOVE, ADV, idle, diagnosis-tree]

- id: c03
  title: 凯越 450 Rally 加速不上或加速熄火诊断
  type: case
  source_chapter: 450RALLY_维修手册_英文，PDF第124页
  source_quote: |
    "Check the air filter for blockage... check the fuel pressure at idle speed in about 350kPa... Check whether the intake pressure sensor, throttle position sensor and its wiring are normal."
  summary: |
    对加速转速不上升或熄火，流程先查空滤，再测怠速燃油压力约 350 kPa，随后检查火花塞、节气门和旁通气道积碳、进气压力与节气门位置传感器、喷油器、燃油、点火正时、排气通畅度及 EFI 线路。
  bound_to:
    - 加速不良的进气—供油—传感器—排气诊断链
    - 动态症状与静态测量结合
  outcome: |
    根据异常项清洁或修复进气、检修供油压力、修复传感器线路、清洗或更换喷油器、校正点火正时或疏通排气系统。
  tags: [case, KOVE, ADV, acceleration, fuel-pressure]

- id: c04
  title: 钱江 ATR125 电喷系统无法起动的首轮门禁
  type: case
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第178页
  source_quote: |
    "Fault symptom - unable to start... Check the fuse and grounding wire... Check if the ECU plug is securely connected... Connect the diagnostic instrument to the system diagnostic socket."
  summary: |
    无法起动时先观察打开点火开关后故障灯是否点亮；不亮则检查保险、搭铁、ECU 插头、灯及线路。故障灯能亮后，再验证诊断仪能否通信，随后才检查点火系统和供油系统。
  bound_to:
    - 钱江踏板 EFI 起动故障的电源与通信门禁
    - 故障灯不是换件指令
  outcome: |
    只有保险、搭铁、ECU 连接、诊断通信等基础条件通过后，才进入火花和燃油检查，避免一开始就替换 ECU 或喷油部件。
  tags: [case, QJMOTOR, scooter, no-start, electrical]

- id: c05
  title: 钱江 ATR125 有泵声仍无法起动时的燃压判定
  type: case
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第179页
  source_quote: |
    "Is the fuel supply pressure greater than 220Kpa... Insufficient pressure: Check if there is enough oil in the fuel tank... Check if the gasoline filter should be replaced."
  summary: |
    燃油泵能够工作的情况下，不以泵声直接判定供油正常，而是测量供油压力是否大于 220 kPa；压力不足时依次查油量、汽油滤清器和供回油管，压力正常时再查喷油器控制电路与喷嘴清洁状态。
  bound_to:
    - 供油故障的声音证据与压力证据分离
    - 燃压测量驱动维修判定
  outcome: |
    低压导向油量、滤芯和管路维修；压力正常但仍不起动，则转入喷油器控制及堵塞检查。
  tags: [case, QJMOTOR, scooter, fuel-pressure, no-start]

- id: c06
  title: 钱江 ATR125 异常高油耗的氧传感器与喷油器验证
  type: case
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第180页
  source_quote: |
    "If they are loose, the oxygen sensors may mistakenly determine that the combustion in the cylinder is lean... If the reading remains above 500 mV... check if the fuel injector leaks oil."
  summary: |
    面对异常高油耗，先确认氧传感器安装是否松动，避免漏气导致 ECU 误判混合气偏稀而加浓；机械部件与氧传感器正常后，在正常水温观察信号，若读数持续高于 500 mV，再检查喷油器是否泄漏。
  bound_to:
    - 高油耗的闭环反馈与燃油泄漏诊断
    - 先排除安装问题再判传感器损坏
  outcome: |
    氧传感器松动时先恢复密封；信号持续异常且基础机械正常时，将诊断重点转向喷油器泄漏。
  tags: [case, QJMOTOR, scooter, fuel-consumption, oxygen-sensor]

- id: c07
  title: 钱江 ATR125 CVT 传动带的测量换件判据
  type: case
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第63页
  source_quote: |
    "Check if the drive belt is broken or worn... Measure the belt width. Allowable limit: 21.6mm... Left crankcase cover fixing bolt 10-12N.m."
  summary: |
    拆下左曲轴箱盖后先检查传动带断裂和磨损，再测量带宽；达到 21.6 mm 使用极限时更换原厂件，复装左曲轴箱盖并按 10–12 N·m 紧固，最后确认传动工作。
  bound_to:
    - 踏板 CVT 的状态检查—尺寸测量—换件—复装闭环
    - 使用极限与紧固扭矩双重判定
  outcome: |
    传动带破损、磨损或带宽达到使用极限即更换；合格件可继续使用，复装后还需进行运行确认。
  tags: [case, QJMOTOR, scooter, CVT, service-limit]

- id: c08
  title: 钱江 SRV300 无火花故障从电源到 ECU 的排查
  type: case
  source_chapter: SRV300_QJ300-12A_官方维修手册_英文，PDF第579页
  source_quote: |
    "Incorrect ignition (no spark)... Battery inspection... Ignition system wire and connector inspection... Spark plug inspection... Primary coil peak voltage inspection."
  summary: |
    巡航车无火花时，厂方流程依次检查蓄电池、点火线路与接插件、火花塞、点火线圈初级峰值电压，并继续验证曲轴与凸轮轴位置传感器峰值电压；只有这些条件排除后才判断电子控制单元。
  bound_to:
    - 点火系统的电源—线路—负载—触发信号—控制器诊断链
    - ECU 最后判定原则
  outcome: |
    任一步不合格即充电、修线或更换对应部件；所有外部电源、线路、线圈和位置传感器都合格后，才进入 ECU 更换判定。
  tags: [case, QJMOTOR, cruiser, ignition, no-spark]

- id: c09
  title: 钱江 SRV300 离合器打滑与分离不良的分流诊断
  type: case
  source_chapter: SRV300_QJ300-12A_官方维修手册_英文，PDF第614页
  source_quote: |
    "The clutch is slipping: The friction pad is worn or deformed; The steel sheet is worn or deformed... The clutch cannot be separated properly: The clutch pad is deformed or too rough."
  summary: |
    厂方先把离合异常分成“打滑”和“不能正常分离”两条路径。打滑重点拆检摩擦片、钢片、弹簧、离合器壳和液压泵；分离不良还需检查片组装配、机油状态与液位、花键、螺母、离合油和管路空气。
  bound_to:
    - 症状分流后的离合器拆检
    - 机械件与液压系统联合诊断
  outcome: |
    按磨损、变形、弹性、卡滞、油液劣化或液压密封失效的证据，对应调整、排气或更换部件，而不是把所有离合异常都归为摩擦片磨损。
  tags: [case, QJMOTOR, cruiser, clutch, hydraulic]

- id: c10
  title: 钱江 SRV300 车把抖动与制动无力的底盘检查
  type: case
  source_chapter: SRV300_QJ300-12A_官方维修手册_英文，PDF第617页
  source_quote: |
    "The handlebars vibrate or shake severely: The tire is worn... The wheel bearing is worn... Brake is unable to work properly: There is air in the brake tube; The friction pad or brake disc is worn."
  summary: |
    车把严重振动时检查轮胎、摇臂轴承、轮辋平衡、车轮轴承、车把座和转向柱紧固、轮轴跳动及发动机安装；制动无力则另查管路空气、片盘磨损、泄漏、污染、油液劣化和主泵密封。
  bound_to:
    - 巡航底盘抖动的轮胎—轴承—几何—紧固诊断
    - 制动安全系统独立复检
  outcome: |
    根据具体证据校正轮胎或轮辋、润滑或更换轴承、恢复紧固，或对制动系统排气、换液、去除污染及更换磨损和密封部件。
  tags: [case, QJMOTOR, cruiser, chassis, brake]

- id: c11
  title: 升仕 368T-G 起动无着车征兆的诊断树
  type: case
  source_chapter: 368T-G_2024与2026维修保养手册，PDF第89页
  source_quote: |
    “无法起动→检查点火线圈的高压火花；检查燃油是否充足、燃油泵是否工作、喷油器是否正常；测量燃油压力，再检查气缸压力。”
  summary: |
    起动电机能正常带动发动机但完全没有着车征兆时，先按高压火花分流，再查燃油量、空滤和漏气、燃油泵与线路、喷油器及线路，随后用燃压的过低、正常、过高结果分别转入泵、通气/碳罐、缸压或调压阀检查。
  bound_to:
    - 升仕踏板无着车征兆的火花—燃油—缸压诊断树
    - 测量结果决定下一步
  outcome: |
    无火花转点火系统；低燃压转泵、油箱通气和碳罐；正常燃压转缸压；高燃压转燃油压力调节阀。
  tags: [case, ZONTES, scooter, no-start, diagnosis-tree]

- id: c12
  title: 升仕 368T-G 加速迟滞的系统排查
  type: case
  source_chapter: 368T-G_2024与2026维修保养手册，PDF第90页
  source_quote: |
    “加速不良：检查点火正时、进气系统是否漏气、空滤器滤芯是否堵塞、三合一传感器、燃油压力；检查或清洗喷油器。”
  summary: |
    对转动油门后转速不能马上升高、加速缓慢，流程从点火正时开始，依次排除进气漏气、空滤堵塞、三合一传感器、发动机废气管/碳罐/油箱通气管软管、燃压、燃油泵滤网、油量和喷油器问题。
  bound_to:
    - 升仕踏板加速迟滞的点火—进气—传感器—供油排查
    - 软管走向和通畅度检查
  outcome: |
    依据检查结果调整点火正时、修复漏气、清洁或更换空滤和传感器、恢复通气软管，或检修燃油泵并清洗喷油器。
  tags: [case, ZONTES, scooter, acceleration, EFI]

- id: c13
  title: 升仕 368T-G 热车怠速不回落诊断
  type: case
  source_chapter: 368T-G_2024与2026维修保养手册，PDF第90页
  source_quote: |
    “热车后怠速没有回落到1500-1700转/分钟：检查节气门阀体是否关闭不严、进气歧管处是否漏气、水油共用传感器、发动机废气管、怠速控制阀。”
  summary: |
    冷车快怠速正常但热车后仍不能回到规定区间时，依次查节气门关闭、油门拉索自由行程、节气门积污、进气歧管漏气、水油共用温度传感器、废气管漏气及怠速控制阀。
  bound_to:
    - 热车高怠速的机械回位—漏气—温度输入—怠速执行器诊断
    - 冷热状态对比诊断
  outcome: |
    节气门关闭异常时先校正拉索并清洗阀体；漏气件、温度传感器或怠速控制阀异常时按流程修复或更换。
  tags: [case, ZONTES, scooter, hot-idle, temperature-sensor]

- id: c14
  title: 升仕 703F 行驶中断油顿挫的倾倒开关验证
  type: case
  source_chapter: 703F_2024与2026维修手册，PDF第91页
  source_quote: |
    “水平位置：0.4～1.4V；约60°：3.7～4.4V。将倾倒开关往左或往右倾斜大约60°，发动机应在短时间内熄火，否则倾倒开关故障。”
  summary: |
    行驶中出现断油或顿挫时，可先拔掉倾倒开关观察车辆能否正常骑行，再在插头不断开的条件下测量水平与约 60°姿态的输出电压，并通过倾斜后发动机是否迅速熄火完成功能验证。
  bound_to:
    - ADV 间歇断油的倾倒开关诊断
    - 电压测量与实车功能试验交叉验证
  outcome: |
    输出电压或倾斜熄火功能不符合标准时更换倾倒开关；开关排除后仍不能正常骑行，则继续排查 ECU、燃油泵和节气门阀体。
  tags: [case, ZONTES, ADV, tip-over-sensor, intermittent]

- id: c15
  title: 升仕 703F P0443 碳罐电磁阀故障诊断
  type: case
  source_chapter: 703F_2024与2026维修手册，PDF第93页
  source_quote: |
    “报0443故障码：20℃情况下，正常的电阻是32±2Ω；如电阻测量无穷大，代表传感器断路，需要更换。”
  summary: |
    出现 P0443 时先查电磁阀外观、插头和针脚，再在关机状态测两脚电阻；阻值正常但故障仍在时，重新检查主继电器锈蚀脱落并清码复现，最后测电磁阀蓝黑线到 ECU 对应端的连续性。
  bound_to:
    - DTC 引导下的部件—继电器—线束分层诊断
    - 电阻值与开路判定
  outcome: |
    无穷大判为电磁阀线圈断路并更换；阀体阻值正常则不直接换件，转查继电器、ECU 针脚和线束破损断裂。
  tags: [case, ZONTES, ADV, P0443, canister-solenoid]

- id: c16
  title: 升仕 703F 喷油器故障码的电阻与线路判定
  type: case
  source_chapter: 703F_2024与2026维修手册，PDF第95页
  source_quote: |
    “报0201、0202、0203等故障码：20℃情况下，正常的电阻是12.5±0.6Ω；如电阻测量无穷大，代表传感器断路，需要更换。”
  summary: |
    对应各缸喷油器 DTC 时，先查外观、插头和插针，再测喷油器两脚电阻；阻值合格而故障仍存在时，检查主继电器、清码复现，并测喷油器棕色线到 ECU 对应端的导通及针脚状态。
  bound_to:
    - 多缸喷油器 DTC 的缸别定位
    - 线圈电阻与控制线连续性诊断
  outcome: |
    电阻无穷大时更换相应缸喷油器；阻值正常则保留喷油器，继续修复继电器、接插件或线束故障。
  tags: [case, ZONTES, ADV, injector, DTC]

- id: c17
  title: 升仕 703F 氧传感器加热与信号故障分诊
  type: case
  source_chapter: 703F_2024与2026维修手册，PDF第97页
  source_quote: |
    “A与B引脚之间的电阻是18±3Ω；报0030加热断路故障时，电阻将会无穷大。正常情况下电压会在0～1V之间跳动。”
  summary: |
    氧传感器故障先区分加热器和信号回路：加热故障测 A-B 电阻，信号故障在怠速读取 0–1 V 跳动；信号长时间不变时，关机检查 ECU 针脚并测灰色线、白黄线到 ECU 的连续性。
  bound_to:
    - 氧传感器加热回路与信号回路分诊
    - 动态数据流与静态电阻测量结合
  outcome: |
    加热电阻无穷大时更换传感器；电阻正常或信号不跳变时，先查 ECU 针脚和线缆破损断裂，避免误换传感器。
  tags: [case, ZONTES, ADV, oxygen-sensor, live-data]

- id: c18
  title: 升仕 703F 水油共用温度传感器故障判定
  type: case
  source_chapter: 703F_2024与2026维修手册，PDF第98页
  source_quote: |
    “30℃情况下，正常的温度传感器两个引脚间的电阻是1.74～1.89KΩ……显示电阻正常，但故障码无法消除，需要检查线缆是否磨破。”
  summary: |
    仪表出现 0118、0115 等温度相关故障时，先查外观、插头和针脚，再按当前温度对照传感器电阻；若断路故障读数无穷大判传感器，若阻值正常但故障码持续，则把重点转向线缆磨破或断裂。
  bound_to:
    - 温度传感器的温阻特性诊断
    - 阻值正常但 DTC 持续时的线束检查
  outcome: |
    电阻与温度表不符或无穷大时更换传感器；传感器阻值正常则保留部件，修复插头或线缆。
  tags: [case, ZONTES, ADV, temperature-sensor, wiring]
