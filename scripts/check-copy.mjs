import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  cacheDir: "node_modules/.vite-copy-check",
  appType: "custom",
});
try {
  const { parseSiteCopy, normalizeSiteMarkdown, source: rawSource } = await server.ssrLoadModule(
    "/src/lib/site-copy.ts",
  );
  const { WrittenSection, HeroCopy, Copy } = await server.ssrLoadModule(
    "/src/components/copy.tsx",
  );
  const source = normalizeSiteMarkdown(rawSource);

  // Keep the live Chesky gallery in the requested order, with no duplicate uploads.
  const cheskyImages = [
    "/images/chesky-chips-front.jpeg",
    "/images/chesky-chips-back.jpeg",
    "/images/chesky-public-reply.png",
    "/images/chesky-message-reply.png",
  ];
  assert.deepEqual(
    Array.from(
      source.matchAll(/!\[[^\]]*\]\(<?(\/images\/chesky-[^\s)>]+)/g),
      (match) => match[1],
    ),
    cheskyImages,
    "The live copy must contain each of the four Chesky images exactly once, in order.",
  );
  const liveFitHtml = renderToStaticMarkup(
    createElement(WrittenSection, {
      id: "fit",
      section: parseSiteCopy(source).sections.fit,
    }),
  );
  assert.equal(
    (liveFitHtml.match(/aria-roledescription="carousel"/g) ?? []).length,
    1,
    "The live Chesky image paragraph must render as one carousel.",
  );
  const slides = Array.from(
    liveFitHtml.matchAll(
      /<figure\b[^>]*aria-roledescription="slide"[^>]*>[\s\S]*?<\/figure>/g,
    ),
    (match) => match[0],
  );
  assert.deepEqual(
    slides.map((slide) => slide.match(/<img\b[^>]*src="([^"]+)"/)?.[1]),
    cheskyImages,
    "The carousel must render exactly four slides in the requested order.",
  );
  assert.equal(
    slides.filter((slide) => !/^<figure\b[^>]*\bhidden=""/.test(slide)).length,
    1,
    "Only the first slide should be visible on initial render.",
  );
  assert.deepEqual(
    Array.from(
      liveFitHtml.matchAll(/<button\b[^>]*aria-label="([^"]+)"[^>]*>/g),
      (match) => match[1],
    ),
    ["Previous image", "Next image"],
    "The carousel must provide just the two requested arrow controls.",
  );
  const sourceLines = source.split("\n");
  const lastImageLine = sourceLines.findIndex((line) =>
    line.includes(cheskyImages.at(-1)),
  );
  assert.equal(
    sourceLines[lastImageLine + 1]?.trim(),
    "",
    "A blank line must separate the Chesky images from the following prose.",
  );
  const followingParagraph = sourceLines
    .slice(lastImageLine + 2)
    .join("\n")
    .trimStart()
    .split(/\n\s*\n/)[0];
  const followingHtml = renderToStaticMarkup(
    createElement(Copy, null, followingParagraph),
  );
  assert.ok(followingHtml.startsWith("<p>"));
  const followingIndex = liveFitHtml.indexOf(followingHtml);
  assert.ok(followingIndex >= 0, "The story paragraph must remain visible.");
  assert.match(
    liveFitHtml.slice(0, followingIndex),
    /<\/div>\s*$/,
    "The story paragraph must follow the carousel as separate prose.",
  );

  // Round-trip the formatting produced by the user's visual Markdown editor.
  const visualEditorCopy = source
    .replace(
      /^(-{3,})(?=\n)/gm,
      "--------------------------------------------------",
    )
    .replace(/(<!--[\s\S]*?-->)/g, "```html\n$1\n```")
    .replace(
      /^!\[([^\n]+)\]\((\/images\/[^\n]+)\)$/gm,
      (_, alt, asset) => `!\\[${alt}]\\(${asset})`,
    )
    .replace(/(chesky-message-reply\.png\))\n\n/g, "$1\n")
    .replace(/^email:.*$/m, 'email: "<mailto:author@example.com>"')
    .replace(/^linkedin:.*$/m, 'linkedin: "<https://example.com/profile>"');
  const visualParsed = parseSiteCopy(visualEditorCopy);
  assert.deepEqual(visualParsed.sections, parseSiteCopy(source).sections);
  assert.equal(visualParsed.profile.email, "author@example.com");
  assert.equal(visualParsed.profile.linkedin, "https://example.com/profile");
  assert.equal(
    visualParsed.profile.videoSrc,
    parseSiteCopy(source).profile.videoSrc,
  );
  const visualFitHtml = renderToStaticMarkup(
    createElement(WrittenSection, {
      id: "fit",
      section: visualParsed.sections.fit,
    }),
  );
  assert.deepEqual(
    Array.from(
      visualFitHtml.matchAll(
        /<div class="copy-image-gallery">([\s\S]*?)<\/div>/g,
      ),
      (gallery) =>
        Array.from(
          gallery[1].matchAll(/<img\b[^>]*src="([^"]+)"/g),
          (image) => image[1],
        ),
    ),
    [
      ["/images/personal-setup.png", "/images/work-setup.png"],
      ["/images/sourcing-bot-team.png", "/images/sourcing-results.png"],
    ],
    "Both two-image galleries must survive the visual editor's escaped image syntax.",
  );
  assert.equal(
    (visualFitHtml.match(/aria-roledescription="carousel"/g) ?? []).length,
    1,
  );
  assert.equal(
    (visualFitHtml.match(/aria-roledescription="slide"/g) ?? []).length,
    4,
  );

  // Setup captions must survive editors stripping image titles or escaping images.
  const setupPair =
    "![Personal setup](/images/personal-setup.png)\n![Work setup](/images/work-setup.png)";
  const escapedSetupPair = String.raw`!\[Personal setup]\(/images/personal-setup.png)
!\[Work setup]\(/images/work-setup.png)`;
  const captionsIn = (markup) =>
    Array.from(
      markup.matchAll(/<figcaption>([\s\S]*?)<\/figcaption>/g),
      (match) => match[1],
    );
  const renderImages = (markdown) =>
    renderToStaticMarkup(
      createElement(Copy, null, normalizeSiteMarkdown(markdown)),
    );
  for (const markup of [
    liveFitHtml,
    visualFitHtml,
    renderImages(setupPair),
    renderImages(escapedSetupPair),
  ]) {
    assert.deepEqual(
      captionsIn(markup),
      ["(personal setup)", "(work setup)"],
      "Both setup captions must appear exactly once after visual-editor saves.",
    );
  }
  assert.deepEqual(
    captionsIn(
      renderImages(
        setupPair.replace(
          "personal-setup.png)",
          'personal-setup.png "My own caption")',
        ),
      ),
    ),
    ["My own caption", "(work setup)"],
    "An explicit image title must override its configured caption.",
  );
  assert.deepEqual(
    captionsIn(
      renderImages(
        "![Bot team](/images/sourcing-bot-team.png)\n![Results](/images/sourcing-results.png)",
      ),
    ),
    [],
    "The sourcing-bot image pair must remain uncaptioned.",
  );

  const escapedImage = String.raw`!\[Example image]\(/images/example.png)`;
  const restoredImage = "![Example image](/images/example.png)";
  assert.equal(normalizeSiteMarkdown(escapedImage), restoredImage);
  assert.equal(
    normalizeSiteMarkdown(`${escapedImage}\nThe story continues.`),
    `${restoredImage}\n\nThe story continues.`,
    "Missing blank lines must not turn the image group and following prose into one paragraph.",
  );
  assert.equal(
    normalizeSiteMarkdown(`Before.\n${escapedImage}\n${restoredImage}\nAfter.`),
    `Before.\n\n${restoredImage}\n${restoredImage}\n\nAfter.`,
    "Image runs must stay together while remaining separate from surrounding prose.",
  );
  for (const fence of ["```", "~~~"]) {
    const literalCode = `${fence}markdown\n${escapedImage}\n${fence}`;
    assert.equal(normalizeSiteMarkdown(literalCode), literalCode);
  }
  const untouchedExamples = String.raw`Keep C:\notes\new and \*literal emphasis\* unchanged.

An inline !\[example]\(/images/example.png) stays literal.

!\[Remote example]\(https://example.com/image.png)

![Remote image](https://example.com/image.png)

    !\[Indented code example]\(/images/example.png)`;
  assert.equal(normalizeSiteMarkdown(untouchedExamples), untouchedExamples);
  for (const markdown of [
    visualEditorCopy,
    `${escapedImage}\nThe story continues.`,
    untouchedExamples,
  ]) {
    const normalized = normalizeSiteMarkdown(markdown);
    assert.equal(normalizeSiteMarkdown(normalized), normalized);
  }
  assert.equal(
    normalizeSiteMarkdown("```html\n<div>Keep this code sample</div>\n```"),
    "```html\n<div>Keep this code sample</div>\n```",
  );
  const mixedCode =
    "```html\n<!-- A code comment -->\n<div>Keep this too</div>\n```\n\n```html\n<!-- section: fit -->\n```";
  assert.equal(
    normalizeSiteMarkdown(mixedCode),
    "```html\n<!-- A code comment -->\n<div>Keep this too</div>\n```\n\n<!-- section: fit -->",
  );
  assert.deepEqual(
    parseSiteCopy(visualEditorCopy.replace(/\n/g, "\r\n")).sections,
    visualParsed.sections,
  );

  // Exercise the edits the author will actually make, without changing their file.
  const edited = parseSiteCopy(
    source
      .replace(
        /(<!-- section: fit -->\s*)#{1,6}[^\n]+/,
        "$1## My **updated** heading",
      )
      .replace(
        "<!-- section: sourcing -->",
        "- **A new win.** New supporting copy.\n  - A nested point with [evidence](https://example.com/proof).\n\n### A new subsection\n\nMore context here.\n\n<!-- section: sourcing -->",
      ),
  );
  const html = renderToStaticMarkup(
    createElement(WrittenSection, { id: "fit", section: edited.sections.fit }),
  );
  assert.match(html, /id="fit"/);
  assert.match(html, /id="fit-heading"/);
  assert.match(html, /My <strong>updated<\/strong> heading/);
  assert.match(html, /<strong>A new win\.<\/strong>/);
  assert.match(html, /<ul>\s*<li>A nested point/);
  assert.match(html, /href="https:\/\/example.com\/proof"/);
  assert.match(
    html,
    /<h3 id="fit--a-new-subsection" tabindex="-1">A new subsection<\/h3>/,
  );
  assert.doesNotMatch(html, /section: sourcing|THIS FILE POWERS/);
  assert.match(
    renderToStaticMarkup(createElement(HeroCopy)),
    /class="hero-intro"/,
  );
  assert.match(
    renderToStaticMarkup(createElement(HeroCopy)),
    /class="hero-note"/,
  );
  const editedSettings = parseSiteCopy(
    source
      .replace(/^phone:.*$/m, 'phone: "+1 518 226 5012"')
      .replace(/^video:.*$/m, 'video: "/video/hello-adam.mp4"'),
  );
  assert.equal(editedSettings.profile.phoneHref, "tel:+15182265012");
  assert.equal(editedSettings.profile.videoSrc, "/video/hello-adam.mp4");
  assert.throws(
    () => parseSiteCopy(source.replace("<!-- section: fit -->", "")),
    /section: fit/,
  );
  assert.doesNotMatch(
    renderToStaticMarkup(
      createElement(
        Copy,
        null,
        "<!-- hidden -->\n\n[unsafe](javascript:alert%281%29)",
      ),
    ),
    /hidden|javascript:/,
  );
  console.log(
    "Copy checks passed: plain and visual Markdown, escaped image recovery, durable setup captions, editable headings, new/nested bullets, links, subheadings, hero, settings, stable navigation, hidden comments, and the four-image Chesky carousel.",
  );
} finally {
  await server.close();
}
