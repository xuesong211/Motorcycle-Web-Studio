# 摩托车维修知识库 Web Studio

## Nginx 发布包

可直接解压部署的发布包位于 [`release/motorcycle-web-studio-nginx.zip`](release/motorcycle-web-studio-nginx.zip)。部署说明和 Nginx 配置源文件在 [`deploy/nginx/README.md`](deploy/nginx/README.md)。

面向摩托车维修学习与工位诊断的本地知识库应用。项目将车型资料、维修流程、基础原理、维修工具和专项车型知识组织成可检索、可执行的学习界面。

## 已包含内容

- 12 个维修能力模块：资料门禁、保养、症状取证、不起动、故障码、测量、拆装、复装、制动 ABS、踏板 CVT、电气起动和流体恢复。
- 基础知识：电工电子、材料、液压传动和摩托车构造。
- 扩展学习：维修学习、摩托设计、维修工具图谱，以及 ADV、踏板车、仿赛车型专项。
- 维修工具库：9 大类、81 项通用、专项和诊断工具；每项包含高清图、使用场景、功能和操作要点。
- 车型专项：按结构差异、工况、检查维护、常见症状、复验与安全边界覆盖 ADV、踏板和仿赛。

## 运行项目

```powershell
cd webapp
npm install
npm run dev
```

默认本地地址由开发服务器输出。生成知识库内容与生产构建：

```powershell
npm run content
npm run build
```

## 项目结构

```text
webapp/                                  # React/Vinext 前端
维修手册蒸馏库/books/
  official-motorcycle-service-manuals/   # 可版本化的中文知识库
    external-learning/                   # 工具与车型专项课程
```

核心资料从 `维修手册蒸馏库` 生成到 `webapp/app/content.generated.ts`。该生成文件由 `npm run content` 维护，不应手动编辑。

## 资料与安全边界

仓库不包含原始 PDF、EPUB 与提取的原始文本，以避免提交大体积及受限来源文件。实际维修必须核对具体车型、年款、VIN 和原厂资料；扭矩、油液、胎压、间隙、诊断功能与安全放行要求不可跨车型套用。

## 验证

```powershell
npx oxlint app/page.tsx app/tool-atlas.ts
npx tsc --noEmit
npm run build
```
