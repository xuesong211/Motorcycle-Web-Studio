from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

RELATIONS = {
    "01-model-version-gate": [],
    "02-maintenance-interval-planner": [
        ("motorcycle-model-version-gate", "depends-on", "先确认车型版本，才能读取正确保养周期。"),
    ],
    "03-symptom-evidence-intake": [
        ("motorcycle-model-version-gate", "depends-on", "接车信息必须绑定到可追溯实车。"),
        ("motorcycle-dtc-evidence-loop", "composes-with", "复现资料和报码冻结信息共同构成现场证据。"),
    ],
    "04-no-start-state-diagnosis": [
        ("motorcycle-symptom-evidence-intake", "depends-on", "先把口述的不着车定义为明确状态。"),
        ("motorcycle-power-starting-electrical", "composes-with", "起动机不转时转入供电与联锁链。"),
        ("motorcycle-dtc-evidence-loop", "composes-with", "存在报码时用电路证据链继续隔离。"),
    ],
    "05-dtc-evidence-loop": [
        ("motorcycle-model-version-gate", "depends-on", "诊断系统和针脚必须先匹配实车版本。"),
        ("motorcycle-symptom-evidence-intake", "composes-with", "报码必须结合触发工况解释。"),
    ],
    "06-measurement-decision-engine": [
        ("motorcycle-model-version-gate", "depends-on", "标准值与维修极限只对匹配车型有效。"),
    ],
    "07-disassembly-traceability": [
        ("motorcycle-model-version-gate", "depends-on", "拆前确认结构和版本差异。"),
        ("motorcycle-measurement-decision-engine", "composes-with", "身份链保证测量值能回到正确零件。"),
    ],
    "08-reassembly-quality-gates": [
        ("motorcycle-disassembly-traceability", "depends-on", "复装需要拆卸阶段保存的原位和方向信息。"),
        ("motorcycle-measurement-decision-engine", "composes-with", "只有合格或已处置零件才能进入复装。"),
        ("motorcycle-closed-fluid-system-recovery", "composes-with", "开路流体系统在复装后还要排气、建压和检漏。"),
    ],
    "09-brake-abs-release-gate": [
        ("motorcycle-reassembly-quality-gates", "depends-on", "关键制动件需先通过复装与静态检查。"),
        ("motorcycle-closed-fluid-system-recovery", "composes-with", "液压回路开路时由流体闭环恢复压力。"),
        ("motorcycle-dtc-evidence-loop", "composes-with", "ABS报码部分使用电路证据链。"),
    ],
    "10-cvt-drivetrain-diagnosis": [
        ("motorcycle-symptom-evidence-intake", "depends-on", "先按起步、中速和高速工况定位症状。"),
        ("motorcycle-measurement-decision-engine", "composes-with", "皮带、滚子和摩擦件用测量极限判定。"),
        ("motorcycle-no-start-state-diagnosis", "contrasts-with", "发动机不着与发动机运转但动力不传递属于不同状态层。"),
    ],
    "11-power-starting-electrical": [
        ("motorcycle-model-version-gate", "depends-on", "线路图、联锁逻辑和调压数据必须匹配版本。"),
        ("motorcycle-dtc-evidence-loop", "composes-with", "控制回路报码继续使用电路证据链。"),
        ("motorcycle-no-start-state-diagnosis", "contrasts-with", "本模块处理起动机不转；能转不着进入不起动分层。"),
    ],
    "12-closed-fluid-system-recovery": [
        ("motorcycle-reassembly-quality-gates", "depends-on", "接口、密封件和紧固先正确复装。"),
        ("motorcycle-brake-abs-release-gate", "composes-with", "制动液压恢复后还需完成制动放行验证。"),
    ],
}

for directory, relations in RELATIONS.items():
    path = ROOT / directory / "SKILL.md"
    text = path.read_text(encoding="utf-8")
    if relations:
        yaml_lines = ["related_skills:"]
        for slug, relation, _ in relations:
            yaml_lines += [f"  - slug: {slug}", f"    relation: {relation}"]
        yaml = "\n".join(yaml_lines)
    else:
        yaml = "related_skills: []"
    text = text.replace("related_skills: []", yaml, 1)
    text = text.replace("与相邻能力的初步区分", "与相邻能力的最终区分")

    if relations:
        grouped = {"depends-on": [], "contrasts-with": [], "composes-with": []}
        for slug, relation, note in relations:
            grouped[relation].append(f"`{slug}`：{note}")
        body = []
        labels = {"depends-on": "depends-on", "contrasts-with": "contrasts-with", "composes-with": "composes-with"}
        for relation in ("depends-on", "contrasts-with", "composes-with"):
            if grouped[relation]:
                body.append(f"- {labels[relation]}: " + "；".join(grouped[relation]))
    else:
        body = ["- 基础入口模块：无强制前置；被保养、诊断、测量、拆装和电气模块依赖。"]
    new_section = "## 相关 skills\n\n" + "\n".join(body)
    start = text.index("## 相关 skills（阶段3回填）")
    end = text.index("\n## 审计信息", start)
    text = text[:start] + new_section + "\n" + text[end:]
    path.write_text(text, encoding="utf-8")

print(f"updated {len(RELATIONS)} skills")
