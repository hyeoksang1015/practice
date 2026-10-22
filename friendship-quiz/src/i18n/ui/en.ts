import type { Dict } from "./ko";

const en: Dict = {
  site: {
    name: "Relationship Temperature",
    description:
      "Answer the same questions as your partner, friend or family member and compare your answers to see your 'relationship temperature'. You answer first and send a link, then they answer. Free, no sign-up, just for fun.",
    shareImageAlt: "Relationship Temperature - How warm are we right now?",
  },
  roles: { a: "Inviter", b: "Invitee" },
  bands: { low: "Cool", middle: "Lukewarm", high: "Warm" },
  nav: {
    skip: "Skip to content",
    main: "Main menu",
    tests: "Choose a test",
    about: "About",
    siteInfo: "Site information",
    privacy: "Privacy",
    contact: "Contact",
    language: "Language",
  },
  footer: {
    disclaimer: (name: string) =>
      `Results on ${name} simply compare the answers two people chose. They are for fun, are not a psychological assessment and do not judge your real relationship.`,
  },
  card: {
    title: (name: string) => `${name} test`,
    meta: (n: number, m: number) => `${n} questions · about ${m} min per person`,
    topics: "What it looks at",
    cta: (name: string) => `See the ${name.toLowerCase()} test`,
  },
  quiz: {
    progress: (c: number, t: number) => `Question ${c} / ${t}`,
    progressLabel: "Test progress",
    progressValue: (c: number, t: number) => `Question ${c} of ${t}`,
    pickFirst: "Please choose an answer to continue.",
    prev: "Back",
    next: "Next",
    done: "Finish",
  },
  share: {
    share: "Share link",
    copy: "Copy link",
    failed: "Automatic copying isn't available here. Press and hold, or select, the link in the box above to copy it yourself.",
    cancelled: "Sharing was cancelled.",
    shared: "Opened the share sheet.",
    sharedByCopy: "This device has no share sheet, so the link was copied to your clipboard.",
    copied: "Link copied to your clipboard.",
  },
  start: {
    loading: "Loading the test…",
    resumeTitle: "You have an unfinished test",
    firstTitle: "Answer first",
    intro: (n: number) =>
      `Answer ${n} questions and you'll get an invite link to send to the other person. There are no right answers, so pick the one closest to how you usually are.`,
    resume: "Continue",
    start: "Start the test",
    restartAnswers: "Start over",
    created: "Your invite link is ready",
    createdBody: (name: string) =>
      `Send the link below to the person you want to take the ${name.toLowerCase()} test with. Once they answer the same questions, you'll see your temperature.`,
    inviteLink: "Invite link",
    inviteText: (site: string, name: string) =>
      `[${site}] I've invited you to the ${name.toLowerCase()} test. Answer the same questions and we'll see how warm we are.`,
    nextTitle: "What happens next",
    nextSteps: (n: number) => [
      `They open the link and answer the same ${n} questions.`,
      "When they finish, the result appears on their screen right away.",
      "Ask them to send you the 'result link' from that screen so you can see the same result.",
    ],
    linkNote:
      "This link contains the answers you chose. It isn't stored on any server, but it isn't encrypted either, so anyone who has the link can see your answers. Only send it to the person you're taking the test with. If you lose the link it can't be recovered, so save it if you need to.",
    edit: "Edit my answers",
    restart: "Start over",
  },
  invite: {
    loading: "Checking your invite link…",
    badge: (name: string) => `Invitation to the ${name.toLowerCase()} test`,
    doneTitle: "You've already answered",
    doneBody: "You can see the result again, or change your answers to get a new result.",
    viewResult: "See result",
    editAnswers: "Edit answers",
    introTitle: "They answered first and invited you",
    introBullets: (n: number, m: number) => [
      `You'll answer the same ${n} questions they already answered. It takes about ${m} minutes.`,
      "Their answers stay hidden until you finish. Then you'll see right away how your answers compare.",
      "There are no right answers. Pick the one closest to how you usually are.",
      "The result link contains both people's answers. It isn't stored on any server, but anyone who has the link can see the answers.",
      "The result is for fun and conversation, not a psychological assessment. It doesn't judge whether a relationship is good or bad.",
    ],
    resume: "Continue",
    start: "Start answering",
  },
  result: {
    loading: "Checking your result link…",
    badge: (name: string) => `${name} test result`,
    thermometer: (t: string, band: string, base: number) => `Relationship temperature ${t} degrees, ${band}. The midpoint is ${base} degrees.`,
    base: (b: number) => `Midpoint ${b}℃`,
    both: "Both of you",
    meaningTitle: "How to read this temperature",
    meaning: (min: number, max: number, base: number) => [
      `On questions where matching expectations matter, like how often to keep in touch or how to keep plans, the closer your answers, the higher the temperature. It ranges from ${min}℃ to ${max}℃, with ${base}℃ right in the middle.`,
      "Questions where it's fine to differ, like personal taste, don't count toward the temperature.",
      "It's a just-for-fun indicator, not a measurement, and not a scientific or clinical psychological assessment. A low temperature doesn't mean a bad relationship, and a high one doesn't guarantee a good one.",
    ],
    strengthsTitle: "Where you click",
    strengthsEmpty: "This time no questions stood out where you chose close answers. That also means there's a lot to discover about each other.",
    diffTitle: "Where you might feel differently",
    diffEmpty: "No questions split you far apart. Even where your answers differed, you picked neighbouring options.",
    diffNote: "Different answers don't mean either of you is wrong. They just mean you're comfortable with different ways of doing things.",
    scenarioTitle: "Situations where misunderstandings can happen",
    scenarioEmpty: (n: number) =>
      `This time no situations stood out as easy to misread. Still, ${n} questions can't cover everything, so if something has bothered you before, use the questions below as a way to bring it up.`,
    tipsTitle: "Things to try",
    talksTitle: "Questions to talk about together",
    shareTitle: "Look at the result together",
    shareBody:
      "The person who invited you can open this link to see the same result. The link contains both people's answers and isn't encrypted, so only send it to people you want to show. It's long, so some messengers may cut it off. Check that the whole link was sent.",
    resultLink: "Result link",
    shareText: (site: string, name: string, t: string, band: string) => `[${site}] Our ${name.toLowerCase()} temperature is ${t}℃ (${band})`,
    restart: (name: string) => `Start a new ${name.toLowerCase()} test`,
    otherTests: "See other relationship tests",
    home: "Home",
  },
  linkError: {
    missing: {
      title: "This link has no answers in it",
      body: "The part after # is missing from this invite or result link. Your messenger may have cut it off, so ask the sender for the full link again.",
    },
    malformed: {
      title: "We can't read this link",
      body: "The link seems to be cut off or some characters were changed. Copy the whole link and open it again.",
    },
    "unknown-category": {
      title: "This link is for an unknown test",
      body: "We couldn't find the test this link points to. Start a new one from the tests we offer.",
    },
    version: {
      title: "This link was made with an older version of the test",
      body: "The questions changed after this link was made, so the answers can't be compared. Sorry for the trouble, but please start the test again.",
    },
    answers: {
      title: "The answers in this link aren't valid",
      body: "The number or values of the answers don't match the test. The link may have been edited, so ask the sender for it again.",
    },
    incomplete: {
      title: "The second person hasn't answered this link yet",
      body: "This link only has one person's answers, so there's no result to show yet. If you were invited, start answering with the button below.",
    },
    answerInvite: "Answer the invitation",
    newTest: "Start a new test",
    home: "Go home",
  },
  notFound: {
    title: "Page not found",
    body: "The address may be mistyped or the page may have moved. Start again from one of the links below.",
    home: "Go to the home page",
    tests: "Choose a test",
  },
  invitePage: {
    title: "You're invited to a compatibility test",
    description:
      "They answered first and invited you. Answer the same questions to see your relationship temperature right away. No sign-up, about 3 minutes.",
  },
  resultPage: {
    title: "Our relationship temperature",
    description:
      "Your relationship temperature and what it means are here. See where you click and where you might feel differently.",
  },
  testsPage: {
    metaTitle: "Choose a relationship test",
    metaDescription:
      "Compare the couple, friend and family compatibility tests at a glance: what each one looks at and how long it takes.",
    title: "Relationship tests",
    intro:
      "We expect different things from a partner, a friend and family, so each relationship has its own questions and explanations. One person answers first and sends a link, then the other answers. Every test is just for fun and needs no sign-up.",
  },
  categoryPage: {
    metaTitle: (name: string, title: string) => `${name} compatibility test - ${title}`,
    badge: (name: string) => `${name} compatibility test`,
    meta: (n: number, m: number) => `${n} questions · about ${m} min per person · no sign-up`,
    topicsTitle: "What this test looks at",
    howTitle: "How it works",
    howSteps: (n: number) => [
      `You answer ${n} questions first.`,
      "Send the invite link to the other person through a messenger.",
      "When they open the link and answer the same questions, you'll get your temperature and what it means.",
      "When they send you the result link, you can see the same result too.",
    ],
    sampleTitle: "Sample questions",
    sampleNote: (n: number) => `A few of the ${n} questions. There are no right answers; pick whatever feels comfortable to you.`,
    othersTitle: "Other relationship tests",
    aboutLink: "Learn how the temperature is calculated",
    limitsTitle: "Good to know before you look at the result",
    limits: [
      "This test is for fun and getting to know each other. It is not a scientific or clinical psychological assessment.",
      "The temperature only shows how close your answers were. It says nothing about whether a relationship is good or bad, or about its future.",
      "Your answers travel inside the invite link. They aren't stored on a server, but they aren't encrypted, so only send the link to the person you're taking the test with.",
    ],
  },
};

export default en;
