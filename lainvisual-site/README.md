# Lain Visual V5

Static multi-section website: homepage, bilingual blog, bilingual services. No build tools or backend required.

## Structure
- `/` — experimental Lain tribute landing page
- `/blog/` — article index, search, filters and bilingual posts
- `/services/` — services and local-only inquiry text generator
- `/404.html` — custom not-found page
- `/assets/favicon.svg` — original favicon
- `/robots.txt`, `/sitemap.xml` — indexing metadata

## Deploy on GitHub Pages
1. Back up your existing repository and keep its `CNAME` file in the root.
2. Upload the **contents** of this folder to the GitHub Pages publishing root.
3. In Settings → Pages, verify the publishing branch/folder.
4. Check `/`, `/blog/`, `/services/`, and a nonexistent URL on desktop and mobile.
5. If you move to Cloudflare Pages, connect the same repository; no build command is needed and output directory is `/` (repository root).

## Content and privacy
- Blog demo posts are examples: replace or delete them in `blog/posts.js` before launch.
- Services form generates text **locally only**; it does not send inquiries. Add a verified contact address before taking requests.
- No copyrighted anime footage, screenshots, audio or official logos are bundled.
- All internal links are relative, assuming this site is served at the domain root.
- `sitemap.xml` uses `https://lainvisual.com` as the canonical domain.
- Respect licensing, copyright and applicable regulations for projects and services.
