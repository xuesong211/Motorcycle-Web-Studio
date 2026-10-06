export type WorkshopTool = {
  id: string;
  number: string;
  name: string;
  position: string;
  scenario: string;
  function: string;
  keyPoint: string;
};

export type ToolAtlasSection = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  asset: string;
  tools: readonly WorkshopTool[];
};

const positions = ['0% 0%', '50% 0%', '100% 0%', '0% 50%', '50% 50%', '100% 50%', '0% 100%', '50% 100%', '100% 100%'] as const;

const basicTools: readonly WorkshopTool[] = [
  ['wrench', '扳手', '车架、发动机外盖、卡钳支架等六角紧固件。', '传递旋转力；开口端便于侧向进入，梅花端包覆更多受力面。', '确认对边尺寸和受力方向，优先用贴合的套筒或梅花端。'],
  ['screwdriver', '螺丝刀', '覆盖件、灯具、开关和线束夹上的槽型螺钉。', '用一字、Phillips、JIS、内六角或 Torx 刀头传递扭矩。', '刀头满槽、保持同轴；日系旧车先分清 JIS 与 Phillips。'],
  ['hammer', '手锤', '允许轻敲定位，或配合冲子作业。', '平头端传递冲击，圆头端用于规定的整形辅助。', '确认受力点和背面支撑；不直敲轴承、螺纹或密封面。'],
  ['pliers', '手钳', '夹持小件、弯折锁线、处理开口销和卡箍。', '钳口夹持，侧刃剪切适用的软金属线。', '普通手钳不能替代扳手、压接钳或端子退针器。'],
  ['ruler', '钢直尺', '长度、间距与直线度的初筛，例如链条松弛量。', '提供直边基准与毫米刻度，用于筛查和划线。', '从零刻线读数；弯曲、毛刺和视差都会引入误差。'],
  ['divider', '外卡钳', '轴径、垫片厚度等外部尺寸的比较测量。', '把工件尺寸转移到钢直尺或其他量具读取。', '只用于比较；接近限值时用千分尺或指定量具复核。'],
  ['square', '角尺', '支架、工装和加工边缘的直角关系检查。', '以直角边为基准，通过贴合或透光缝隙判断偏斜。', '清洁接触面；它不能替代车架几何定位数据。'],
  ['feeler-gauge', '厚薄规', '气门、火花塞和规定平面缝隙的检查。', '用标称厚度钢片或组合钢片判断间隙。', '按手册温度和位置测量，以轻微均匀拖曳感判定。'],
  ['vernier-caliper', '游标卡尺', '外径、内径、深度、台阶尺寸的快速测量。', '外测爪、内测爪和深度尺合用，覆盖多种几何尺寸。', '清洁调零、保持同轴、多点复测；近限值时换指定量具。'],
].map(([id, name, scenario, functionText, keyPoint], index) => ({ id, number: String(index + 1).padStart(2, '0'), name, position: positions[index], scenario, function: functionText, keyPoint }));

const fasteningTools: readonly WorkshopTool[] = [
  ['socket-ratchet', '套筒棘轮组', '批量拆装空间受限的标准六角紧固件。', '棘轮提供往复驱动，套筒完整包覆螺母受力面。', '确认方头、套筒深度与公英制；普通套筒不能上冲击工具。'],
  ['torque-wrench', '扭矩扳手', '安全关键紧固件和手册规定的定扭工序。', '把紧固件拧至规定扭矩或配合角度工艺。', '目标值选在量程中段，咔哒后立即停；不用来松顽固螺栓。'],
  ['breaker-bar', '加力杆', '松动高扭矩、锈蚀但允许拆卸的紧固件。', '用较长力臂稳定施力，减少对棘轮机构的损害。', '确认螺纹方向和受力路径；不用于复装定扭。'],
  ['impact-wrench', '冲击扳手', '按工艺允许的高扭矩拆卸或初步旋入。', '脉冲冲击帮助克服静摩擦，搭配冲击套筒使用。', '不得替代扭矩扳手；远离薄壁件、精密螺纹和塑料件。'],
  ['hex-torx-keys', '内六角与 Torx 扳手', '车把夹座、发动机盖、制动与电气部件的内凹紧固件。', '以完整截面传递扭矩，短臂用于受限空间。', '必须全插到底；球头仅用于斜角带入，不能承受大扭矩。'],
  ['bit-driver', '批头起子', '不同槽型螺钉的快速换头拆装。', '用可更换批头覆盖一字、十字、内六角与 Torx 槽型。', '选完全匹配批头，磨圆或打滑的批头立即更换。'],
  ['bolt-extractor', '断螺栓取出器', '断裂或圆角紧固件的受控拆除。', '在正确预钻孔或套筒咬合后反向施力取出残件。', '先查残件位置和螺纹深度；过度施力会让取出器折断。'],
  ['tap-die', '丝锥板牙组', '修复或清理完好的内外螺纹。', '按正确螺距校正轻微损伤与污物，恢复配合。', '不能把修牙当成无条件复用；受力螺纹损坏需按手册判定。'],
  ['thread-chaser', '螺纹锉', '外露螺纹起牙、轻微磕碰的清理。', '用对应牙距逐牙修整变形牙顶。', '先确认牙距；不得削弱螺纹或替代更换紧固件。'],
].map(([id, name, scenario, functionText, keyPoint], index) => ({ id, number: String(index + 1).padStart(2, '0'), name, position: positions[index], scenario, function: functionText, keyPoint }));

const precisionTools: readonly WorkshopTool[] = [
  ['micrometer', '外径千分尺', '活塞、轴颈、垫片等精密外径的判定。', '恒力测砧给出高重复性外径读数。', '用标准杆核零，使用棘轮恒力；避免手温和毛刺干扰。'],
  ['dial-indicator', '百分表', '制动盘、轮辋、轴和端面的跳动检查。', '将微小位移放大为表盘读数，记录最大最小差。', '测头需预压，表座应固定在不随工件移动的基准上。'],
  ['magnetic-base', '磁性表座', '为百分表提供刚性、可调的安装基座。', '磁力底座锁在铁磁性基准面上，万向臂定位测头。', '确认吸附面干净且不移动；铝件需要夹具替代。'],
  ['bore-gauge', '量缸表', '气缸、轴承孔的内径、锥度和圆度趋势。', '以千分尺设基准，摆动寻找最小读数差。', '按多高度多方向记录；没有基准不能把读数当绝对尺寸。'],
  ['telescoping-gauge', '伸缩内径规', '孔径的比较测量和初步内径取样。', '锁定伸缩测头后转移到千分尺读取。', '需反复摆动找最大跨距；精度判定应使用指定内径量具。'],
  ['thread-pitch-gauge', '螺距规', '识别螺栓、拉拔器和接头的牙距。', '用齿形片与螺纹贴合，快速辨认牙距系列。', '先清洁螺纹；识别结果仍要核对直径、旋向和手册接口。'],
  ['straight-edge', '刀口直尺', '检查缸盖、箱体等平面的直线度趋势。', '高直线度工作边配合塞尺观察局部缝隙。', '需按手册规定方向和位置检查；不可用普通尺替代精密直边。'],
  ['radius-gauge', '圆角规', '识别倒角、圆角和局部轮廓是否明显不符。', '用半径片贴合工件曲面进行比较。', '它只做轮廓比对，不能替代图纸公差或坐标测量。'],
  ['depth-gauge', '深度规', '测孔深、台阶深度和沉孔位置。', '以基准面支承，通过测杆读取垂直深度。', '基准面要洁净平整，测杆应垂直且多点复核。'],
].map(([id, name, scenario, functionText, keyPoint], index) => ({ id, number: String(index + 1).padStart(2, '0'), name, position: positions[index], scenario, function: functionText, keyPoint }));

const engineTools: readonly WorkshopTool[] = [
  ['spark-socket', '火花塞套筒', '狭窄火花塞井内的拆装。', '薄壁长套筒支撑火花塞六角，磁吸或胶圈辅助取出。', '先清洁井口；安装时先手旋入，防止斜牙。'],
  ['compression-tester', '气缸压力表', '判断气缸密封状态和缸间差异。', '在统一起动条件下记录压缩压力。', '节气门位置、电池状态和温度按手册统一，单次读数不能直接换件。'],
  ['leak-down-tester', '气缸泄漏测试仪', '区分气门、活塞环和缸垫等泄漏路径。', '向上止点气缸供气，比较调压前后压力并听漏点。', '必须固定曲轴防转；测试压力和操作条件以手册为准。'],
  ['valve-spring-compressor', '气门弹簧压缩器', '拆装气门锁片、弹簧和油封。', '受控压缩弹簧，释放锁片位置。', '确认缸盖稳定和弹簧受力轴线；防止锁片弹出。'],
  ['ring-compressor', '活塞环压缩器', '把带活塞环的活塞装入气缸。', '均匀收紧活塞环，避免环口刮伤缸壁。', '环口方向、活塞朝向和缸口倒角必须符合手册。'],
  ['ring-expander', '活塞环扩张钳', '拆装活塞环，降低手掰造成的变形风险。', '受控、均匀地张开活塞环。', '只张开到越过活塞所需程度，避免过伸和扭曲。'],
  ['flywheel-puller', '飞轮拉拔器', '按接口拆卸转子或飞轮。', '以正确螺纹和中心顶杆轴向施力。', '核对直径、螺距和左右旋；禁止螺丝刀卡齿或锤击转子。'],
  ['clutch-holder', '离合器固定工具', '拆装离合器毂、压盘等旋转组件。', '在设计受力点锁止组件，抵抗规定扭矩。', '按手册选工具号；不以撬棒或冲击替代锁止。'],
  ['case-splitter', '曲轴箱分离器', '分离规定结构的两半曲轴箱。', '通过均匀、可控的顶推力打开定位配合面。', '先查隐藏紧固件和定位销；不能用楔子损伤密封面。'],
].map(([id, name, scenario, functionText, keyPoint], index) => ({ id, number: String(index + 1).padStart(2, '0'), name, position: positions[index], scenario, function: functionText, keyPoint }));

const chassisTools: readonly WorkshopTool[] = [
  ['tire-gauge', '胎压表', '轮胎冷态压力和维护检查。', '读取胎压，辅助判断充气状态。', '按整车手册和载荷条件测量；胎侧最大值不等于推荐胎压。'],
  ['tire-levers', '撬胎棒与护圈', '人工拆装轮胎、内胎维护。', '分段撬起胎唇，护圈减少轮辋划伤。', '先完全泄压并使用适配润滑剂；不用螺丝刀代替。'],
  ['bead-breaker', '胎唇分离器', '将轮胎胎唇从轮辋座上安全分离。', '以受控压力压下胎唇，降低手工损伤风险。', '确认工具位置避开传感器和制动盘；不能夹压轮辋边缘。'],
  ['wheel-stand', '车轮校正架', '辐条轮跳动检查与调整。', '支撑车轮旋转，配合百分表观察径向和端面跳动。', '分步小幅调整辐条；过度一次调整会引入新的偏摆。'],
  ['chain-breaker', '截链器', '按规格分离旧传动链。', '顶针沿销轴方向推出链销。', '链条、顶针与支撑座必须匹配；顶针偏斜立即停止。'],
  ['chain-riveter', '链条铆接器', '压装接头外链片并成形铆接销。', '使用压片和铆接模头完成接头成形。', '按链条厂商尺寸验收，不能把销端压平或凭手感判断。'],
  ['chain-aligner', '链条对齐工具', '链轮与后轮定位后的传动线检查。', '以基准杆观察前后链轮是否共面。', '不可只看摆臂刻度；还需按车型方法核对后轴位置。'],
  ['brake-bleeder', '制动排气器', '更换制动液、排除油路空气。', '通过负压或压力方式辅助流体连续排出。', '储液罐不得见底，介质规格和 ABS 流程遵守手册。'],
  ['fork-seal-driver', '前叉油封驱动器', '安装前叉油封与衬套。', '让安装力作用在油封外壳指定部位。', '尺寸要与前叉匹配，保护内管、密封唇口和滑动面。'],
].map(([id, name, scenario, functionText, keyPoint], index) => ({ id, number: String(index + 1).padStart(2, '0'), name, position: positions[index], scenario, function: functionText, keyPoint }));

const diagnosticTools: readonly WorkshopTool[] = [
  ['multimeter', '数字万用表', '电压、压降、电阻、通断等基础电气诊断。', '测量回路电学状态，辅助分段定位。', '测电阻前断电；确认插孔和量程，电流档不能跨接电池。'],
  ['current-clamp', '直流电流钳', '起动回路、充电回路的大电流检查。', '夹在单根导线上非接触读取直流电流。', '先归零并确认方向；钳口必须完全闭合。'],
  ['oscilloscope', '示波器', '传感器、点火、喷油和通信波形诊断。', '显示电信号随时间的变化和异常。', '确认探头衰减、接地方式和量程，先核对工况与时间基准。'],
  ['backprobe', '背探针组', '连接器不拆开的在线信号测量。', '从线束后方接触端子，保留回路连接状态。', '优先原厂转接线；避免撑大端子、刺穿防水层或短路相邻针脚。'],
  ['diagnostic-scanner', '诊断仪', '支持车型的报码读取、数据流和特殊功能。', '识别控制模块并保存故障与实时数据。', '先记录报码和状态再清码；功能覆盖、软件版本和车型必须匹配。'],
  ['fuel-gauge', '燃油压力表', '燃油供给压力、保持性和工况波动检查。', '通过耐燃油接头读取供油系统压力。', '远离火源，先泄压并准备接液；压力目标以车型手册为准。'],
  ['cooling-tester', '冷却系统压力测试器', '冷却回路和压力盖的密封检查。', '在规定压力下观察压降并辅助找漏。', '仅在发动机冷却后操作；先排除测试接头自身泄漏。'],
  ['battery-maintainer', '蓄电池维护电源', '诊断、学习或更新过程中的稳定供电。', '按规格保持或补充低压蓄电池电量。', '按电池类型选模式；普通充电器未必能替代编程维护电源。'],
  ['injector-tester', '喷油器脉冲测试器', '喷油器驱动脉冲与线束的辅助确认。', '以对应接口显示或模拟控制脉冲。', '测试方法必须匹配控制系统；不对 ECU 信号线随意施加外部电源。'],
].map(([id, name, scenario, functionText, keyPoint], index) => ({ id, number: String(index + 1).padStart(2, '0'), name, position: positions[index], scenario, function: functionText, keyPoint }));

const auxiliaryTools: readonly WorkshopTool[] = [
  ['snap-ring-pliers', '卡簧钳', '轴用或孔用卡簧的拆装。', '以匹配钳尖压缩或撑开卡簧，释放其槽内预紧。', '先确认内外卡簧和直、弯嘴；佩戴护目镜，防止卡簧弹出。'],
  ['safety-wire-pliers', '保险锁线钳', '需要安全锁线的紧固件工艺。', '扭绞锁线并使其沿防松方向持续受力。', '仅按工艺规定使用；锁线不能替代规定扭矩和正确紧固。'],
  ['crimp-tool', '端子压接钳', '线束端子维修与新端子制作。', '用匹配模具压接导体区和绝缘支承区。', '端子、线径和模具必须匹配；压后检查拉力与端子锁止。'],
  ['terminal-extractor', '端子退针器', '防水连接器和端子维修。', '释放端子锁舌，让端子从壳体中无损退出。', '先解除二次锁；不能硬拉导线或撑大端子接触簧片。'],
  ['wire-stripper', '剥线钳与剪线钳', '线束修复和端子前处理。', '定长剥除绝缘层，并平整剪断导线。', '不能伤及导体；导线截面积须满足原回路要求。'],
  ['solder-heat', '烙铁与热风枪', '工艺允许的线束焊接和热缩密封。', '受控加热焊点、热缩管和防护套。', '温度应匹配材料；避免灼伤相邻部件或超出原厂修复工艺。'],
  ['cable-luber', '拉线注油器', '适用机械拉线的维护。', '使指定润滑剂沿拉线芯均匀进入线管。', '带内衬或密封的拉线，应先查厂家是否允许润滑。'],
  ['punch-set', '冲子与漂移冲', '定位、拆装销轴和辅助敲击。', '将冲击集中在销轴或指定区域。', '钉冲和漂移冲不能混用；保持垂直，防止打偏损伤零件。'],
  ['trim-scraper', '塑料撬棒与垫片刮刀', '拆护板、清理旧垫片和密封胶残留。', '撬开卡扣或清除指定结合面上的残留。', '先确认隐藏卡扣；避免划伤密封面、漆面和塑料件。'],
].map(([id, name, scenario, functionText, keyPoint], index) => ({ id, number: String(index + 1).padStart(2, '0'), name, position: positions[index], scenario, function: functionText, keyPoint }));

const workshopTools: readonly WorkshopTool[] = [
  ['lift-table', '摩托车举升台', '释放车轮、悬挂或发动机载荷的受控维修。', '以额定载荷举升整车并提供作业高度。', '锁止机构到位、绑带固定、地面平整；不可只靠液压悬空。'],
  ['front-stand', '前撑', '前轮、前叉和转向部件维修。', '在前叉底部或转向柱合适位置稳定支撑前部。', '支撑点和车型必须匹配；先确认后部稳定和重心变化。'],
  ['rear-stand', '后撑', '后轮、链条和后制动维护。', '通过摇臂/后轴适配点举升后部。', '钩杯位置正确、地面防滑；抬升前确认车辆姿态稳定。'],
  ['wheel-chock', '前轮固定架', '举升或停放时限制前轮滚动与倾倒。', '夹持前轮并提供稳定的纵向定位。', '轮胎尺寸应匹配，仍需按工况增加绑带固定。'],
  ['hydraulic-jack', '液压千斤顶', '局部顶升发动机或底盘指定受力点。', '通过液压缸提供短行程举升。', '使用橡胶垫和手册规定支点；不可顶薄壁壳体或代替长期支撑。'],
  ['tie-downs', '棘轮绑带', '举升台或运输状态下固定整车。', '以额定拉力把车辆约束在安全支点。', '避开线束、油管和尖角，压缩悬架适度并复核挂钩锁止。'],
  ['drain-pan', '接油盘', '更换机油、冷却液及其他旧液收集。', '接住并转移废液，减少混用与外溢。', '按介质分容器、保护地面，旧液按当地规范处置。'],
  ['fluid-extractor', '真空抽液器', '从适用储液罐或孔位抽取规定液体。', '通过手动或真空负压抽吸流体。', '确认软管耐介质，避免把不相容油液混用或误吸密封件。'],
  ['parts-tray', '零件盘与检视镜', '拆装过程的零件归类、遗失防护与隐蔽面检查。', '磁性盘收纳小紧固件，检视镜观察不易直视区域。', '标注方向和拆卸顺序；镜检只是辅助，不能替代规定测量。'],
].map(([id, name, scenario, functionText, keyPoint], index) => ({ id, number: String(index + 1).padStart(2, '0'), name, position: positions[index], scenario, function: functionText, keyPoint }));

const specialtyTools: readonly WorkshopTool[] = [
  ['bearing-separator', '轴承分离器', '从轴肩附近拆下轴承或齿轮。', '两半分离器贴近套圈并为拉拔器提供受力面。', '力必须作用在需要拆下的套圈；保持同轴，防止伤轴肩。'],
  ['bearing-heater', '轴承加热器', '热装过盈配合轴承。', '受控加热使内圈膨胀，减少安装力。', '不用明火；温度上限按轴承密封和制造商说明控制。'],
  ['hydraulic-press', '台式液压压床', '压装轴承、衬套与齿轮等过盈件。', '以可控直线力完成安装或拆卸。', '工件支撑可靠、受力套圈正确；不可让压力经过滚动体。'],
  ['bearing-driver', '轴承座圈驱动器', '把轴承或衬套压到正确位置。', '匹配直径的驱动环均匀传递安装力。', '选择与过盈套圈匹配的环；不可用套筒随意敲击。'],
  ['seal-puller', '油封拔取器', '拆除油封而不损伤座孔和轴颈。', '钩头在油封外壳受力，将其撬离座孔。', '控制撬点，避免划伤密封槽；必要时拆下轴再处理。'],
  ['seal-driver', '油封安装器', '把新油封均匀压入座孔。', '以匹配外径的压环作用在油封刚性外缘。', '油封唇口与弹簧需保护，方向和压入深度按手册。'],
  ['spring-compressor', '后减振弹簧压缩器', '拆装预载弹簧、弹簧座或减振器组件。', '受控压缩高预载弹簧并释放锁环。', '必须匹配弹簧结构和载荷，可靠固定后缓慢释放。'],
  ['fork-level-gauge', '前叉油位规', '设定前叉油面高度。', '吸管与深度尺在规定前叉状态下抽至目标油位。', '先按手册统一弹簧、行程、排气和静置条件。'],
  ['cvt-holder', 'CVT 固定工具', '踏板车普利盘、离合器等专用接口的拆装。', '在设计受力面锁止旋转件，配合规定扭矩作业。', '工具号、螺纹旋向和受力位置必须核对；不以冲击替代。'],
].map(([id, name, scenario, functionText, keyPoint], index) => ({ id, number: String(index + 1).padStart(2, '0'), name, position: positions[index], scenario, function: functionText, keyPoint }));

export const toolAtlasSections: readonly ToolAtlasSection[] = [
  { id: 'basic', eyebrow: '基础手工具', title: '通用维修工具九件套', summary: '从受力、夹持到基本尺寸与间隙检查，先掌握每种工具的边界。', asset: '/motorcycle-general-tools-atlas.png', tools: basicTools },
  { id: 'fastening', eyebrow: '紧固与螺纹', title: '拆装、定扭与螺纹修复', summary: '紧固件要按接口、扭矩和工艺条件选择工具，不能用单一工具覆盖所有场景。', asset: '/motorcycle-fastening-tools-atlas.png', tools: fasteningTools },
  { id: 'measurement', eyebrow: '精密测量', title: '尺寸、跳动与形位检查', summary: '显示分辨率不等于测量准确度；接近维修限值时必须用手册指定方法复核。', asset: '/motorcycle-measurement-tools-atlas.png', tools: precisionTools },
  { id: 'engine', eyebrow: '发动机维修', title: '密封、气门与曲轴箱专项工具', summary: '发动机专用工具要让力沿设计路径传递，避免把精密配合面和螺纹变成新的故障。', asset: '/motorcycle-engine-tools-atlas.png', tools: engineTools },
  { id: 'chassis', eyebrow: '轮胎、制动与传动', title: '底盘和传动工具', summary: '轮胎、链条和制动均关系到道路安全；所有数值和排气流程必须回查车型手册。', asset: '/motorcycle-chassis-tools-atlas.png', tools: chassisTools },
  { id: 'diagnostic', eyebrow: '电气与流体诊断', title: '电路、燃油与冷却系统工具', summary: '先记录状态再测试；表笔、接头和压力接口的选错可能直接造成损伤或误判。', asset: '/motorcycle-electrical-tools-atlas.png', tools: diagnosticTools },
  { id: 'auxiliary', eyebrow: '线束、拉线与辅助拆装', title: '线束修复、锁线与非损伤拆装', summary: '端子、线束、拉线和卡扣都有专门受力方式；匹配工具能避免把一次维修变成二次损伤。', asset: '/motorcycle-auxiliary-tools-atlas.png', tools: auxiliaryTools },
  { id: 'workshop', eyebrow: '举升与工位管理', title: '稳定车辆、收集液体与追踪零件', summary: '稳定支撑、正确接液和零件可追溯，是每一次维修质量的基础条件。', asset: '/motorcycle-workshop-tools-atlas.png', tools: workshopTools },
  { id: 'specialty', eyebrow: '轴承、悬架与 CVT', title: '过盈配合与车型专项工具', summary: '这类工具必须按车型接口、尺寸和承载能力选用，原厂工具号优先。', asset: '/motorcycle-specialty-tools-atlas.png', tools: specialtyTools },
];

export const toolAtlasSearchText = toolAtlasSections
  .flatMap((section) => [section.title, section.summary, ...section.tools.flatMap((tool) => [tool.name, tool.scenario, tool.function, tool.keyPoint])])
  .join(' ')
  .toLowerCase();
