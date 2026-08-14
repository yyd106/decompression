import { ArrowIcon } from "./components/ArrowIcon";
import { courseStats, disciplines } from "../lib/site-data";

const argumentsForDecompression = [
  {
    index: "01",
    title: "过去的载体，首先要保存知识",
    paragraphs: [
      "过去，学习者首先面对的是“资料在哪里”。知识分散在书籍、论文和专家经验里，出版一本教材的成本又很高。作者只能预先选定一条顺序，把一个领域尽可能完整地装进固定篇幅。这种方式保存了知识，也方便查阅，并不是错误的设计。",
      "问题出在学习的起点。一本书无法知道此刻的读者卡在哪里，也无法根据一次误解立刻换一个例子。初学者因此容易先遇到几十个陌生名词，却还不知道这些名词共同在解决什么问题。资料已经拿到手，理解它们的地图仍然缺席。",
    ],
  },
  {
    index: "02",
    title: "AI 增加了解释，却不会自动生成理解",
    paragraphs: [
      "AI 显著降低了寻找、改写和追问知识的成本。你可以要求它解释术语、比较方案、换一个生活案例，或者根据自己的回答继续追问。过去需要翻阅多本书才能拼出的材料，现在可以在一次对话里快速聚合。",
      "但“随时生成解释”不等于“已经形成理解”。如果问题本身没有结构，AI 也可能继续生成一串看似完整的目录。它解决了知识供给和互动速度，却没有自动解决知识怎样组织、怎样验证、怎样真正被使用。",
    ],
  },
  {
    index: "03",
    title: "稳定骨架与动态解释，现在可以同时存在",
    paragraphs: [
      "知识解压需要两部分：一套稳定的课程骨架，以及能够围绕骨架动态展开的解释。课程先给出核心问题、参与者、关键变量和运作机制，再由 AI 根据学习者的疑问补充例子、对比和练习。",
      "这让课程不必在“过于简略”和“面面俱到”之间二选一。主干保持一致，解释可以随读者调整，直到抽象判断落到可观察的案例。AI 在这里不是知识权威，而是解说员和陪练。",
    ],
  },
  {
    index: "04",
    title: "能迁移、能被证伪，才算真正解压",
    paragraphs: [
      "一句漂亮总结只能让人点头，一个有效模型应该让人做出以前做不到的事：解释主要案例，推出后续概念为什么出现，判断一个没见过的新例子，并说清自己的适用条件。",
      "如果一句概括容不下重要事实，我们就修改它，而不是把事实硬塞进去。如果学习者只能复述句子，却不能用它分析案例，这门课还没有完成解压。课程的终点，是能借助模型提出问题、预测结果，再根据反馈修正理解。",
    ],
  },
];

const learningMethod = [
  {
    index: "1",
    title: "世界模型",
    subtitle: "先看见系统怎样运转",
    body: "从一个能观察到的现象开始，找出参与者、目标、约束与反馈，再用完整案例跑通机制。你先获得一张足以辨认方向的地图。",
  },
  {
    index: "2",
    title: "知识解压",
    subtitle: "让概念从问题中出现",
    body: "每个术语都作为具体问题的答案出现：为什么需要它，它改变了哪一步，它和相邻概念有什么不同。细节因此有位置可以挂载。",
  },
  {
    index: "3",
    title: "实践验证",
    subtitle: "用新案例检验并修正",
    body: "改变案例条件，解释结果为什么变化，再把模型用于没见过的对象。当模型解释不了事实时，标出例外或修正原有判断。",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-grid site-container">
          <div className="hero-copy">
            <p className="eyebrow">知识解压 · AI 时代学习方式的革命</p>
            <h1>
              先看懂一个领域
              <br />
              <em>怎样运转</em>，再记住
              <br />
              知识叫什么。
            </h1>
            <p className="hero-lead">
              AI 可以随时给出答案，却不会自动把答案变成你的理解。知识解压从真实问题出发，先建立一个能解释现象的世界模型，再逐步展开概念、机制与边界。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/courses/ai/machine-learning">
                开始学习机器学习
                <ArrowIcon />
              </a>
              <a className="button button-quiet" href="/#fields">
                查看全部课程
              </a>
            </div>
          </div>

          <aside className="hero-note" aria-label="理解的三个检验问题">
            <p className="note-label">不是更短，而是更能生成</p>
            <h2>你真的理解了吗？</h2>
            <ol>
              <li>
                <span>01</span>
                能解释一个熟悉现象吗？
              </li>
              <li>
                <span>02</span>
                能判断一个新案例吗？
              </li>
              <li>
                <span>03</span>
                能说清模型何时失效吗？
              </li>
            </ol>
            <p className="note-foot">三项都能做到，知识才从“见过”变成“会用”。</p>
          </aside>
        </div>
        <div className="site-container stats-row" aria-label="课程规模">
          {courseStats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
          <p>从一门真正展开的机器学习入门课开始。</p>
        </div>
      </section>

      <section className="argument-section section-pad" id="why">
        <div className="site-container">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">WHY NOW</p>
              <h2>为什么现在需要<br />知识解压？</h2>
            </div>
            <p>
              信息稀缺时，重要的是把知识保存下来。信息充足后，更稀缺的是一套能组织、调用和检验知识的结构。
            </p>
          </div>

          <div className="argument-list">
            {argumentsForDecompression.map((item) => (
              <article className="argument-item" key={item.index}>
                <p className="argument-index">{item.index}</p>
                <h3>{item.title}</h3>
                <div>
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="decompression-definition">
            <p className="definition-kicker">知识解压 ≠ 摘要</p>
            <p className="definition-small">摘要把 100 页缩成 10 页。</p>
            <p className="definition-large">
              知识解压找到 100 页背后的<span>生成模型</span>，让你能继续理解第 101 页。
            </p>
          </div>
        </div>
      </section>

      <section className="method-section section-pad" id="method">
        <div className="site-container">
          <div className="section-heading method-heading">
            <p className="eyebrow">THE METHOD</p>
            <h2>一门课，完成三次认知转换</h2>
            <p>模型负责定方向，概念负责补结构，实践负责纠错。</p>
          </div>
          <div className="method-grid">
            {learningMethod.map((step) => (
              <article className="method-card" key={step.index}>
                <span className="method-index">{step.index}</span>
                <p className="method-subtitle">{step.subtitle}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fields-section section-pad" id="fields">
        <div className="site-container">
          <div className="section-heading split-heading fields-heading">
            <div>
              <p className="eyebrow">COURSE MAP</p>
              <h2>五个板块，<br />五种理解世界的入口</h2>
            </div>
            <p>
              每个板块先回答一个根问题，再展开为可以单独进入的入门课。你不必按顺序学完，只需从此刻最想解释的问题开始。
            </p>
          </div>

          <div className="discipline-list">
            {disciplines.map((discipline) => {
              const card = (
                <article className={`discipline-card accent-${discipline.accent}`}>
                  <div className="discipline-topline">
                    <span>{discipline.index}</span>
                    <span>{discipline.courses.length} 门课</span>
                  </div>
                  <h3>{discipline.name}</h3>
                  <p className="discipline-question">{discipline.question}</p>
                  <p className="discipline-model">{discipline.model}</p>
                  <ul aria-label={`${discipline.name}课程`}>
                    {discipline.courses.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                  <div className="discipline-status">
                    {discipline.active ? "进入已展开课程" : "入门大纲已就绪"}
                    {discipline.active && <ArrowIcon />}
                  </div>
                </article>
              );

              return discipline.active ? (
                <a
                  className="discipline-link"
                  href="/courses/ai/machine-learning"
                  key={discipline.slug}
                >
                  {card}
                </a>
              ) : (
                <div className="discipline-link" key={discipline.slug}>
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="course-feature section-pad">
        <div className="site-container feature-grid">
          <div className="feature-copy">
            <p className="eyebrow">FIRST COURSE · 16 LESSONS</p>
            <h2>从机器学习开始，第一次完整体验知识解压。</h2>
            <p>
              当相册认出猫，或平台判断一笔交易是否异常，机器不是照着人写好的规则逐条执行。它从许多案例中调整模型，再把规律用于没见过的数据。
            </p>
            <p>
              课程从熟悉现象出发，依次展开样本、特征、训练、误差、评估与泛化。你不需要先会写代码或推导复杂公式。
            </p>
            <a className="text-link" href="/courses/ai/machine-learning">
              进入《机器学习入门》
              <ArrowIcon />
            </a>
          </div>
          <div className="feature-outcomes">
            <p className="outcomes-label">学完以后，你应该能够</p>
            <ul>
              <li>
                <span>01</span>
                解释机器怎样从案例中形成判断
              </li>
              <li>
                <span>02</span>
                区分“记住训练数据”与“掌握可迁移规律”
              </li>
              <li>
                <span>03</span>
                判断一个模型结果什么时候值得相信
              </li>
            </ul>
            <p className="feature-prerequisite">零编程基础 · 只需基础算术与表格阅读</p>
          </div>
        </div>
      </section>
    </>
  );
}
