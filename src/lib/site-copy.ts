import { parse } from "yaml";
import source from "../../website-copy.md?raw";
import { withBase } from "./utils";

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
