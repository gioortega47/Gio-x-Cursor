# Landing page — guidance for Codex

Read [README.md](README.md) for the editing contract, troubleshooting, and work
history. Read [CONTENT-NOTES.md](CONTENT-NOTES.md) when assessing evidence or
adding claims; its historical copy descriptions are not the current draft.

- Edit `website-copy.md` for page wording. It supplies hero, opportunity, fit,
  sourcing, contact, and profile/video settings. `src/lib/site-copy.ts` imports it
  with `?raw`; `websitecopy2.md` is not connected.
- Use Cursor's built-in Text Editor for this file, as configured in the workspace.
  Pair it with the built-in read-only Markdown preview or the site preview. Do
  not reopen it in SlashMD unless Gio asks; its visual editor rewrites the shared
  source buffer. Other Markdown files retain their existing editor preference.
- Preserve the five `<!-- section: ... -->` markers and quoted settings. The
  parser accepts markers wrapped in HTML code fences by the visual editor.
  Do not rewrite the author’s document merely to normalize its formatting.
- Keep current user edits. If the editor and disk differ, compare and preserve
  both before resolving the conflict. Avoid full-file rewrites for small edits.
- Before any `website-copy.md` patch, check its open Cursor buffer for unsaved changes.
  If it differs from disk, preserve both and merge into the current user draft before saving; never patch disk beneath an unsaved buffer.
- Treat a timed-out editor paste as an uncertain result; inspect before retrying.
  Do not insert the same block into both the saved file and an open editor draft.
- `normalizeSiteMarkdown` recovers escaped standalone `/images/` references from
  visual-editor saves and separates image blocks from prose at read time. Keep
  code examples literal; do not rewrite the user's document to fix this format.
- The setup captions live in the `personalSetupCaption` / `workSetupCaption`
  settings in the copy file. The gallery uses them when the visual editor drops
  image titles; preserve that fallback when changing media rendering.
- Keep copy scannable and personal. Bullets are fine; Gio objected to formulaic
  bold lead-ins, not bullets themselves. Do not “polish” unrelated wording or
  restore a rejected assistant draft during technical fixes.
- `react-markdown` plus `remark-gfm` handles `~~strikethrough~~`, `*italics*`, and
  `**bold**`. Raw HTML is skipped. Keep GFM enabled in all three renderers in
  `src/components/copy.tsx`.
- Keep the Geist italic imports (400, 500, 600) in `src/main.tsx`.
  `font-synthesis: none` in `src/styles.css` means italic markup alone is not
  enough without the italic font files.
- Run the local preview from this directory with `npm run dev` (port 5173).
  Saved edits update it automatically; port 4173 serves a static build.
- This folder is the public `Gio-x-Cursor` git repo. Pushing `main` deploys
  GitHub Pages at `/Gio-x-Cursor/`. Do not change Markdown image paths for hosting;
  `withBase` prefixes `/images` and `/video` during the Pages build.
- For parser/rendering changes, run `node scripts/check-copy.mjs` and
  `npm run build`, then check the affected content in the browser. For a small
  copy or style edit, use checks proportionate to the change. Do not claim the
  page matches the editor after checking only the saved source or server startup.

Record meaningful workflow or implementation changes in the README. Treat its
verification dates as historical evidence, not a guarantee about later edits.
