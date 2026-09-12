import { siteCopy } from "./lib/site-copy";

// Edit website-copy.md for the site’s wording, links, and video settings.
export const profile = siteCopy.profile;

export const navigation = [
  {
    id: "top",
    label: "Intro",
    detail: "A personal hello and video introduction",
  },
  {
    id: "opportunity",
    label: "Why Cursor",
    detail: "Why I’m excited about this opportunity and team",
  },
  {
    id: "fit",
    label: "My work",
    detail: "My story, recruiting background, AI experience, and growth",
  },
  {
    id: "sourcing",
    label: "The search",
    detail: "Research Scientist sourcing notes and work sample",
  },
  {
    id: "contact",
    label: "Say hello",
    detail: "Email, LinkedIn, or a good old-fashioned call",
  },
];

// Short labels for the contents menu only. Heading text stays author-owned;
// unrecognized/new headings appear in the menu with their own wording.
export function navigationHeadingLabel(heading: string) {
  const labels: [RegExp, string][] = [
    [/^Took a very non-traditional route/i, "My story"],
    [/technical recruiter @ Nubank/i, "Recruiting at Nubank"],
    [/^Proudest Project$/i, "The sourcing bots"],
    [/^Chesky & The 100% Response Rate$/i, "Chesky & the 100% response rate"],
    [/^Intake would look something like this/i, "Role intake"],
    [/^Mapped Current Research team/i, "Research team map"],
    [/^Referral Strategy/i, "Referral strategy"],
    [/^Passive Candidate Sourcing Strategy/i, "Candidate sourcing & shortlist"],
    [/^Engagement Strategy/i, "Engagement strategy"],
  ];
  return labels.find(([pattern]) => pattern.test(heading))?.[1] ?? heading;
}
