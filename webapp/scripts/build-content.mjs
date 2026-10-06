import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(here, '..');
const sourceRoot = path.resolve(appRoot, '..', '维修手册蒸馏库', 'books', 'official-motorcycle-service-manuals');
const learningRoot = path.join(sourceRoot, 'external-learning');
const foundationRoot = path.join(sourceRoot, 'foundation-basics');

const phaseMap = {
  '01': ['资料门禁', '接车基础'], '02': ['保养计划', '接车基础'],
  '03': ['症状取证', '诊断思维'], '04': ['不起动', '诊断思维'],
  '05': ['故障码', '诊断思维'], '06': ['测量判定', '拆检测量'],
  '07': ['拆卸追踪', '拆检测量'], '08': ['复装验收', '拆检测量'],
  '09': ['制动 ABS', '安全放行'], '10': ['踏板 CVT', '车型专项'],
  '11': ['电气起动', '车型专项'], '12': ['流体恢复', '安全放行'],
};

function readFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: text };
  const raw = match[1];
  const value = (key) => raw.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? '';
  const description = raw.match(/^description:\s*\|\r?\n((?:\s{2}.+\r?\n?)+)/m)?.[1]
    ?.split(/\r?\n/).map((line) => line.trim()).join(' ').trim() ?? '';
  const tags = value('tags').replace(/^\[|\]$/g, '').split(',').map((tag) => tag.trim()).filter(Boolean);
  return { meta: { name: value('name'), description, sourceBook: value('source_book'), sourceChapter: value('source_chapter'), tags }, body: match[2].trim() };
}

const entries = (await readdir(sourceRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
  .sort((a, b) => a.name.localeCompare(b.name));
const modules = [];
for (const entry of entries) {
  const markdown = await readFile(path.join(sourceRoot, entry.name, 'SKILL.md'), 'utf8');
  const { meta, body } = readFrontmatter(markdown);
  const step = entry.name.slice(0, 2);
  const title = body.match(/^#\s+(.+)$/m)?.[1] ?? entry.name;
  const [shortTitle, group] = phaseMap[step] ?? ['维修能力', '其他'];
  modules.push({ id: entry.name, step: Number(step), title, shortTitle, group, ...meta, body,
    searchText: `${title} ${shortTitle} ${group} ${meta.description} ${meta.sourceChapter} ${meta.tags.join(' ')} ${body}`.toLowerCase() });
}

const catalogText = await readFile(path.join(sourceRoot, 'SOURCE_CATALOG.md'), 'utf8');
const manuals = [];
for (const line of catalogText.split(/\r?\n/)) {
  const match = line.match(/^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*\[([^\]]+)\]\(<([^>]+)>\)\s*\|\s*([\d,]+)\s*\|\s*([\d,]+)\s*\|\s*([^|]+?)\s*\|$/);
  if (!match) continue;
  const [, id, brand, group, title, pdfPath, pages, chars, status] = match;
  manuals.push({ id: Number(id), brand: brand.trim(), group: group.trim(), title: title.trim(), pdfPath,
    pages: Number(pages.replaceAll(',', '')), chars: Number(chars.replaceAll(',', '')), status: status.trim(),
    searchText: `${brand} ${group} ${title} ${status}`.toLowerCase() });
}

const digest = await readFile(path.join(sourceRoot, 'DIGEST.md'), 'utf8');
const glossary = await readFile(path.join(sourceRoot, 'GLOSSARY.md'), 'utf8');
const learningResources = JSON.parse(await readFile(path.join(learningRoot, 'catalog.json'), 'utf8'))
  .map((item) => ({ ...item,
    searchText: `${item.track} ${item.title} ${item.provider} ${item.authority} ${item.level} ${item.language} ${item.format} ${item.access} ${item.summary} ${item.use} ${item.caution} ${item.tags.join(' ')}`.toLowerCase(),
  }));
const translatedCourse = await readFile(path.join(learningRoot, 'translated-course-zh', 'translation.md'), 'utf8');
function translatedSection(startHeading, endHeading) {
  const start = translatedCourse.indexOf(startHeading);
  const end = endHeading ? translatedCourse.indexOf(endHeading) : translatedCourse.length;
  if (start < 0 || end < 0 || end <= start) throw new Error(`Cannot extract translated course section: ${startHeading}`);
  return translatedCourse.slice(start, end).trim();
}
const learningGuides = {
  '维修学习': `${await readFile(path.join(learningRoot, 'REPAIR_LEARNING.md'), 'utf8')}\n\n---\n\n${translatedSection('## 第一编', '## 第二编')}`,
  '摩托设计': `${await readFile(path.join(learningRoot, 'MOTORCYCLE_DESIGN.md'), 'utf8')}\n\n---\n\n${translatedSection('## 第二编', '## 第三编')}`,
  '维修工具': `${await readFile(path.join(learningRoot, 'WORKSHOP_TOOLS.md'), 'utf8')}\n\n---\n\n${translatedSection('## 第三编')}`,
  '车型专项': await readFile(path.join(learningRoot, 'RIDER_TYPE_MODULES.md'), 'utf8'),
};
const foundationDefinitions = [
  { id: 'electrical-electronics', code: '2.2.1', title: '电工与电子', description: '直流电路、基本元件、电力电子器件与安全测量。', file: '01_ELECTRICAL_ELECTRONICS.md' },
  { id: 'materials', code: '2.2.2', title: '摩托车常用材料', description: '燃油、油液、轮胎、轴承和其他常用材料。', file: '02_MATERIALS.md' },
  { id: 'hydraulics', code: '2.2.3', title: '液压传动', description: '压力与流量基础，以及制动、离合和悬架应用。', file: '03_HYDRAULICS.md' },
  { id: 'construction', code: '2.2.4', title: '摩托车构造', description: '发动机、电驱、传动、底盘、制动、转向、电控、电喷与 BMS。', file: '04_MOTORCYCLE_CONSTRUCTION.md' },
];
const foundationTopics = await Promise.all(foundationDefinitions.map(async ({ file, ...item }) => {
  const body = await readFile(path.join(foundationRoot, file), 'utf8');
  return { ...item, body, searchText: `${item.code} ${item.title} ${item.description} ${body}`.toLowerCase() };
}));
const payload = { generatedAt: new Date().toISOString(), sourceRoot,
  stats: { manuals: manuals.length, pages: manuals.reduce((sum, item) => sum + item.pages, 0), modules: modules.length, glossaryTerms: 20, learningResources: learningResources.length, foundationTopics: foundationTopics.length, translatedCourseChars: translatedCourse.length },
  modules, manuals, digest, glossary, learningResources, learningGuides, foundationTopics, translatedCourse };
await writeFile(path.join(appRoot, 'app', 'content.generated.ts'),
  `/* Generated from the canonical distillation library. Do not edit manually. */\nexport const content = ${JSON.stringify(payload, null, 2)} as const;\n`, 'utf8');
console.log(`Content generated: ${modules.length} modules, ${manuals.length} manuals, ${learningResources.length} learning resources, ${foundationTopics.length} foundation topics`);
