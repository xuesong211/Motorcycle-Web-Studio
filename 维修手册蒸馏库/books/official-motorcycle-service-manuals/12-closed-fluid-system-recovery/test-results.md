# motorcycle-closed-fluid-system-recovery 压力测试结果

- 方式：主流程回退自测（非独立子代理盲测）
- 版本：0.1.0
- 结果：6/6，100%
- 诱饵：2/2，全部通过
- 限制：独立子代理在阶段1后触发账户用量上限；额度恢复后应复跑盲测。

| 用例 | 类型 | 判定 | 理由 |
|---|---|---|---|
| should-trigger-01 | should_trigger | PASS | 应断电通风禁火、复核接口，通电建压检漏后才允许起动。 |
| should-trigger-02 | should_trigger | PASS | 应完成排气、升温冷却循环并区分残余空气与泄漏。 |
| should-trigger-03 | should_trigger | PASS | 应保持供液端不吸空，排至无气泡和手感稳定，再静态承压检漏。 |
| should-not-trigger-01 | should_not_trigger | PASS | 不应由本模块主导，应激活 motorcycle-brake-abs-release-gate。 |
| should-not-trigger-02 | should_not_trigger | PASS | 不应激活本模块，应使用 motorcycle-cvt-drivetrain-diagnosis 与复装门禁。 |
| edge-01 | edge_case | PASS | 应激活本模块；必须经历完整温度/压力循环并冷却回查，不得只凭冷态检漏。 |

## 结论

A2触发条件、兄弟模块区分和B边界在本轮自测中无冲突；接受进入阶段5，但测试置信度标记为 fallback。
