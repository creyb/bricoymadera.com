# AGENTS.md - bricoymadera.com

## Mandatory Rules

1. **Verify before continuing**: After modifying any file, use `read` to check it before proceeding. Never assume it was written correctly.
2. **Check available skills**: Before writing articles, copy, or analyses, check if there is an applicable skill (`copywriting`, `keyword-research`, etc.) and use it. Also, if there is a skill for editing or designing web pages, use it whenever requested or when we want to audit the website's design.
3. **Check for clean code after editing**: After each file modification, verify that there is no duplicate code, misplaced code, or unnecessary elements. Remove redundant blocks, unnecessary CSS classes, unused variables, or obsolete configurations.

## Commands

| Action | Command |
|---|---|
| Dev server | `hugo server` |
| Production build | `hugo --gc --minify` |
| Create new content | `hugo new content <section>/<name>.md` |
| Update theme | `git submodule update --remote --merge` |

Build output should show 27 pages, 26 static files, 0 errors.

## Stack and Architecture

- **Hugo v0.161.0** (extended) + **Ananke** theme (Git submodule at `themes/ananke`).
- **Deployment**: GitHub Actions (`.github/workflows/hugo.yml`) → GitHub Pages. Triggered by a push to `main`.
- **Domain**: `bricoymadera.com` managed on Cloudflare (DNS → GitHub Pages).
- **No Node.js**: pure Hugo project, no `package.json` or JS build.
- **Color palette**: Cream (#FAF7F2), light wood (#E8DFD0), brown (#3D2B1F), forest green (#2D4739), amber (#C17F24).
- **Typography**: Lora (headings) + Inter (body) via Google Fonts.

## Critical Gotchas

### CSS Loading
- Ananke theme does NOT use `custom_css` from `params.toml`. Custom CSS must be linked directly in `layouts/_partials/head-additions.html` via `<link rel="stylesheet" href="/css/custom.css">`.
- Background pattern on `<body>` only works as an inline style in `layouts/baseof.html` (CSS class approach failed).

### Sticky Header
- CSS `position: sticky` does NOT work (Ananke theme interferes). Implementation uses JavaScript with `position: fixed` + a wrapper div (`ResizeObserver` updates wrapper height to prevent layout shift). See `head-additions.html`.

### Tachyons Overrides
- Ananke uses Tachyons CSS framework. Many utility classes (`.bg-black-80`, `.white-90`, `.white-80`, `.hover-white`) require overrides in `static/css/custom.css` with `!important` because Tachyons is loaded after custom CSS.
- `site.Params.author` must remain a string for Ananke compatibility.

### Inline Styles
- Many layout elements use inline styles because Tachyons utility classes were unreliable. If a style isn't taking effect, check if it's being overridden by Tachyons.

## Content Structure

```
content/
  herramientas/          → review/guide articles (main section)
    _index.md            → section list
    <article>.md        → individual posts
  sobre-mi/
    _index.md            → "About Us" page
  legal/                 → EU compliance pages
    aviso-legal.md
    politica-cookies.md
    politica-privacidad.md
```

- `mainSections = ['herramientas']` in `hugo.toml` controls what appears on the home page.
- Permalinks: `/herramientas/:slug/` for articles, `/:slug/` for sobre-mi, `/legal/:slug/` for legal.
- Taxonomies: `categories` and `tags`.

## Amazon Shortcode

All affiliate links use `{{< amazon url="..." text="..." >}}` (`layouts/shortcodes/amazon.html`).

- Required attributes: `rel="nofollow sponsored noopener"`, `target="_blank"`.
- **Never** place Amazon links directly in Markdown without the shortcode.
- Default text: `"Ver precio"`.

Product cards use `{{< producto url="..." img="..." title="..." >}}description{{< /producto >}}` (`layouts/shortcodes/producto.html`). Inline card: image left (200×200), text right, Amazon CTA button inside card.

## Images

- Location: `static/images/` (`.webp` format).
- Reference in content: absolute path `/images/filename.webp`.
- Names in descriptive `kebab-case`.
- `alt` text required for every image (in Spanish, descriptive).
- Logo: `static/images/logo.webp` (transparent background). Sized via `.site-nav .site-logo { height: 70px !important; }` in `custom.css`.

## Content Conventions

- **Language**: Spanish (es-es).
- **Frontmatter**: `title`, `date`, `draft`, `description`, `tags`, `categories`.
- **Dates**: `YYYY-MM-DDTHH:MM:SS+02:00` format. `buildFuture = false` — articles with future dates are not published.
- **Disclosure Note**: Every article containing affiliate links must include the Amazon Associates disclosure note near the beginning. Also displayed automatically in the footer via `params.amazon_disclosure`.
- **Tone**: Aimed at beginners, approachable, without unnecessary technical jargon.

## Legal Pages

Three EU-compliant pages exist in `content/legal/` with placeholder data (`[tu@email.com]`, `[Tu NIF/CIF]`, etc.). These need real data filled in before going live. Footer menu links to them via `menus.toml` `[[footer]]` entries.

## Footer

Custom `layouts/_partials/site-footer.html` (Ananke's default is NOT used):
- 3-column flex layout (site info + legal links).
- Amazon affiliate disclosure from `params.amazon_disclosure`.
- Copyright with dynamic year.
- Background `#3D2B1F`, text `#E8DFD0`.

## CI/CD

- Workflow: `.github/workflows/hugo.yml`
- Hugo is installed from `.deb` on every run (no cache).
- `submodules: recursive` is required to clone Ananke.
- Artifact: `./public` → GitHub Pages.
