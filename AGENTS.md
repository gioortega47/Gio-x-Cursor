# Build and hosting

- Read `README.md` for editing, preview ports, and publishing workflow.
- Install dependencies with `npm ci`.
- Run the local development server with `npm run dev` (port 5173).
- Site copy and settings are embedded in `src/lib/site-copy.ts`. Preserve its
  section markers and existing parsing behavior when making technical changes.
- Validate with `node scripts/check-copy.mjs` and `npm run build`.
- For GitHub Pages, build with `GITHUB_PAGES=true npm run build`. Pushing `main`
  deploys the site at `/Gio-x-Cursor/`. `withBase` supplies the asset path prefix.
- Keep the hosted site's wording, layout, assets, and behavior unchanged unless
  the user explicitly requests changes to them.
