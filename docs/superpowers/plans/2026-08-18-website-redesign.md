# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Also invoke **frontend-design:frontend-design** when building the visual system (Tasks 2–5).

**Goal:** Replace the Minimal Mistakes ML-tutorial-portfolio site with a bespoke, lean, typography-driven Jekyll site that positions Victor as a senior AI engineering leader + computational scientist — without changing Google Analytics or the deployment mechanism.

**Architecture:** Hand-authored Jekyll (5 layouts, ~7 includes, focused SCSS, tiny vanilla JS). Light "paper" default + automatic dark mode. New IA (Home · About · Engineering · Research · Publications · Writing · Archive). Old posts archived (URLs preserved). Static site, GitHub Pages native build from `master`. Work happens on branch `redesign`.

**Tech Stack:** Jekyll (kramdown, Rouge), SCSS, vanilla JS, `jekyll-sitemap` + `jekyll-feed`. Build/verify via Docker `jekyll/jekyll` image (no local Ruby). Browser QA via Chrome tools.

**Spec:** `docs/superpowers/specs/2026-08-18-website-redesign-design.md`

## Global Constraints

Copied verbatim from the spec. Every task implicitly includes these.

- **Google Analytics — DO NOT CHANGE.** `_config.yml` keeps `analytics.provider: "google-gtag"` and `analytics.google.tracking_id: G-V1261HE8C5`. The gtag snippet stays production-only (`jekyll.environment == 'production' and page.analytics != false`). Same ID, same wiring.
- **Site verification — keep.** `google_site_verification: G-V1261HE8C5` must still emit `<meta name="google-site-verification" content="G-V1261HE8C5">`.
- **Deployment unchanged.** Site stays a valid Jekyll site buildable by GitHub Pages from `master`. Only GitHub-Pages-supported plugins. No CI/Actions deploy added.
- **URLs preserved.** `permalink: /:categories/:title/` unchanged; all 21 existing `_posts` keep resolving. `url: https://victormurcia.github.io`, `baseurl: ""`.
- **No fabrication.** Titles, metrics, dates, and claims must be verifiable from repo / provided context / public sources. Unverified items render as marked placeholders (see spec §12) or are omitted.
- **No heavy deps.** No JS framework, no CSS framework, ≤2 web fonts.

## Reusable verification commands

**Production build (verifies GA snippet renders):**
```bash
docker run --rm -v "/$(pwd)":/srv/jekyll -w //srv/jekyll -e JEKYLL_ENV=production jekyll/jekyll:4 \
  sh -c "bundle install --quiet && bundle exec jekyll build --trace"
```
**Dev build (no analytics):** same without `-e JEKYLL_ENV=production`.
**Preview built output:** `python -m http.server 8080 --directory _site` then browse `http://localhost:8080`.
(On Windows Git Bash, the leading `/` on the volume path and `//srv` avoid MSYS path mangling. If the image tag `jekyll/jekyll:4` is unavailable, fall back to `jekyll/builder:4`.)

`_site/` is git-ignored (verify in Task 1). Never commit it.

---

## File Structure

**Created (bespoke theme):**
```
_layouts/
  default.html      # base: <html><head>…</head><body> skip-link + nav + <main> + footer + toggle JS
  home.html         # homepage: hero + 3 pillars + highlight (extends default)
  page.html         # standard content page; front-matter `reading: true` → serif measure column
  post.html         # archived post view (title, date, archive note, content, back link)
  archive.html      # archive index rendering (posts + certs + tags)
_includes/
  head.html         # charset, viewport, title/SEO, fonts, CSS, favicon, no-flash theme init, analytics
  seo.html          # description, canonical, OG, Twitter, JSON-LD Person, verification meta
  analytics.html    # gtag, production-only, ID G-V1261HE8C5 (verbatim)
  nav.html          # header: wordmark + nav links (aria-current) + GitHub/LinkedIn + theme toggle
  footer.html       # footer: links + copyright
  icons.html        # inline SVG symbols (github, linkedin, sun, moon) OR inline per-use
_sass/
  _tokens.scss      # CSS custom properties (light) + dark overrides
  _base.scss        # reset + base element styles
  _typography.scss  # font faces/stacks, type scale, reading measure
  _layout.scss      # container, spacing, section rhythm, grid
  _nav.scss         # header/nav/footer
  _components.scss  # pillars, eyebrow labels, publication list, archive list, buttons/links
assets/css/main.scss   # front-matter'd entry, @use/@import partials
assets/js/theme-toggle.js  # ~15 lines: toggle data-theme, persist localStorage
```
**Content pages (top-level, replace old):**
```
index.html   about.md   engineering.md   research.md
publications.md   writing.md   archive.html   404.html
```
**Modified:** `_config.yml`, `Gemfile`.
**Removed (dead Minimal Mistakes code — Task 13):** old `_layouts/*`, old `_includes/*` (except the bespoke ones), `_sass/minimal-mistakes*`, old `assets/css/main.scss`, `about.html`, `publications.html`, `certifications.html`, `contact.html`, `topics.html`, `posts.html`, `banner.js`, `staticman.yml`, `.travis.yml`, `Rakefile`, `minimal-mistakes-jekyll.gemspec`, `screenshot*.png`, MM `CHANGELOG.md`, MM `README.md`, MM `/docs` (keep `docs/superpowers/`), MM `/test`, `.github/workflows/bad-pr.yml`, `.github/ISSUE_TEMPLATE`, `.github/FUNDING.yml`, MM `_data/ui-text.yml` if unused.

---

## Phase 0 — Foundations

### Task 1: Build tooling + branch hygiene

**Files:**
- Modify: `Gemfile`
- Modify: `.gitignore` (ensure `_site/`, `.jekyll-cache/`, `.bundle/`, `vendor/` ignored)

- [ ] **Step 1: Replace the theme-gemspec Gemfile with a plain Jekyll Gemfile.** The old `Gemfile` uses `gemspec` (the MM gemspec, which Task 13 deletes). Write:
```ruby
source "https://rubygems.org"
gem "jekyll", "~> 4.3"
group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-feed"
end
# Windows/JRuby timezone + faster watch
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "wdm", "~> 0.1", platforms: [:mingw, :mswin, :x64_mingw]
```
- [ ] **Step 2: Ensure `.gitignore` ignores build artifacts.** Confirm these lines exist (add if missing): `_site/`, `.jekyll-cache/`, `.jekyll-metadata`, `.bundle/`, `vendor/`.
- [ ] **Step 3: Verify the *current* site still builds in Docker** (baseline, before changes). Run the dev build command. Expected: completes, writes `_site/`. This confirms Docker + the toolchain work before we start replacing files. (MM may emit warnings; a clean exit is success.)
- [ ] **Step 4: Commit.**
```bash
git add Gemfile .gitignore
git commit -m "chore: plain Jekyll Gemfile + ignore build artifacts"
```

### Task 2: Design tokens + base + typography SCSS

**Files:**
- Create: `assets/css/main.scss`, `_sass/_tokens.scss`, `_sass/_base.scss`, `_sass/_typography.scss`, `_sass/_layout.scss`
- Test: production/dev build renders `assets/css/main.css` with no Sass errors.

**Interfaces:**
- Produces: CSS custom properties `--paper --surface --ink --muted --hairline --accent --accent-ink` (+ dark overrides); utility classes `.container`, `.eyebrow`, `.measure`; font stacks `--font-sans`, `--font-mono`, `--font-serif`.

- [ ] **Step 1: Create `assets/css/main.scss`** (front matter required so Jekyll compiles it):
```scss
---
---
@import "tokens";
@import "base";
@import "typography";
@import "layout";
@import "nav";
@import "components";
```
- [ ] **Step 2: Create `_sass/_tokens.scss`** with light defaults on `:root`, dark under `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and an explicit `:root[data-theme="dark"]` block so the manual toggle wins both ways. Use the spec §6 palette:
```scss
:root {
  --paper:#fbfbf9; --surface:#ffffff; --ink:#17171a; --muted:#5b5b63;
  --hairline:#e6e5e0; --accent:#1f4fb0; --accent-ink:#173a80;
  --font-sans:"Space Grotesk", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  --font-mono:"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --font-serif:"Iowan Old Style", "Charter", Georgia, "Times New Roman", serif;
  --measure:66ch; --container:min(92vw, 1080px);
}
:root:not([data-theme="light"]) { @media (prefers-color-scheme: dark) {
  --paper:#101013; --surface:#17171b; --ink:#ececef; --muted:#a1a1ab;
  --hairline:#2a2a30; --accent:#7aa2ff; --accent-ink:#9db9ff; }
}
:root[data-theme="dark"] {
  --paper:#101013; --surface:#17171b; --ink:#ececef; --muted:#a1a1ab;
  --hairline:#2a2a30; --accent:#7aa2ff; --accent-ink:#9db9ff;
}
```
- [ ] **Step 3: Create `_sass/_base.scss`** — modern reset (`box-sizing:border-box`, `margin:0`), `html{color-scheme:light dark}`, `body{background:var(--paper);color:var(--ink);font-family:var(--font-sans);line-height:1.6;-webkit-font-smoothing:antialiased}`, `img{max-width:100%;height:auto}`, links use `--accent`, visible `:focus-visible` outline (2px `--accent`), `@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`, skip-link styles.
- [ ] **Step 4: Create `_sass/_typography.scss`** — fluid type scale with `clamp()` (h1 ~`clamp(2rem,5vw,3.25rem)`, down to small), tight heading `letter-spacing`, `.eyebrow{font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.12em;font-size:.75rem;color:var(--muted)}`, `.measure{max-width:var(--measure)}`, and a `.reading` context that sets body copy in `var(--font-serif)` at comfortable size/leading.
- [ ] **Step 5: Create `_sass/_layout.scss`** — `.container{width:var(--container);margin-inline:auto;padding-inline:1.25rem}`, vertical section rhythm, a responsive pillars grid (`display:grid;gap` with `grid-template-columns:repeat(auto-fit,minmax(220px,1fr))`), hairline `<hr>`/rule helpers.
- [ ] **Step 6: Verify build.** Dev build; confirm `_site/assets/css/main.css` exists and is non-empty, no Sass errors in output.
- [ ] **Step 7: Commit.** `git add assets/css/main.scss _sass/_tokens.scss _sass/_base.scss _sass/_typography.scss _sass/_layout.scss && git commit -m "feat: design tokens, base, typography, layout SCSS"`

### Task 3: Base layout + head + SEO + analytics (GA PRESERVED)

**Files:**
- Create: `_layouts/default.html`, `_includes/head.html`, `_includes/seo.html`, `_includes/analytics.html`
- Test: production build; grep generated HTML for the exact GA ID and verification meta.

**Interfaces:**
- Produces: `default` layout consumed by all pages; `{{ content }}` slot; body carries `<main id="content">`.

- [ ] **Step 1: Create `_includes/analytics.html`** — VERBATIM, do not alter values:
```liquid
{% if jekyll.environment == 'production' and site.analytics.provider and page.analytics != false %}
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{ site.analytics.google.tracking_id }}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '{{ site.analytics.google.tracking_id }}', { 'anonymize_ip': {{ site.analytics.google.anonymize_ip | default: false }}});
</script>
{% endif %}
```
- [ ] **Step 2: Create `_includes/seo.html`** — emit, using `page.title`/`page.description`/`site.description`:
  - `<title>` = page title + " · Victor Murcia" (home = site title).
  - `<meta name="description">`, `<link rel="canonical" href="{{ page.url | absolute_url }}">`.
  - OG: `og:type` (article if `page.date` else website), `og:site_name`, `og:title`, `og:url`, `og:description`, `og:image` = `page.image | default: site.og_image | absolute_url`.
  - Twitter: `summary_large_image`, title/description/image.
  - JSON-LD `Person`: name, url (`site.url`), jobTitle "AI Engineering Leader" [refine], worksFor Datacor, alumniOf (WSU, RIT), `sameAs` = `site.social.links`.
  - Verification: `{% if site.google_site_verification %}<meta name="google-site-verification" content="{{ site.google_site_verification }}">{% endif %}`.
- [ ] **Step 3: Create `_includes/head.html`** — `<meta charset>`, viewport, `{% include seo.html %}`, favicon link, Google Fonts `preconnect` + one stylesheet link for Space Grotesk + IBM Plex Mono (`display=swap`), `<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">`, atom feed link, then the **no-flash theme init** inline script:
```html
<script>(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
```
  and finally `{% include analytics.html %}`.
- [ ] **Step 4: Create `_layouts/default.html`**:
```html
<!doctype html>
<html lang="en" class="no-js">
<head>{% include head.html %}</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  {% include nav.html %}
  <main id="content">{{ content }}</main>
  {% include footer.html %}
  <script src="{{ '/assets/js/theme-toggle.js' | relative_url }}" defer></script>
</body>
</html>
```
  (nav/footer/toggle created in Task 4 — build after Task 4, or stub the includes now to keep the build green.)
- [ ] **Step 5: Temporarily stub** `_includes/nav.html` and `_includes/footer.html` as empty files and `assets/js/theme-toggle.js` as `// todo` so the build is green; real versions in Task 4.
- [ ] **Step 6: Production build + verify GA + verification meta.** Run the production build, then:
```bash
grep -r "G-V1261HE8C5" _site/index.html
grep -r "googletagmanager.com/gtag/js?id=G-V1261HE8C5" _site/index.html
grep -r 'name="google-site-verification" content="G-V1261HE8C5"' _site/index.html
```
Expected: all three match. Then a **dev** build and confirm the gtag `<script>` is ABSENT (production-only guard works).
- [ ] **Step 7: Commit.** `git add _layouts/default.html _includes/head.html _includes/seo.html _includes/analytics.html _includes/nav.html _includes/footer.html assets/js/theme-toggle.js && git commit -m "feat: base layout, head, SEO, and GA-preserving analytics include"`

### Task 4: Nav, footer, theme toggle

**Files:**
- Modify: `_includes/nav.html`, `_includes/footer.html`, `assets/js/theme-toggle.js`
- Create: `_sass/_nav.scss`
- Test: build; nav renders links + `aria-current`; toggle button present.

**Interfaces:**
- Consumes: `site.data.navigation` OR an inline nav list; `site.author.links`.
- Produces: `.site-header`, `.site-footer`, `[data-theme-toggle]` button.

- [ ] **Step 1: Define nav items.** Use `_data/navigation.yml` `main:` list rewritten to: About `/about/`, Engineering `/engineering/`, Research `/research/`, Publications `/publications/`, Writing `/writing/`, Archive `/archive/`. (Home reachable via the wordmark.)
- [ ] **Step 2: Write `_includes/nav.html`** — semantic `<header class="site-header"><a class="wordmark" href="/">Victor&nbsp;Murcia</a><nav aria-label="Primary">…</nav></header>`. Loop nav items; add `aria-current="page"` when `item.url == page.url`. Add GitHub + LinkedIn inline SVG icon links (from `_config.yml` author links) and a `<button data-theme-toggle aria-label="Toggle dark mode">` with sun/moon SVG.
- [ ] **Step 3: Write `_includes/footer.html`** — `<footer class="site-footer">` with GitHub/LinkedIn/arXiv links, `© {{ site.time | date: '%Y' }} Victor Murcia`, and a "Built with Jekyll" line optional.
- [ ] **Step 4: Write `assets/js/theme-toggle.js`**:
```js
document.documentElement.classList.remove('no-js');
const btn = document.querySelector('[data-theme-toggle]');
if (btn) btn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : (cur === 'light' ? 'dark'
      : (matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark'));
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});
```
- [ ] **Step 5: Write `_sass/_nav.scss`** — sticky-ish header with hairline bottom border, flex layout (wordmark left, nav right), mono-ish nav links with accent underline on hover/current, responsive wrap on small screens, footer styles. Icon buttons sized ~1.1rem, adequate tap targets (≥40px).
- [ ] **Step 6: Build + verify.** Dev build; grep `_site/index.html` for `Primary`, wordmark, and `data-theme-toggle`. Preview in browser: nav visible, toggle switches light/dark, no console errors.
- [ ] **Step 7: Commit.** `git add _includes/nav.html _includes/footer.html assets/js/theme-toggle.js _sass/_nav.scss _data/navigation.yml && git commit -m "feat: header nav, footer, theme toggle"`

---

## Phase 1 — Pages & content

> Content details come from spec §7. Copy must stay understated/evidence-driven (spec Tone). Pending-verification facts (spec §12) render as clearly-marked notes, never invented.

### Task 5: Home

**Files:**
- Create: `_layouts/home.html`; Modify: `index.html`
- Create: `_sass/_components.scss` (pillars, eyebrow, hero, CTA links)
- Test: build; homepage shows H1, role line, 3 pillars, links.

- [ ] **Step 1: `_layouts/home.html`** extends default via `layout: default` front matter; structure: `<section class="hero">` (eyebrow "Victor Murcia, PhD", `<h1>` positioning name, role line `AI Engineering · Scientific Computing · Technical Leadership`, 2–3 sentence statement, primary links GitHub/LinkedIn/Research), then `{{ content }}` for pillars, then a compact research/work highlight block.
- [ ] **Step 2: `index.html`** — front matter `layout: home`, `title: Victor Murcia`, description (identity keywords, natural). Body = three pillars markup:
  1. **AI Systems & Engineering** → `/engineering/`
  2. **Scientific Research** → `/research/`
  3. **Technical Leadership** → `/about/`
  Each: mono eyebrow number (`01`), heading, 1–2 sentence description, arrow link. Plus a one-line research highlight linking the PRL work.
- [ ] **Step 3: `_sass/_components.scss`** — `.hero` spacing, `.pillars` grid (uses layout grid), `.pillar` with hairline top rule + eyebrow number, `.cta`/`.arrow-link` styles, `.highlight` block.
- [ ] **Step 4: Build + browser QA.** Home renders; check mobile (pillars stack) + desktop, light + dark. Screenshot both.
- [ ] **Step 5: Commit.** `git add _layouts/home.html index.html _sass/_components.scss && git commit -m "feat: bespoke homepage (hero + pillars + highlight)"`

### Task 6: About

**Files:**
- Create: `about.md` (replaces `about.html` in Task 13); Modify: `_layouts/page.html` (create here)
- Test: build; `/about/` renders narrative + education + photo.

- [ ] **Step 1: Create `_layouts/page.html`** — `layout: default`; renders a page header (eyebrow + `<h1>{{ page.title }}</h1>` + optional `page.lede`), then a content column; if `page.reading` is true, wrap `{{ content }}` in `<div class="reading measure">` (serif). Otherwise `<div class="measure">`.
- [ ] **Step 2: Write `about.md`** — front matter `layout: page`, `title: About`, `reading: true`, `permalink: /about/`, description. Body (Markdown): the coherent-arc narrative (spec §7 About), framed as expanding the radius of solvable problems; a short Education subsection (PhD MSE, WSU 2022 — computational physics/chemistry; B.S. Chemistry, RIT 2014, minors Math + Philosophy); current role line "Lead AI Engineer at Datacor" with an HTML comment `<!-- VERIFY: exact title/date -->`; the synchrotron photo `/img/about pic.png` with descriptive alt; contact = LinkedIn + GitHub (no email until confirmed — HTML comment noting the `@wsu.edu` removal).
- [ ] **Step 3: Build + browser QA.** `/about/` renders; serif reading column; photo loads; measure ~66ch. Light/dark.
- [ ] **Step 4: Commit.** `git add about.md _layouts/page.html && git commit -m "feat: About page + page layout"`

### Task 7: Engineering

**Files:** Create: `engineering.md`
- [ ] **Step 1: Write `engineering.md`** — `layout: page`, `title: AI Systems & Engineering`, `permalink: /engineering/`, `reading: true`, description with keywords. Body: intro paragraph; "Areas of work" list (spec §7 Engineering themes) as a clean definition-style list (term + one line), NOT cards/skill-bars; "Selected work" list linking public repos with one-line each: **ChemNER**, **PyUMLS_Similarity2**, **Clinical-Trial-Semantic-Structure-Visualizer**, **DFT-Clustering** (GitHub URLs). Explicit line: no confidential Datacor/customer detail. Understated.
- [ ] **Step 2: Build + QA.** Repo links resolve to `github.com/victormurcia/<repo>`. Light/dark.
- [ ] **Step 3: Commit.** `git add engineering.md && git commit -m "feat: AI Systems & Engineering page"`

### Task 8: Research

**Files:** Create: `research.md`
- [ ] **Step 1: Write `research.md`** — `layout: page`, `title: Research`, `permalink: /research/`, `reading: true`. Body: lead featuring the PRL paper (title, authors, arXiv:2509.01734 link) with an accessible explanation of the contribution pipeline (spec §7 Research): first-principles DFT → dimensionality reduction / clustering → physically interpretable representation → experimental refinement → quantitative optical tensors → molecular orientation & nanostructure; note it addresses a longstanding limitation in quantitative RSoXS/NEXAFS analysis; `<!-- VERIFY: PRL acceptance + DOI pending -->`. Then subsections: **Medical & clinical AI** (VA / MAVERIC / National AI Institute; Harvard MRCAS) with `<!-- VERIFY: roles/dates/one-line -->` and only supportable claims; **Earlier work** (organic solar cells / X-ray spectroscopy) summarized, linking Publications.
- [ ] **Step 2: Build + QA.** Renders; arXiv link correct. Light/dark.
- [ ] **Step 3: Commit.** `git add research.md && git commit -m "feat: Research page (PRL work featured)"`

### Task 9: Publications

**Files:** Create: `publications.md`
- [ ] **Step 1: Write `publications.md`** — `layout: page`, `title: Publications`, `permalink: /publications/`, description. Body: two headed groups. **Preprints / In press:** PRL paper — *"Quantitative and bond-traceable resonant X-ray optical tensors of organic molecules"* · Murcia, Alqahtani, Heilman, Collins · accepted, *Physical Review Letters* · [arXiv:2509.01734](https://arxiv.org/abs/2509.01734) · `<!-- DOI pending -->`. **Peer-reviewed** (most-recent first) — the 6 existing papers with their exact existing DOIs/links copied from the old `publications.html` (Small 2022, ACS AMI 2021, JPC Lett 2021, JPC C 2017, Sol. Energy Mater. 2013, Nanotech 2013). Semantic `<ol>`/list; venue · date · link each. No invented metadata.
- [ ] **Step 2: Build + QA.** All 7 links resolve; formatting consistent.
- [ ] **Step 3: Commit.** `git add publications.md && git commit -m "feat: Publications page (adds PRL, keeps peer-reviewed list)"`

### Task 10: Writing (placeholder)

**Files:** Create: `writing.md`
- [ ] **Step 1: Write `writing.md`** — `layout: page`, `title: Writing`, `permalink: /writing/`, `reading: true`. Body: one short intro paragraph + a list of intended topics (spec §7 Writing). Explicit "No essays published yet." No fake posts.
- [ ] **Step 2: Build + QA + Commit.** `git add writing.md && git commit -m "feat: Writing placeholder page"`

### Task 11: Archive + post layout (URLs preserved)

**Files:**
- Create: `archive.html`, `_layouts/post.html`
- Test: build; `/archive/` lists all 21 posts; a sample post URL still resolves.

- [ ] **Step 1: Create `_layouts/post.html`** — `layout: default`; renders `<article class="reading measure">`: eyebrow date, `<h1>{{ page.title }}</h1>`, a subtle "From earlier work · archived" note linking `/archive/`, `{{ content }}`, and a back-to-archive link. Keep it readable for old ML posts (code blocks, images).
- [ ] **Step 2: Set post default layout.** In `_config.yml` `defaults`, set posts to `layout: post` (replacing MM `single`). Verify posts pick it up.
- [ ] **Step 3: Write `archive.html`** — `layout: page`, `title: Archive`, `permalink: /archive/`. Honest framing paragraph (earlier/foundational ML & data-science work). Then: list `site.posts` (title + date, linking each `post.url`) newest-first; a **Certifications** subsection (port the DataCamp list from `certifications.html`, plus Deep Learning Specialization, Coursera 2023); a link to the tag index `/tags/` (or inline the topics list). No pagination needed.
- [ ] **Step 4: Build + verify URL preservation.** Build; confirm a known post path exists in `_site`, e.g. `_site/2022/08/...` matching `/:categories/:title/` — pick one post, note its output path in dev build, confirm it renders with `post` layout. Confirm `/archive/` lists 21 entries.
- [ ] **Step 5: Commit.** `git add archive.html _layouts/post.html _config.yml && git commit -m "feat: Archive page + post layout; preserve post URLs"`

### Task 12: 404 + config finalization + SEO data

**Files:** Create: `404.html`; Modify: `_config.yml`
- [ ] **Step 1: Create `404.html`** — `layout: default`, `permalink: /404.html`, simple centered message + link home. (GitHub Pages serves it automatically.)
- [ ] **Step 2: Update `_config.yml` metadata** (LEAVE analytics + `google_site_verification` untouched):
  - `subtitle` / `description`: new positioning (identity keywords, natural).
  - `author.email`: `<!-- pending -->` — remove `victor.murcia@wsu.edu`; leave blank or comment until confirmed.
  - Populate `social.links` (→ JSON-LD `sameAs`): GitHub `https://github.com/victormurcia`, LinkedIn `https://www.linkedin.com/in/vmmr5596/`, arXiv author page (and ORCID `<!-- VERIFY -->` if provided).
  - `og_image`: point to a real image (Task added below or reuse `/img/home.jpg` initially).
  - Trim plugins to `jekyll-sitemap`, `jekyll-feed` (drop `jekyll-paginate`, `jekyll-gist`, `jekyll-include-cache`) and matching `whitelist`. Verify nothing references removed plugins.
- [ ] **Step 3: (Optional) Add an OG image** — a clean type-based 1200×630 card (name + role line, paper/ink). If produced, save `/img/og-card.png` and set `og_image`. If deferred, use `/img/home.jpg` and note as a follow-up. (No stock art.)
- [ ] **Step 4: Build + verify.** Production build; confirm JSON-LD `sameAs` array now populated; sitemap + feed generate; GA + verification STILL present (re-run Task 3 greps).
- [ ] **Step 5: Commit.** `git add 404.html _config.yml img/og-card.png && git commit -m "feat: 404, SEO metadata, sameAs, trimmed plugins"`

---

## Phase 2 — Cleanup & QA

### Task 13: Remove dead Minimal Mistakes code

**Files:** Delete the MM files listed in **File Structure → Removed**.
- [ ] **Step 1: Delete MM layouts/includes/sass not in the bespoke set.** Remove old `_layouts/*` except `default/home/page/post/archive`; remove old `_includes/*` except `head/seo/analytics/nav/footer/icons`; remove `_sass/minimal-mistakes*` and old `assets/css/main.scss` (the MM one — ensure the bespoke `assets/css/main.scss` remains).
- [ ] **Step 2: Delete replaced top-level pages + boilerplate:** `about.html`, `publications.html`, `certifications.html`, `contact.html`, `topics.html`, `posts.html`, `banner.js`, `staticman.yml`, `.travis.yml`, `Rakefile`, `minimal-mistakes-jekyll.gemspec`, `screenshot.png`, `screenshot-layouts.png`, MM `CHANGELOG.md`, MM `README.md`, MM `/docs` (KEEP `docs/superpowers/`), MM `/test`, `.github/workflows/bad-pr.yml`, `.github/ISSUE_TEMPLATE`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/FUNDING.yml`. Check `_data/ui-text.yml` — delete if unreferenced.
- [ ] **Step 3: Write a short new `README.md`** — what the site is, how to build (`docker` command), where the spec/plan live.
- [ ] **Step 4: Full production build — must be clean.** Run production build; expect success with no missing-include/missing-layout errors. Grep for any lingering `{% include %}` to deleted partials. Re-run GA greps.
- [ ] **Step 5: Commit.** `git add -A && git commit -m "chore: remove Minimal Mistakes theme; add project README"`

### Task 14: Full QA, link check, accessibility, summary

**Files:** none (verification) — fix-forward as needed.
- [ ] **Step 1: Production build → serve `_site` → browser QA matrix.** Every page (Home, About, Engineering, Research, Publications, Writing, Archive, one Post, 404) × {mobile 390px, desktop 1280px} × {light, dark}. Screenshot key pages. Fix layout/contrast issues.
- [ ] **Step 2: Link check.** Verify internal nav links, the 4 GitHub repo links, 7 publication links, arXiv link, and a sample of the 21 preserved post URLs. Use a Node/Python link check over `_site` for internal links; spot-check external.
- [ ] **Step 3: Accessibility pass.** One `<h1>` per page; landmarks present; `aria-current` on nav; focus-visible outlines; skip-link works; AA contrast in both themes; images have alt; `prefers-reduced-motion` honored.
- [ ] **Step 4: SEO/analytics final check.** Production `_site`: GA `G-V1261HE8C5` gtag present on multiple pages; `google-site-verification` meta present; canonical + OG + JSON-LD `Person` valid; sitemap.xml + feed.xml present.
- [ ] **Step 5: Commit any fixes.** `git add -A && git commit -m "fix: QA pass (a11y, links, responsive, SEO)"`
- [ ] **Step 6: Write final summary** for the user: what changed, key design decisions, content moved/removed, the pending-verification list (spec §12), and recommended next improvements. Leave the branch for the user to review/merge to `master`.

---

## Self-Review

**Spec coverage:** §1 objective → Home/About copy (T5/T6). §4 IA/nav → T4 nav + T5–T11 pages. §5 disposition → T6–T11 + T13 removals. §6 visual system → T2/T4/T5 SCSS + fonts. §7 page specs → T5–T11. §8 architecture → T3/T4 layouts+includes, structure map. §9 SEO → T3 seo.html + T12 config. §10 a11y/perf → T2 base + T14. §11 build/verify → Docker commands + per-task builds + T14. §12 pending-verification → carried as marked notes in T6/T8/T12 + surfaced in T14 summary. §13 success criteria → T14 QA. **No gaps found.**

**Placeholder scan:** The only intentional placeholders are the spec §12 verification items, rendered as visible HTML comments/notes by design (never invented facts). No "TBD/handle edge cases" hand-waves in steps.

**Type/naming consistency:** Layout names (`default/home/page/post/archive`) consistent across tasks; include names (`head/seo/analytics/nav/footer`) consistent; CSS token names consistent between `_tokens.scss` (T2) and usage; `data-theme` attribute + `[data-theme-toggle]` selector consistent between head no-flash script (T3), toggle JS (T4), and tokens (T2). GA ID `G-V1261HE8C5` identical in analytics include + all verification greps.
