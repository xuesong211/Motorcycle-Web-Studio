# motorcycle-model-version-gate 压力测试结果

- 方式：主流程回退自测（非独立子代理盲测）
- 版本：0.1.0
- 结果：6/6，100%
- 诱饵：2/2，全部通过
- 限制：独立子代理在阶段1后触发账户用量上限；额度恢复后应复跑盲测。

| 用例 | 类型 | 判定 | 理由 |
|---|---|---|---|
| should-trigger-01 | should_trigger | PASS | 应先核对VIN、年款/排放版、控制器零件号和实物差异，再决定资料资格。 |
| should-trigger-02 | should_trigger | PASS | 应激活本模块，禁止仅凭排量套用数据。 |
| should-trigger-03 | should_trigger | PASS | 应建立VIN、工厂型号、发动机号、版本和零件号身份卡。 |
| should-not-trigger-01 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-maintenance-interval-planner。 |
| should-not-trigger-02 | should_not_trigger | PASS | 不应由本模块主导，应激活 motorcycle-dtc-evidence-loop。 |
| edge-01 | edge_case | PASS | 应激活本模块；控制器零件号属于高风险差异，未解释前停止通电针脚测试。 |

## 结论

A2触发条件、兄弟模块区分和B边界在本轮自测中无冲突；接受进入阶段5，但测试置信度标记为 fallback。
