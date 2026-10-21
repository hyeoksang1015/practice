import type { Category } from "../../../lib/types";

export const friend: Category = {
  slug: "friend",
  name: "Friendship",
  emoji: "🤝",
  version: 1,
  title: "How warm is our friendship?",
  description:
    "You each answer questions on things close friends often never talk about, like how often to keep in touch, being on time, how to listen to worries and where teasing should stop. See what feels easy and which boundaries are worth respecting.",
  minutes: 3,
  topics: [
    { id: "contact", name: "Keeping in touch & meeting up", talk: "What's the right amount of contact for the two of us?" },
    { id: "time", name: "Being on time", talk: "If one of us is late or needs to cancel, how should we let the other know?" },
    { id: "advice", name: "Talking through worries", talk: "When you share a worry, is there anything you'd like to hear or not hear?" },
    { id: "jokes", name: "Teasing & boundaries", talk: "Has any of my teasing actually made you a little uncomfortable?" },
    { id: "upset", name: "Clearing the air", talk: "Has there been a time I hurt you and you let it go without saying anything?" },
    { id: "activity", name: "Things to do together", talk: "Is there something we haven't done together yet that you'd like to try?" },
  ],
  questions: [
    {
      id: "f1",
      topic: "contact",
      rule: "match",
      text: "When there's nothing in particular to say, how often do you like to be in touch with a friend?",
      options: [
        "Only when there's a reason is enough",
        "Checking in once or twice a month",
        "Chatting a few times a week",
        "Sharing little things almost every day",
      ],
      same: "You're comfortable with similar gaps between messages. Hearing from each other after a while or hearing from each other often both feel natural.",
      different:
        "You have different senses of how often to keep in touch. Not messaging often doesn't mean caring less, and messaging often isn't meant to be a burden.",
      scenario: "One wonders 'Why haven't they texted lately?' while the other thinks everything is perfectly fine.",
      tip: "Instead of counting messages, make 'always happy to hear from you, however long it's been' your rule.",
    },
    {
      id: "f2",
      topic: "contact",
      rule: "match",
      text: "How often would you like to see a close friend?",
      options: ["Once every few months is plenty", "About once a month", "Every two weeks", "Every week"],
      same: "You want to meet about as often as each other, so suggesting plans doesn't feel like pressure and nobody gets tired of waiting.",
      different: "You want to meet at different intervals. One feels close without seeing each other often; the other feels close by meeting regularly.",
      scenario: "If the one who wants to meet more often suggests plans a few times in a row and they keep getting pushed back, they may stop suggesting, thinking 'Am I the only one who wants to hang out?'",
      tip: "Before you part, set the next meetup, like 'the first weekend of next month'. The difference in rhythm will matter less.",
    },
    {
      id: "f3",
      topic: "time",
      rule: "match",
      text: "It's almost time to meet your friend. What are you usually doing?",
      options: [
        "Rushing to get ready when it's already time to leave",
        "Leaving just in time to arrive on the dot",
        "Leaving a bit early to arrive 5 to 10 minutes ahead",
        "Ready well in advance, route already checked",
      ],
      same: "You have a similar sense of time, so making each other wait is unlikely to cause hurt feelings.",
      different:
        "Your idea of 'on time' differs. It's just the difference between someone who leaves room and someone who times it exactly, not a sign of taking plans lightly.",
      scenario: "If the one who arrives first keeps waiting 15 minutes, the late one may think it's minor, but for the one waiting it can add up.",
      tip: "Agree on the time you'll arrive, not leave, and if you'll be late, say so when you set off.",
    },
    {
      id: "f4",
      topic: "time",
      rule: "match",
      text: "Your friend messages on the day to say they can't make it. How do you feel?",
      options: [
        "Honestly glad, I get to rest",
        "It happens, no big deal",
        "A bit disappointed, but fine if we set a new date",
        "Quite hurt, I'd kept that time free",
      ],
      same: "You feel similarly about cancelled plans, so you know what's okay for each other without explaining.",
      different:
        "Cancelled plans weigh differently for you. The one who lets it go feels you're close enough for that; the one who's hurt was looking forward to it.",
      scenario: "One thinks that being close means a same-day cancellation is fine, while the other thinks being close is exactly why plans should be kept.",
      tip: "When you cancel, send an apology along with two dates that work for you.",
    },
    {
      id: "f5",
      topic: "advice",
      rule: "complement",
      text: "Your friend starts telling you about a worry. How do you usually respond?",
      options: [
        "Listen all the way without interrupting, nodding along",
        "Share a similar experience of mine to show I get it",
        "Ask questions to help sort out the situation together",
        "Find a solution they can try right away",
      ],
      same: "You respond to worries in a similar way, so you can support each other in a way that already feels familiar.",
      different:
        "You listen in different ways. One offers emotional support and the other looks for solutions, so you can each get a different kind of help from the other.",
      tip: "Before listening, ask, 'Do you want me to just listen, or should we figure out what to do?'",
    },
    {
      id: "f6",
      topic: "advice",
      rule: "match",
      text: "When you tell a friend about a worry, what do you hope they'll do?",
      options: [
        "Listen quietly all the way through",
        "Take my side and say 'That makes sense'",
        "Show me a perspective I hadn't seen",
        "Suggest a concrete solution",
      ],
      same: "You want similar responses when you share a worry, so giving the other what you'd want works well.",
      different: "You want to be comforted in different ways. Wanting someone to listen and wanting advice are both signs you trust your friend.",
      scenario:
        "If the one who wanted to be heard gets a solution first, they may feel 'You're not listening to how I feel', and if the one who wanted advice only gets sympathy, they may feel stuck.",
      tip: "When you bring up a worry, say first: 'Just listen today' or 'Tell me what you'd do.'",
    },
    {
      id: "f7",
      topic: "jokes",
      rule: "match",
      text: "How far is too far when close friends tease each other?",
      options: [
        "I'd rather we hardly tease at all",
        "Light wordplay is good",
        "Bringing up each other's embarrassing past is fine",
        "We're close, so even harsh teasing is fine",
      ],
      same: "You like a similar level of teasing. A joke comes back as a laugh; your sense of humour runs at the same temperature.",
      different:
        "You draw the line on teasing in different places. Harsh teasing can be a sign of closeness, and being careful can be a sign of caring.",
      scenario: "One makes a joke because you're close, and the other laughs it off but quietly takes it to heart.",
      tip: "Each name one topic that's off-limits even as a joke. Knowing the line makes it easier to laugh about everything else.",
    },
    {
      id: "f8",
      topic: "jokes",
      rule: "match",
      text: "Your friend wants to post a photo of the two of you on social media. How do you feel?",
      options: [
        "I'd like them to ask me before posting",
        "Fine, as long as I look good",
        "Mostly fine",
        "I don't mind at all, post whatever",
      ],
      same: "You have similar standards about privacy, so you can sense what's okay for each other without asking.",
      different: "You're comfortable sharing different amounts. Posting without asking may not be careless; it may just be fine by their own standards.",
      scenario: "One posts a photo without a second thought, and the other quietly worries about it because asking to take it down feels awkward.",
      tip: "Make asking first your default when posting photos or passing on things the other told you.",
    },
    {
      id: "f9",
      topic: "upset",
      rule: "match",
      text: "A friend hurt your feelings. What do you usually do?",
      options: ["Let it go without saying anything", "Bring it up later as a joke", "Calmly tell them in a message", "Talk about it in person right away"],
      same: "You handle hurt feelings in a similar way. Both of you are used to that approach, so the conversation doesn't get heavy.",
      different:
        "You bring up hurt feelings in different ways. Letting it go is a choice to keep things easy; speaking up is a choice not to leave misunderstandings behind.",
      scenario: "When one seriously brings up something that hurt, the one who usually lets things go may be taken aback: 'Was it really that big a deal?'",
      tip: "When a friend tells you they were hurt, say 'Thanks for telling me' before explaining yourself.",
      sameCaution: {
        0: "You both tend to let hurt feelings go unspoken, so small hurts can linger without being cleared up.",
      },
    },
    {
      id: "f10",
      topic: "upset",
      rule: "match",
      text: "After things get awkward with a friend, how do you get back to normal?",
      options: [
        "Message them as usual as if nothing happened",
        "Lighten the mood with a funny picture or a joke",
        "Say, 'Sorry about the other day'",
        "Talk about what went wrong and sort it out together",
      ],
      same: "You clear the air in similar ways, so you recognise each other's signals for making up.",
      different: "You get back to normal in different ways. Messaging as usual is a peace offering, and wanting to talk it through is a way of caring about the friendship too.",
      scenario: "One thinks a normal message settled everything, while the other still feels uneasy because it was never talked about.",
      tip: "Even if you prefer to move on lightly, add one line: 'Are we okay about what happened?'",
    },
    {
      id: "f11",
      topic: "activity",
      rule: "complement",
      text: "You both suddenly have a free afternoon. What would you like to do?",
      options: [
        "Each rest at home and message each other",
        "Chat over coffee at a café",
        "Visit a restaurant or exhibition we've wanted to see",
        "Get moving, like exercise or a day trip",
      ],
      same: "You want to do similar things in your free time, so deciding what to do takes no effort.",
      different:
        "You like to hang out in different ways. When a quieter friend and a more active friend team up, you can introduce each other to things you'd never try alone.",
      tip: "Take turns: do it one person's way this time and the other's way next time.",
    },
    {
      id: "f12",
      topic: "activity",
      rule: "complement",
      text: "When you meet friends, what kind of get-together feels best?",
      options: [
        "Just the two of us, somewhere quiet",
        "A small group of three or four",
        "A bigger group",
        "A big gathering with new people too",
      ],
      same: "You're comfortable with groups of a similar size, so there's little second-guessing about who to invite.",
      different:
        "You prefer different group sizes. The one who likes big groups wants to bring their friends together; the one who likes one-on-one wants your full attention.",
      tip: "Ask before inviting others, and make time for just the two of you now and then.",
    },
  ],
  summaries: {
    high: {
      title: "In sync, a friendship warmed right up",
      summary:
        "On things where friends' expectations need to match, like how often to keep in touch, plans and where teasing stops, your answers were close. A lot just clicks without explanation. Take a quick look at the cautions below in case being so comfortable has let something slide.",
    },
    middle: {
      title: "A lukewarm half-and-half of easy and different",
      summary:
        "Some topics click and on others your standards differ. It's a common result between friends. The differences aren't things to fix; they're spots where agreeing once out loud makes things easier for both of you.",
    },
    low: {
      title: "A cool breeze from different ways of being friends",
      summary:
        "On topics like keeping in touch, plans and teasing, you're comfortable with quite different standards. That doesn't mean your friendship is shallow; you just have different habits as friends. It can happen between old friends too, and knowing each other's standards helps avoid needless misunderstandings.",
    },
  },
  defaultTips: [
    "This week, say the 'thank you' or 'sorry' you've been skipping because you're so close.",
    "Pick a question where you gave the same answer and talk about when that habit started.",
  ],
  defaultTalks: [
    "What's changed between when we first became friends and now?",
    "Is there something I did for you that you still remember?",
    "Even if we both get busy, what's one thing you'd like us to keep doing?",
  ],
};
