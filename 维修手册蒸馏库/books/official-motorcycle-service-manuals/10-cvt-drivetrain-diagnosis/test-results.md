# motorcycle-cvt-drivetrain-diagnosis 压力测试结果

- 方式：主流程回退自测（非独立子代理盲测）
- 版本：0.1.0
- 结果：6/6，100%
- 诱饵：2/2，全部通过
- 限制：独立子代理在阶段1后触发账户用量上限；额度恢复后应复跑盲测。

| 用例 | 类型 | 判定 | 理由 |
|---|---|---|---|
| should-trigger-01 | should_trigger | PASS | 应按工况定位打滑区段并检查皮带、盘、滚子、从动盘和离合器。 |
| should-trigger-02 | should_trigger | PASS | 应重点验证离合器接合、摩擦面、从动系统与污染。 |
| should-trigger-03 | should_trigger | PASS | 应测皮带宽度、滚子失圆和盘面变速行程，不能只看裂纹。 |
| should-not-trigger-01 | should_not_trigger | PASS | 不应激活本模块，应激活 motorcycle-no-start-state-diagnosis。 |
| should-not-trigger-02 | should_not_trigger | PASS | 不应激活本模块；该车不是CVT，应查链传动专项规则。 |
| edge-01 | edge_case | PASS | 应先使用 motorcycle-brake-abs-release-gate 排除拖滞；基础制动恢复后仍异常才调用本模块。 |

## 结论

A2触发条件、兄弟模块区分和B边界在本轮自测中无冲突；接受进入阶段5，但测试置信度标记为 fallback。
