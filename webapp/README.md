# 摩托车维修知识库 Web 端

这是 `维修手册蒸馏库` 的本地阅读与学习工作台。原始 PDF、提取文本和蒸馏 Markdown 保留在原目录，Web 端只在启动/构建前生成只读数据。

## 功能

- “今日工位”按系统学习、处理故障、查车型手册三个任务提供直接入口
- 全文搜索基础课程、12 个维修能力模块、中文精编课、扩展来源和 41 份公开维修手册目录
- 4 门基础课与 12 个能力模块组成统一的 16 项核心学习进度
- 每个能力模块明确何时使用、工位产出和完成标准
- 保存本机学习进度，并自动推荐下一项未完成课程
- 查看来源边界、原始 PDF 路径、术语表和蒸馏总览

## 本地启动

在上级目录双击桌面快捷方式“启动摩托车维修知识库”，浏览器会打开：

`http://127.0.0.1:45000/`

命令行启动：

```powershell
npm install
npm run dev
```

## 构建与内容同步

```powershell
npm run content
npm run build
```

`npm run content` 从 `维修手册蒸馏库/books/official-motorcycle-service-manuals` 重新生成 `app/content.generated.ts`。
