export type Discipline = {
  slug: string;
  name: string;
  index: string;
  question: string;
  model: string;
  courses: string[];
  accent: string;
  active?: boolean;
};

export const disciplines: Discipline[] = [
  {
    slug: "ai",
    name: "AI",
    index: "01",
    question: "机器怎样从过去的数据中学会判断没见过的新情况，并进一步生成内容或执行任务？",
    model:
      "机器学习从样本和反馈中调整模型，深度学习进一步自动提取表示。大语言模型与 Agent 再把预测连接到语言、工具和行动。",
    courses: ["机器学习", "深度学习", "大语言模型", "AI Agent"],
    accent: "sage",
    active: true,
  },
  {
    slug: "finance",
    name: "金融",
    index: "02",
    question: "一笔钱从 A 到 B，哪些账本会改变，等待和损失风险又由谁承担？",
    model:
      "货币记录可转移的购买力，支付改变账本，投资交换今天与未来。银行等机构用资产负债表承接风险，交易所、托管与资管则通过契约和基础设施连接资金。",
    courses: ["货币", "支付系统", "投资", "金融机构"],
    accent: "gold",
  },
  {
    slug: "art",
    name: "艺术",
    index: "03",
    question: "声音、画面、节奏和交互顺序，怎样改变观众的感受与行动？",
    model:
      "音乐组织声音与时间，美术组织视觉，电影组织视听叙事，设计组织人与物的互动。四门课研究创作者如何选择感知材料，让别人重建体验。",
    courses: ["音乐", "美术", "电影", "设计"],
    accent: "red",
  },
  {
    slug: "humanities",
    name: "人文",
    index: "04",
    question: "面对同一件事，人为什么会形成不同解释，并作出不同选择？",
    model:
      "心理学解释个体的认知与行为，哲学检查概念与判断，历史用证据重建变化。它们共同训练我们提出解释，也识别解释需要哪些条件。",
    courses: ["心理学", "哲学", "历史"],
    accent: "blue",
  },
  {
    slug: "language",
    name: "语言",
    index: "05",
    question: "一句语法正确的话，为什么仍可能没有传达说话者的意思？",
    model:
      "英语和中文研究形式、意义与语境怎样共同作用，写作研究如何主动安排读者的理解路径。目标不是堆叠词汇，而是更准确地表达、理解和修订。",
    courses: ["英语", "中文", "写作"],
    accent: "violet",
  },
];

export const courseStats = [
  { value: "5", label: "个学习板块" },
  { value: "18", label: "门入门课程" },
  { value: "265", label: "节课程大纲" },
];
