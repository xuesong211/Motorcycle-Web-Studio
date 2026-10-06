# motorcycle-maintenance-interval-planner 压力测试结果

- 方式：主流程回退自测（非独立子代理盲测）
- 版本：0.1.0
- 结果：6/6，100%
- 诱饵：2/2，全部通过
- 限制：独立子代理在阶段1后触发账户用量上限；额度恢复后应复跑盲测。

| 用例 | 类型 | 判定 | 理由 |
|---|---|---|---|
| should-trigger-01 | should_trigger | PASS | 应读取对应车型原表，按时间/里程先到者触发。 |
| should-trigger-02 | should_trigger | PASS | 应核对时间项，不能只按里程。 |
| should-trigger-03 | should_trigger | PASS | 应按恶劣工况逐项缩短受影响项目周期。 |
| should-not-trigger-01 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-no-start-state-diagnosis。 |
| should-not-trigger-02 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-measurement-decision-engine。 |
| edge-01 | edge_case | PASS | 应激活但明确不能统一减半；提高检查频率并按受影响项目和厂方补充资料修正。 |

## 结论

A2触发条件、兄弟模块区分和B边界在本轮自测中无冲突；接受进入阶段5，但测试置信度标记为 fallback。
