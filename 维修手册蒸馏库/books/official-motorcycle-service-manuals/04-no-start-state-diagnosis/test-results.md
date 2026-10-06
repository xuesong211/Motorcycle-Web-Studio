# motorcycle-no-start-state-diagnosis 压力测试结果

- 方式：主流程回退自测（非独立子代理盲测）
- 版本：0.1.0
- 结果：6/6，100%
- 诱饵：2/2，全部通过
- 限制：独立子代理在阶段1后触发账户用量上限；额度恢复后应复跑盲测。

| 用例 | 类型 | 判定 | 理由 |
|---|---|---|---|
| should-trigger-01 | should_trigger | PASS | 应先归类为不转状态并检查电源、联锁、继电器和起动机。 |
| should-trigger-02 | should_trigger | PASS | 应测燃压、有效火花、喷油和压缩/正时，不能把泵声当燃压。 |
| should-trigger-03 | should_trigger | PASS | 应归类着即熄并检查怠速空气、温度修正、供油和基础条件。 |
| should-not-trigger-01 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-cvt-drivetrain-diagnosis。 |
| should-not-trigger-02 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-dtc-evidence-loop。 |
| edge-01 | edge_case | PASS | 先组合 motorcycle-symptom-evidence-intake 保存复现条件，再按不转状态使用本模块；不能直接换件。 |

## 结论

A2触发条件、兄弟模块区分和B边界在本轮自测中无冲突；接受进入阶段5，但测试置信度标记为 fallback。
