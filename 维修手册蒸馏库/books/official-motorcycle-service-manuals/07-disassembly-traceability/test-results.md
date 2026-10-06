# motorcycle-disassembly-traceability 压力测试结果

- 方式：主流程回退自测（非独立子代理盲测）
- 版本：0.1.0
- 结果：6/6，100%
- 诱饵：2/2，全部通过
- 限制：独立子代理在阶段1后触发账户用量上限；额度恢复后应复跑盲测。

| 用例 | 类型 | 判定 | 理由 |
|---|---|---|---|
| should-trigger-01 | should_trigger | PASS | 应建立缸位/进排气/方向编码和分格存放。 |
| should-trigger-02 | should_trigger | PASS | 应记录方向、磨痕和顺序，分区存放并保护开口。 |
| should-trigger-03 | should_trigger | PASS | 应先记录插头、走线、压痕和扰动前数据。 |
| should-not-trigger-01 | should_not_trigger | PASS | 不应由本模块主导，应激活 motorcycle-reassembly-quality-gates。 |
| should-not-trigger-02 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-maintenance-interval-planner。 |
| edge-01 | edge_case | PASS | 通常不必激活完整流程；仅做基本位置记录，除非护盖后有线束、垫片或故障痕迹。 |

## 结论

A2触发条件、兄弟模块区分和B边界在本轮自测中无冲突；接受进入阶段5，但测试置信度标记为 fallback。
