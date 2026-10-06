'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Check,
  CheckCircle2,
  Circle,
  Clipboard,
  ExternalLink,
  FileText,
  Gauge,
  GraduationCap,
  Home as HomeIcon,
  Library,
  Search,
  ShieldCheck,
  Wrench,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from '@/components/ui/progress';
import { content } from './content.generated';
import { toolAtlasSearchText, toolAtlasSections } from './tool-atlas';

type View =
  | 'home'
  | 'route'
  | 'module'
  | 'basics'
  | 'manuals'
  | 'learning'
  | 'digest'
  | 'glossary';
type Module = (typeof content.modules)[number];
type FoundationTopic = (typeof content.foundationTopics)[number];
type LearningTrack = '全部' | keyof typeof content.learningGuides;

const groupTone: Record<string, string> = {
  接车基础: 'tone-blue',
  诊断思维: 'tone-orange',
  拆检测量: 'tone-green',
  车型专项: 'tone-violet',
  安全放行: 'tone-red',
};

const learningTone: Record<string, string> = {
  维修学习: 'tone-orange',
  摩托设计: 'tone-violet',
  维修工具: 'tone-green',
  车型专项: 'tone-blue',
};

const moduleOutputs: Record<string, { artifact: string; done: string }> = {
  接车基础: {
    artifact: '车型身份卡或保养工单',
    done: '结论能追溯到车型版本与手册页码',
  },
  诊断思维: {
    artifact: '症状记录、报码证据或诊断树',
    done: '已证实、已排除、待验证三类清楚',
  },
  拆检测量: {
    artifact: '测量表与修换结论',
    done: '测量条件、标准值和判定依据完整',
  },
  车型专项: {
    artifact: '专项检查单与复装记录',
    done: '拆装身份、测量结果和复验项目闭环',
  },
  安全放行: {
    artifact: '复验与安全放行记录',
    done: '压力、功能和路试结果均有证据',
  },
};

function InlineText({ text, query = '' }: { text: string; query?: string }) {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {tokens.map((token, index) => {
        if (token.startsWith('`') && token.endsWith('`'))
          return <code key={index}>{token.slice(1, -1)}</code>;
        if (token.startsWith('**') && token.endsWith('**'))
          return <strong key={index}>{token.slice(2, -2)}</strong>;
        const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link && /^https?:\/\//i.test(link[2]))
          return (
            <a key={index} className="text-link" href={link[2]} target="_blank" rel="noopener noreferrer">
              {link[1]}
            </a>
          );
        if (link)
          return (
            <span key={index} className="text-link">
              {link[1]}
            </span>
          );
        if (!query) return <span key={index}>{token}</span>;
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const parts = token.split(new RegExp(`(${escaped})`, 'ig'));
        return (
          <span key={index}>
            {parts.map((part, partIndex) =>
              part.toLowerCase() === query.toLowerCase() ? (
                <mark key={partIndex}>{part}</mark>
              ) : (
                part
              ),
            )}
          </span>
        );
      })}
    </>
  );
}

function MarkdownReader({
  markdown,
  query = '',
}: {
  markdown: string;
  query?: string;
}) {
  return (
    <div className="manual-prose">
      {markdown.split(/\r?\n/).map((raw, index) => {
        const line = raw.trim();
        if (
          !line ||
          line === '---' ||
          line.startsWith('|---') ||
          line.startsWith('# ')
        )
          return null;
        if (line.startsWith('## ')) return <h2 key={index}>{line.slice(3)}</h2>;
        if (line.startsWith('### '))
          return <h3 key={index}>{line.slice(4)}</h3>;
        if (line.startsWith('>'))
          return (
            <blockquote key={index}>
              <InlineText text={line.replace(/^>\s?/, '')} query={query} />
            </blockquote>
          );
        if (/^\d+\.\s/.test(line))
          return (
            <div className="numbered-line" key={index}>
              <span>{line.match(/^\d+/)?.[0]}</span>
              <p>
                <InlineText
                  text={line.replace(/^\d+\.\s*/, '')}
                  query={query}
                />
              </p>
            </div>
          );
        if (line.startsWith('- '))
          return (
            <div className="bullet-line" key={index}>
              <i />
              <p>
                <InlineText text={line.slice(2)} query={query} />
              </p>
            </div>
          );
        if (line.startsWith('|'))
          return (
            <p className="table-line" key={index}>
              <InlineText
                text={line
                  .replace(/^\||\|$/g, '')
                  .split('|')
                  .map((cell) => cell.trim())
                  .join(' · ')}
                query={query}
              />
            </p>
          );
        return (
          <p key={index}>
            <InlineText text={line} query={query} />
          </p>
        );
      })}
    </div>
  );
}

const generalWorkshopTools = [
  {
    id: 'wrench',
    number: '01',
    name: '扳手',
    position: '0% 0%',
    scenario: '车架、发动机外盖、制动卡钳支架等常规六角紧固件。',
    function: '施加可控旋转力，拆装螺栓和螺母。开口端便于侧向进入，梅花端包覆更多受力面。',
    keyPoint: '确认对边尺寸、空间和受力方向；优先使用贴合的六角套筒或梅花端。',
  },
  {
    id: 'screwdriver',
    number: '02',
    name: '螺丝刀',
    position: '50% 0%',
    scenario: '车身覆盖件、开关、灯具、化油器及线束夹上的槽型螺钉。',
    function: '以匹配的刀头传递扭矩，常见为一字、Phillips、JIS、内六角和 Torx。',
    keyPoint: '日系旧车先辨别 JIS 与 Phillips；刀头必须满槽、同轴并施加轴向压力。',
  },
  {
    id: 'hammer',
    number: '03',
    name: '手锤',
    position: '100% 0%',
    scenario: '工艺允许的轻敲定位、配合冲子或拆装辅助。',
    function: '通过锤头的受控冲击传递短时力；圆头端可用于特定整形，平头端用于敲击冲子。',
    keyPoint: '先确认受力点和支撑；不能直接锤击轴承滚道、螺纹端、密封面和薄壁箱体。',
  },
  {
    id: 'pliers',
    number: '04',
    name: '手钳',
    position: '0% 50%',
    scenario: '夹持、弯折、剪切适用的小件或辅助拆装开口销、卡箍。',
    function: '钳口提供夹持力，切口可剪切规定范围内的软金属线；不同钳型承担不同任务。',
    keyPoint: '普通手钳不是扳手或压接钳；避免夹伤镀层、油管和精密轴表面。',
  },
  {
    id: 'ruler',
    number: '05',
    name: '钢直尺',
    position: '50% 50%',
    scenario: '快速长度、直线度和间距检查，如链条松弛量的初步读数。',
    function: '提供基准直边和毫米刻度，用于筛查与划线，不替代精密尺寸判定。',
    keyPoint: '从零刻线而不是尺端读数；尺身弯曲、毛边或视差会引入误差。',
  },
  {
    id: 'divider',
    number: '06',
    name: '卡钳',
    position: '100% 50%',
    scenario: '外径或厚度的比较测量，例如轴径、垫片厚度的快速比对。',
    function: '这里指外卡钳：先取工件两侧距离，再转移到钢直尺或量具上读取。',
    keyPoint: '它用于比较与转移尺寸，不能替代千分尺给出最终精确尺寸。',
  },
  {
    id: 'square',
    number: '07',
    name: '角尺',
    position: '0% 100%',
    scenario: '检查加工面、支架、工装边缘的直角关系与装配基准。',
    function: '以直角边作为基准，借透光缝隙或贴合状态判断是否明显偏斜。',
    keyPoint: '先清洁两接触面；角尺只验证角度关系，不能替代车架几何或定位数据。',
  },
  {
    id: 'feeler-gauge',
    number: '08',
    name: '厚薄规',
    position: '50% 100%',
    scenario: '气门间隙、火花塞间隙或规定平面缝隙的检查。',
    function: '用标称厚度的钢片判断间隙，必要时组合钢片形成目标厚度。',
    keyPoint: '按手册规定的温度和零件位置测量；以轻微均匀拖曳感判断，不能硬塞。',
  },
  {
    id: 'vernier-caliper',
    number: '09',
    name: '游标卡尺',
    position: '100% 100%',
    scenario: '外径、内径、深度与台阶尺寸的快速测量，如制动盘厚度初筛。',
    function: '外测爪、内测爪、深度尺和游标读数结合，可在一个工具上完成多种几何测量。',
    keyPoint: '清洁、调零、保持同轴并多点复测；接近维修限值时改用手册指定精度的量具复核。',
  },
] as const;

function GeneralToolsAtlas() {
  const sections = toolAtlasSections.length
    ? toolAtlasSections
    : [
        {
          id: 'fallback',
          eyebrow: '基础手工具',
          title: '通用维修工具九件套',
          summary: '基础手工具与测量工具。',
          asset: '/motorcycle-general-tools-atlas.png',
          tools: generalWorkshopTools,
        },
      ];
  return (
    <div className="tool-atlas-library">
      <div className="tool-atlas-intro">
        <span>维修工具全库</span>
        <h2>按维修功能覆盖工具，而不是只列几把常用扳手</h2>
        <p>
          收录 {toolAtlasSections.reduce((total, section) => total + section.tools.length, 0)} 项常用、专项与诊断工具。具体车型的工具号、螺纹接口、扭矩、压力、间隙与拆装顺序，始终以原厂手册为准。
        </p>
      </div>
      {sections.map((section) => (
        <section className="general-tools-atlas" aria-labelledby={`tool-section-${section.id}`} key={section.id}>
          <div className="general-tools-heading">
        <div>
              <span>{section.eyebrow}</span>
              <h2 id={`tool-section-${section.id}`}>{section.title}</h2>
              <p>{section.summary}</p>
        </div>
            <div
              aria-hidden="true"
              className="general-tools-overview"
              style={{ backgroundImage: `url(${section.asset})` }}
            />
          </div>
          <div className="general-tools-grid">
            {section.tools.map((tool) => (
          <article className="general-tool-card" key={tool.id}>
            <div
              aria-hidden="true"
              className="general-tool-image"
                  style={{ backgroundImage: `url(${section.asset})`, backgroundPosition: tool.position }}
            />
            <div className="general-tool-content">
              <span>{tool.number}</span>
              <h3>{tool.name}</h3>
              <dl>
                <div>
                  <dt>使用场景</dt>
                  <dd>{tool.scenario}</dd>
                </div>
                <div>
                  <dt>详细功能</dt>
                  <dd>{tool.function}</dd>
                </div>
                <div>
                  <dt>操作要点</dt>
                  <dd>{tool.keyPoint}</dd>
                </div>
              </dl>
            </div>
          </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<View>('home');
  const [selectedId, setSelectedId] = useState<string>(
    content.modules[0]?.id ?? '',
  );
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('全部');
  const [learningTrack, setLearningTrack] = useState<LearningTrack>('全部');
  const [selectedFoundationId, setSelectedFoundationId] = useState<string>(
    content.foundationTopics[0]?.id ?? '',
  );
  const [completed, setCompleted] = useState<string[]>([]);
  const [completedFoundations, setCompletedFoundations] = useState<string[]>(
    [],
  );
  const [copied, setCopied] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const savedModules = window.localStorage.getItem(
          'motorcycle-learning-progress-v1',
        );
        const savedFoundations = window.localStorage.getItem(
          'motorcycle-foundation-progress-v1',
        );
        if (savedModules) setCompleted(JSON.parse(savedModules));
        if (savedFoundations)
          setCompletedFoundations(JSON.parse(savedFoundations));
      } catch {
        window.localStorage.removeItem('motorcycle-learning-progress-v1');
        window.localStorage.removeItem('motorcycle-foundation-progress-v1');
      }
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const saveCompleted = (ids: string[]) => {
    setCompleted(ids);
    window.localStorage.setItem(
      'motorcycle-learning-progress-v1',
      JSON.stringify(ids),
    );
  };
  const saveCompletedFoundations = (ids: string[]) => {
    setCompletedFoundations(ids);
    window.localStorage.setItem(
      'motorcycle-foundation-progress-v1',
      JSON.stringify(ids),
    );
  };

  const modules: readonly Module[] = content.modules;
  const foundations: readonly FoundationTopic[] = content.foundationTopics;
  const selected = modules.find((item) => item.id === selectedId) ?? modules[0];
  const selectedIndex = selected ? modules.indexOf(selected) : -1;
  const nextModule =
    selectedIndex >= 0 ? modules[selectedIndex + 1] : undefined;
  const selectedFoundation =
    foundations.find((item) => item.id === selectedFoundationId) ??
    foundations[0];
  const selectedFoundationIndex = selectedFoundation
    ? foundations.indexOf(selectedFoundation)
    : -1;
  const nextFoundation =
    selectedFoundationIndex >= 0
      ? foundations[selectedFoundationIndex + 1]
      : undefined;
  const normalized = query.trim().toLowerCase();
  const moduleResults = useMemo(
    () =>
      normalized
        ? content.modules.filter((item) => item.searchText.includes(normalized))
        : [],
    [normalized],
  );
  const manualResults = useMemo(
    () =>
      content.manuals.filter(
        (item) =>
          (brand === '全部' || item.brand === brand) &&
          (!normalized || item.searchText.includes(normalized)),
      ),
    [brand, normalized],
  );
  const resourceResults = useMemo(
    () =>
      normalized
        ? content.learningResources.filter((item) =>
            item.searchText.includes(normalized),
          )
        : [],
    [normalized],
  );
  const foundationResults = useMemo(
    () =>
      normalized
        ? content.foundationTopics.filter((item) =>
            item.searchText.includes(normalized),
          )
        : [],
    [normalized],
  );
  const guideResults = useMemo(
    () =>
      normalized
        ? (
            Object.entries(content.learningGuides) as Array<
              [keyof typeof content.learningGuides, string]
            >
          ).filter(([track, body]) =>
            `${body} ${track === '维修工具' ? toolAtlasSearchText : ''}`
              .toLowerCase()
              .includes(normalized),
          )
        : [],
    [normalized],
  );
  const filteredResources = useMemo(
    () =>
      content.learningResources.filter(
        (item) => learningTrack === '全部' || item.track === learningTrack,
      ),
    [learningTrack],
  );
  const progress = Math.round(
    (completed.length / content.modules.length) * 100,
  );
  const totalCoreItems =
    content.modules.length + content.foundationTopics.length;
  const completedCoreItems = completed.length + completedFoundations.length;
  const overallProgress = Math.round(
    (completedCoreItems / totalCoreItems) * 100,
  );
  const nextCoreFoundation = foundations.find(
    (item) => !completedFoundations.includes(item.id),
  );
  const nextCoreModule = modules.find((item) => !completed.includes(item.id));
  const searchTotal =
    moduleResults.length +
    foundationResults.length +
    guideResults.length +
    manualResults.length +
    resourceResults.length;
  const brands = [
    '全部',
    ...Array.from(new Set(content.manuals.map((item) => item.brand))),
  ];

  const openModule = (item: Module) => {
    setSelectedId(item.id);
    setQuery('');
    setView('module');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openFoundation = (item: FoundationTopic) => {
    setSelectedFoundationId(item.id);
    setQuery('');
    setView('basics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openLearningGuide = (track: keyof typeof content.learningGuides) => {
    setLearningTrack(track);
    setQuery('');
    setView('learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const toggleComplete = (id: string) =>
    saveCompleted(
      completed.includes(id)
        ? completed.filter((item) => item !== id)
        : [...completed, id],
    );
  const toggleFoundationComplete = (id: string) =>
    saveCompletedFoundations(
      completedFoundations.includes(id)
        ? completedFoundations.filter((item) => item !== id)
        : [...completedFoundations, id],
    );
  const continueCoreLearning = () => {
    if (nextCoreFoundation) return openFoundation(nextCoreFoundation);
    if (nextCoreModule) return openModule(nextCoreModule);
    setView('route');
  };
  const startQuickSearch = (term: string) => {
    setQuery(term);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const focusSearch = () => {
    setQuery('');
    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  };
  const copyPath = async (id: number, pdfPath: string) => {
    await navigator.clipboard.writeText(pdfPath);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1500);
  };

  const nextCoreTitle =
    nextCoreFoundation?.title ?? nextCoreModule?.shortTitle ?? '核心路线已完成';
  const nextCoreDescription =
    nextCoreFoundation?.description ??
    nextCoreModule?.title ??
    '现在可以回到路线复盘，或进入车型手册处理真实工单。';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="topbar">
        <button
          className="brand-lockup"
          onClick={() => {
            setQuery('');
            setView('home');
          }}
          aria-label="返回今日工位"
        >
          <span className="brand-mark">
            <Wrench />
          </span>
          <span>
            <strong>摩修工位</strong>
            <small>学徒学习与诊断工作台</small>
          </span>
        </button>
        <div className="search-shell">
          <Search className="search-icon" />
          <Input
            ref={searchInputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索故障、系统、工具、车型或标准值……"
            className="search-input"
            aria-label="搜索基础知识、能力模块、维修手册和扩展学习资源"
          />
          {query && (
            <button
              className="clear-search"
              onClick={() => setQuery('')}
              aria-label="清空搜索"
            >
              <X />
            </button>
          )}
        </div>
        <div className="header-stats">
          <span>
            <strong>{overallProgress}%</strong> 核心进度
          </span>
          <span>
            <strong>{content.stats.manuals}</strong> 份手册
          </span>
          <span>
            <strong>{content.stats.learningResources}</strong> 项扩展资源
          </span>
        </div>
      </header>

      <div className="app-shell">
        <aside className="sidebar">
          <nav aria-label="主导航">
            <button
              className={view === 'home' ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                setQuery('');
                setView('home');
              }}
            >
              <HomeIcon />
              今日工位
            </button>
            <span className="nav-group-label">01 系统学习</span>
            <button
              className={view === 'basics' ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                setQuery('');
                setView('basics');
              }}
            >
              <BookMarked />
              基础知识
            </button>
            <button
              className={view === 'route' ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                setQuery('');
                setView('route');
              }}
            >
              <Gauge />
              能力路线
            </button>
            <button
              className={view === 'learning' ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                setQuery('');
                setView('learning');
              }}
            >
              <GraduationCap />
              专项与工具
            </button>
            <span className="nav-group-label">02 工位查阅</span>
            <button
              className={view === 'manuals' ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                setQuery('');
                setView('manuals');
              }}
            >
              <Library />
              车型手册
            </button>
            <button
              className={view === 'digest' ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                setQuery('');
                setView('digest');
              }}
            >
              <BookOpen />
              课程精编
            </button>
            <button
              className={view === 'glossary' ? 'nav-item active' : 'nav-item'}
              onClick={() => {
                setQuery('');
                setView('glossary');
              }}
            >
              <FileText />
              术语词典
            </button>
          </nav>
          <div className="sidebar-section">
            <div className="section-label">
              <span>12 个能力模块</span>
              <small>{completed.length}/12</small>
            </div>
            <div className="module-mini-list">
              {content.modules.map((item) => (
                <button
                  key={item.id}
                  className={
                    selectedId === item.id && view === 'module'
                      ? 'mini-module active'
                      : 'mini-module'
                  }
                  onClick={() => openModule(item)}
                >
                  <span className="step-number">
                    {String(item.step).padStart(2, '0')}
                  </span>
                  <span>{item.shortTitle}</span>
                  {completed.includes(item.id) ? (
                    <CheckCircle2 className="done-icon" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
          <div className="safety-note">
            <ShieldCheck />
            <p>
              <strong>实修边界</strong>
              <br />
              具体扭矩、间隙、燃压和针脚必须回查对应车型原 PDF。
            </p>
          </div>
        </aside>

        <section className="workspace">
          {normalized && (
            <div className="search-results-panel">
              <div className="panel-heading">
                <div>
                  <small>全库检索</small>
                  <h2>“{query}”</h2>
                </div>
                <Badge variant="outline">{searchTotal} 条结果</Badge>
              </div>
              {foundationResults.length > 0 && (
                <section className="search-result-section">
                  <h3>
                    基础课程 <span>{foundationResults.length}</span>
                  </h3>
                  <div className="result-grid foundation-search-grid">
                    {foundationResults.map((item) => (
                      <button
                        key={item.id}
                        className="result-card"
                        onClick={() => openFoundation(item)}
                      >
                        <Badge className="tone-blue">
                          职业标准 {item.code}
                        </Badge>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                        <span>
                          学习基础知识 <ArrowRight />
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              )}
              {moduleResults.length > 0 && (
                <section className="search-result-section">
                  <h3>
                    能力模块 <span>{moduleResults.length}</span>
                  </h3>
                  <div className="result-grid">
                    {moduleResults.map((item) => (
                      <button
                        key={item.id}
                        className="result-card"
                        onClick={() => openModule(item)}
                      >
                        <Badge className={groupTone[item.group]}>
                          {item.group}
                        </Badge>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                        <span>
                          进入模块 <ArrowRight />
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              )}
              {guideResults.length > 0 && (
                <section className="search-result-section">
                  <h3>
                    中文精编课 <span>{guideResults.length}</span>
                  </h3>
                  <div className="result-grid">
                    {guideResults.map(([track]) => (
                      <button
                        key={track}
                        className="result-card"
                        onClick={() => openLearningGuide(track)}
                      >
                        <Badge className={learningTone[track]}>{track}</Badge>
                        <strong>{track}中文精编课</strong>
                        <p>原始来源已完成中文精译、交叉核对和课程化重组。</p>
                        <span>
                          阅读中文课程 <ArrowRight />
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              )}
              {resourceResults.length > 0 && (
                <section className="search-result-section">
                  <h3>
                    扩展来源 <span>{resourceResults.length}</span>
                  </h3>
                  <div className="result-grid resource-search-grid">
                    {resourceResults.map((item) => (
                      <a
                        key={item.id}
                        className="result-card"
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Badge className={learningTone[item.track]}>
                          {item.track}
                        </Badge>
                        <strong>{item.title}</strong>
                        <p>{item.summary}</p>
                        <span>
                          打开来源 <ExternalLink />
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              )}
              {searchTotal === 0 && (
                <div className="empty-state">
                  <Search />
                  <h3>没有找到匹配内容</h3>
                  <p>换一个系统名称、工具、设计主题、车型或故障码试试。</p>
                </div>
              )}
              {manualResults.length > 0 && (
                <button
                  className="manual-result-jump"
                  onClick={() => {
                    setQuery('');
                    setView('manuals');
                  }}
                >
                  另有 {manualResults.length} 份来源手册匹配，查看手册目录{' '}
                  <ArrowRight />
                </button>
              )}
            </div>
          )}

          {!normalized && view === 'home' && (
            <div className="home-view">
              <div className="workbench-heading home-heading">
                <div>
                  <small>今日工位 · 清晰地完成下一件事</small>
                  <h1>从学习到实修，把每一步放在该放的位置</h1>
                  <p>
                    学习时先补原理，再练维修闭环；面对真实车辆时，从症状检索或车型手册进入。知识库提供判断路径，具体参数始终回到对应车型的原厂资料。
                  </p>
                </div>
                <div className="overall-score">
                  <strong>{overallProgress}%</strong>
                  <span>
                    {completedCoreItems} / {totalCoreItems} 项核心学习
                  </span>
                </div>
              </div>
              <div className="home-primary-grid">
                <article className="continue-card">
                  <div className="card-eyebrow">
                    <span>01 推荐下一步</span>
                    <Badge
                      className={
                        nextCoreFoundation ? 'tone-blue' : 'tone-orange'
                      }
                    >
                      {nextCoreFoundation
                        ? '基础课'
                        : nextCoreModule
                          ? '能力模块'
                          : '已完成'}
                    </Badge>
                  </div>
                  <h2>{nextCoreTitle}</h2>
                  <p>{nextCoreDescription}</p>
                  <div className="continue-progress">
                    <Progress value={overallProgress}>
                      <ProgressLabel>核心路线</ProgressLabel>
                      <ProgressValue>
                        {() => `${overallProgress}%`}
                      </ProgressValue>
                    </Progress>
                  </div>
                  <Button size="lg" onClick={continueCoreLearning}>
                    {completedCoreItems === totalCoreItems
                      ? '复盘能力路线'
                      : '继续学习'}{' '}
                    <ArrowRight />
                  </Button>
                </article>
                <section className="intent-panel" aria-label="快捷工作入口">
                  <div className="intent-heading">
                    <small>工作入口</small>
                    <h2>按要完成的事进入</h2>
                  </div>
                  <button onClick={continueCoreLearning}>
                    <span className="intent-icon tone-blue">
                      <GraduationCap />
                    </span>
                    <span>
                      <strong>系统学习</strong>
                      <small>继续未完成的基础课或能力模块</small>
                    </span>
                    <ArrowRight />
                  </button>
                  <button onClick={focusSearch}>
                    <span className="intent-icon tone-orange">
                      <Search />
                    </span>
                    <span>
                      <strong>诊断故障</strong>
                      <small>输入症状、报码或系统名称，先找判断路径</small>
                    </span>
                    <ArrowRight />
                  </button>
                  <button onClick={() => setView('manuals')}>
                    <span className="intent-icon tone-green">
                      <Library />
                    </span>
                    <span>
                      <strong>查车型手册</strong>
                      <small>按品牌定位原始 PDF 与具体数值</small>
                    </span>
                    <ArrowRight />
                  </button>
                </section>
              </div>
              <section className="core-path-section">
                <div className="section-heading">
                  <div>
                    <small>02 系统学习路径</small>
                    <h2>按顺序建立维修能力</h2>
                  </div>
                  <span>先理解，再操作，最后进入车型专项</span>
                </div>
                <div className="path-lanes">
                  <button onClick={() => setView('basics')}>
                    <span className="lane-index">01</span>
                    <div>
                      <Badge className="tone-blue">
                        {completedFoundations.length} / {foundations.length}
                      </Badge>
                      <h3>基础知识</h3>
                      <p>电工电子、材料、液压与整车构造，建立判断依据。</p>
                    </div>
                    <ArrowRight />
                  </button>
                  <button onClick={() => setView('route')}>
                    <span className="lane-index">02</span>
                    <div>
                      <Badge className="tone-orange">
                        {completed.length} / {modules.length}
                      </Badge>
                      <h3>能力路线</h3>
                      <p>接车、诊断、拆检、车型专项与放行，完成维修闭环。</p>
                    </div>
                    <ArrowRight />
                  </button>
                  <button onClick={() => openLearningGuide('维修工具')}>
                    <span className="lane-index">03</span>
                    <div>
                      <Badge className="tone-violet">强化</Badge>
                      <h3>专项与工具</h3>
                      <p>ADV、踏板、仿赛与维修工具，处理车型差异和工位方法。</p>
                    </div>
                    <ArrowRight />
                  </button>
                </div>
              </section>
              <section className="quick-search-section">
                <div className="section-heading">
                  <div>
                    <small>03 面对真实车辆</small>
                    <h2>从症状开始检索，再回到车型资料确认</h2>
                  </div>
                </div>
                <div className="diagnosis-grid">
                  <div className="diagnosis-group">
                    <strong>起动与电气</strong>
                    <div className="query-chips">
                      {['不起动', '电压降', '故障码'].map((term) => (
                        <button key={term} onClick={() => startQuickSearch(term)}>
                          <Search />
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="diagnosis-group">
                    <strong>制动与底盘</strong>
                    <div className="query-chips">
                      {['制动液', '轮胎规格', '轴承'].map((term) => (
                        <button key={term} onClick={() => startQuickSearch(term)}>
                          <Search />
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="diagnosis-group">
                    <strong>电驱与结构</strong>
                    <div className="query-chips">
                      {['BMS', '车架设计'].map((term) => (
                        <button key={term} onClick={() => startQuickSearch(term)}>
                          <Search />
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <div className="home-safety">
                <ShieldCheck />
                <div>
                  <strong>04 最后确认：原厂手册给出实车参数</strong>
                  <p>
                    涉及扭矩、间隙、燃压、针脚、制动和高压系统时，必须先确认车型、年款与版本，再回看原
                    PDF。
                  </p>
                </div>
              </div>
            </div>
          )}

          {!normalized && view === 'route' && (
            <div className="route-view">
              <div className="workbench-heading">
                <div>
                  <small>12 个能力模块 · 先证据，后拆换</small>
                  <h1>从接车到放行，练成一条完整维修闭环</h1>
                  <p>
                    每个模块都对应一个工位产出，不以“读过”作为完成。建议按顺序练习，再回到具体车型原手册查数值。
                  </p>
                </div>
                <div className="progress-card">
                  <Progress value={progress}>
                    <ProgressLabel>能力进度</ProgressLabel>
                    <ProgressValue>{() => `${progress}%`}</ProgressValue>
                  </Progress>
                  <small>
                    {completed.length === 0
                      ? '从车型版本门禁开始'
                      : completed.length === 12
                        ? '12 个模块已全部完成'
                        : `已完成 ${completed.length} 个模块`}
                  </small>
                </div>
              </div>
              <div className="phase-strip">
                <span className="active">01 资料</span>
                <i />
                <span>02 诊断</span>
                <i />
                <span>03 拆检</span>
                <i />
                <span>04 放行</span>
              </div>
              <div className="route-groups">
                {Array.from(
                  new Set(content.modules.map((item) => item.group)),
                ).map((group) => (
                  <section key={group} className="route-group">
                    <div className="route-group-title">
                      <span className={groupTone[group]}>
                        {group === '接车基础'
                          ? 'A'
                          : group === '诊断思维'
                            ? 'B'
                            : group === '拆检测量'
                              ? 'C'
                              : group === '车型专项'
                                ? 'D'
                                : 'E'}
                      </span>
                      <div>
                        <h2>{group}</h2>
                        <p>
                          {group === '接车基础'
                            ? '先确认资料和计划，再接受故障描述'
                            : group === '诊断思维'
                              ? '把状态、报码和测量连成证据链'
                              : group === '拆检测量'
                                ? '保存身份，用数值决定修换'
                                : group === '车型专项'
                                  ? '踏板传动与供电起动专项'
                                  : '恢复压力和安全功能后才放行'}
                        </p>
                      </div>
                    </div>
                    <div className="route-cards">
                      {content.modules
                        .filter((item) => item.group === group)
                        .map((item) => (
                          <article
                            key={item.id}
                            className={
                              completed.includes(item.id)
                                ? 'route-card complete'
                                : 'route-card'
                            }
                          >
                            <button
                              className="complete-button"
                              onClick={() => toggleComplete(item.id)}
                              aria-label={
                                completed.includes(item.id)
                                  ? '标记为未完成'
                                  : '标记为已完成'
                              }
                            >
                              {completed.includes(item.id) ? (
                                <CheckCircle2 />
                              ) : (
                                <Circle />
                              )}
                            </button>
                            <span className="route-step">
                              {String(item.step).padStart(2, '0')}
                            </span>
                            <div>
                              <Badge className={groupTone[item.group]}>
                                {item.shortTitle}
                              </Badge>
                              <h3>{item.title}</h3>
                              <p>{item.description}</p>
                              <div className="module-card-output">
                                <span>工位产出</span>
                                {moduleOutputs[item.group]?.artifact}
                              </div>
                              <button
                                className="read-link"
                                onClick={() => openModule(item)}
                              >
                                进入模块 <ArrowRight />
                              </button>
                            </div>
                          </article>
                        ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )}

          {!normalized && view === 'module' && selected && (
            <div className="reader-layout">
              <article className="reader-card">
                <div className="reader-kicker">
                  <Badge className={groupTone[selected.group]}>
                    {selected.group}
                  </Badge>
                  <span>
                    模块 {String(selected.step).padStart(2, '0')} / 12
                  </span>
                </div>
                <h1>{selected.title}</h1>
                <p className="reader-description">{selected.description}</p>
                <div className="module-contract">
                  <div>
                    <small>何时使用</small>
                    <strong>{selected.description.split('；')[0]}</strong>
                  </div>
                  <div>
                    <small>工位产出</small>
                    <strong>{moduleOutputs[selected.group]?.artifact}</strong>
                  </div>
                  <div>
                    <small>完成标准</small>
                    <strong>{moduleOutputs[selected.group]?.done}</strong>
                  </div>
                </div>
                <div className="reader-meta">
                  <span>
                    <FileText />
                    {selected.sourceChapter}
                  </span>
                </div>
                <MarkdownReader markdown={selected.body} query={query} />
              </article>
              <aside className="reader-aside">
                <div className="sticky-card">
                  <small>学习动作</small>
                  <h3>读原理 → 照步骤练一次 → 留下证据</h3>
                  <p>只有能形成工位产出，才建议标记完成。</p>
                  <Button
                    className="w-full"
                    variant={
                      completed.includes(selected.id) ? 'secondary' : 'default'
                    }
                    onClick={() => toggleComplete(selected.id)}
                  >
                    {completed.includes(selected.id) ? (
                      <>
                        <Check />
                        设为未完成
                      </>
                    ) : (
                      <>
                        <CheckCircle2 />
                        标记已完成
                      </>
                    )}
                  </Button>
                </div>
                <div className="sticky-card">
                  <small>下一模块</small>
                  {nextModule ? (
                    <>
                      <h3>{nextModule.shortTitle}</h3>
                      <p>{nextModule.title}</p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => openModule(nextModule)}
                      >
                        继续学习 <ArrowRight />
                      </Button>
                    </>
                  ) : (
                    <>
                      <h3>路线完成</h3>
                      <p>回到学习路线复盘所有模块。</p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setView('route')}
                      >
                        复盘路线 <ArrowRight />
                      </Button>
                    </>
                  )}
                </div>
              </aside>
            </div>
          )}

          {!normalized && view === 'basics' && selectedFoundation && (
            <div className="basics-view">
              <div className="workbench-heading compact">
                <div>
                  <small>职业编码 4-12-01-02 · 基础知识</small>
                  <h1>先懂原理，再做诊断与拆装</h1>
                  <p>
                    四门课程覆盖电工电子、常用材料、液压传动和整车构造。每门课以“能解释原理并完成一次对应检查”为完成标准。
                  </p>
                </div>
                <div className="learning-count">
                  <strong>
                    {completedFoundations.length}/
                    {content.stats.foundationTopics}
                  </strong>
                  <span>门基础课程已完成</span>
                </div>
              </div>
              <div className="foundation-tabs">
                {content.foundationTopics.map((item) => (
                  <button
                    key={item.id}
                    className={
                      selectedFoundation.id === item.id
                        ? 'foundation-tab active'
                        : 'foundation-tab'
                    }
                    onClick={() => setSelectedFoundationId(item.id)}
                  >
                    <span>{item.code}</span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                    {completedFoundations.includes(item.id) && (
                      <em>
                        <CheckCircle2 />
                        已完成
                      </em>
                    )}
                  </button>
                ))}
              </div>
              <div className="reader-layout foundation-layout">
                <article className="reader-card foundation-reader">
                  <div className="reader-kicker">
                    <Badge className="tone-blue">
                      {selectedFoundation.code}
                    </Badge>
                    <span>职业标准基础课程</span>
                  </div>
                  <MarkdownReader markdown={selectedFoundation.body} />
                </article>
                <aside className="reader-aside">
                  <div className="sticky-card">
                    <small>基础课状态</small>
                    <h3>
                      {completedFoundations.includes(selectedFoundation.id)
                        ? '本课程已完成'
                        : '能讲清原理，并做一次对应检查'}
                    </h3>
                    <Button
                      className="w-full"
                      variant={
                        completedFoundations.includes(selectedFoundation.id)
                          ? 'secondary'
                          : 'default'
                      }
                      onClick={() =>
                        toggleFoundationComplete(selectedFoundation.id)
                      }
                    >
                      {completedFoundations.includes(selectedFoundation.id) ? (
                        <>
                          <Check />
                          设为未完成
                        </>
                      ) : (
                        <>
                          <CheckCircle2 />
                          标记已完成
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="sticky-card">
                    <small>下一门基础课</small>
                    {nextFoundation ? (
                      <>
                        <h3>{nextFoundation.title}</h3>
                        <p>{nextFoundation.description}</p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => openFoundation(nextFoundation)}
                        >
                          继续学习 <ArrowRight />
                        </Button>
                      </>
                    ) : (
                      <>
                        <h3>基础课完成</h3>
                        <p>进入 12 个能力模块，把原理转成工位动作。</p>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setView('route')}
                        >
                          进入能力路线 <ArrowRight />
                        </Button>
                      </>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          )}

          {!normalized && view === 'learning' && (
            <div className="learning-view">
              <div className="workbench-heading compact">
                <div>
                  <small>车型专项 · 工具 · 进阶资料</small>
                  <h1>在维修闭环之后，再处理车型差异与专项方法</h1>
                  <p>
                    这里用于强化 ADV、踏板、仿赛和维修工具等专项知识，不替代核心路线。先读中文精编课，再打开权威来源深入；具体车型数据仍回查本地原始手册。
                  </p>
                </div>
                <div className="learning-count">
                  <strong>{content.stats.learningResources}</strong>
                  <span>项已核实资源</span>
                </div>
              </div>
              <div className="learning-track-row">
                {(
                  [
                    '全部',
                    ...Object.keys(content.learningGuides),
                  ] as LearningTrack[]
                ).map((item) => (
                  <Button
                    key={item}
                    variant={learningTrack === item ? 'default' : 'outline'}
                    onClick={() => setLearningTrack(item)}
                  >
                    {item === '全部' ? '全部资源' : item}
                  </Button>
                ))}
              </div>
              {learningTrack === '全部' ? (
                <div className="track-overview">
                  {(
                    Object.keys(content.learningGuides) as Array<
                      keyof typeof content.learningGuides
                    >
                  ).map((track) => (
                    <button
                      key={track}
                      className="track-card"
                      onClick={() => setLearningTrack(track)}
                    >
                      <Badge className={learningTone[track]}>
                        {track === '车型专项'
                          ? '3 个模块'
                          : `${content.learningResources.filter((item) => item.track === track).length} 项来源`}
                      </Badge>
                      <h2>{track}</h2>
                      <p>
                        {track === '维修学习'
                          ? '按职业能力组织安全、工具、电气、发动机、底盘和诊断实训。'
                          : track === '摩托设计'
                            ? '从产品任务、整车布置和车辆动力学走到 CAD、CAE 与样车验证。'
                            : track === '维修工具'
                              ? '按维修任务选工具，学习链条、轮胎、火花塞、电气与悬架工具，掌握误用排查、工位记录和自测。'
                              : '按 ADV、踏板与仿赛的结构、工况和风险差异组织专项检查、诊断与复验。'}
                      </p>
                      <span>
                        阅读中文精编课 <ArrowRight />
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <article className="reader-card learning-guide">
                  <div className="reader-kicker">
                    <Badge className={learningTone[learningTrack]}>
                      {learningTrack}
                    </Badge>
                    <span>中文精编课 · 原始来源已重组</span>
                  </div>
                  {learningTrack === '维修工具' && <GeneralToolsAtlas />}
                  <MarkdownReader
                    markdown={content.learningGuides[learningTrack]}
                  />
                </article>
              )}
              <div className="resource-section-heading">
                <div>
                  <small>来源目录</small>
                  <h2>
                    {learningTrack === '全部'
                      ? '全部扩展学习资源'
                      : learningTrack === '车型专项'
                        ? '模块构成'
                      : `${learningTrack}来源`}
                  </h2>
                </div>
                <Badge variant="outline">
                  {learningTrack === '车型专项'
                    ? 'ADV · 踏板 · 仿赛'
                    : `${filteredResources.length} 项`}
                </Badge>
              </div>
              {learningTrack !== '车型专项' && (
                <div className="resource-grid">
                  {filteredResources.map((item) => (
                  <article key={item.id} className="resource-card">
                    <div className="resource-card-top">
                      <Badge className={learningTone[item.track]}>
                        {item.track}
                      </Badge>
                      <span>{item.access}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="resource-provider">
                      {item.provider} · {item.authority}
                    </p>
                    <p>{item.summary}</p>
                    <dl>
                      <div>
                        <dt>怎么学</dt>
                        <dd>{item.use}</dd>
                      </div>
                      <div>
                        <dt>边界</dt>
                        <dd>{item.caution}</dd>
                      </div>
                    </dl>
                    <div className="resource-meta">
                      <span>{item.level}</span>
                      <span>{item.language}</span>
                      <span>{item.format}</span>
                    </div>
                    <a href={item.url} target="_blank" rel="noreferrer">
                      打开原始来源 <ExternalLink />
                    </a>
                  </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {!normalized && view === 'manuals' && (
            <div className="manual-view">
              <div className="workbench-heading compact">
                <div>
                  <small>官方来源目录</small>
                  <h1>41 份维修手册与技术资料</h1>
                  <p>
                    点击复制原文件路径。视觉附件必须回看 PDF
                    图面；具体数值不跨车型套用。
                  </p>
                </div>
              </div>
              <div className="filter-row">
                {brands.map((item) => (
                  <Button
                    key={item}
                    size="sm"
                    variant={brand === item ? 'default' : 'outline'}
                    onClick={() => setBrand(item)}
                  >
                    {item.replace(/_.+$/, '')}
                  </Button>
                ))}
              </div>
              <div className="manual-list">
                {manualResults.map((item) => (
                  <article key={item.id} className="manual-row">
                    <span className="manual-id">
                      {String(item.id).padStart(2, '0')}
                    </span>
                    <div>
                      <Badge
                        variant={
                          item.status === '视觉附件' ? 'secondary' : 'outline'
                        }
                      >
                        {item.status}
                      </Badge>
                      <h3>{item.title}</h3>
                      <p>
                        {item.brand.replace(/_.+$/, '')} · {item.group} ·{' '}
                        {item.pages.toLocaleString()} 页
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => copyPath(item.id, item.pdfPath)}
                    >
                      {copied === item.id ? (
                        <>
                          <Check />
                          已复制
                        </>
                      ) : (
                        <>
                          <Clipboard />
                          复制路径
                        </>
                      )}
                    </Button>
                  </article>
                ))}
              </div>
            </div>
          )}
          {!normalized && view === 'digest' && (
            <article className="reader-card standalone">
              <div className="reader-kicker">
                <Badge className="tone-orange">约 9 千字</Badge>
                <span>学徒精华学习稿</span>
              </div>
              <MarkdownReader markdown={content.digest} />
            </article>
          )}
          {!normalized && view === 'glossary' && (
            <article className="reader-card standalone">
              <div className="reader-kicker">
                <Badge className="tone-blue">20 条</Badge>
                <span>共享术语词典</span>
              </div>
              <MarkdownReader markdown={content.glossary} />
            </article>
          )}
        </section>
      </div>
      <footer>
        <span>
          数据生成：{new Date(content.generatedAt).toLocaleString('zh-CN')}
        </span>
        <span>资料根目录：{content.sourceRoot}</span>
      </footer>
    </main>
  );
}
