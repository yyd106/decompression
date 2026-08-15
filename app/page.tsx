import { ArrowIcon } from "./components/ArrowIcon";
import { courseStats, disciplines } from "../lib/site-data";

const workedExample = [
  {
    index: "01",
    title: "一封邮件被标记",
    body: "用户把一封邮件标成垃圾邮件，这条带有明确答案的记录就成为样本；其中的答案叫作标签。",
  },
  {
    index: "02",
    title: "模型读取可用信息",
    body: "发件人、文字和链接等信息会影响判断。机器学习把这些可供模型使用的信息叫作特征。",
  },
  {
    index: "03",
    title: "预测与答案比较",
    body: "模型先作出预测，再把预测与标签比较。两者之间的差距形成误差，训练据此调整模型。",
  },
  {
    index: "04",
    title: "换一批新邮件检验",
    body: "旧邮件上表现好还不够。只有面对训练时没见过的邮件仍能判断，模型才可能学到了可迁移的规律。",
  },
];

const argumentsForDecompression = [
  {
    index: "01",
    title: "固定内容只能预设一条主要路径",
    paragraphs: [
      "一本书需要把知识保存成稳定版本，作者必须提前决定从哪里开始、哪些概念先出现。这种结构适合保存、论证和查阅，也记录了作者完整的思考过程。",
      "学习者的起点却不同。甲已经理解的前提，乙可能从未接触；固定文本无法知道读者卡在哪一步，也无法当场换一种解释。",
    ],
  },
  {
    index: "02",
    title: "领域越大，初学者越难先看见主线",
    paragraphs: [
      "一个领域持续发展，会出现更多概念、工具、分支和例外。不同作者又会按照各自的目标重新安排它们，书架越来越完整，进入领域的路径也越来越多。",
      "初学者常常要先读过大量内容，才慢慢发现哪些问题贯穿全局。此时缺少的不是下一份资料，而是一套能让细节找到位置的结构。",
    ],
  },
  {
    index: "03",
    title: "AI 让解释可以分叉，但分叉仍然需要骨架",
    paragraphs: [
      "生成式 AI 可以根据一次追问重新表述概念、补充案例或调整解释深度。过去必须由作者提前写好的解释分支，现在可以在学习发生时生成。",
      "但更多解释不等于可靠结构。课程仍需确定核心问题、关键变量、事实边界和检验方式；AI 再围绕这套骨架调整粒度，才不会把一次追问变成另一轮知识堆叠。",
    ],
  },
];

const decompressionChecks = [
  ["覆盖", "核心案例能否放回同一套模型中解释？"],
  ["推导", "后续概念为什么出现，能否从模型中推出？"],
  ["迁移", "面对没见过的新案例，能否据此作出判断？"],
  ["边界", "判断失败时，能否指出缺少的条件？"],
];

const learningMethod = [
  {
    index: "1",
    title: "找到压缩模型",
    subtitle: "先跑通一个完整案例",
    body: "从读者见过的问题开始，明确谁参与、输入什么、希望得到什么结果，以及反馈怎样回到系统。模型不是一句口号，而是这条机制中反复出现的关系。",
  },
  {
    index: "2",
    title: "建立核心变量",
    subtitle: "让概念在需要时出现",
    body: "只有当机制需要回答一个新问题时，才引入对应术语。每个概念都要说明它负责哪一步、会改变什么结果，以及和相邻概念有什么区别。",
  },
  {
    index: "3",
    title: "从模型展开知识",
    subtitle: "换条件重新检验",
    body: "改变输入、目标或约束，再判断结果为什么变化。解释中断时，AI 可以换例子或缩小步长；模型解释不了新事实时，就标出边界或修正原有判断。",
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
              先跑通一个真实问题，
              <br />
              再展开<em>一门学科</em>。
            </h1>
            <p className="hero-lead">
              固定内容必须预先安排同一条主要路径，学习者却有不同的起点和疑问。知识解压用稳定骨架守住方向，再让 AI 围绕你的问题调整解释的粒度与节奏。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/courses/ai/machine-learning">
                开始学习机器学习
                <ArrowIcon />
              </a>
              <a className="button button-quiet" href="/#fields">
                查看五个学习板块
              </a>
            </div>
          </div>

          <aside className="hero-note" aria-label="理解的三个检验问题">
            <p className="note-label">学完以后，检查三件事</p>
            <h2>知识真的变成你的了吗？</h2>
            <ol>
              <li>
                <span>01</span>
                能复原事情怎样发生吗？
              </li>
              <li>
                <span>02</span>
                能判断一个没见过的案例吗？
              </li>
              <li>
                <span>03</span>
                能说清原有判断何时失效吗？
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
          <p>目前已完整展开：机器学习与深度学习 · 共 30 节。</p>
        </div>
      </section>

      <section className="example-section section-pad" id="example">
        <div className="site-container">
          <div className="section-heading split-heading example-heading">
            <div>
              <p className="eyebrow">A WORKED EXAMPLE</p>
              <h2>先看一次知识<br />怎样被解开。</h2>
            </div>
            <p>
              为什么“样本、标签、特征、训练、泛化”不是五个分散的术语？把垃圾邮件过滤器完整跑一遍，概念会在机制需要它们时依次出现。
            </p>
          </div>

          <div className="example-flow">
            {workedExample.map((step) => (
              <article className="example-step" key={step.index}>
                <span>{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>

          <div className="example-conclusion">
            <p className="example-label">这次解压保留了什么？</p>
            <p>
              它没有把术语换成更短的定义，而是恢复了术语之间的因果关系：为什么需要下一个概念，它改变了哪一步，又该怎样检验。
            </p>
            <p>
              如果模型只在旧邮件上表现很好，面对新邮件却频繁出错，我们还要引入“过拟合”。新概念不是目录里的下一项，而是旧模型解释不了事实后出现的新问题。
            </p>
          </div>
        </div>
      </section>

      <section className="argument-section section-pad" id="why">
        <div className="site-container">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">WHY NOW</p>
              <h2>为什么过去容易<br />先给目录，后给地图？</h2>
            </div>
            <p>
              问题不在于书籍不够好，而在于固定内容无法观察每位读者的理解状态。AI 改变了解释的可变性；稳定的课程骨架负责让变化不偏离主线。
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
            <p className="definition-small">摘要主要减少内容长度；知识解压保留生成关系。</p>
            <p className="definition-large">
              先用少数实体、变量和因果关系解释核心案例，再从这套关系<span>推出概念，并用新案例检查它是否成立。</span>
            </p>
            <div className="definition-checks" aria-label="知识解压的四项检验">
              {decompressionChecks.map(([title, description]) => (
                <div key={title}>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="method-section section-pad" id="method">
        <div className="site-container">
          <div className="section-heading method-heading">
            <p className="eyebrow">THE METHOD</p>
            <h2>一门课怎样完成压缩与解压？</h2>
            <p>不是只记住一句强断言，而是完成三个可以观察、可以返工的动作。</p>
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
              <h2>从你此刻最想解释的<br />问题开始。</h2>
            </div>
            <p>
              每张卡不试图用一句话讲完整个领域，而是给出第一组值得追问的问题。进入课程后，再沿着变量、机制和案例逐层展开。
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
                    {discipline.active ? "进入 2 门已展开课程" : "入门大纲已就绪"}
                    {discipline.active && <ArrowIcon />}
                  </div>
                </article>
              );

              return discipline.active ? (
                <a
                  className="discipline-link"
                  href="/courses/ai"
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
            <h2>把这条因果链，继续展开成一门机器学习入门课。</h2>
            <p>
              首页只跑通了垃圾邮件过滤器的最小机制。完整课程会依次展开任务、样本、特征、训练、误差、评估与泛化，再处理过拟合、数据泄漏和类别不平衡。
            </p>
            <p>
              后半程还会比较监督学习、无监督学习和强化学习。你不需要先会写代码或推导复杂公式，只需基础算术、百分比和表格阅读。
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
