# A note to Amanda from Gio

Personal recruiting application site, built with React, TypeScript, and Vite.

## Edit and preview

The page wording, links, and media settings are embedded in the `source` string
in `src/lib/site-copy.ts`. Preserve the five section markers and quoted settings.
Read the current file before editing; keep any unsaved user draft intact.

```sh
npm ci
npm run dev
```

The default local preview is `http://127.0.0.1:5173/`. For the separate
`Gio-x-Cursor2` working folder, use `npm run dev -- --port 5174 --strictPort` and
open `http://127.0.0.1:5174/`. Saved edits update the running preview.

The current recording is `public/video/amanda_video.mp4` (about 1:30). Its setting
is `video: "/video/amanda_video.mp4"`; the landscape poster remains in place.

Local image dimensions are recorded in `src/lib/image-dimensions.ts` so lazy
images reserve their space before loading and section links land correctly.
Update those dimensions when replacing or adding images. Captioned galleries
keep their existing fixed aspect ratio; uncaptioned images use their own ratio.

## Validate and publish

```sh
node scripts/check-copy.mjs
GITHUB_PAGES=true npm run build
```

The publishing repository is `gioortega47/Gio-x-Cursor`. Its `main` branch
deploys through `.github/workflows/pages.yml` to
https://gioortega47.github.io/Gio-x-Cursor/ when GitHub Pages is enabled for
Actions. The build prefixes local assets with `/Gio-x-Cursor/`.
The separate `Gio-x-Cursor2` folder has no publishing remote; changes must first
be copied into the publishing checkout. Never include dependencies, build output,
private drafts, credentials, or obsolete recordings in the published source.
