---
name: motorcycle-reassembly-quality-gates
description: |
  当零件清洗后准备复装，涉及密封件、润滑、正时、多螺栓定扭或完工检查，用户说“按拆卸反序装回就行吗”“装好不漏能交车吗”时调用；执行清洁换新、润滑、顺序定扭和静态验收。不替代具体车型扭矩表。
source_book: 《钱江、凯越、升仕官方维修手册合集（41份）》 钱江摩托、凯越机车、升仕摩托
source_chapter: 450 Rally PDF第7页；703F PDF第12页；ATR125 PDF第21页；LTM125 PDF第17页；ZT370MU-ADV PDF第21页
tags: [motorcycle, reassembly, torque, inspection]
related_skills:
  - slug: motorcycle-disassembly-traceability
    relation: depends-on
  - slug: motorcycle-measurement-decision-engine
    relation: composes-with
  - slug: motorcycle-closed-fluid-system-recovery
    relation: composes-with
---

# 复装四门禁：清洁换新、润滑、顺序定扭、静态验收

## R — 原文

> “Use new gaskets, O-rings, cotter pins and locking plates. Clean parts when disassembling. Lubricate all sliding surfaces before reassembly.”
>
> 自译：垫片、O形圈、开口销和锁片使用新品；拆下件清洁，复装前润滑所有滑动面。
>
> — 凯越《450RALLY维修手册》，PDF第7页

## I — 方法论骨架

复装不是拆卸动作倒放，而是连续四道质量门。
第一门确认零件、油道、螺纹和结合面洁净，一次性密封/锁止件换新。
第二门按手册给滑动面、轴承、密封唇、规定螺纹或结合面使用正确润滑剂/密封剂，避免多涂与错涂。
第三门确认方向、正时和零件原位，多紧固件按规定顺序分步交叉达到最终扭矩。
第四门在车辆移动前检查安装、干涉、油液、泄漏、制动、转向、线束与功能。
四门任一未通过，都不能用“已经装好了”进入路试或交车。

## A1 — 手册中的应用

### 案例：钱江多螺栓定扭
- **问题**：盖件或缸头多颗螺栓会因不均匀预紧而变形。
- **使用**：从内侧/大径开始，按对角顺序逐级达到规定扭矩。
- **结论**：最终扭矩正确但顺序错误，仍可能损伤结合面。
- **结果**：预紧力分布更均匀、可重复。

### 案例：升仕凸轮轴座盖
- **问题**：凸轮轴装配时正时和座盖受力敏感。
- **使用**：按序先带入2—3牙再均匀拧紧，期间不转曲轴。
- **结论**：位置门禁先于最终扭矩。
- **结果**：避免改变正时、压弯凸轮轴或损坏缸头。

### 案例：升仕新制动盘/片
- **问题**：装好新摩擦件后首次制动行程可能异常。
- **使用**：移动前多次操作手柄/踏板建立正常握力。
- **结论**：静态功能确认是路试许可条件。
- **结果**：避免第一把制动无效。

## A2 — 触发场景

1. 发动机、CVT、制动、悬挂或车身部件完成拆修准备装回。
2. 涉及O形圈、纸垫、铜垫、油封、开口销或锁片。
3. 多螺栓结合面、缸头、凸轮轴座盖或关键承载件定扭。
4. 完工后准备起动、路试或交车。

语言信号：`复装顺序`、`torque sequence`、`旧O圈能用吗`、`装完怎么验收`、`正时装好`。

与相邻能力的最终区分：拆前身份与证据用 `motorcycle-disassembly-traceability`；数值是否超限用 `motorcycle-measurement-decision-engine`；涉及开路流体系统还需 `motorcycle-closed-fluid-system-recovery`。

## E — 可执行步骤

1. **清洁换新门**：核对结合面、螺纹、油道与零件洁净；按手册更换密封/锁止件。
   - 完成标准：复装清单上每个一次性件有新件核销。
2. **润滑介质门**：按点位确认油、脂、冷却液、制动液、螺纹锁固或密封剂规格与用量。
   - 完成标准：无漏涂、错涂、污染摩擦面或堵塞油道。
3. **位置扭矩门**：确认方向、原位、正时；所有螺栓先手带入，再按序分级定扭并记录。
   - 判停条件：螺纹阻力异常、零件不贴合或正时标记变化，退回检查，禁止强拧。
4. **静态验收门**：检查工具/零件点数、线束软管、干涉、油液、泄漏、转向、制动和基础功能。
   - 完成标准：所有安全项通过后才允许起动/路试。

## B — 边界

- 本能力不提供通用扭矩；必须回查对应车型原表。
- 不复用手册规定换新的密封和锁止件。
- 不凭手感代替扭矩扳手，不把某一颗一次拧到终值。
- 静态无泄漏不代表升温/加压后无泄漏，必要时还要动态回查。

失败模式：拆卸反序等于复装顺序；旧密封件外观完好就复用；座盖一侧先压死；装完直接路试。

## 相关 skills

- depends-on: `motorcycle-disassembly-traceability`：复装需要拆卸阶段保存的原位和方向信息。
- composes-with: `motorcycle-measurement-decision-engine`：只有合格或已处置零件才能进入复装。；`motorcycle-closed-fluid-system-recovery`：开路流体系统在复装后还要排气、建压和检漏。

## 审计信息

- 验证通过：V1 ✓ / V2 ✓ / V3 ✓
- 测试通过率：100%（6/6，主流程回退自测）
- 蒸馏时间：2026-09-11
