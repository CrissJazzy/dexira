import type { ArticleContent, ContentBlock } from './content-types';

/**
 * DEVELOPMENT PLACEHOLDER CONTENT
 * All text below is original sample copy written to demonstrate the reading
 * experience. It is not reporting, makes no claims about real events, and will
 * be replaced by real editorial content (from WordPress in a later phase).
 */

const p = (text: string): ContentBlock => ({ type: 'p', text });
const h2 = (text: string): ContentBlock => ({ type: 'h2', text });
const h3 = (text: string): ContentBlock => ({ type: 'h3', text });
const ul = (...items: string[]): ContentBlock => ({ type: 'ul', items });
const ol = (...items: string[]): ContentBlock => ({ type: 'ol', items });
const quote = (text: string): ContentBlock => ({ type: 'quote', text });

export const content: Record<string, ArticleContent> = {
  'how-ai-is-changing-the-way-scientists-work': {
    subtitle: 'AI is becoming a routine research instrument. Understanding what it does well, and what it cannot do, is the key to using it wisely.',
    updatedAt: '2026-10-30',
    related: ['plain-language-guide-to-large-language-models', 'how-researchers-read-the-evidence-behind-a-headline', 'why-scientific-uncertainty-is-a-strength'],
    body: [
      p('Research has always depended on tools. The microscope, the telescope and the statistical table each changed what scientists could notice. Artificial intelligence is the latest addition to that list, and like its predecessors it changes the work in ways that are easy to overstate and easy to overlook.'),
      p('This is a development placeholder article. It is written to demonstrate DEXIRA’s reading experience and does not report on real studies or events.'),
      h2('From data overload to useful patterns'),
      p('Modern experiments generate more data than any team can inspect by hand. Sequencing machines, sensors and imaging systems produce streams of measurements, and the bottleneck is often interpretation rather than collection. Machine-learning models are well suited to this problem because they can search large datasets for regularities that would otherwise stay hidden.'),
      p('In practice, researchers tend to use these systems for a handful of recurring jobs:'),
      ul(
        'Sorting and labelling large collections of images, recordings or samples.',
        'Spotting unusual measurements that deserve a closer human look.',
        'Predicting how a system might behave, so fewer physical experiments are needed.',
        'Summarising and searching the existing literature on a topic.',
      ),
      p('None of this replaces the scientific method. It changes how quickly a team can move from raw data to a question worth testing.'),
      h2('Where human judgement stays essential'),
      p('A model can find a pattern; it cannot decide whether the pattern matters. That decision depends on context: how the data was gathered, what might be biasing it, and whether the result fits what is already known. Those are questions of judgement, and they remain the responsibility of the people doing the work.'),
      quote('A pattern is a place to start asking questions, not a place to stop.'),
      p('There is also the matter of trust. Many models cannot explain how they reached a result, which makes errors harder to catch. A confident prediction built on flawed training data is still flawed, however polished the output looks.'),
      h3('Questions worth asking of any AI-assisted result'),
      ol(
        'What data was the model trained on, and does it resemble the data being analysed?',
        'Has the result been checked against an independent method?',
        'How does the model behave on cases it has not seen before?',
        'Could a simpler approach have produced the same answer?',
      ),
      h2('A tool, not an oracle'),
      p('The most useful way to think about AI in research is as an instrument with known strengths and known limits. Used carefully, it widens what a small team can examine. Used carelessly, it can lend false authority to a weak result. The difference lies less in the technology than in the habits of the people using it: documenting methods, testing claims and being open about uncertainty.'),
      p('As these tools spread, the skills that matter most may be the oldest ones: curiosity, scepticism and a willingness to be wrong.'),
    ],
  },
  'cybersecurity-basics-growing-businesses-overlook': {
    subtitle: 'Most breaches begin with ordinary gaps. Getting the foundations right is cheaper than recovering from an incident.',
    updatedAt: '2026-10-29',
    related: ['passwords-passkeys-and-the-future-of-signing-in', 'understanding-the-cloud-where-your-data-lives', 'what-makes-a-small-business-resilient'],
    body: [
      p('Growing businesses tend to think of security as something larger companies need. In reality, smaller organisations often hold valuable data with fewer safeguards, which makes the basics matter even more. This placeholder article outlines those basics without claiming anything about specific incidents.'),
      h2('Start with who can access what'),
      p('Access control is the most useful place to begin. Every account should belong to a named person, carry only the permissions its role requires, and be removed promptly when someone leaves. Shared logins make it impossible to know who did what, and they linger long after they should have been retired.'),
      h2('Keep software current'),
      p('Software updates frequently fix security weaknesses. Delaying them leaves known gaps open. A simple routine, such as a fixed day each month for reviewing updates on laptops, phones and servers, prevents the problem from growing unnoticed.'),
      h2('Prepare for the day something goes wrong'),
      p('No set of precautions removes risk entirely, so preparation matters. A short, written plan answers questions in advance:'),
      ul(
        'Who is responsible for responding, and how can they be reached?',
        'Where are backups stored, and when were they last tested?',
        'Who must be informed, inside and outside the business?',
      ),
      p('A plan that has never been rehearsed is only a hope. Even a brief walk-through once a year will expose gaps while the cost of fixing them is low.'),
      quote('Security is a set of habits, not a product you buy once.'),
      p('The aim is not perfection. It is to make the business a harder target and to recover quickly if the worst happens.'),
    ],
  },
  'what-digital-classrooms-get-right': {
    subtitle: 'Online tools widen access to learning, but technology alone does not teach. Teachers remain at the centre.',
    related: ['learning-to-learn-habits-that-make-study-stick', 'emerging-technologies-reshaping-everyday-life', 'plain-language-guide-to-large-language-models'],
    body: [
      p('Digital classrooms have moved from experiment to everyday reality in many places. The question is no longer whether technology belongs in education, but how to use it well. This is a placeholder article offering a balanced, general view.'),
      h2('What works'),
      p('Well-designed online tools can widen access. Recorded lessons can be revisited at a student’s own pace, shared resources reach learners far from a school, and feedback can arrive faster than a marked paper once a week.'),
      h2('Where it falls short'),
      p('Technology cannot supply motivation, and it cannot replace the attention of a teacher who notices when a student is struggling. Connectivity and device access remain uneven, and screen-based learning can feel isolating without opportunities for discussion.'),
      ul(
        'Access: reliable internet and suitable devices are not universal.',
        'Engagement: it is easier to disengage from a screen than from a classroom.',
        'Support: teachers need training and time, not only software.',
      ),
      h2('A sensible balance'),
      p('The strongest approaches treat technology as a means of supporting good teaching rather than an end in itself. Clear goals, simple tools and genuine human contact tend to matter more than the latest platform.'),
    ],
  },
  'emerging-technologies-reshaping-everyday-life': {
    subtitle: 'The most significant changes often arrive quietly, one small convenience at a time.',
    related: ['understanding-the-cloud-where-your-data-lives', 'plain-language-guide-to-large-language-models', 'cybersecurity-basics-growing-businesses-overlook'],
    body: [
      p('Technological change rarely announces itself. It tends to arrive as a feature, an update or a small convenience that becomes habit before anyone notices. This placeholder article offers a general look at how that happens.'),
      h2('Technology that fades into the background'),
      p('The most successful technologies eventually become invisible. Payments that happen with a tap, maps that reroute around traffic and messages that translate themselves are all examples of tools that have stopped feeling like technology at all.'),
      h2('What to watch'),
      p('Rather than chasing every new product, it helps to watch for the underlying shifts:'),
      ul(
        'Smarter software that adapts to how people use it.',
        'Connected devices that share information with each other.',
        'Cheaper sensors and computing power in everyday objects.',
      ),
      h2('Asking the right questions'),
      p('For each new tool, a few questions are worth asking. What problem does it solve? What data does it collect? Who benefits, and who might be left out? Thoughtful adoption, rather than automatic enthusiasm or suspicion, is usually the wiser path.'),
    ],
  },
  'why-scientific-uncertainty-is-a-strength': {
    subtitle: 'Admitting what is not yet known is not a flaw in science. It is how science stays honest.',
    related: ['how-researchers-read-the-evidence-behind-a-headline', 'how-ai-is-changing-the-way-scientists-work', 'the-case-for-slower-more-deliberate-work'],
    body: [
      p('Public discussion of science often treats uncertainty as a weakness, as though a good answer should be certain. In practice the opposite is true. Honest uncertainty is a mark of reliable work, and learning to read it is one of the most useful skills a reader can develop. This is a placeholder article written for demonstration.'),
      h2('Uncertainty is information'),
      p('When researchers report a range rather than a single figure, they are telling you how far to trust the result. A narrow range suggests precise evidence; a wide one suggests caution. Both are useful, and both are more honest than false precision.'),
      h2('How knowledge improves'),
      p('Science advances by testing ideas and revising them. A conclusion that changes in light of better evidence is a sign that the system is working, not failing.'),
      quote('Confidence should follow the evidence, not the other way round.'),
      h2('Reading uncertainty well'),
      p('A few habits help:'),
      ul(
        'Look for how large the uncertainty is, not just the headline figure.',
        'Notice whether a claim rests on one study or many.',
        'Be wary of anyone who offers certainty where experts do not.',
      ),
      p('Learning to live comfortably with uncertainty does not mean giving up on knowing things. It means holding beliefs in proportion to the evidence.'),
    ],
  },
  'the-case-for-slower-more-deliberate-work': {
    subtitle: 'In a culture of constant speed, sustained attention is becoming a quiet advantage.',
    related: ['learning-to-learn-habits-that-make-study-stick', 'what-makes-a-small-business-resilient', 'what-digital-classrooms-get-right'],
    body: [
      p('Speed is easy to measure, so it is easy to reward. Depth is harder to see, which is why it is often neglected. This placeholder article makes a general case for slowing down on the work that matters.'),
      h2('The hidden cost of constant switching'),
      p('Moving between messages, meetings and tasks leaves little room for sustained thought. Each switch carries a small cost, and those costs add up to work that is busy but shallow.'),
      h2('Protecting time for depth'),
      p('Deliberate work does not require dramatic change. Small, consistent protections tend to be enough:'),
      ul(
        'Set aside a fixed block each day for the most demanding task.',
        'Silence notifications during that time.',
        'Decide in advance what a good outcome looks like.',
      ),
      h2('Quality compounds'),
      p('Work done carefully often needs less rework, builds understanding and creates results that last. Slowing down in the right places is frequently the faster path overall.'),
    ],
  },
  'what-makes-a-small-business-resilient': {
    subtitle: 'Resilience is rarely about size. It comes from clear priorities, sound habits and the ability to adapt.',
    related: ['pricing-digital-products-principles-before-tactics', 'cybersecurity-basics-growing-businesses-overlook', 'the-case-for-slower-more-deliberate-work'],
    body: [
      p('Every business faces surprises: a lost customer, a delayed payment, a sudden change in the market. What separates businesses that recover from those that do not is rarely luck. This placeholder article outlines a general framework.'),
      h2('Know what matters most'),
      p('Resilient businesses are clear about what they do best and who they serve. That clarity makes hard decisions easier when resources are tight.'),
      h2('Keep a healthy cushion'),
      p('Cash reserves buy time, and time buys options. A business that can absorb a difficult month without panic can think clearly about its next move.'),
      h2('Stay adaptable'),
      ul(
        'Do not depend entirely on a single customer or supplier.',
        'Review plans regularly, not only when trouble arrives.',
        'Listen to customers; they often notice change first.',
      ),
      p('Resilience is built in ordinary times. The habits formed before a crisis are the ones that carry a business through it.'),
    ],
  },
  'understanding-the-cloud-where-your-data-lives': {
    subtitle: 'The cloud is less a place than an arrangement: someone else’s computers, run for you.',
    related: ['emerging-technologies-reshaping-everyday-life', 'cybersecurity-basics-growing-businesses-overlook', 'passwords-passkeys-and-the-future-of-signing-in'],
    body: [
      p('When files are stored “in the cloud”, they are not floating anywhere. They sit on physical computers in data centres, owned and managed by a provider. This placeholder article explains what that means in plain terms.'),
      h2('What “the cloud” really is'),
      p('Cloud services rent out computing power and storage over the internet. Instead of keeping everything on your own device or server, you use someone else’s, and access it when you need it.'),
      h2('Why it matters'),
      ul(
        'Reliability: providers typically store data in several places, so one failure does not mean loss.',
        'Convenience: your files are available from any device.',
        'Responsibility: security is shared between you and the provider.',
      ),
      h2('Questions to ask'),
      p('It is sensible to understand where your data is stored, who can access it and how you can retrieve it if you leave a service. Convenience is valuable, but it works best when you know what you have agreed to.'),
    ],
  },
  'plain-language-guide-to-large-language-models': {
    subtitle: 'How these systems learn patterns from text, why that makes them useful, and why they sometimes get things wrong.',
    related: ['how-ai-is-changing-the-way-scientists-work', 'emerging-technologies-reshaping-everyday-life', 'how-researchers-read-the-evidence-behind-a-headline'],
    body: [
      p('Large language models can write, summarise and answer questions, which makes them seem almost magical. Understanding the basic idea behind them makes it easier to use them sensibly. This placeholder article keeps the explanation simple.'),
      h2('Learning from patterns in text'),
      p('These models are trained on very large collections of text. By seeing how words and ideas tend to follow one another, they learn to predict what is likely to come next. Their fluent answers are built from those learned patterns.'),
      h2('Why they can be wrong'),
      p('Because a model predicts plausible text, it can produce something that sounds confident and is nevertheless incorrect. It does not check facts in the way a person might, so important claims should always be verified.'),
      h2('Using them well'),
      ul(
        'Treat outputs as drafts, not final answers.',
        'Check facts against reliable sources.',
        'Be careful about sharing sensitive information.',
      ),
      p('Used with care, these tools can save time and spark ideas. The responsibility for accuracy still rests with the person using them.'),
    ],
  },
  'passwords-passkeys-and-the-future-of-signing-in': {
    subtitle: 'Passwords have long been the weak link. Passkeys aim to fix that by removing the secret you have to remember.',
    related: ['cybersecurity-basics-growing-businesses-overlook', 'understanding-the-cloud-where-your-data-lives', 'emerging-technologies-reshaping-everyday-life'],
    body: [
      p('Passwords are easy to forget, easy to reuse and easy to steal. Passkeys are a newer approach to signing in that tries to solve those problems. This placeholder article explains the idea in general terms.'),
      h2('Why passwords struggle'),
      p('People tend to choose passwords they can remember, and to reuse them. When one service is compromised, those reused passwords can open other accounts.'),
      h2('How passkeys differ'),
      p('A passkey replaces the shared secret with a pair of cryptographic keys. One stays on your device; the other is held by the service. Signing in proves you hold the private key without ever sending it, so there is nothing to type and nothing useful to steal from a fake website.'),
      h2('What to do meanwhile'),
      ul(
        'Use a password manager to create unique passwords.',
        'Turn on an additional sign-in step where it is offered.',
        'Adopt passkeys on services that support them.',
      ),
      p('The transition will take time, so good password habits remain worthwhile in the meantime.'),
    ],
  },
  'how-researchers-read-the-evidence-behind-a-headline': {
    subtitle: 'A few questions separate a promising result from a settled finding.',
    related: ['why-scientific-uncertainty-is-a-strength', 'how-ai-is-changing-the-way-scientists-work', 'plain-language-guide-to-large-language-models'],
    body: [
      p('A striking headline can hide how modest the underlying evidence is. Researchers learn to ask a consistent set of questions before trusting a result. This placeholder article shares those questions in a general way.'),
      h2('The questions that matter'),
      ol(
        'How many people or samples were studied?',
        'Was there a comparison group?',
        'Has the finding been repeated by others?',
        'Who funded the work, and could that influence the result?',
      ),
      h2('Single studies are starting points'),
      p('One study rarely settles a question. Confidence grows as independent teams reach similar conclusions using different methods.'),
      p('Reading the original source, where possible, and noticing how cautiously the authors describe their findings often tells you more than the headline.'),
    ],
  },
  'pricing-digital-products-principles-before-tactics': {
    subtitle: 'Before discounts and tiers comes a simpler question: what is this worth to the people who use it?',
    related: ['what-makes-a-small-business-resilient', 'emerging-technologies-reshaping-everyday-life', 'the-case-for-slower-more-deliberate-work'],
    body: [
      p('Pricing is often treated as a tactical problem, solved with discounts and clever tiers. Good pricing starts earlier, with an honest view of value. This placeholder article outlines the principles.'),
      h2('Start with value'),
      p('Customers pay for outcomes, not features. A clear understanding of what problem the product solves, and how much that is worth, gives a defensible starting point.'),
      h2('Keep it understandable'),
      ul(
        'Make the price easy to find and easy to understand.',
        'Avoid surprises after purchase.',
        'Let each plan have a clear purpose.',
      ),
      h2('Review and refine'),
      p('Prices are not permanent. Listening to customers and watching how the product is used helps adjust pricing over time while preserving trust.'),
    ],
  },
  'learning-to-learn-habits-that-make-study-stick': {
    subtitle: 'Re-reading feels productive but rarely is. Better habits make learning last.',
    related: ['what-digital-classrooms-get-right', 'the-case-for-slower-more-deliberate-work', 'why-scientific-uncertainty-is-a-strength'],
    body: [
      p('Many students spend hours re-reading notes and feel they have learned. Research on learning suggests that other methods work better. This placeholder article gathers a few widely recommended habits.'),
      h2('Practise retrieving'),
      p('Testing yourself, rather than simply reviewing, strengthens memory. Closing the book and trying to recall the material, then checking what you missed, is more effective than another read-through.'),
      h2('Space it out'),
      p('Short sessions spread over days tend to beat one long cramming session. Returning to material after a gap forces the brain to work to recall it, which makes the memory stronger.'),
      h2('Build a routine'),
      ul(
        'Choose a regular time and place to study.',
        'Plan what you will practise before you begin.',
        'Review mistakes, not just successes.',
      ),
      p('Small, consistent habits tend to outperform occasional bursts of effort.'),
    ],
  },
};
