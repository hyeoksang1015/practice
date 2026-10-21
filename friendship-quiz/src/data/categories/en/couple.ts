import type { Category } from "../../../lib/types";

export const couple: Category = {
  slug: "couple",
  name: "Couple",
  emoji: "💞",
  version: 1,
  title: "How warm is our relationship?",
  description:
    "You each answer questions on topics where couples' expectations often differ, like showing affection, keeping in touch and personal time, arguing and making up. See where your pace matches, where it differs, and how to talk about those differences.",
  minutes: 3,
  topics: [
    { id: "affection", name: "Showing affection", talk: "What's something I did recently to show I care that stuck with you?" },
    { id: "contact", name: "Keeping in touch & personal time", talk: "On days when we don't talk much, what could I do to put your mind at ease?" },
    { id: "conflict", name: "Handling conflict", talk: "When an argument is brewing, what's one thing you'd like us both to stick to?" },
    { id: "upset", name: "Expressing hurt feelings", talk: "When you're hurt, how could I ask that would make it easier to tell me?" },
    { id: "plans", name: "Making plans", talk: "For our next date, what do you want to plan ahead and what do you want to leave open?" },
    { id: "makeup", name: "Apologizing & making up", talk: "Which apology from me has helped you feel better the most?" },
  ],
  questions: [
    {
      id: "c1",
      topic: "affection",
      rule: "match",
      text: "How often do you show your partner how you feel?",
      options: [
        "My feelings run deep, but I mostly show them on special days",
        "Naturally, when the mood is right",
        "At least once or twice a day, in words or actions",
        "Whenever I think of them, right away",
      ],
      same: "You show affection about as often as each other, so neither of you is likely to feel it's one-sided. The giving and receiving balances out naturally.",
      different:
        "You show affection at quite different rates. The one who shows it often is generous with their feelings, while the one who shows it less may put a lot of weight into each gesture.",
      scenario: "While the more expressive one wonders 'Am I the only one who cares this much?', the other may feel they've shown plenty.",
      tip: "Instead of trying to match how often you express it, each tell the other one thing that makes you feel loved.",
    },
    {
      id: "c2",
      topic: "affection",
      rule: "match",
      text: "How would you like to spend anniversaries and birthdays?",
      options: [
        "A normal day is fine",
        "Going out for a nice meal is enough",
        "I'd like to exchange small gifts or letters",
        "I want to plan ahead and make it special",
      ],
      same: "You expect similar things from anniversaries, so there's little gap between the one who prepares and the one who receives. Less pressure, fewer disappointments.",
      different:
        "You give anniversaries different weight. For one of you it's a day worth celebrating; for the other it may feel much like any other day.",
      scenario: "One of you prepared for days while the other shows up like it's a normal day, and the one who planned ends up feeling awkward.",
      tip: "Pick an upcoming anniversary and agree in advance on what 'at least this much' looks like for each of you.",
    },
    {
      id: "c3",
      topic: "contact",
      rule: "match",
      text: "On weekdays when you're apart, how much contact feels right?",
      options: [
        "Only when there's something to say",
        "A good-morning and good-night is enough",
        "Back and forth whenever there's a spare moment",
        "Sharing even the little things throughout the day",
      ],
      same: "You're comfortable with a similar amount of contact, so neither a slow reply nor lots of messages gets over-interpreted.",
      different: "You expect different amounts of contact. Fewer messages doesn't mean less love, and more messages doesn't mean trying to control.",
      scenario:
        "On a busy day a reply comes hours late. One of you shrugs it off while the other worries something happened or feels hurt.",
      tip: "Agree on one minimum for busy days, like a single message when you leave work.",
    },
    {
      id: "c4",
      topic: "contact",
      rule: "match",
      text: "You both have the weekend off. How would you like to spend it?",
      options: [
        "Half a day together is plenty",
        "One day together, one day apart",
        "Mostly together, with a little time to ourselves",
        "Unless something comes up, both days together",
      ],
      same: "You want a similar balance of time together and time alone, so 'I need some me-time' or 'let's see more of each other' is easy to hear without misunderstanding.",
      different: "You want different amounts of time together. Needing time alone isn't about disliking the other person; it's just a different way to recharge.",
      scenario: "When one says 'I'd like to rest this weekend', the other may hear 'I don't want to see you'.",
      tip: "When you need time alone, also say when you'll see each other next. Then the break doesn't feel like distance.",
    },
    {
      id: "c5",
      topic: "conflict",
      rule: "match",
      text: "When an argument is about to start, what do you do?",
      options: [
        "Step away first to calm down",
        "Pause for a moment to collect my thoughts",
        "Talk it through calmly right then",
        "Keep talking it out before the feelings fade",
      ],
      same: "You handle conflict at a similar pace. You tend to want a pause or a talk at the same times, so it's less likely either of you feels pushed or avoided.",
      different:
        "You need different amounts of time in a conflict. The one who wants to talk now is trying to protect the relationship; the one who steps back is trying not to say something they'll regret.",
      scenario:
        "One keeps trying to talk because they want to sort it out now, while the other goes quiet because they need time, and each feels the other is 'avoiding' or 'pushing'.",
      tip: "If you need a pause, say when you'll come back to it, like 'Let's talk again in 30 minutes.'",
      sameCaution: {
        0: "You both tend to walk away when an argument starts, so the thing you need to talk about can keep getting postponed.",
        3: "You both want to talk it all the way through, so conversations can drag on while emotions are still running high.",
      },
    },
    {
      id: "c6",
      topic: "conflict",
      rule: "complement",
      text: "You disagree about where to go on a weekend date. What do you do?",
      options: [
        "Go with what my partner wants",
        "Give in this time and pick next time",
        "Each say what matters and find a middle ground",
        "Explain properly why I want my option",
      ],
      same: "You make decisions in a similar way when you disagree. You give and take about equally, so decisions don't tilt to one side.",
      different: "You decide in different ways. One sets the direction and the other goes along, which has the upside of quick decisions.",
      tip: "Now and then check that it isn't always the same person giving in. 'Your pick this time' is a good way to keep the balance.",
      sameCaution: {
        0: "You both tend to go along with the other, so 'anything's fine' can bounce back and forth and decisions get delayed.",
        3: "You both like to fully explain your view, so even small decisions can turn into long discussions.",
      },
    },
    {
      id: "c7",
      topic: "upset",
      rule: "match",
      text: "Your partner hurt your feelings. What do you usually do?",
      options: [
        "Keep it to myself and get over it alone",
        "Wait for them to notice without me saying",
        "Bring it up a little later",
        "Say so right then and there",
      ],
      same: "You bring up hurt feelings at similar times, so it's easy to predict when the other will speak up and there's less guessing.",
      different:
        "You show hurt feelings in different ways. The one who says it right away doesn't want it to pile up; the one who waits wants to sort out their feelings first.",
      scenario:
        "One has already said it and moved on, while the other still has unspoken hurt, leading to 'I thought we were past this.'",
      tip: "For the one who finds it hard to speak up, agree on a short signal phrase like 'I'm feeling a bit hurt right now.'",
      sameCaution: {
        0: "You both tend to deal with hurt alone, so hurt feelings can quietly build up without the other knowing.",
        1: "You both tend to wait for the other to notice, so you can end up silently waiting for each other for a long time.",
      },
    },
    {
      id: "c8",
      topic: "upset",
      rule: "match",
      text: "Your partner is quieter than usual. What do you do?",
      options: [
        "Wait until they bring it up",
        "Take extra care of them and keep an eye out",
        "Ask lightly, 'Is something up?'",
        "Ask right away what exactly is wrong",
      ],
      same: "You respond to each other's mood changes in a similar way, so giving the other the care you'd want usually works.",
      different: "You treat a partner who's feeling down in different ways. Waiting and asking right away are both ways of showing you care.",
      scenario: "Waiting can come across as 'not caring', and asking right away can come across as 'prying'.",
      tip: "Each tell the other in one sentence: 'When I go quiet, this is what helps.'",
    },
    {
      id: "c9",
      topic: "plans",
      rule: "complement",
      text: "How much should a date be planned ahead?",
      options: [
        "We decide when we meet",
        "Just the neighbourhood we'll meet in",
        "Two or three places we'd like to go",
        "Reservations and the order of everything",
      ],
      same: "You like a similar amount of planning for dates, so neither of you is likely to find the other too loose or too much.",
      different:
        "One of you feels at ease with a plan, the other with deciding on the spot. If the planner sets the frame and the spontaneous one adds fun on the day, you make a great team.",
      tip: "Split it: plan only what must be planned, like places that need a reservation, and leave the rest open.",
    },
    {
      id: "c10",
      topic: "plans",
      rule: "match",
      text: "On the day you're supposed to meet, your partner asks to reschedule. How do you feel?",
      options: [
        "It's fine, we can meet another day",
        "A bit disappointed, but fine once I hear why",
        "Fine if they'd told me earlier",
        "I'd like plans we've made to be kept",
      ],
      same: "You react to changed date plans in a similar way, so you can guess how disappointed the other will be when plans change.",
      different:
        "Plans carry different weight for you. The flexible one lets it go because they trust the relationship; the one who wants plans kept set that time aside on purpose.",
      scenario: "When one casually says 'let's meet another time', the other, who was looking forward to that day, may feel pushed down the list.",
      tip: "When you need to change plans, give the reason and suggest a new date right away.",
    },
    {
      id: "c11",
      topic: "makeup",
      rule: "match",
      text: "You were in the wrong in an argument. How do you apologize?",
      options: [
        "Act normal and show it through my actions",
        "Show I'm sorry with a treat or a small gift",
        "Say a short 'I'm sorry'",
        "Say exactly what I'm sorry for",
      ],
      same: "You give and receive apologies in a similar way, so your apologies land as apologies and making up is easier.",
      different: "Your apologies look different. Showing it through actions and putting it into words are both ways of saying sorry.",
      scenario: "The one who apologized through actions thinks they already said sorry, while the one waiting for words feels they haven't received an apology yet.",
      tip: "Each tell the other: 'This is what makes me feel apologized to.' Just knowing that speeds up making up.",
    },
    {
      id: "c12",
      topic: "makeup",
      rule: "match",
      text: "After an argument, how long do you need before you feel okay again?",
      options: [
        "A few days of space",
        "A night's sleep",
        "A few hours is enough",
        "Within the same day, ideally right away",
      ],
      same: "You need a similar amount of time to make up, so it's rare for one to be over it while the other is still waiting.",
      different: "You calm down at different speeds. The quick one isn't taking it lightly, and the slow one isn't holding a grudge.",
      scenario: "When the one who's already over it starts joking around as usual, the one who still needs time may feel their feelings are being brushed off.",
      tip: "If you need more time, say 'I'm not angry, I'm just processing.' If you're over it sooner, wait without rushing them.",
    },
  ],
  summaries: {
    high: {
      title: "A cozy warmth where your pace matches",
      summary:
        "On topics where expectations need to match, like keeping in touch, showing affection and making up, your answers were close. It's easy to predict each other's reactions, which makes you a comfortable pair. Still, being alike can lead to leaving things unsaid, so read the cautions below too.",
    },
    middle: {
      title: "A lukewarm mix of clicking and adjusting",
      summary:
        "You click on some topics and expect different things on others. It's a common result for couples. The way to warm things up isn't to become the same, but to understand what the other expects where you differ.",
    },
    low: {
      title: "A cool temperature from different love languages",
      summary:
        "On topics like keeping in touch, showing affection and making up, you're comfortable with quite different ways. That doesn't mean you care differently; it means you express and expect things differently. Knowing these differences in advance makes misunderstandings less likely.",
    },
  },
  defaultTips: [
    "Don't take the things that work for granted. Tell each other out loud, 'I love how easy this part of you makes things.'",
    "Pick one question where you gave the same answer and ask each other why you chose it. The same answer can come from different reasons.",
  ],
  defaultTalks: [
    "Is there a habit either of us has changed to fit the other since we got together?",
    "What's something I do these days that you appreciate the most?",
    "If we picked one thing to do together over the next month, what would it be?",
  ],
};
