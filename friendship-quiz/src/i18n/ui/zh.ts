import type { Dict } from "./ko";

const zh: Dict = {
  site: {
    name: "关系温度",
    description:
      "和恋人、朋友、家人各自回答同样的问题，比较两个人的答案，看看你们的「关系温度」。你先回答并发送链接，对方接着回答。免费、无需注册，仅供娱乐。",
    shareImageAlt: "关系温度 - 我们之间现在是几度？",
  },
  roles: { a: "邀请人", b: "受邀人" },
  bands: { low: "微凉", middle: "温吞", high: "温暖" },
  nav: {
    skip: "跳到正文",
    main: "主菜单",
    tests: "选择测试",
    about: "关于",
    siteInfo: "网站信息",
    privacy: "隐私说明",
    contact: "联系我们",
    language: "语言",
  },
  footer: {
    disclaimer: (name: string) =>
      `「${name}」的结果只是比较两个人所选的答案，仅供娱乐，不是心理诊断，也不评判你们真实的关系。`,
  },
  card: {
    title: (name: string) => `${name}默契度`,
    meta: (n: number, m: number) => `共 ${n} 题 · 每人约 ${m} 分钟`,
    topics: "测试内容",
    cta: (name: string) => `查看${name}测试`,
  },
  quiz: {
    progress: (c: number, t: number) => `第 ${c} / ${t} 题`,
    progressLabel: "测试进度",
    progressValue: (c: number, t: number) => `共 ${t} 题中的第 ${c} 题`,
    pickFirst: "请先选择一个选项再继续。",
    prev: "上一题",
    next: "下一题",
    done: "完成作答",
  },
  share: {
    share: "分享链接",
    copy: "复制链接",
    failed: "当前环境无法自动复制。请长按或选中上方输入框里的链接，手动复制。",
    cancelled: "已取消分享。",
    shared: "已打开分享面板。",
    sharedByCopy: "此设备不支持分享面板，已将链接复制到剪贴板。",
    copied: "已将链接复制到剪贴板。",
  },
  start: {
    loading: "正在加载测试…",
    resumeTitle: "你还有没答完的测试",
    firstTitle: "我先来回答",
    intro: (n: number) =>
      `回答 ${n} 道题后，会生成一个发给对方的邀请链接。没有标准答案，请选择最接近平时的你的选项。`,
    resume: "继续作答",
    start: "开始测试",
    restartAnswers: "从头重新作答",
    created: "邀请链接已生成",
    createdBody: (name: string) =>
      `请把下面的链接发给要一起做${name}测试的人。对方回答同样的问题后，就能看到你们的温度。`,
    inviteLink: "邀请链接",
    inviteText: (site: string, name: string) =>
      `[${site}] 我邀请你来做${name}测试。回答同样的问题，就能看到我们之间的温度。`,
    nextTitle: "接下来会这样进行",
    nextSteps: (n: number) => [
      `对方打开链接，回答同样的 ${n} 道题。`,
      "对方答完后，结果会立刻显示在对方的屏幕上。",
      "请对方把结果页面上的「结果链接」发给你，你也能看到同样的结果。",
    ],
    linkNote:
      "这个链接里包含你选择的答案。它不会保存在服务器上，但也没有加密，收到链接的人可以看到你的答案。请只发给要一起测试的人。链接丢失后无法找回，需要的话请记下来。",
    edit: "修改我的答案",
    restart: "从头再来",
  },
  invite: {
    loading: "正在确认邀请链接…",
    badge: (name: string) => `${name}默契度测试邀请`,
    doneTitle: "你已经答完了",
    doneBody: "你可以再次查看结果，或者修改答案查看新的结果。",
    viewResult: "查看结果",
    editAnswers: "修改答案",
    introTitle: "对方已经先回答并邀请了你",
    introBullets: (n: number, m: number) => [
      `你将回答对方已经答过的同样 ${n} 道题，大约需要 ${m} 分钟。`,
      "对方的答案不会提前显示。你答完后，会立刻看到两个人答案的比较结果。",
      "没有标准答案。请选择最接近平时的你的选项。",
      "结果链接里会同时包含两个人的答案。它不会保存在服务器上，但持有该链接的人都能看到答案。",
      "结果仅供娱乐和聊天，不是心理诊断，也不评判关系的好坏。",
    ],
    resume: "继续作答",
    start: "开始作答",
  },
  result: {
    loading: "正在确认结果链接…",
    badge: (name: string) => `${name}默契度结果`,
    thermometer: (t: string, band: string, base: number) => `关系温度 ${t} 度，${band}。基准为 ${base} 度。`,
    base: (b: number) => `基准 ${b}℃`,
    both: "两个人都选了",
    meaningTitle: "如何理解这个温度",
    meaning: (min: number, max: number, base: number) => [
      `在联系频率、守约这类期待一致才舒服的问题上，两个人的答案越接近，温度就越高。范围是 ${min}℃~${max}℃，正中间是 ${base}℃。`,
      "像个人喜好这样不同也没关系的问题，不计入温度。",
      "这不是实际测量出来的数值，而是仅供娱乐的指标，也不是科学或临床的心理诊断。温度低不代表关系不好，温度高也不保证关系一定好。",
    ],
    strengthsTitle: "很合拍的地方",
    strengthsEmpty: "这次没有特别突出的、答案很接近的问题。这也意味着你们还有很多可以重新认识彼此的地方。",
    diffTitle: "感受可能不同的地方",
    diffEmpty: "没有分歧很大的问题。即使答案不同，也只是选了相邻的选项。",
    diffNote: "答案不同并不代表哪一方错了，只是说明你们觉得舒服的方式不一样。",
    scenarioTitle: "容易产生误会的情况",
    scenarioEmpty: (n: number) =>
      `这次没有发现特别容易产生分歧的情况。不过 ${n} 道题无法涵盖所有情况，如果平时有过让你失落的时刻，可以借下面的问题聊一聊。`,
    tipsTitle: "可以试试这样做",
    talksTitle: "一起聊聊这些问题",
    shareTitle: "一起看结果",
    shareBody:
      "邀请你的人打开这个链接也能看到同样的结果。链接里包含两个人选的答案，而且没有加密，请只发给想给对方看的人。链接比较长，部分聊天软件可能会截断，请确认链接已完整发送。",
    resultLink: "结果链接",
    shareText: (site: string, name: string, t: string, band: string) => `[${site}] 我们的${name}温度是 ${t}℃（${band}）`,
    restart: (name: string) => `重新开始${name}测试`,
    otherTests: "查看其他关系测试",
    home: "回到首页",
  },
  linkError: {
    missing: {
      title: "链接里没有答案信息",
      body: "这个邀请链接或结果链接缺少「#」后面的内容。可能是聊天软件把链接截断了，请让发送人重新发一次完整链接。",
    },
    malformed: {
      title: "无法读取这个链接",
      body: "链接好像被截断了，或者部分字符被改动了。请复制完整链接后重新打开。",
    },
    "unknown-category": {
      title: "这是未知测试的链接",
      body: "找不到这个链接对应的测试。请从现有的测试中重新开始。",
    },
    version: {
      title: "这是旧版本测试生成的链接",
      body: "生成链接之后题目有所调整，所以这个链接无法比较答案。抱歉给你添麻烦，请重新开始测试。",
    },
    answers: {
      title: "链接里的答案信息不正确",
      body: "答案的数量或数值与测试不符。链接可能被修改过，请让发送人重新发一次。",
    },
    incomplete: {
      title: "第二个人还没有回答这个链接",
      body: "这个链接里只有一个人的答案，暂时无法显示结果。如果你是受邀人，请点击下方按钮开始作答。",
    },
    answerInvite: "回答受邀的测试",
    newTest: "重新开始测试",
    home: "回到首页",
  },
  notFound: {
    title: "找不到这个页面",
    body: "网址可能输错了，或者页面已经移动。请从下方链接重新开始。",
    home: "回到首页",
    tests: "选择测试",
  },
  invitePage: {
    title: "你被邀请参加默契度测试",
    description: "对方已经先回答并邀请了你。回答同样的问题，就能马上看到你们的关系温度。无需注册，约 3 分钟。",
  },
  resultPage: {
    title: "我们之间的温度结果",
    description: "比较两个人答案得出的关系温度和解读已经送达。一起看看哪里很合拍、哪里感受可能不同吧。",
  },
  testsPage: {
    metaTitle: "选择关系默契度测试",
    metaDescription: "一眼比较恋人、朋友、家人默契度测试：每个测试看哪些方面、需要多长时间。",
    title: "关系默契度测试",
    intro:
      "同一个人对恋人、朋友和家人的期待并不相同，所以我们为每种关系分别编写了问题和解读。一个人先回答并发送链接，另一个人接着回答。所有测试都仅供娱乐，无需注册即可使用。",
  },
  categoryPage: {
    metaTitle: (name: string, title: string) => `${name}默契度测试 - ${title}`,
    badge: (name: string) => `${name}默契度测试`,
    meta: (n: number, m: number) => `共 ${n} 题 · 每人约 ${m} 分钟 · 无需注册`,
    topicsTitle: "这个测试会看哪些方面",
    howTitle: "参与方式",
    howSteps: (n: number) => [
      `你先回答 ${n} 道题。`,
      "用聊天软件把生成的邀请链接发给对方。",
      "对方打开链接并回答同样的问题后，就会显示你们的温度和解读。",
      "对方把结果链接发给你后，你也能看到同样的结果。",
    ],
    othersTitle: "其他关系测试",
    aboutLink: "详细了解温度的计算方式",
    limitsTitle: "看结果前请先了解",
    limits: [
      "这是为了娱乐和增进了解的测试，不是科学或临床的心理诊断。",
      "温度只表示两个人答案的接近程度，并不说明关系的好坏或未来。",
      "你的答案会放在邀请链接里传递。它不会保存在服务器上，但没有加密，请只把链接发给要一起测试的人。",
    ],
  },
};

export default zh;
