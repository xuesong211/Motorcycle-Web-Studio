# motorcycle-power-starting-electrical 压力测试结果

- 方式：主流程回退自测（非独立子代理盲测）
- 版本：0.1.0
- 结果：6/6，100%
- 诱饵：2/2，全部通过
- 限制：独立子代理在阶段1后触发账户用量上限；额度恢复后应复跑盲测。

| 用例 | 类型 | 判定 | 理由 |
|---|---|---|---|
| should-trigger-01 | should_trigger | PASS | 应先验证电池、停车漏电、改装负载、充电输出、磁电机与整流线路。 |
| should-trigger-02 | should_trigger | PASS | 应沿电源、继电器输出、起动机和搭铁执行负载压降测试。 |
| should-trigger-03 | should_trigger | PASS | 应检查联锁输入、开关线路与控制许可。 |
| should-not-trigger-01 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-no-start-state-diagnosis。 |
| should-not-trigger-02 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-dtc-evidence-loop。 |
| edge-01 | edge_case | PASS | 应先激活本模块恢复电源前提，再用 motorcycle-dtc-evidence-loop 检查是否复报码。 |

## 结论

A2触发条件、兄弟模块区分和B边界在本轮自测中无冲突；接受进入阶段5，但测试置信度标记为 fallback。
