# motorcycle-reassembly-quality-gates 压力测试结果

- 方式：主流程回退自测（非独立子代理盲测）
- 版本：0.1.0
- 结果：6/6，100%
- 诱饵：2/2，全部通过
- 限制：独立子代理在阶段1后触发账户用量上限；额度恢复后应复跑盲测。

| 用例 | 类型 | 判定 | 理由 |
|---|---|---|---|
| should-trigger-01 | should_trigger | PASS | 应核对清洁换新、润滑、正时、顺序分级定扭和静态验收。 |
| should-trigger-02 | should_trigger | PASS | 应按手册换新要求处理，不能以外观作为复用依据。 |
| should-trigger-03 | should_trigger | PASS | 应静态建立手柄/踏板压力并检查安装、释放和泄漏。 |
| should-not-trigger-01 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-disassembly-traceability。 |
| should-not-trigger-02 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-dtc-evidence-loop。 |
| edge-01 | edge_case | PASS | 不必完整调用；按零件说明完成基本紧固和干涉检查即可。 |

## 结论

A2触发条件、兄弟模块区分和B边界在本轮自测中无冲突；接受进入阶段5，但测试置信度标记为 fallback。
