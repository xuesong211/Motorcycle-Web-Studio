# motorcycle-measurement-decision-engine 压力测试结果

- 方式：主流程回退自测（非独立子代理盲测）
- 版本：0.1.0
- 结果：6/6，100%
- 诱饵：2/2，全部通过
- 限制：独立子代理在阶段1后触发账户用量上限；额度恢复后应复跑盲测。

| 用例 | 类型 | 判定 | 理由 |
|---|---|---|---|
| should-trigger-01 | should_trigger | PASS | 应使用多点最不利值、椭圆/锥度和配合间隙判定。 |
| should-trigger-02 | should_trigger | PASS | 应区分健康基准与判废边界，并结合症状和损伤。 |
| should-trigger-03 | should_trigger | PASS | 应分别测双方、计算间隙并核对尺寸组后归因。 |
| should-not-trigger-01 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-disassembly-traceability。 |
| should-not-trigger-02 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-reassembly-quality-gates。 |
| edge-01 | edge_case | PASS | 可调用本模块作处置解释，但必须判为损伤优先，不能因尺寸未超限放行。 |

## 结论

A2触发条件、兄弟模块区分和B边界在本轮自测中无冲突；接受进入阶段5，但测试置信度标记为 fallback。
