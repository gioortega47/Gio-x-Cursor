import { parse } from "yaml";
import { withBase } from "./utils";

// The live site copy is embedded here so no standalone copy document is published.
export const source = "---\n\n# Contact details, video, and image captions. Keep the field names; edit the values.\n\nname: \"Gio Ortega\"\nemail: \"<gio.personal7@gmail.com>\"\nlinkedin: \"<https://www.linkedin.com/in/gioortega/>\"\nphone: \"+1 518 226 5012\"\nvideo: \"/video/hello-adam.mp4\"\ncaptions: \"\"\nposter: \"/images/landscape.png\"\npersonalSetupCaption: \"(personal setup)\"\nworkSetupCaption: \"(work setup)\"\ncontactButton: \"Let’s talk\"\nlinkedinButton: \"LinkedIn\"\nsignoff: \"Take it easy\"\nsignature: \"Gio.\"\nfooter: \"A little initiative. A lot of intention.\"\n--------------------------------------------------\n\n```html\n<!--\nTHIS FILE POWERS THE WEBSITE.\nSave it to update the local preview at http://127.0.0.1:5173.\n\nEdit the words below freely. Keep the five \"section:\" marker lines in place;\nthey keep the navigation working even when you rename a heading.\n\n- Start a line with a dash to add a bullet.\n  - Indent two spaces for a supporting bullet.\n- **Bold opening.** Then the rest of the point.\n- Add a link like [Link text](https://example.com).\n\nUse a blank line for a new paragraph, or ### for a smaller subheading.\nThis instruction block and the section markers never appear on the website.\n\nTo add your recording, put it in public/video/hello-adam.mp4, then change\nvideo above to \"/video/hello-adam.mp4\". A direct HTTPS video URL also works.\nWhen your sourcing example is ready, replace the coming-next bullet below\nwith: - [Here’s a live example →](https://your-link-here.com)\n-->\n```\n\n```html\n<!-- section: hero -->\n```\n\n# Howdy Adam!\n\nI’m Gio. A 24 year old TA professional with a 100% response rate!\n\n(Who's even got replies from **Brian Chesky**...)\n\n```html\n<!-- section: opportunity -->\n```\n\n## Why I’m excited about THIS opportunity...\n\n- ~~Unlimited Cursor, Grok, and Grok Bot access~~\n- **YOU!** Yes, not in a creepy way, but your past work is legendary... I’d love the opportunity to learn from you and the unbelievable team you’ve created to power talent at Cursor.\n  - You've convinced a whole lot of senior talent leaders to become IC's and I want to know why!\n- The values of the Cursor talent team and style align deeply with how I approach talent\n  - Person focused searches with a high bar (this is how I want to recruit everyday!)\n  - Treating every search like an executive search\n  - Outcaring other companies during candidate's processes while keeping a high bar \n  - Delivering a truly curated experience to each and every candidate that enters the funnel\n  - Closing as a team sport with company alignment (though I'm happy being the QB!)\n  - Relenteless persistence for the right candidate\n- Being surrounded by other TA builders\n  - I practically run my whole desk out of Cursor and would love to be surrounded by other TA tinkerers - I heard on a podcast with Roman Ugarte that y'all are some of the heaviest Grok Bot users!\n\n```html\n<!-- section: fit -->\n```\n\n## Why I believe I can tango...\n\nDon’t like talking too much about myself, but here’s a high level overview...\n\n#### **Took a *very* non-traditional route.**\n\nHelped build a property tech software company at 17, did door to door sales, climbed on roofs and installed gutters, landed a recruiting internship at a software consultancy internship at 19 (hired four senior engineering hires then they offered me a full time recruiting role!), [was featured in the news for recruiting work](https://www.bizjournals.com/albany/inno/stories/awards/2022/09/15/inno-under-25-albany.html), even had a breif stint in entrepreneurship where I lived in LATAM and built a marketing business to $30,000/mo.\n\n#### And here's some more relevant work that I've done as a **technical recruiter @ Nubank**\n\n- Part of **Canada tiger team** to stand up first engineer talent hub in the country\n  - Heavily lead sourcing strategy, EOR relationship and process, and internal operations\n  - Responsible for first 16 hires within the region\n  - Built out prep material for candidates which rolled out across every Geo for eng hiring in 3 languages after getting review and buy in from eng leadership\n\n- Part of **Palo Alto tiger team** to stand up ambitious hiring plan (100 hires by EOY) for US expansion\n  - Hired Lead to Principal technical roles (IC6–IC9+) acoss six engineer teams (AI, ML, SWE and Crypto)\n  - Maintained 65% pass through rate at TS1 during our new interview bar\n  - Built out AI powered screening tool to keep TOF quality extremely high which became the gate for candidates entering process\n\n- **Deployed back to Canada as 1-man band** to prove our new Palo Alto process could scale in other geo's\n  - Hired 3 high priority engineering openings for AI Core team as POC in >3 weeks\n  - Built out process for deploying new process in new Geo's\n  - Up-leveled team on screening and new pipeline processes\n\n- **Rapid fire points:**\n  - Hired confidential high priority senior leadership roles for TA\n  - Became the go to person in 110 person TA team for all outreach, creative sourcing, and candidate experience questions (I like being the person the team can hand the hard thing to!)\n  - Activley working with team in program to up level their screenings and AI skills\n\n*(Kind of a hired gun here wherever our team needs the most help 😅)*\n\n#### Talent Engineer\n\n!\\[My personal Cursor setup with the Midas knowledge graph]\\(/images/personal-setup.png)\n!\\[My work Cursor setup with recruitingOS and Claude Code]\\(/images/work-setup.png)\n\nI'm by no means a software engineer, but I have been building toward being a talent engineer. For everyday use for both work and personal projects Cursor with Grok/Claude/Codex has been my main OS. It's wired up with every relevant MCP and connector you can imagine along with some custom scripts, so majority of my day to day admin work can be handled through here (prep for calls, write and submit scorecards, sourcing, outreach, etc.)\n\n#### Proudest Project\n\nMy proudest project is my autonomous sourcing bot team built with Hermes agent - I'm working to transition to Grok Bot don't worry!\n\n!\\[The four sourcing bots: Recruiting Lead, Market Researcher, Sourcing Strategist, and Sourcing Ops]\\(/images/sourcing-bot-team.png)\n!\\[A sourcing bot's overnight results with the scored candidate pool and shortlist]\\(/images/sourcing-results.png)\n\nIt's four bots powered by a LinkedIn API aggregator:\n\n1. **Recruiting Lead:** takes in job requisitions, writes the role brief and scoring rubric\n2. **Market Researcher:** maps companies, competitor job descriptions, and teams within those orgs\n3. **Sourcing Strategist:** turns the research into an ordered queue (what runs next, not a calendar)\n4. **Sourcing Ops:** watches the queue, pauses, and API usage\n\nI approve the plan and then a Cron job runs at night to execute the queued searches, so I wake up to freshly scored candidates in the morning!\n\n#### Chesky & The 100% Response Rate\n\nIt's a joke between my colleagues that I have 100% response rate. (If you need to get in touch with someone I'm your guy!)\n\nI've tried every creative outreach strategy under the sun from custom comic books to instagram pages to just plain old well written emails. ([click to see what people think about my outreach!](https://app.notion.com/p/giotherecruiter/Outreach-Responses-US-f23cda815d70828796ba81902a809233?source=copy_link))\n\nBut, one of my proudest replies came from helping the business development team at the small 130 person consultancy I worked at get a reply from Brian Chesky...\n\n!\\[Front of the custom Chesky's Chips cereal box]\\(/images/chesky-chips-front.jpeg)\n!\\[Back of the custom Chesky's Chips cereal box, illustrating Brian's story]\\(/images/chesky-chips-back.jpeg)\n!\\[Brian Chesky's public reply to Chasing Chesky]\\(/images/chesky-public-reply.png)\n!\\[Brian Chesky's message offering to arrange a meeting]\\(/images/chesky-message-reply.png)\n\nI'd be happy to explain this story on a call! ; )\n\n## Impact\n\n**The more I’ve learned about you and your team, the more I’ve resonated with your approach and philosophies towards talent at Cursor. A lot of these I've tried to implement into my day to day. Be it getting creative to reach someone, deeply caring about their experience, and being the person a teammate can pull into for difficult problems. Those are the parts of my work I’m proudest of and I’d love to bring that same energy here, alongside people who’ll push me to get better!**\n\n**Whether we're chasing Chesky or the worlds top AI research scientists you can absolutely expect the exact same dilligence, creative thinking, and care for every single candidate we bring into process!**\n\n```html\n<!-- section: sourcing -->\n```\n\n## Oh, and I already started sourcing for one of your roles...\n\nSourcing Strategy: [Research Scientist](https://cursor.com/careers/research-scientist)\n\n#### Intake would look something like this:\n\n1. Why the role exists now and what specific problem is it solving for the business\n2. What success looks like at 12 months\n3. Relevant experience defined as which problems, scale, or environments would create evidence\n4. What the person adds that the team is missing\n5. Stack ranked skills and experiences on relevancy to the role\n6. Getting clear on \"anti signals\" here?\n\n#### **Mapped Current Research team**\n\n- **Scraped and mapped 60 relevant profiles**, including 14 research scientists and 6 researchers under other titles. \n- Seems like a mix of RL and robotics researchers, code gen and programming language specialists, quants and mathematicians, and ML systems engineers\n- Also several technical founders and unconventional academic paths. Strong math, hands on model development, and independent research seem to be the biggest buckets\n- Lots of similar backgrounds (Berkeley, Stanford, MIT, OpenAI, DeepMind, Meta, and quant firms).\n- Identified **Ashvin Nair as the most likely HM**\n\n#### **Referral Strategy:**\n\n- Run search in **\"#hiring-ideas\"** channel to check for relevant prospects\n- Sit down with Ashvin for referral mining by asking questions like:\n  - Why specifically did you move from OpenAI to Cursor?\n  - At your previous companies and studies:\n    - Who noticed the model was learning the wrong thing while metrics improved?\n    - When training results made no sense, who did you want investigating?\n    - Who designed an experiment that changed your mind about an approach you trusted?\n    - Who got you unstuck by challenging how you framed a learning problem?\n    - Who turned an idea your group was stuck on into something that demonstrably worked?\n- Set schedule to spend 50% of time throughout the coming 2 weeks on sitting with the following team members for referral mining:\n  - **Joey Hejna:** Stanford, Berkeley, DeepMind, Physical Intelligence (strong reach into RL, rewards and robotics)\n  - **Naman Jain:** Berkeley, MSR, FAIR CodeGen (direct access to code-model and evaluation researchers.)\n  - **Anurag Ajay:** MIT, DeepMind, FAIR (expands beyond Ashvin’s Berkeley network.)\n  - **Alexander Wettig:** Princeton, Ai2, SWE agent (strong data-curation and coding-agent coauthor network.)\n  - **Charlie Snell:** Berkeley, DeepMind (particularly relevant peers in RL and test-time reasoning.)\n  - **Yifei Zhou:** Berkeley, xAI, Thinking Machines, FAIR (recent connections across frontier agent teams.)\n  - **Oleg Rybkin:** Penn, Berkeley, DeepMind (deep RL network)\n\n#### **Passive Candidate Sourcing Strategy:**\n\n**Reactively**, I'd setup a few key bots or agents for monitoring:\n\n- Repos (verl-project/verl, NovaSky-AI/SkyRL, rllm-org/rllm, PrimeIntellect-ai/prime-rl, etc.)\n- Publication monitoring (Semantic Scholarship, ArXiv, etc.)\n\n*(I built a Grok Bot template for the repos!)* <https://x.ai/bot/LwndHpO0vpyL7USHscxrv>\n\n\n**Proactively**, I'd get on the hunt! (and have an agent assist)\n\n- Start with GitHub and examine contributors, PRs, and technical discussions around SkyRL, rLLM, Prime-RL, verifiers, and R2E-Gym, looking for algorithm implementation, training diagnoses, and substantive experiments.\n- Expand into research papers and model releases and follow projects such as DeepSWE, SWE-RL, SWE-Gym, TMax, and DR Tulu to identify researchers behind relevant results.\n- Follow collaborators across projects and connect each person’s work on model training, environments, rewards, and data to build a fuller picture of their capabilities.\n- Verify individual ownership and read contribution statements and inspect implementation evidence to establish who designed experiments, trained models, built graders, or generated data.\n\nThis could turn up a short list like:\n\n| Rank   | Candidate                                                 | Relevant background and work                                                                                                | Why they match Cursor’s JD                                                                                                      |\n| ------ | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |\n| **1**  | [Yuxiang Wei](https://yuxiang.cs.illinois.edu/)           | Meta research scientist / UIUC PhD. First author of SWE RL and Self Play SWE RL.                                            | Strongest overall combination of coding agent RL, self-play, and training-task difficulty research.                             |\n| **2**  | [Michael Luo](https://michaelzhiluo.github.io/index.html) | Berkeley PhD (previously Google DeepMin). Explicitly credited with DeepSWE model training and training infrastructure.      | Clear hands-on ownership of coding-model RL, implementation, and performance optimization.                                      |\n| **3**  | [Hamish Ivison](https://ivison.id.au/)                    | UW PhD researcher and Google DeepMind student researcher. Originated TMax and built its training code and core experiments. | Strong evidence of owning the complete research cycle, plus terminal agent training and open ended reward research.             |\n| **4**  | [Jaskirat Singh](https://1jsingh.github.io/)              | ANU PhD researcher and Adobe/Meta research experience. R2EGym and DeepSWE verifier/data contributions.                      | Particularly relevant to coding verifiers, training environments, and RL data quality.                                          |\n| **5**  | [Jiayi Pan](https://jiayipan.com/)                        | Previously xAI and a Berkeley PhD student. SWE Gym co first author and ArCHer contributor.                                  | Combines software-agent training, learned trajectory verifiers, and long-horizon RL research.                                   |\n| **6**  | [Sijun Tan](https://jeffreysijuntan.github.io/)           | Berkeley PhD researcher. Co developed rLLM and trajectory-/step-level GRPO/PPO for DeepSWE.                                 | Strong algorithm and implementation evidence for multi turn coding-agent training.                                              |\n| **7**  | [Shiyi Cao](https://shiyicao.com/)                        | Berkeley PhD researcher (ETH Zurich MSc). SkyRL Agent project co lead.                                                      | Direct experience combining multi turn coding RL with training efficiency.                                                      |\n| **8**  | [Dacheng Li](https://dachengli1.github.io/)               | Berkeley PhD researcher with CMU ML master’s. SkyRL Agent project co-lead.                                                  | Connects coding model improvement with efficient ML systems and compute conscious experimentation.                              |\n| **9**  | [Rulin Shao](https://rulinshao.github.io/)                | UW PhD researcher and Meta visiting researcher. DR Tulu co lead with reward method, training, and data contributions.       | Strong match for open-ended reward design; coding-specific ownership needs further validation.                                  |\n| **10** | [Junjie Oscar Yin](https://oseyincs.io/)                  | UW PhD researcher. Owned TMax’s data framework and analysis and first author of Compute-Constrained Data Selection.         | Particularly relevant to training-data quality, difficulty, and compute efficiency; deep RL ownership needs further validation. |\n\n#### **Engagement Strategy:**\n\n**Let's take Yuxiang Wei as an exmple:** <https://www.linkedin.com/in/yuxiang-wei-a94a63205/>\n\nI'd start by getting a current snapshot of Yuxiang.\n\n- AI Research Scientist at Meta Superintelligence Labs, Bay Area.\n- Background in UIUC computer-science PhD, 2026; previously Snowflake.\n- Specializes in Self improving coding agents, reinforcement learning, and code generation.\n- Known for Magicoder, SWE RL, and SelfCodeAlign - his methods influenced Google and Meta models.\n- Interested Open source tools, programming languages, and algorithm experimentation.\n- **Interesting Notes:**\n  - First lunch in the US was McDonalds (invite for lunch?)\n\nTo get him engaged my research found a very interesting connection with a Cursor team member: **Federico Cassano is a direct coauthor with Yuxiang on SelfCodeAlign** (one of his projects).\n\n- All efforts would be focused on bridging this connection\n  - Invite him into the Cursor office to play a home game\n  - Take him out to lunch and break breads\n  - Have him give a talk training signal for SWE RL\n\nOutside of that - here's a few crafty ideas to get a response from him:\n\n1. Have one of the research teams reply to one of his X posts\n2. Send them an email genuinely curious about their work or asking for advice\n3. Have an engineer make a PR on his code\n4. Vibe code him a custom game about his work and research\n\n```html\n<!-- section: contact -->\n```\n\n## Thank you for your time, Adam!\n\nTo be 100% honest with you - I'm scared, nervous, AND excited.\n\nIf any of this resonated with you. **I'd love to chat.**\n\nAlso here's a template link to the Repo Monitor Grok Bot: <https://x.ai/bot/LwndHpO0vpyL7USHscxrv>\n";

export const sectionIds = [
  "hero",
  "opportunity",
  "fit",
  "sourcing",
  "contact",
] as const;
export type SectionId = (typeof sectionIds)[number];
export type CopySection = { title: string; body: string };

// Recover escaped local image lines from visual-editor saves. Code examples and
// ordinary prose stay literal; image runs get their own Markdown paragraph.
function normalizeImageBlocks(markdown: string) {
  const output: string[] = [];
  let fence: { character: string; length: number } | undefined;
  let previousWasImage = false;

  for (const line of markdown.split("\n")) {
    const fenceMarker = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      output.push(line);
      if (
        fenceMarker?.[1][0] === fence.character &&
        fenceMarker[1].length >= fence.length &&
        !fenceMarker[2].trim()
      ) {
        fence = undefined;
      }
      continue;
    }
    if (fenceMarker) {
      if (previousWasImage) output.push("");
      previousWasImage = false;
      fence = { character: fenceMarker[1][0], length: fenceMarker[1].length };
      output.push(line);
      continue;
    }

    const candidate = line
      .replace(/^([ \t]{0,3})\\?!\\?\[/, "$1![")
      .replace(/\\?\]\\?\(/, "](")
      .replace(/\\?\)[ \t]*$/, ")");
    const isImage =
      /^ {0,3}!\[[^\]\n]*\]\((?:\/images\/[^\s)<>]+|<\/images\/[^<>\n]+>)(?:[ \t]+"[^"\n]*")?\)[ \t]*$/.test(
        candidate,
      );

    if (isImage) {
      if (!previousWasImage && output.at(-1)?.trim()) output.push("");
      output.push(candidate);
    } else {
      if (previousWasImage && line.trim()) output.push("");
      output.push(line);
    }
    previousWasImage = isImage;
  }

  return output.join("\n");
}

// Visual Markdown editors may serialize HTML comments as code blocks and
// horizontal rules as longer runs of dashes. Normalize only while reading;
// never write back to the author's open document.
export function normalizeSiteMarkdown(markdown: string) {
  return normalizeImageBlocks(
    markdown
      .replace(/^\uFEFF/, "")
      .replace(/\r\n/g, "\n")
      .replace(
        /^(`{3,}|~{3,})[ \t]*(?:html)?[ \t]*\n[ \t]*(<!--(?:(?!-->)[\s\S])*-->)[ \t]*\n\1[ \t]*$/gim,
        "$2",
      ),
  );
}

// The markers are stable; the visible headings and Markdown can change freely.
export function parseSiteCopy(markdown: string) {
  const document = normalizeSiteMarkdown(markdown);
  const frontmatter = document.match(
    /^-{3,}[ \t]*\n([\s\S]*?)\n-{3,}[ \t]*(?:\n|$)/,
  );
  const metadata: unknown = frontmatter ? parse(frontmatter[1]) : {};
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    throw new Error(
      "website-copy.md: the settings at the top must be field: value pairs.",
    );
  }
  const settings = metadata as Record<string, unknown>;
  function setting(name: string, fallback = "") {
    const value = settings[name];
    if (value == null) return fallback;
    if (typeof value !== "string") {
      throw new Error(`website-copy.md: put the ${name} value in quotes.`);
    }
    return value;
  }
  function linkSetting(name: string, fallback = "") {
    const value = setting(name, fallback).trim();
    return value.replace(/^<([^<>]+)>$/, "$1");
  }
  const markers = [
    ...document.matchAll(
      /^<!--[ \t]*section:[ \t]*([a-z-]+)[ \t]*-->[ \t]*$/gm,
    ),
  ];
  const sections = {} as Record<SectionId, CopySection>;
  for (const id of sectionIds) {
    const matching = markers.filter((marker) => marker[1] === id);
    if (matching.length !== 1) {
      throw new Error(
        `website-copy.md: keep exactly one <!-- section: ${id} --> marker.`,
      );
    }
    const marker = matching[0];
    const next = markers[markers.indexOf(marker) + 1];
    const text = document
      .slice(marker.index! + marker[0].length, next?.index)
      .trim();
    const heading = text.match(/^#{1,6}[ \t]+(.+)(?:\n|$)/);
    if (!heading) {
      throw new Error(
        `website-copy.md: start the ${id} section with a Markdown heading, such as ## My heading.`,
      );
    }
    sections[id] = {
      title: heading[1].trim(),
      body: text.slice(heading[0].length).trim(),
    };
  }
  return {
    sections,
    imageCaptions: {
      [withBase("/images/personal-setup.png")]: setting("personalSetupCaption"),
      [withBase("/images/work-setup.png")]: setting("workSetupCaption"),
    } as Record<string, string>,
    profile: {
      name: setting("name"),
      email: linkSetting("email").replace(/^mailto:/i, ""),
      linkedin: linkSetting("linkedin"),
      phone: setting("phone"),
      phoneHref: `tel:${setting("phone").replace(/[^+\d]/g, "")}`,
      videoSrc: withBase(linkSetting("video")),
      videoCaptions: withBase(linkSetting("captions")),
      videoPoster: withBase(linkSetting("poster", "/images/landscape.png")),
      contactButton: setting("contactButton", "Let’s talk"),
      linkedinButton: setting("linkedinButton", "Find me on LinkedIn"),
      signoff: setting("signoff"),
      signature: setting("signature"),
      footer: setting("footer"),
    },
  };
}

export const siteCopy = parseSiteCopy(source);
