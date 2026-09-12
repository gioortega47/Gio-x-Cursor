# Howdy Adam!

A personal landing page for Gio Ortega, inspired by the quiet typography, warm palette, generous space, and painterly imagery of Cursor. Built with React, TypeScript, Vite, Tailwind CSS, source-owned shadcn-style Radix components, and cmdk.

Workflow and history updated September 12, 2026. Future agents should also read
[AGENTS.md](AGENTS.md). The current wording lives in the copy file, not in this
README or a previous chat response.

## Run

```sh
cd Gio-x-Cursor # From the Operation Cursor workspace root; skip if already here.
npm install
npm run dev
```

Open http://127.0.0.1:5173. `npm run build` creates the static site in `dist/`; `npm run preview` serves that build at http://127.0.0.1:4173.

## Live site

Public repository: [looseontheland/Gio-x-Cursor](https://github.com/looseontheland/Gio-x-Cursor).

Hosted at [https://looseontheland.github.io/Gio-x-Cursor/](https://looseontheland.github.io/Gio-x-Cursor/).

This folder is its own git repo. Commit and push to `main` here to rebuild GitHub Pages. Local `npm run dev` still uses `/` paths; the Pages build sets `GITHUB_PAGES=true` so assets load under `/Gio-x-Cursor/`. A static build or hosted copy needs rebuilding/redeploying to pick up later copy edits.

## Edit the website copy

Open **[website-copy.md](website-copy.md)** — Gio’s “website copy 1.” This is the
actual source the website reads. Saved changes appear in the running local
preview. It contains the hero, three written sections, closing, contact details,
and video settings.

Edit this file in Cursor's built-in **Text Editor**, with the built-in read-only
Markdown preview beside it if useful. The workspace pins only this file to the
Text Editor; other Markdown files keep their existing editor preference. Do not
reopen the live copy in SlashMD unless Gio requests it: its visual editor writes
serialized Markdown into the same source buffer, which caused escaped formatting
and spacing changes. The site preview remains at http://127.0.0.1:5173.

| File | Role |
| --- | --- |
| `website-copy.md` | Live source; edit this file for the page |
| `websitecopy2.md` | Alternate draft; not imported by the site |
| `website-copy.backup.md` | Historical backup; not live or necessarily current |
| `../site-copy.md` | Original outline/reference; not live |
| `../nubank-notion-site-copy.md` | Career/copy reference; not live |

The connection is `website-copy.md` → raw import in `src/lib/site-copy.ts` →
parsed settings and sections → Markdown renderers in `src/components/copy.tsx`
and profile consumers in `src/App.tsx` / `src/content.ts`. Do not duplicate page
wording in React components or switch the import to another draft without a user
request.

```md
- A point in your own words.
  - An optional supporting bullet.

### An optional subheading

#### A smaller subheading

A paragraph with *italics*, **bold**, and [a link](https://example.com).

- ~~Unlimited Cursor, Grok, and Grok Bot access~~

#### **Took a *very* non-traditional route.**
```

Change headings and add, delete, or reorder bullets freely. Keep the five `<!-- section: ... -->` markers in place; they preserve navigation when headings change. Instructions inside comments do not appear on the site. The settings at the top use `field: "value"` format. Save with Cmd+S. A static build or hosted copy needs rebuilding/redeploying to pick up later edits; the local development preview updates automatically.

Keep exactly one of each marker: `hero`, `opportunity`, `fit`, `sourcing`, and
`contact`. Each section begins with a Markdown heading immediately after its
marker (blank lines are fine). The marker names preserve the navigation anchors
when you rename headings. Bullet order and subheadings within a section are
editable.

The visual Markdown editor may wrap comments in HTML code fences, expand the
frontmatter separator into a longer dashed line, or wrap links in angle brackets.
The parser already handles those forms. It also recovers standalone local image
lines saved with escaped punctuation, such as `!\[Description]\(/images/photo.png)`.
That recovery happens only while reading the file; it leaves the author's saved
copy untouched and preserves literal examples inside code blocks. Raw HTML is
intentionally skipped by the renderers; use Markdown syntax for formatting.

To place screenshots side by side, keep their Markdown image lines together in
one paragraph (no blank line between them). The optional quoted image title is
shown as a caption beneath each image:

```md
![Personal setup description](/images/personal-setup.png "(personal setup)")
![Work setup description](/images/work-setup.png "(work setup)")
```

One- or two-image paragraphs render as a two-column gallery with subtle borders and
rounded corners, stacking below 600px. Images fit without cropping; uncaptioned
screenshots retain their natural proportions and align vertically at their centers,
including pairs with portrait screenshots. Store files
in `public/images/`; captions and image references remain in `website-copy.md`.

The personal/work setup labels are stored in the copy file's
`personalSetupCaption` and `workSetupCaption` settings. The visual editor has
removed the quoted image titles on save, so those settings supply the captions
when the titles are missing. An explicit image title takes precedence; an empty
setting hides the default caption. Other images receive no default captions.

Three or more image lines together in one paragraph render as a carousel. Their
order in `website-copy.md` sets the slide order. Keep a blank line before and
after the image block, and include each image once. The reader also restores a
missing paragraph break between local images and nearby prose. The Chesky carousel contains the
box front, box back, public reply, and message reply, in that order. It shows one
full image at a time in a stable frame, with two centered arrow buttons underneath.
The arrows wrap around; keyboard left/right navigation is also supported. There
is no autoplay. This runs entirely in the browser and needs no server backend.

`remark-gfm` enables strikethrough in body copy, inline headings, and hero copy.
Markdown tables use compact body text, normal-weight headers, padded cells, and
subtle row dividers. A focusable scroll container keeps wide tables within the
page on small screens. Use Markdown bold only where emphasis is wanted; the
candidate shortlist emphasizes its rank numbers, with regular-weight name links.
Real Geist italic font files are imported for weights 400, 500, and 600 in
`src/main.tsx`. Keep these imports: the site disables synthetic fonts, so an
`<em>` element can exist yet look upright when the italic font is missing.

## Voice and editing preferences

Gio wants direct, warm, playful, personal writing that is easy to scan. Preserve
his informal rhythm, asides, and “YOU!” energy when relevant. Bullets and nested
supporting bullets are welcome. His objection was the repetitive bold
mini-headline followed by generic explanation, not bullet lists or all bold text.

Earlier requests for more heartfelt opportunity copy were followed by rejected
assistant revisions. Do not restore those drafts or treat them as the approved
voice. Likewise, do not force the whole section into paragraphs to avoid bold
lead-ins. Read the current copy and the latest request before editing; Gio is
actively revising it himself.

The opportunity discussion covered learning from Adam and senior practitioners,
person-focused searches at a high bar, building recruiting tools with a team that
will challenge him, and the Research Scientist search as concrete work. These
are context for future editing, not a mandate to reinsert removed text.

## When edits do not appear

1. Confirm the file being edited is `website-copy.md`, and the browser is on
   `http://127.0.0.1:5173`. Copy 2 and the reference documents do not feed the page.
2. Check that the dev server is running. If needed, run `npm run dev` from this
   directory. Check its reported URL; a port conflict can result in another port.
3. Save the open document with Cmd+S. The site sees disk contents, not unsaved
   text in Cursor. Compare a distinctive line in the editor, saved file, and page.
4. If Cursor says “The content of the file is newer,” there is an editor/disk
   conflict. Compare the versions and preserve both before resolving it. If the
   user wants the open draft, save that version after preserving the disk copy;
   do not silently discard user edits or assume the newer timestamp wins.
5. Check terminal/browser errors and run `node scripts/check-copy.mjs` for marker
   or settings errors. Reload the preview after fixing them and verify the actual
   line. A running server alone does not prove the copy is synchronized.
6. A page served by `npm run preview` on port 4173 or a hosted static deployment
   reflects its last build. Rebuild/redeploy that version to update it.

Before any agent patch to `website-copy.md`, check its open Cursor buffer for unsaved changes.
If it differs from disk, preserve both versions and merge into the current user draft before saving; never patch disk beneath an unsaved buffer.

Reread the affected text just before applying a narrow patch.
Avoid rewriting a whole open document for a small change. A backup preserves
work; it does not become a new source automatically.

If an editor paste times out, its outcome is uncertain: inspect the actual buffer
and saved file before retrying or pasting the same content again. A delayed paste
during carousel setup duplicated the four image lines and removed the trailing
blank line; both were repaired on September 12, 2026. Use saved-file patches when
the editor is synchronized instead of applying the same insertion in both places.

A later visual-editor save escaped all eight inline image references, causing
them to render as text. The image files were intact. The read-time normalizer now
accepts that saved form, restores image/prose boundaries, and keeps both image
pairs and the four-slide carousel working without rewriting the user's copy.

## Code and styling

- `src/lib/site-copy.ts`: reads the Markdown file and its settings.
- `src/components/copy.tsx`: renders Markdown with the existing styling.
- `src/content.ts`: navigation labels and the profile derived from Markdown.
- `src/App.tsx`: hero, video, navigation, contact, and command-menu interactions.
- `src/components/site-navigation.tsx` and `.css`: sticky chapter links, current-section tracking, and the responsive Contents drawer.
- `src/styles.css` and `src/application.css`: warm neutral design tokens, typography, layouts, mobile styling, reduced-motion behavior.
- `src/components/ui/`: accessible source-owned UI primitives.
- `CONTENT-NOTES.md`: copy sources, editorial choices, and work still in draft.

## Add the video

1. Put the recording at `public/video/hello-adam.mp4` (create the video directory).
2. Set `video: "/video/hello-adam.mp4"` at the top of `website-copy.md`.
3. Optionally add English WebVTT captions and set `captions: "/video/hello-adam.vtt"`.

The poster then opens an HTML video player with controls, inline playback, and loading-error recovery. Until a recording is configured, it opens a clearly labeled personal note. An HTTPS MP4 URL works too. Loom/YouTube page links are not MP4 sources.

## Page structure and interactions

The introduction uses compact spacing and a video poster sized to the viewport
height (with minimum and maximum heights), so it leaves room for a centered
“See what I’d bring to Cursor” button underneath. That button jumps to the
opportunity section and moves keyboard focus there. The video still opens in its
normal player; only the poster's layout is shorter. The previously removed video
captions and labels remain removed.

After the video, the page reads as a single-column personal note. Its three main
written sections come from `website-copy.md`: why this opportunity, why Gio can
tango, and the sourcing example. The copy can mix paragraphs, bullets, nested
lists, and subheadings; it is no longer fixed to an eight-bullet highlight reel.
Headings, links, and emphasis are rendered from Markdown.

The Research Scientist section links to the role, gives an initial read of the brief, and identifies the prospect map as the next step. Replace its coming-next bullet in `website-copy.md` with a Markdown link when the work sample is ready.

The sticky navigation follows the page's order: Intro, Why Cursor, My work, The
search, and Say hello. Contents opens a scrollable drawer with shortcuts to the
subsections within My work and The search. On smaller screens, an “On this page”
bar shows the current chapter and opens the same drawer. Closing the drawer
restores focus to its opener; selecting a destination closes it, updates the URL,
and focuses the destination below the sticky header. The current chapter follows
scrolling, including returning to the introduction or reaching the closing.

Subsection shortcuts come from the actual rendered headings, with optional short
navigation labels in `src/content.ts`. `src/components/copy.tsx` adds unique IDs
such as `fit--talent-engineer` and keyboard-focus targets during rendering. It
does not change the source Markdown, heading tags, wording, or formatting. New
headings appear in Contents automatically; renaming a heading changes its
subsection URL, while the five main section markers remain stable.

The command palette still opens with ⌘K / Ctrl+K. Email copy gives success/failure
feedback; contact links use Gio’s supplied details. Navigation respects
reduced-motion preferences.

The closing controls show the phone number as a call link, LinkedIn as a profile
link, and the email address as a copy button with confirmation. Their values come
from `phone`, `linkedin` / `linkedinButton`, and `email` in `website-copy.md`;
`signoff` controls the closing phrase. The phone number now labels the primary
contact button; the older `contactButton` setting is no longer displayed.

## Design references and artwork

- User-supplied Cursor screenshot and https://cursor.com/home. The supplied `/inspired` URL returned a 404 during research.
- https://shadcnstudio.com/components informed the source-owned shadcn-style controls using Radix. No premium Studio code is bundled.
- `public/images/landscape.png` is original artwork made using built-in image generation. Prompt: “Original wide 16:9 tonal oil-and-soft-pastel California landscape. Golden rolling hills, distant atmospheric gray-blue mountains, expansive warm ivory sky. Restrained painterly brushwork and fine cream-paper texture. Muted olive, ochre, slate blue and parchment palette. Diffuse hazy late-afternoon light, calm spacious composition, quiet center suitable for a play-button overlay. No text, people, buildings, logo, watermark, or UI.”

Fonts and artwork are local. No backend or account is required. The page includes `noindex, nofollow` while the personal copy is under review. GitHub Pages hosts the production build from this repository.

## Verification

Run relevant checks from `Gio-x-Cursor/`:

```sh
node scripts/check-copy.mjs
npm run build
```

The script checks parsing and server-rendered Markdown; the build checks
TypeScript and asset bundling. Browser verification is still needed for visual
formatting and live updates. The checks below record completed work at the time,
not validation of every subsequent user edit.

The Markdown editing pipeline passes `node scripts/check-copy.mjs`: changing a heading, adding bullets and nested bullets, links, subheadings, contact/video settings, stable anchors, hidden comments, and safe link rendering. TypeScript and the production build pass after the migration.

Verified the written-note revision on September 11, 2026: TypeScript and production build pass. Inspected the layout in Chrome at desktop, 390px, and 320px widths with no horizontal overflow. All story points render visibly, the three main sections have semantic headings and nested lists, and the role link points to the supplied Research Scientist posting. Checked command navigation, mobile navigation, and the revised closing/contact layout; no browser errors were reported. The earlier video and contact interaction checks remain applicable.

The supplied recording is connected at `public/video/hello-adam.mp4` (2:26, H.264/AAC, 1080p). Verified clicking the existing landscape thumbnail opens active playback with no media error. Captions are optional and have not been supplied.

## Work history and resolved issues

Navigation refresh verified September 12, 2026: copy checks and production build
passed. Browser checks covered desktop, 940px, 390px, and 320px layouts; subsection
jumps, current chapter tracking, drawer scrolling and dismissal, focus restoration,
and the command shortcut. No horizontal overflow appeared at 320px. A fresh load
reported no browser errors. The live Markdown was byte-identical to the pre-change
snapshot, and the browser's rendered main text also matched exactly.

| Date | Work and resulting behavior |
| --- | --- |
| September 11, 2026 | Migrated page copy and profile/video settings into `website-copy.md`, with stable hidden section markers and support for visual-editor serialization. Connected the supplied video and retained the landscape poster. |
| September 11–12, 2026 | Iterated on opportunity copy. Gio requested more personal writing while keeping it scannable, rejected several rewrites, and continued editing himself. Current file contents supersede those drafts. |
| September 12, 2026 | Restarted a stopped local preview server. A later check found unsaved editor content and a “file is newer” save conflict, explaining why the page differed from the open draft. Preserved the disk version before saving the user’s open draft and verified it on the page. |
| September 12, 2026 | Gio briefly mentioned `websitecopy2.md`, then explicitly requested copy 1. The source stayed `website-copy.md`; copy 2 was never wired into the app. |
| September 12, 2026 | Added `remark-gfm` to all three Markdown renderers and wrapped the unlimited-access bullet in `~~`. Confirmed a rendered `<del>` with `line-through`; copy checks and build passed. |
| September 12, 2026 | Fixed upright-looking italics by importing real Geist italic fonts at weights 400/500/600. Confirmed “very” in the career subheading is visibly italic; build passed. |
| September 12, 2026 | Added root and landing `AGENTS.md` guidance and updated documentation so future chats can recover the source choice, authoring preferences, and troubleshooting steps. |
| September 12, 2026 | A narrow article-link patch conflicted with an unsaved Cursor draft. Preserved both versions, kept Gio’s new Nubank heading, restored the link in the editor, and saved only the copy document. Added the pre-edit buffer check above to prevent repeats. |
| September 12, 2026 | Renamed the project folder to `Gio-x-Cursor` and published it as its own public GitHub repo with GitHub Pages. Local preview paths are unchanged; the Pages build prefixes assets with `/Gio-x-Cursor/`. |
