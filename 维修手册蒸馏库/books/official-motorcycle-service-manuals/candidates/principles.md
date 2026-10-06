- id: p01
  title: 先核对手册版本与实车差异
  type: rule
  source_chapter: 703F_2024与2026维修手册，PDF第2页
  source_quote: |
    "本手册中收集的全部资料、插图、照片等均是按21寸ZT703-F国Ⅳ高配版进行编制。但由于产品的不断改进提高，以及其它方面的改变，因此您的摩托车可能与本手册存在某些不一致的地方。"
  summary: |
    手册数据只有在车型、排放版本和年款一致时才可直接使用；发现实车差异时，先回查厂方最新零件编码和版本资料。
  tags: [rule, applicability, model-version, zontes-adv]

- id: p02
  title: 使用规定的专用和公制工具
  type: principle
  source_chapter: 450RALLY_维修手册_英文，PDF第7页
  source_quote: |
    "Use special tools designed for this product to avoid damage and incorrect assembly. Use only metric tools when servicing the motorcycle."
  summary: |
    拆装和测量应优先使用手册规定的专用工具及公制工具，防止零件损伤、误装和测量失真。
  tags: [principle, tools, metric, kove-adv]

- id: p03
  title: 密封件装配前一律换新
  type: rule
  source_chapter: 368T-G_2024与2026维修保养手册，PDF第12页
  source_quote: |
    "用于密封的O型圈、纸垫、铜垫、组件密封圈等装配前务必换新。"
  summary: |
    拆过的密封件不以外观完好作为复用依据；复装前更换新品，降低渗油、漏水和漏气风险。
  tags: [rule, sealing, reassembly, zontes-scooter]

- id: p04
  title: 扭矩紧固必须用合格扭矩扳手
  type: rule
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第21页
  source_quote: |
    "If the wrong torque is applied to a bolt, nut, or screw, it may cause serious damage. So it is necessary to use a high-quality torque wrench to tighten the fasteners according to the specified torque."
  summary: |
    有扭矩要求的紧固件必须使用合格扭矩扳手，并按对应车型手册的规定值紧固，不能仅凭手感。
  tags: [rule, torque, tool-control, qjmotor-scooter]

- id: p05
  title: 多螺栓按内侧或大径起步并对角分步紧固
  type: checklist
  source_chapter: LTM125_QJ125T-27F_官方维修手册_英文，PDF第17页
  source_quote: |
    "When tightening bolts or nuts, begin with the larger diameter or inner bolt first, and then tighten to the specified torque diagonally in incremental steps, unless otherwise specified."
  summary: |
    无另行规定时，多点紧固先从内侧或大直径紧固件开始，再按对角顺序逐级达到规定扭矩。
  tags: [checklist, torque-sequence, fasteners, qjmotor-scooter]

- id: p06
  title: 清洗拆下件并润滑滑动面后再装配
  type: principle
  source_chapter: 450RALLY_维修手册_英文，PDF第7页
  source_quote: |
    "Clean parts with cleaner when disassembling. Lubricate all sliding surfaces before reassembly."
  summary: |
    复装前先清除拆下件的污物，再按规定润滑所有滑动和配合表面，避免杂质磨损与干摩擦启动。
  tags: [principle, cleaning, lubrication, kove-adv]

- id: p07
  title: 复装完成必须做安装与功能确认
  type: rule
  source_chapter: 450RALLY_维修手册_英文，PDF第7页
  source_quote: |
    "After reassembly, check all parts for proper installation and operation."
  summary: |
    装回零件不是工序终点；必须逐项确认位置、固定状态和功能均正常后，维修任务才算完成。
  tags: [rule, post-assembly, function-check, kove-adv]

- id: p08
  title: 线束按原路径布置且控制拉索不得扭折
  type: checklist
  source_chapter: 450RALLY_维修手册_英文，PDF第7页
  source_quote: |
    "Route all wires as shown in the cable and cableway wiring. Do not bend or twist control cables. Damaged control cables will not work properly and may become stuck or tangled."
  summary: |
    线束和拉索须恢复厂方路径、夹点及弯曲状态；禁止强弯或扭转控制拉索，以免卡滞和操纵失效。
  tags: [checklist, wiring-route, control-cable, kove-adv]

- id: p09
  title: 磨合配对件必须成组保管和处置
  type: rule
  source_chapter: SRV550ST_QJ500-11D_官方维修手册_英文，PDF第13页
  source_quote: |
    "Always keep the matching parts together, among which gears, cylinders, pistons, and other parts, whose surface have been coupled owing to the normal operating wear. The matching parts must always be reused/replaced collectively."
  summary: |
    齿轮、气缸、活塞等已经磨合配对的零件，拆卸后不得混放；复用或更换时按配对关系成组处理。
  tags: [rule, matched-parts, parts-control, qjmotor-cruiser]

- id: p10
  title: 拆下件按拆卸顺序清洁和存放
  type: checklist
  source_chapter: SRV550ST_QJ500-11D_官方维修手册_英文，PDF第13页
  source_quote: |
    "During the disassembly operations, clean all parts and position them in a container following the disassembly order. This will make the reassemble operations easier and allow a correct installation of all parts."
  summary: |
    拆卸过程同步完成清洁、分组和顺序化存放，用容器保留原装配关系，减少漏装、错装和方向错误。
  tags: [checklist, disassembly-order, parts-storage, qjmotor-cruiser]

- id: p11
  title: 发动机维修时垫片油封和O形圈全部换新
  type: rule
  source_chapter: SRV550ST_QJ500-11D_官方维修手册_英文，PDF第14页
  source_quote: |
    "Always replace all gaskets, oil seals, and O-rings during the engine repairing interventions. The surfaces of gaskets, the oil seal lips, and the O-rings must be always cleaned."
  summary: |
    发动机内部维修时，垫片、油封和 O 形圈全部换新，并在装配前清洁密封面及密封唇。
  tags: [rule, engine, seals, qjmotor-cruiser]

- id: p12
  title: 燃油系统作业执行断电通风禁火
  type: checklist
  source_chapter: MTX125_QJ125T-23H_官方维修手册_英文，PDF第128页
  source_quote: |
    "The electric door lock must be turned off! Disconnect battery negative (-). No smoking! It must be ensured that the above operations are performed in a well-ventilated area, and any fire source or spark is strictly prohibited."
  summary: |
    拆修燃油系统前关闭点火、断开电瓶负极，保持作业区通风，并消除吸烟、明火、电火花等点火源。
  tags: [checklist, fuel-safety, battery, qjmotor-scooter]

- id: p13
  title: 燃油系统复装后先检漏再启动
  type: rule
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第133页
  source_quote: |
    "Before the engine runs, follow the Fuel Leak Inspection Process to check for leaks."
  summary: |
    油管、油箱或油泵完成复装后，必须先按规定流程确认无泄漏，才能启动发动机。
  tags: [rule, fuel-leak, post-assembly, qjmotor-scooter]

- id: p14
  title: 维修路试只能在安全交通条件下进行
  type: rule
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第66页
  source_quote: |
    "If it is necessary to test ride a motorcycle during the inspection process, make sure to do so in a safe place with traffic conditions."
  summary: |
    只有在场地、交通和车辆当前状态均允许时才进行维修路试；不能把公共道路当作无条件诊断场地。
  tags: [rule, road-test, safety, qjmotor-scooter]

- id: p15
  title: ABS插接件操作前关闭点火且禁止冲水撞击拆解
  type: checklist
  source_chapter: LTM125_QJ125T-27F_官方维修手册_英文，PDF第182页
  source_quote: |
    "Turn the ignition switch to OFF before the ABS electrical connector is disconnected. Do not spray water on electrical parts, ABS parts, joints, wires and electric wires. Do not hit the ABS parts with a hammer or drop the ABS parts on a hard surface."
  summary: |
    ABS 作业须先关闭点火；插接件、液压单元和线束不得冲水、敲击或跌落，控制单元不得擅自拆解。
  tags: [checklist, abs, electrical-safety, qjmotor-scooter]

- id: p16
  title: 传动皮带禁止反折扭曲卷绕和挤压
  type: checklist
  source_chapter: SRV700_QJ700-11A_官方维修手册_英文，PDF第87页
  source_quote: |
    "Do not excessively twist or bend the belt backwards. Do not reverse or wind the belt. Do not squeeze the belt."
  summary: |
    同步传动皮带在拆卸、搬运和存放中保持自然曲率，不得反折、过度扭曲、卷绕或挤压。
  tags: [checklist, drive-belt, handling, qjmotor-cruiser]

- id: p17
  title: 不确定制动液类型时必须整路更换
  type: rule
  source_chapter: SRV700_QJ700-11A_官方维修手册_英文，PDF第92页
  source_quote: |
    "If you need to add brake fluid but are not sure about the type and brand of brake fluid in the brake fluid reservoir, you must replace the brake fluid in the brake fluid tube. After replacing brake fluid, use only brake fluid of the same type and brand."
  summary: |
    无法确认储液罐内制动液的类型和品牌时，不能直接补加；应先更换整路制动液，之后只使用同类型同品牌液体。
  tags: [rule, brake-fluid, compatibility, qjmotor-cruiser]

- id: p18
  title: 不同制动液不得混用且严防进水
  type: principle
  source_chapter: SRV700_QJ700-11A_官方维修手册_英文，PDF第128页
  source_quote: |
    "The mixture of different brake fluids may cause harmful chemical reactions and thus result in the reduction of brake system performance. When adding brake fluid, be careful not to allow any water to enter the container."
  summary: |
    制动液补充和更换必须保持规格与品牌一致，同时避免水分进入，防止沸点下降和制动性能劣化。
  tags: [principle, brake-fluid, contamination, qjmotor-cruiser]

- id: p19
  title: 恶劣工况缩短保养周期
  type: rule
  source_chapter: 450RALLY_PRO_赛用手册_英文，PDF第37页
  source_quote: |
    "When driving in dusty areas, such as deserts or grounds, the air filter element needs to be changed or cleaned daily. The motorcycle maintenance interval should be reduced by 50% when the motorcycle is frequently used in harsh conditions."
  summary: |
    保养周期不是固定上限；沙尘、越野等恶劣工况下应每日处理空滤，并把常规维护间隔缩短一半。
  tags: [rule, maintenance-interval, harsh-use, kove-adv]

- id: p20
  title: 链条与磨损链轮应成套更换
  type: rule
  source_chapter: 450RALLY_PRO_赛用手册_英文，PDF第42页
  source_quote: |
    "Using a new drive chain on a worn sprocket will accelerate chain wear, and both the drive chain and sprocket should be replaced at the same time."
  summary: |
    若链轮已经磨损，不得只换新链条；链条与链轮应成套更换，以免新链条快速异常磨损。
  tags: [rule, chain, sprocket, kove-adv]

- id: p21
  title: 制动液只用新开封液体并尽快查因
  type: checklist
  source_chapter: 450RALLY_PRO_赛用手册_英文，PDF第40页
  source_quote: |
    "Use only brake fluid freshly removed from the sealed container, and if you add brake fluid, have the brake system checked by a Kove repair shop as soon as possible."
  summary: |
    制动液只能取自新开封容器；需要补液本身就是检查泄漏、磨损和系统状态的信号，不能只补不查。
  tags: [checklist, brake-fluid, sealed-container, kove-adv]

- id: p22
  title: 节气门传感器不得无证据拆卸
  type: rule
  source_chapter: 368T-G_2024与2026维修保养手册，PDF第47页
  source_quote: |
    "若怠速异常、容易熄火且排除火花塞、高压线圈导致时才需拆下传感器排查。正常情况下不应拆卸。"
  summary: |
    节气门体传感器只有在症状成立且已排除火花塞、高压线圈等外围原因后才拆检，正常状态不作预防性拆卸。
  tags: [rule, throttle-body, evidence-first, zontes-scooter]

- id: p23
  title: 电控功能测试先满足电压前提
  type: rule
  source_chapter: 703F_2024与2026维修手册，PDF第84页
  source_quote: |
    "先检查车辆电压是否大于13.5V，电压不足则等电压至13.5以上测试加热功能。"
  summary: |
    判断电子加热等负载功能前，先验证供电电压达到手册规定条件；前提不满足时不能据测试结果判定部件损坏。
  tags: [rule, diagnostic-precondition, voltage, zontes-adv]

- id: p24
  title: 传感器故障按外观电阻数据流线路顺序排查
  type: checklist
  source_chapter: 703F_2024与2026维修手册，PDF第97页
  source_quote: |
    "在报氧传感器信号故障时，需要使用诊断仪读取发动机参数进行判断，选择当前车型匹配的电喷系统进入；如电压长时间不变，需要关机，将ECU插头取下检查插针。之后用万用表检查线路是否连通。"
  summary: |
    氧传感器类故障先查外观和插接，再测元件电阻、读取匹配车型的数据流，最后断电检查 ECU 端子与线路；不凭故障码直接换件。
  tags: [checklist, efi, oxygen-sensor, zontes-adv]

- id: p25
  title: 新制动盘或制动片先贴合再行驶
  type: checklist
  source_chapter: 703F_2024与2026维修手册，PDF第55页
  source_quote: |
    "刚更换新的制动盘或制动片后不得马上行驶。务必抓放几次制动手柄或踏板，让制动盘和制动片充分贴合，恢复正常的握紧力，并使制动液稳定循环。"
  summary: |
    更换盘或片后，车辆移动前先反复操作制动手柄或踏板，建立正常行程和压力，并预留新件磨合所需的更长制动距离。
  tags: [checklist, brake-bedding, pre-ride, zontes-adv]

- id: p26
  title: 缸头紧固件对角分次松紧
  type: checklist
  source_chapter: 350系列_ZT184MP发动机维修手册，PDF第13页
  source_quote: |
    "螺母必须对角均匀拧松，并且每个螺母每次松开1/3，在全部的螺母都彻底松开之后再取下。螺母安装时需要分4次对角均匀拧紧。"
  summary: |
    缸头螺母拆卸时对角、等量、分次释放夹紧力；安装时按规定级次和扭矩对角均匀上紧，防止缸头变形。
  tags: [checklist, cylinder-head, staged-torque, zontes-adv]

- id: p27
  title: 活塞与气缸必须按分组选配
  type: rule
  source_chapter: 350系列_ZT184MP发动机维修手册，PDF第21页
  source_quote: |
    "活塞部装组件和活塞分为A、B、C三组，组装到一起的活塞与气缸必须为同一组别。"
  summary: |
    活塞和气缸的选配受 A/B/C 尺寸组约束；装配前必须核对分组标记，不能只按零件名称或排量混装。
  tags: [rule, piston-cylinder, grading, zontes-adv]

- id: p28
  title: 凸轮轴装配锁定正时并按序预紧
  type: checklist
  source_chapter: ZT370MU-ADV发动机维修手册，PDF第21页
  source_quote: |
    "凸轮轴座盖螺栓必须按照顺序先预紧2-3螺牙后均匀拧紧，否则会损坏缸头。安装凸轮轴时不要转动曲轴，否则会改变正时，损坏缸头。"
  summary: |
    凸轮轴座盖先按规定顺序带入螺纹，再均匀紧固；凸轮轴就位期间保持曲轴不动，避免正时改变和机械干涉。
  tags: [checklist, camshaft, timing, zontes-adv]

- id: p29
  title: 气门机构配合件装回原位
  type: rule
  source_chapter: ZT370MU-ADV发动机维修手册，PDF第40页
  source_quote: |
    "每个调整垫和气门挺柱、气门摇臂、气门摇臂轴都必须重新安装在原来的位置。"
  summary: |
    调整垫、挺柱、摇臂和摇臂轴拆卸时逐件标记位置，复装时回到原配位置，不能互换。
  tags: [rule, valve-train, position-control, zontes-adv]

- id: p30
  title: 废油废液和蓄电池交资质机构处置
  type: rule
  source_chapter: 368T-G_2024与2026维修保养手册，PDF第12页
  source_quote: |
    "更换下来的各类油、液、蓄电池等需统一回收后交给有资质的机构处理；禁止随意倾倒污染环境或水源。"
  summary: |
    维修产生的废机油、冷却液、制动液和蓄电池应分类回收并交由有资质机构处理，不得进入土壤、下水道或水源。
  tags: [rule, waste-disposal, workshop-safety, zontes-scooter]
