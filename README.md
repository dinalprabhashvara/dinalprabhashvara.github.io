# Dinal Prabhashvara — Personal Portfolio

A lightweight, responsive, static website inspired by a Cosmic Horizon design direction — with visual motion, subtle cinematic entrances, glowing interactive cards, drifting stars, and a scroll progress indicator.

## Preview locally

Open `index.html` in your browser. You can also run a local server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Publish for free

1. Go to https://dash.cloudflare.com and create a free account if needed.
2. Navigate to Workers & Pages, create a Pages project, and choose direct upload / drag and drop.
3. Upload this website directory or the provided ZIP file, ensuring `index.html` is at the ZIP root.
4. Cloudflare will assign a free `*.pages.dev` domain, with HTTPS.

You can also publish static files via GitHub Pages or Netlify's free tier, subject to their current terms.

## Customize

- `index.html`: text, navigation, story, email and section content.
- `styles.css`: layout, colors and effects.
- `script.js`: mobile menu, reveal transitions and active navigation.
- `assets/dinal-portrait.webp`: the portrait.
- `assets/stars.svg`: lightweight star field art.
- `assets/favicon.svg`: browser icon.

The site requires no backend, database, build tool, or paid plugin. It requests Google Fonts for typography; browser fallback fonts are provided if unavailable.

## Privacy / publishing note

The public website deliberately does **not** name unreleased projects. The email address and portrait are public once deployed. Review everything before publishing.

## Animations

Animations use native CSS and a few lines of vanilla JavaScript, with no external animation libraries.
Effects include a slow starfield shimmer, occasional shooting stars, soft horizon glow,
subtle photo movement, gentle mouse parallax on desktop, staggered hero entrance,
scroll-reveal sections, slowly rotating vision orbits, cursor-responsive card glows,
and a top scroll progress line.

For accessibility, `prefers-reduced-motion: reduce` disables decorative movement
and reveals all content immediately. Touchscreens do not use cursor-follow parallax.

## Contact buttons

- **Get in Touch** (header and hero) now scrolls to the Contact section.
- **Say hello** opens a friendly contact dialog with three choices: **Write with Gmail**, **Open email app**, or **Copy email address**.
- An email-app option only works if the visitor has a mail handler configured. Gmail uses Gmail's compose webpage and requires the visitor to sign in.
- No messages are sent by the website itself; no backend or paid service is required. The email is visible to copy manually if clipboard permissions are unavailable.

### GitHub Pages

Unzip this download. Upload **the files themselves** (`index.html`, `script.js`, `styles.css`, `assets/`, `README.md`) to the root of your public GitHub Pages repository. In Settings → Pages, choose Deploy from a branch, main, /(root). Updates deploy after you commit them. No build step or backend is needed.

## Music-free edition

All background music, embedded players, streaming links, audio assets, and associated scripts/styles have been removed. The visual animations, responsive layout, and contact options remain intact.


## Search-engine setup (free)

This edition adds `sitemap.xml`, `robots.txt`, canonical URL, social preview image, and Person/Organization structured data.

1. Deploy all contents of this folder to the root of the GitHub repository `dinalprabhashvara.github.io`.
2. Confirm these URLs work in a browser: `https://dinalprabhashvara.github.io/`, `/sitemap.xml`, and `/robots.txt`.
3. Go to Google Search Console and add a **URL prefix** property: `https://dinalprabhashvara.github.io/`.
4. Verify ownership using the HTML-file method. Upload Google's uniquely named HTML verification file at repository root and wait for GitHub Pages to deploy it; then click Verify. The Google verification file must be downloaded from your own Search Console account, so it is not included here.
5. Use **URL Inspection** to request indexing for your home page. Then use **Sitemaps** to submit `sitemap.xml`.
6. Optionally add the site at Bing Webmaster Tools (https://www.bing.com/webmasters/) and submit the same sitemap.

Indexing is not guaranteed, even after submission. Keep the verification HTML file in your published repo.
