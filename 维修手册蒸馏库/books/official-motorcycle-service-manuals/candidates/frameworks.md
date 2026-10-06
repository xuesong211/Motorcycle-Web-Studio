- id: f01
  title: "车型与版本适用性门禁"
  type: framework
  source_chapter: "ATR125_QJ125T-23F_官方维修手册_英文，PDF第29页；703F_2024与2026维修手册，PDF第13页"
  source_quote: |
    "The 10th digit of the vehicle identification code is the year, the 11th digit is the production factory code."
    “车辆识别代码 VIN 打刻在右车架前立管侧面；发动机识别代码打刻在右曲轴箱体上方。”
  summary: |
    查任何扭矩、间隙、容量、针脚或零件前，先记录商品名、工厂型号、VIN 年款位、发动机识别代码和铭牌。
    只有这些标识与手册适用范围一致，才允许进入参数层；排量相同或商品名相近不能作为套用依据。
  tags: [applicability, vin, model-gate, parameter-safety]

- id: f02
  title: "整车通用信息先于系统维修"
  type: framework
  source_chapter: "450RALLY_维修手册_英文，PDF第4页"
  source_quote: |
    "Chapter 2 and 3 apply to the entire motorcycle. Chapter 4 describes the procedures for removing/installing components... Most sections begin with system descriptions, maintenance information and troubleshooting."
  summary: |
    面对陌生车型，先读整车技术特征、通用维护和覆盖件拆装，再进入目标系统。
    系统内按“描述/原理—维修信息—故障诊断—详细工序”导航，可避免跳过前置条件和共用拆装步骤。
  tags: [manual-navigation, system-boundary, workflow, onboarding]

- id: f03
  title: "时间—里程双触发与工况修正"
  type: framework
  source_chapter: "SRV300V_QJ300-12_官方维修手册_英文，PDF第40页；150与175T-V维修保养手册_初稿，PDF第27页"
  source_quote: |
    "Regular checklist — Frequency: Whichever comes first."
    “往后每隔 6000 公里或 15 个月（以先到达者为准）进行一次定期维护；潮湿或多尘等恶劣工况应缩短常规保养间隔。”
  summary: |
    保养到期判定同时看日历时间和累计里程，任一先到即触发；尘土、潮湿、赛用、短途重载等工况再缩短间隔。
    该框架把“定期保养”从单一里程表改为基础周期加使用强度修正。
  tags: [maintenance, interval, severe-service, decision-rule]

- id: f04
  title: "维护动作编码矩阵"
  type: framework
  source_chapter: "450RALLY_维修手册_英文，PDF第35页；703T_2026维修保养手册，PDF第30页"
  source_quote: |
    "I: Inspection, cleaning, adjustment, lubrication or replacement if necessary; C: Cleaning; R: Replacement; L: Lubrication."
    “☆由经销商或有资质的维修单位提供；☆☆基于安全原因应由经销商或有资质的维修单位提供。”
  summary: |
    将维护表拆成检查、清洁、更换、润滑、紧固及资质等级，不把“检查”误解为目视一眼，也不把所有项目都简化为换件。
    工单生成时同时保留动作代码、周期、判据和执行资质。
  tags: [maintenance-matrix, work-order, action-code, qualification]

- id: f05
  title: "接车问诊—工况记录—症状复现"
  type: framework
  source_chapter: "SRV700_QJ700-11A_官方维修手册_英文，PDF第471页；ATR125_QJ125T-23F_官方维修手册_英文，PDF第173页"
  source_quote: |
    "Find out what went wrong and under what circumstances. Only by knowing clearly about the faults can you reproduce the problem in the workshop."
    "Sample: model, engine number, frame number, mileage, weather, temperature, frequency, road conditions and altitude."
  summary: |
    先把车主描述转成可复现条件：发生频率、冷热机、转速/车速、路况、天气、海拔、负载和操作动作。
    再在车间按相同边界条件复现；无法复现时保留条件差异，不把“当前正常”当作故障不存在。
  tags: [intake, symptom-reproduction, context, diagnostics]

- id: f06
  title: "诊断表防漏项"
  type: framework
  source_chapter: "SRV700_QJ700-11A_官方维修手册_英文，PDF第471页；450RALLY_维修手册_英文，PDF第4页"
  source_quote: |
    "Diagnostic tables can help you avoid ignoring any key points, so you must use a diagnostic table."
    "Refer to each section for troubleshooting based on the fault or symptom."
  summary: |
    对复杂或安全相关故障，用预设诊断表强制覆盖症状、工况、基础状态、检查结果和下一步，而不是只凭记忆排查。
    表格的价值是降低遗漏和跳步，不是替代测量或技师判断。
  tags: [diagnostic-table, omission-control, checklist, reasoning]

- id: f07
  title: "不起动故障的状态分层"
  type: framework
  source_chapter: "SQ16_QJ125T-30E_官方维修手册_英文，PDF第163页；ZT1P77MP发动机维修手册，PDF第33页"
  source_quote: |
    "The starting motor does not rotate; the starting motor rotates, but the engine does not start; no fuel supply; flooded cylinder; spark plugs do not work."
    “发动机可以启动、加油门后轮不转动：检查 V 型传动带、离合器蹄块、从动轮弹簧和齿轮室。”
  summary: |
    先按状态分层：起动机不转、起动机转但发动机不着、着车即熄火、发动机运转但动力不传到车轮。
    每一层再分别检查电源/联锁、燃油/点火/压缩、怠速控制或传动，避免把不同层级的“不能走”混为一谈。
  tags: [no-start, state-machine, fault-isolation, powertrain]

- id: f08
  title: "电喷诊断的基础条件门禁"
  type: framework
  source_chapter: "MTX125_QJ125T-23H_官方维修手册_英文，PDF第161页；SRV300_QJ300-12A_官方维修手册_英文，PDF第186页"
  source_quote: |
    "Before diagnosing, check whether the ground wire of the ECU and the power supply are well connected, whether the oil pipe leaks, and whether the oil pressure in the pipe is normal."
  summary: |
    进入 EFI 部件诊断前，先确认蓄电池、电源、ECU 搭铁、保险、燃油泄漏和燃油压力等基础条件。
    这些异常未必点亮故障灯；基础条件不合格时，故障码和数据流都可能成为二次症状。
  tags: [efi, prerequisite, power-ground, fuel-pressure]

- id: f09
  title: "稳态故障与偶发故障分流"
  type: framework
  source_chapter: "ATR125_QJ125T-23F_官方维修手册_英文，PDF第115页；LTM125_QJ125T-27F_官方维修手册_英文，PDF第363页"
  source_quote: |
    "Faults can be divided into steady-state faults and occasional faults based on frequency, such as a brief open circuit in the wiring harness or poor contact of connectors."
  summary: |
    先判断故障当前持续存在还是偶发消失。稳态故障适合即时测量；偶发故障需要保留历史码、复现工况并对线束和接插件做扰动检查。
    同一 DTC 在两类状态下采用不同取证策略。
  tags: [dtc, intermittent, steady-state, evidence]

- id: f10
  title: "故障码的读—修—清—复验闭环"
  type: framework
  source_chapter: "703F_2024与2026维修手册，PDF第86页；703F_2024与2026维修手册，PDF第87页；LTR125_QJ125T-27E_官方维修手册_英文，PDF第154页"
  source_quote: |
    “可通过仪表、APP 或 OBD 诊断仪读取故障码；排查完电喷故障后，需手动或通过诊断仪清除。”
    "Delete stored ABS fault codes, ensure the battery is fully charged, then test ride above 20 km/h and observe the ABS indicator."
  summary: |
    故障码只负责定位线索：先读取并记录，再按系统检查修复，之后清码，最后在规定电压和触发工况下复验。
    只清码不修复、只换报码部件不复验，都不构成闭环。
  tags: [dtc-lifecycle, clear-code, verification, obd, abs]

- id: f11
  title: "接插件—线路—元件—控制器逐层隔离"
  type: framework
  source_chapter: "SRV300_QJ300-12A_官方维修手册_英文，PDF第176页；368T-G_2024与2026维修保养手册，PDF第47页"
  source_quote: |
    "Inspect whether the plug-in is loose; inspect fault or current data; inspect continuity between sensor and ECU; then measure the sensor voltage."
    “根据故障码检查对应传感器，若线路正常，则可判断传感器故障。”
  summary: |
    电控故障按从外到内的证据链排查：接头状态、供电/搭铁、线路通断与短路、数据流/信号、元件实测，最后才怀疑控制器。
    每一层合格才进入下一层，避免用换 ECU 代替线路诊断。
  tags: [electrical, connector, wiring, sensor, ecu]

- id: f12
  title: "标准值—维修极限双阈值判定"
  type: framework
  source_chapter: "ATR125_QJ125T-23F_官方维修手册_英文，PDF第20页；368踏板_ZT1P79MP发动机维修手册，PDF第10页"
  source_quote: |
    "If any damage is found or the part has exceeded its service limit, it must be replaced."
    “如果油泵任何部位的磨损超过了维修界限值，则应更换整个油泵组件。”
  summary: |
    先按规定条件测量，再同时对照正常标准和维修极限：标准描述健康目标，极限决定继续使用的最后边界。
    处于二者之间的零件需结合损伤形态、趋势和风险处理，不能把标准值与报废线混为一谈。
  tags: [measurement, standard-value, service-limit, replace-decision]

- id: f13
  title: "配合间隙超限后的归因复测"
  type: framework
  source_chapter: "SRV700_QJ700-11A_官方维修手册_英文，PDF第291页；368踏板_ZT1P79MP发动机维修手册，PDF第24页"
  source_quote: |
    "If clearance exceeds the service limit, measure the camshaft journal. Replace the camshaft, then measure the clearance again; if still excessive, replace the cylinder head."
    “配合间隙超过极限时，判断导管和气门杆的磨损量，换磨损量大的零件后复核间隙。”
  summary: |
    两配合件的总间隙超限时，不直接同时换两件；分别测量两侧，先处理主要磨损件，再复测总间隙。
    只有复测仍超限，才把故障归因扩展到另一配合件或总成。
  tags: [clearance, differential-diagnosis, remeasure, mating-parts]

- id: f14
  title: "多点测量取最不利值"
  type: framework
  source_chapter: "368踏板_ZT1P79MP发动机维修手册，PDF第13页；ZT370MU-ADV发动机维修手册，PDF第53页"
  source_quote: |
    “测量几个点，用最大读数和维修界限值比较。”
    “测量摩擦片时，选择四个位置测量；超出规定值则成套更换摩擦片。”
  summary: |
    对圆度、跳动、厚度、间隙等可能不均匀的磨损，不用单点读数代表整件；按规定方位多点测量，并用最大偏差或最小余量与极限比较。
  tags: [measurement, multi-point, worst-case, wear]

- id: f15
  title: "拆卸即取证与洁净隔离"
  type: framework
  source_chapter: "ATR125_QJ125T-23F_官方维修手册_英文，PDF第20页；368踏板_ZT1P79MP发动机维修手册，PDF第33页"
  source_quote: |
    "Store the parts in a clean area and cover them to prevent foreign objects from falling into them before reassembly."
    “拆下活塞后清理顶部积碳，注意不要掉入箱体；拆下零部件清洁吹干后再检查。”
  summary: |
    拆卸过程中保留方向、顺序、磨痕、油迹和线束走向；零件分区存放并封堵开口，清洁吹干后再测量。
    拆卸不是进入维修前的杂务，而是保存故障证据和防止二次污染的阶段。
  tags: [disassembly, evidence-preservation, cleanliness, parts-control]

- id: f16
  title: "复装三门禁：清洁、换新、润滑"
  type: framework
  source_chapter: "450RALLY_维修手册_英文，PDF第7页；703F_2024与2026维修手册，PDF第12页"
  source_quote: |
    "Use new gaskets, O-rings, cotter pins and locking plates. Clean parts when disassembling. Lubricate all sliding surfaces before reassembly."
    “用于密封的 O 型圈、纸垫、铜垫、组件密封圈等装配前务必换新。”
  summary: |
    复装前分别确认结合面洁净、一次性密封/锁止件已换新、滑动和规定螺纹表面按要求润滑或涂胶。
    三项任一缺失，都可能让正确扭矩仍产生泄漏、卡滞或松脱。
  tags: [reassembly, seal, lubrication, cleanliness]

- id: f17
  title: "多紧固件渐进交叉定扭"
  type: framework
  source_chapter: "450RALLY_维修手册_英文，PDF第7页；ATR125_QJ125T-23F_官方维修手册_英文，PDF第21页"
  source_quote: |
    "Start with large diameter or inner bolts, then tighten in diagonal increments to the specified torque."
    "Screw in without applying torque, then tighten in the specified sequence to prevent warping or deformation."
  summary: |
    多螺栓结合面先全部就位，再按厂方顺序或内侧/大径优先、对角交替、分级增扭，最终用合格扭力工具定扭。
    拆卸则先逐个破紧再循环松开，以控制弹簧力和结合面变形。
  tags: [torque, sequence, cross-tightening, distortion-control]

- id: f18
  title: "复装后的静态功能验收"
  type: framework
  source_chapter: "450RALLY_维修手册_英文，PDF第7页；703T_2026维修保养手册，PDF第122页"
  source_quote: |
    "After reassembly, check all parts for proper installation and operation. Route all wires as shown."
    “前轮安装完成后，反复按压制动手柄直至恢复制动效果；检查开关、油门回位及有无压线。”
  summary: |
    定扭不是工序终点。复装后先做目视和手动静态检查：线束/软管走向、转动自由、油门回位、制动压力、开关功能、无干涉和无遗漏。
    静态验收合格后才允许通电、启动或路试。
  tags: [quality-gate, static-check, reassembly, safety]

- id: f19
  title: "基础制动先于 ABS 自诊断"
  type: framework
  source_chapter: "ATR125_QJ125T-23F_官方维修手册_英文，PDF第395页；LTR125_QJ125T-27E_官方维修手册_英文，PDF第159页"
  source_quote: |
    "Do not rely solely on ABS self diagnosis. Check braking performance, brake fluid level and leakage."
    "Inspection before diagnosis: fluid level, leakage, lever/pedal function, pads/discs, wheel rotation and bearing clearance."
  summary: |
    ABS 报警时先确认机械与液压基础制动：液位、泄漏、手柄/踏板、摩擦副、拖滞、轮胎和轮轴状态，再进入轮速信号和液控单元诊断。
    自诊断只能覆盖被监测的电控部分，不能证明基础制动正常。
  tags: [abs, base-brake, prerequisite, safety]

- id: f20
  title: "液压制动排气闭环"
  type: framework
  source_chapter: "450RALLY_维修手册_英文，PDF第50页；703F_2024与2026维修手册，PDF第59页"
  source_quote: |
    "Apply the brake, hold it, loosen the vent screw, lock the screw before release, and repeat until the fluid in the hose is free of air."
    “密切注意主泵液面，放气嘴锁紧后才能松开手柄；重复捏放检查是否恢复正常液压阻力。”
  summary: |
    排气循环固定为“补足液位—缓慢建压并保持—开放气嘴—关紧放气嘴—释放手柄”，持续到无气泡、液体洁净且手感恢复。
    全程防止储液杯见底；ABS 液控单元进气时再执行诊断仪主动排气程序。
  tags: [brake-bleeding, hydraulic, feedback-loop, abs]

- id: f21
  title: "安全系统清码后的动态验证"
  type: framework
  source_chapter: "LTR125_QJ125T-27E_官方维修手册_英文，PDF第154页；450RALLY_维修手册_英文，PDF第51页"
  source_quote: |
    "Ensure the battery is fully charged. Test ride above 20 km/h and observe the ABS indicator; then brake above 30 km/h."
    "After ABS bleed stage 2, repeatedly squeeze the handle and close the drain bolt."
  summary: |
    ABS 等安全系统维修后，先完成液压和静态检查，再清除记录，并在手册规定的电压、车速和制动条件下动态触发自检。
    只有指示灯、制动反馈和故障记录同时正常，才算验收通过。
  tags: [abs, road-test, dynamic-verification, closeout]

- id: f22
  title: "CVT 症状—传力链映射"
  type: framework
  source_chapter: "ZT1P77MP发动机维修手册，PDF第33页；150T-M_D发动机维修手册，PDF第29页"
  source_quote: |
    “加油门后轮不转：检查 V 带、离合器蹄块、从动轮弹簧和齿轮室；高速动力不足：检查 V 带打滑、离合器打滑和离心滚柱磨损。”
    “检查皮带裂纹、断线、掉齿及滚柱失圆；不建议打磨离合器蹄块。”
  summary: |
    将 CVT 看成主动轮变径—皮带传力—从动轮响应—离合器接合—齿轮终传的链条。
    根据“怠速后轮转、起步抖、加速不走、高速无力”等症状定位相应环节，再用皮带宽度、滚柱形态和摩擦面状态验证。
  tags: [cvt, transmission, symptom-map, scooter]

- id: f23
  title: "充电系统四层诊断"
  type: framework
  source_chapter: "703T_2026维修保养手册，PDF第112页；703T_2026维修保养手册，PDF第113页；703F_2024与2026维修手册，PDF第145页"
  source_quote: |
    “排查充电系统前先检查蓄电池及车主的大功率用电习惯。”
    “测蓄电池性能、漏电电流、充电电压，再测磁电机三相电阻与插头线路；最后判断整流器。”
  summary: |
    充电故障按四层推进：蓄电池健康与使用史、熄火漏电、运行充电电压、磁电机/整流器/线路。
    每层都在规定温度、转速和负载下测量，避免把亏电电池直接判成发电机或整流器损坏。
  tags: [charging, battery, leakage-current, stator, rectifier]

- id: f24
  title: "起动系统联锁链诊断"
  type: framework
  source_chapter: "703T_2026维修保养手册，PDF第91页；SRC500_QJ500-8A_官方维修手册_英文，PDF第70页"
  source_quote: |
    “先确保蓄电池和保险正常，并满足解锁、收侧支架、熄火开关运行、按起动按钮等条件；再查继电器、线缆和起动电机。”
    "Starter motor does not run: check main/stop switch, starter lock or gear switch, battery, relay, button, and open/short circuit."
  summary: |
    起动机不转时按能量与许可链排查：电池—保险—电门/熄火开关—制动/离合/空挡/侧支架联锁—按钮—继电器—线缆—起动电机。
    先找哪个节点没有传递许可或电压，再拆起动机。
  tags: [starting, interlock, relay, electrical-chain]

- id: f25
  title: "冷却故障的症状—物理原因树"
  type: framework
  source_chapter: "703T_2026维修保养手册，PDF第99页；450RALLY_维修手册_英文，PDF第143页"
  source_quote: |
    “温度过高：检查温度显示/传感器、节温器、冷却液、堵塞、系统进气、风扇及继电器；泄漏则检查水泵、O 形圈、盖、垫、水管和散热器。”
    "Coolant leakage: water pump, O-ring, radiator cap, head gasket, hose connection, damaged hose or radiator."
  summary: |
    先区分过热、过冷和泄漏三类症状；再按测温真实性、液量、循环、散热、增压密封和风扇控制建立原因树。
    这样能把电气控制、流体循环和机械密封分开验证。
  tags: [cooling, overheating, leakage, fault-tree]

- id: f26
  title: "冷却系统的排气—升温—回查闭环"
  type: framework
  source_chapter: "ATR125_QJ125T-23F_官方维修手册_英文，PDF第91页；703T_2026维修保养手册，PDF第38页"
  source_quote: |
    "Run at 3000–4000 rpm until no more bubbles are visible, tap hoses, refill, heat until the fan turns on, cool down, then recheck the expansion tank."
    “重复加油放油、补冷却液，直至液面不再下降；水温上升至 90℃以上后完成加注。”
  summary: |
    冷却液加注后必须通过规定转速排气、软管扰动、持续补液、升温至节温器/风扇工作，再冷却回查副水箱液位。
    热态正常而冷却后液位下降，说明闭环尚未完成或仍有泄漏/残余空气。
  tags: [cooling, air-purge, thermal-cycle, verification]

- id: f27
  title: "燃油系统维修的泄压—封堵—检漏闭环"
  type: framework
  source_chapter: "SRV300V_QJ300-12_官方维修手册_英文，PDF第133页；350T_国四维修手册，PDF第17页"
  source_quote: |
    "Relieve fuel pressure; block the hose after removal; after maintenance verify hoses and clamps, then perform the fuel leakage inspection process."
    “检查压力传感器时先看针脚；连接诊断仪读取参数，并与当地大气压比较。”
  summary: |
    燃油作业先消除压力和火源风险，断开后立即封堵并保护开口；复装核对接头/卡箍，通电建压后检漏。
    传感器诊断则用环境基准或机械压力表交叉验证数据流，不凭报码直接换件。
  tags: [fuel-system, pressure-relief, leak-test, sensor-validation]

- id: f28
  title: "悬挂调节的基准化与左右对称"
  type: framework
  source_chapter: "450RALLY_维修手册_英文，PDF第69页；703T_2026维修保养手册，PDF第124页"
  source_quote: |
    "Set rebound from the hardest position by 10 clicks; make sure each adjuster stops at a click and left and right ends are at the same position."
    “调节前减震器时不要超出极限，左、右减震器的预紧力应调到相同位置。”
  summary: |
    调悬挂前先回到手册定义的硬端/标准点击数并记录基线；左右前叉保持相同位置，每次只改变一个维度并记录点击数和路感。
    调节后做回弹顺畅、紧固和干涉检查，禁止越过调节器机械极限。
  tags: [suspension, baseline, symmetry, iterative-adjustment]
