import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const base = "/Gio-x-Cursor/";
const server = await createServer({
  base,
  server: { middlewareMode: true, hmr: false, ws: false },
  cacheDir: "node_modules/.vite-pages-copy-check",
  appType: "custom",
});

try {
  const { siteCopy } = await server.ssrLoadModule("/src/lib/site-copy.ts");
  const { Copy } = await server.ssrLoadModule("/src/components/copy.tsx");
  const renderCopy = (markdown) =>
    renderToStaticMarkup(createElement(Copy, null, markdown));
  const captionsIn = (html) =>
    Array.from(html.matchAll(/<figcaption>([\s\S]*?)<\/figcaption>/g),
      (match) => match[1]);

  const fit = renderCopy(siteCopy.sections.fit.body);
  assert.deepEqual(
    captionsIn(fit),
    ["(personal setup)", "(work setup)"],
    "Both setup captions must render exactly once under the GitHub Pages base.",
  );

  const images = Array.from(fit.matchAll(/<img\b[^>]*>/g), (match) => match[0]);
  assert.ok(images.length > 0, "The live fit section must render its images.");
  for (const image of images) {
    assert.ok(
      image.match(/\bsrc="([^"]+)"/)?.[1].startsWith(`${base}images/`),
      "Rendered image URLs must have exactly the GitHub Pages asset prefix.",
    );
    assert.match(image, /\bwidth="[1-9]\d*"/, "Image width must be preserved.");
    assert.match(image, /\bheight="[1-9]\d*"/, "Image height must be preserved.");
  }
  for (const [filename, width, height] of [
    ["personal-setup.png", 2994, 1730],
    ["work-setup.png", 2926, 1664],
  ]) {
    const image = images.find((tag) =>
      tag.includes(`src="${base}images/${filename}"`));
    assert.ok(image, `${filename} must render at its prefixed URL.`);
    assert.ok(image.includes(`width="${width}"`));
    assert.ok(image.includes(`height="${height}"`));
  }

  assert.deepEqual(
    captionsIn(renderCopy(
      '![Personal setup](/images/personal-setup.png "My own caption")\n' +
      "![Work setup](/images/work-setup.png)",
    )),
    ["My own caption", "(work setup)"],
    "An explicit caption must override the fallback under the Pages base.",
  );
  assert.deepEqual(
    captionsIn(renderCopy(
      "![Bot team](/images/sourcing-bot-team.png)\n" +
      "![Results](/images/sourcing-results.png)",
    )),
    [],
    "The unrelated sourcing-bot pair must remain uncaptioned.",
  );
  console.log("Pages copy checks passed: setup captions, asset URLs, image dimensions, and caption overrides.");
} finally {
  await server.close();
}
