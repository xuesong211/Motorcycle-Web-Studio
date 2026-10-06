# 阶段 1 共享术语候选

> 术语释义是对 41 份厂方资料共同用法的归纳，不替代具体车型手册中的数值、针脚和程序。

- id: g01
  term: 适用车型/版本（Applicability）
  type: term
  source_chapter: 703F_2024与2026维修手册，PDF第2页；ATR125_QJ125T-23F_官方维修手册_英文，PDF第29页
  author_definition: |
    手册可直接用于判断的车型、年款、排放版本和配置边界；厂方明确提示实车可能因产品改进与手册不一致。
  key_distinction: |
    ≠ 只看商品名或排量相同；= VIN、工厂型号、发动机型号、年款/排放版均能对应。
  why_it_matters: |
    它决定扭矩、维修极限、线路图、诊断接口和零件号能否安全套用。
  tags: [term, applicability, version]

- id: g02
  term: 标准值（Standard value）
  type: term
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第20页；368踏板_ZT1P79MP发动机维修手册，PDF第10页
  author_definition: |
    新件、正常件或规定工况下应达到的基准测量值或范围。
  key_distinction: |
    ≠ 超出即必然报废；标准值用于识别偏离趋势，还要与维修极限、测量条件和配合件共同判断。
  why_it_matters: |
    学徒必须把“偏离标准”与“超过报废边界”分开，避免过度换件。
  tags: [term, measurement, baseline]

- id: g03
  term: 维修极限（Service limit）
  type: term
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第20页；368踏板_ZT1P79MP发动机维修手册，PDF第10页
  author_definition: |
    厂方允许继续使用的边界值；达到或越过该边界时应修复或更换。
  key_distinction: |
    ≠ 推荐的新件尺寸；= 决定继续使用、修复或换件的判废阈值。
  why_it_matters: |
    这是皮带、制动件、缸体、轴颈和间隙类测量的核心决策线。
  tags: [term, service-limit, replace]

- id: g04
  term: 配合间隙（Clearance）
  type: term
  source_chapter: SRV700_QJ700-11A_官方维修手册_英文，PDF第291页；368踏板_ZT1P79MP发动机维修手册，PDF第24页
  author_definition: |
    两个配合件实测尺寸之差，用于评价润滑、密封、运动自由度和磨损状态。
  key_distinction: |
    ≠ 只量一个零件的尺寸；同一异常间隙可能由任一配合件或两者共同磨损造成。
  why_it_matters: |
    间隙超限后必须分别复测两件，才能决定真正的换件对象。
  tags: [term, clearance, root-cause]

- id: g05
  term: 多点测量最不利值
  type: term
  source_chapter: 368踏板_ZT1P79MP发动机维修手册，PDF第13页；ZT370MU-ADV发动机维修手册，PDF第53页
  author_definition: |
    在不同高度、方向或圆周位置测量后，用最大磨损、最大跳动或最小余量参与判定。
  key_distinction: |
    ≠ 任选一点或取平均掩盖局部缺陷；= 用最可能导致失效的位置与极限比较。
  why_it_matters: |
    缸体椭圆、锥度、制动盘跳动和轴类磨损常呈局部性。
  tags: [term, measurement, worst-case]

- id: g06
  term: 故障码（DTC）
  type: term
  source_chapter: 703F_2024与2026维修手册，PDF第86-87页；LTR125_QJ125T-27E_官方维修手册_英文，PDF第154页
  author_definition: |
    控制器依据监测逻辑记录的电路、信号或系统异常线索。
  key_distinction: |
    ≠ 某零件已损坏的判决；= 指向需要继续验证的电路或工作条件。
  why_it_matters: |
    正确流程必须保留报码环境，再查接插件、线路、元件和控制器，修复后清码复验。
  tags: [term, DTC, EFI]

- id: g07
  term: 当前故障与历史/偶发故障
  type: term
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第115页；LTM125_QJ125T-27F_官方维修手册_英文，PDF第363页
  author_definition: |
    当前故障在测试条件下持续存在；历史或偶发故障曾被记录，但此刻可能未达到报码条件。
  key_distinction: |
    ≠ 没有当前故障码就等于车辆无故障；偶发问题要结合冻结信息、线束扰动和路试复现。
  why_it_matters: |
    决定是做静态逐点测量，还是保存现场并设计复现条件。
  tags: [term, intermittent, diagnosis]

- id: g08
  term: 诊断前提门禁
  type: term
  source_chapter: MTX125_QJ125T-23H_官方维修手册_英文，PDF第161页；703F_2024与2026维修手册，PDF第84页
  author_definition: |
    在解释测试结果前必须满足的供电、搭铁、保险、燃油压力、连接状态、温度和工具条件。
  key_distinction: |
    ≠ 诊断步骤中的可选准备；前提不成立时，后续结果可能完全没有判别力。
  why_it_matters: |
    它能防止低电压、接触不良或错误工况被误判为控制器、传感器损坏。
  tags: [term, precondition, diagnosis]

- id: g09
  term: 燃油压力（Fuel pressure）
  type: term
  source_chapter: 450RALLY_维修手册_英文，PDF第122页；ATR125_QJ125T-23F_官方维修手册_英文，PDF第179页
  author_definition: |
    在规定工况用压力表测得的供油系统压力，是油泵、滤网、调压和管路共同结果。
  key_distinction: |
    ≠ 听见油泵声；泵转动不能证明压力、流量和保压合格。
  why_it_matters: |
    不起动、加速不良和混合气异常都可能需要燃压数据来分流。
  tags: [term, fuel-pressure, EFI]

- id: g10
  term: ECU/ECM
  type: term
  source_chapter: SRV300_QJ300-12A_官方维修手册_英文，PDF第176页；703F_2024与2026维修手册，PDF第97页
  author_definition: |
    发动机电子控制单元，依据传感器输入控制喷油、点火和相关执行器，并记录诊断信息。
  key_distinction: |
    ≠ 所有电喷故障的最终默认换件对象；只有供电、搭铁、线路、传感器和执行器验证后才考虑控制器。
  why_it_matters: |
    ECU 昂贵且误换风险高，是逐层隔离流程的最后层。
  tags: [term, ECU, controller]

- id: g11
  term: 线路连续性/开路/短路
  type: term
  source_chapter: 703F_2024与2026维修手册，PDF第97页；SRV300_QJ300-12A_官方维修手册_英文，PDF第176页
  author_definition: |
    连续性表示预期两端存在可用导通；开路是路径中断；短路是导线与不应连接的电源、搭铁或其他回路相连。
  key_distinction: |
    ≠ 插头外观看着正常；需要断电、隔离控制器并按手册用万用表验证。
  why_it_matters: |
    同一 DTC 可由三种完全不同的线路状态触发，对应修复方式不同。
  tags: [term, wiring, continuity]

- id: g12
  term: ABS液压控制单元
  type: term
  source_chapter: LTM125_QJ125T-27F_官方维修手册_英文，PDF第182页；450RALLY_维修手册_英文，PDF第51页
  author_definition: |
    集成阀体、泵和电子控制的防抱死制动核心部件，依据轮速调节制动压力。
  key_distinction: |
    ≠ 普通卡钳或主缸；不得用敲击、冲水、带电插拔或无授权拆解的方式处理。
  why_it_matters: |
    ABS 报警不等于基础液压制动正常，诊断必须先确认机械和液压基础。
  tags: [term, ABS, hydraulic-unit]

- id: g13
  term: 制动排气（Bleeding）
  type: term
  source_chapter: 450RALLY_维修手册_英文，PDF第50页；703F_2024与2026维修手册，PDF第59页
  author_definition: |
    在持续补充合规制动液的同时，按规定顺序把液压回路中的空气排出，直至无气泡且手感稳定。
  key_distinction: |
    ≠ 只松一次放气螺钉；储液罐见底会重新吸入空气，必须形成闭环。
  why_it_matters: |
    空气可压缩，会造成手柄发软、行程过长和制动力不足。
  tags: [term, brake, bleeding]

- id: g14
  term: CVT无级变速传动
  type: term
  source_chapter: ZT1P77MP发动机维修手册，PDF第33页；150T-M_D发动机维修手册，PDF第29页
  author_definition: |
    踏板车由主动盘、滚子、传动带、从动盘与离合器共同实现连续变速和接合的传力链。
  key_distinction: |
    ≠ 单独一条皮带；起步抖动、转速高车速低和加速无力需映射到整条传力链。
  why_it_matters: |
    能防止只换皮带或只清离合器的单点盲修。
  tags: [term, CVT, scooter]

- id: g15
  term: 传动带维修极限
  type: term
  source_chapter: ATR125_QJ125T-23F_官方维修手册_英文，PDF第63页
  author_definition: |
    对 CVT 皮带宽度、裂纹、缺齿和损伤进行测量/检查后，用厂方极限决定继续使用或更换。
  key_distinction: |
    ≠ 只按里程或肉眼“还能跑”；宽度磨损会改变传动比与夹持状态。
  why_it_matters: |
    它把加速、极速和打滑症状转化为可测量的换件判据。
  tags: [term, belt, service-limit]

- id: g16
  term: 上止点（TDC）与配气正时
  type: term
  source_chapter: ZT370MU-ADV发动机维修手册，PDF第21页；350系列_ZT184MP发动机维修手册，PDF第13页
  author_definition: |
    TDC 是活塞行程最高位置；维修中的正时上止点还要求曲轴标记与凸轮轴标记按手册处于规定相位。
  key_distinction: |
    ≠ 活塞到了最高点就一定是压缩上止点；四冲程还需区分压缩与排气相位。
  why_it_matters: |
    气门间隙、凸轮轴和正时链装配都以正确相位为前提。
  tags: [term, TDC, timing]

- id: g17
  term: 气门间隙（Valve clearance）
  type: term
  source_chapter: 350系列_ZT184MP发动机维修手册，PDF第13页；ZT370MU-ADV发动机维修手册，PDF第40页
  author_definition: |
    指定冷/热态与正时位置下，气门机构配合面之间按手册测得的间隙。
  key_distinction: |
    ≠ 任意曲轴位置测得的缝隙；状态、缸位和配对调整件必须可追溯。
  why_it_matters: |
    过小可导致热车漏气烧阀，过大可导致噪声、冲击和配气量变化。
  tags: [term, valve-clearance, engine]

- id: g18
  term: 配对/分组零件
  type: term
  source_chapter: SRV550ST_QJ500-11D_官方维修手册_英文，PDF第13页；350系列_ZT184MP发动机维修手册，PDF第21页
  author_definition: |
    因磨合接触关系或制造尺寸组而必须保持对应关系的零件，如挺柱与原位、A/B/C 组活塞与气缸。
  key_distinction: |
    ≠ 零件名称相同即可互换；配对关系来自原位磨合或尺寸分组标记。
  why_it_matters: |
    混装会改变间隙和接触斑，造成异响、磨损、窜气或拉缸。
  tags: [term, matched-parts, grading]

- id: g19
  term: 静态功能验收
  type: term
  source_chapter: 450RALLY_维修手册_英文，PDF第7页；703T_2026维修保养手册，PDF第122页
  author_definition: |
    复装后、车辆移动前，对安装位置、紧固、干涉、油液、泄漏、线束、制动和转向功能所做的确认。
  key_distinction: |
    ≠ 路试；静态验收是允许进入动态验证的安全门禁。
  why_it_matters: |
    它把“装完了”转化为“可以安全进入下一阶段”。
  tags: [term, inspection, quality-gate]

- id: g20
  term: 动态复验/路试
  type: term
  source_chapter: LTR125_QJ125T-27E_官方维修手册_英文，PDF第154页；ATR125_QJ125T-23F_官方维修手册_英文，PDF第66页
  author_definition: |
    在静态验收通过且环境安全后，用规定触发条件运行或骑行，确认症状、报码和功能是否真正恢复。
  key_distinction: |
    ≠ 随便骑一圈；应复现原工况并记录结果，且不能替代维修前后的静态检查。
  why_it_matters: |
    清码只删除记录，只有按触发条件复验才能证明根因已消除。
  tags: [term, road-test, verification]
