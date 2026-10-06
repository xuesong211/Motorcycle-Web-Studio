# 阶段4压力测试汇总

> 独立子代理在阶段1已触发账户用量上限，本轮按方法要求采用主流程回退自测；可信度低于独立盲测，后续额度恢复后建议再跑盲测。

| Skill | 用例 | 结果 | 诱饵 | 跨skill诱饵 |
|---|---:|---:|---:|---:|
| `motorcycle-model-version-gate` | 6 | 6/6 | 2/2 | 通过 |
| `motorcycle-maintenance-interval-planner` | 6 | 6/6 | 2/2 | 通过 |
| `motorcycle-symptom-evidence-intake` | 6 | 6/6 | 2/2 | 通过 |
| `motorcycle-no-start-state-diagnosis` | 6 | 6/6 | 2/2 | 通过 |
| `motorcycle-dtc-evidence-loop` | 6 | 6/6 | 2/2 | 通过 |
| `motorcycle-measurement-decision-engine` | 6 | 6/6 | 2/2 | 通过 |
| `motorcycle-disassembly-traceability` | 6 | 6/6 | 2/2 | 通过 |
| `motorcycle-reassembly-quality-gates` | 6 | 6/6 | 2/2 | 通过 |
| `motorcycle-brake-abs-release-gate` | 6 | 6/6 | 2/2 | 通过 |
| `motorcycle-cvt-drivetrain-diagnosis` | 6 | 6/6 | 2/2 | 通过 |
| `motorcycle-power-starting-electrical` | 6 | 6/6 | 2/2 | 通过 |
| `motorcycle-closed-fluid-system-recovery` | 6 | 6/6 | 2/2 | 通过 |

## 总结

- 12个模块，共72条测试。
- should_trigger：36/36。
- should_not_trigger：24/24，诱饵零容错全部通过。
- edge_case：12/12。
- 全部JSON为darwin兼容结构。
- 风险：本轮不是独立盲测；后续以独立代理复跑时，如有冲突须回炉A2/E/B。
