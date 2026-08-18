# Victor Murcia — Personal Site Redesign & Rebrand

**Date:** 2026-08-18
**Status:** Approved design (in-chat), ready for implementation plan
**Repo:** `victormurcia/victormurcia.github.io` (GitHub Pages, `master`)

---

## 1. Objective

Reposition the site from a 2022 data-science-tutorial portfolio to the site of a
**senior AI engineering leader and computational scientist**. The 60-second
impression for a CTO / Chief AI Officer / recruiter / senior engineer must be:

> "An unusually technical AI leader with genuine scientific depth who turns
> difficult problems into real systems."

Not: "a data scientist with a collection of ML portfolio projects."

Positioning line:

> Victor Murcia, PhD — AI Engineering · Scientific Computing · Technical Leadership.
> I build and lead production AI systems for complex scientific and enterprise problems.

## 2. Goals / Non-goals

**Goals**
- Bespoke, lean, typography-driven design (light "paper" default + automatic dark mode).
- New information architecture that makes an unusual career read as coherent.
- Elevate research (esp. the Physical Review Letters work) and modern production AI work.
- Archive — do not delete — the beginner ML tutorials and intro certs.
- Strong, honest SEO/metadata. **Preserve Google Analytics + deployment exactly.**
- Accessible (WCAG AA), responsive, fast.

**Non-goals**
- No custom domain change (stays `victormurcia.github.io`).
- No new build system / no CI deploy pipeline (keep GitHub Pages native build).
- No CMS, no heavy JS framework, no large dependencies.
- No fabricated accomplishments, metrics, titles, or testimonials.

## 3. Hard constraints (do not break)

| Constraint | Detail |
|---|---|
| **Google Analytics** | `_config.yml → analytics.google.tracking_id: G-V1261HE8C5`, provider `google-gtag`, production-only guard. Must remain, same ID, same wiring. |
| **Site verification** | `google_site_verification: G-V1261HE8C5` emitted as `<meta name="google-site-verification">`. Keep. |
| **Deployment** | GitHub Pages native Jekyll build from `master`. No Actions build. Site must remain a valid Jekyll site buildable by GitHub Pages (supported plugins only). |
| **Post permalinks** | `permalink: /:categories/:title/`. Existing post URLs must keep resolving (inbound links + SEO). |
| **Canonical URL / base** | `url: https://victormurcia.github.io`, `baseurl: ""`. Unchanged. |

## 4. Information architecture

Top nav (7): **Home · About · Engineering · Research · Publications · Writing · Archive**
GitHub + LinkedIn as persistent icon links in header and footer.

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Establish who he is now in ~15s: name, role line, 2–3 sentence statement, 3 pillars, links out. |
| `/about/` | About | Coherent-arc narrative, education, one authentic photo, honest contact. |
| `/engineering/` | AI Systems & Engineering | Areas of production AI work + selected public repos. Capabilities, no confidential detail. |
| `/research/` | Research | PRL work featured + accessible explanation; medical/clinical/robotics AI; prior spectroscopy summarized. |
| `/publications/` | Publications | Clean scholarly list; peer-reviewed vs preprint; DOIs/arXiv. |
| `/writing/` | Writing | Intentional placeholder: intro + planned essay topics. No fake posts. |
| `/archive/` | Archive | 2022 ML tutorials + intro certs + tag index, framed as earlier/foundational work. |

**Removed from nav (folded into Archive):** Topics (tag index), Certifications.
**Simplified:** Contact → About section + footer links (drop the FormKeep third-party embed).

## 5. Content disposition

| Existing | Action | Notes |
|---|---|---|
| `index.html` | REWRITE | New home layout: hero + 3 pillars + research/work highlight. |
| `about.html` | REWRITE | New narrative; replace `victor.murcia@wsu.edu`; keep synchrotron photo (`/img/about pic.png`). |
| `publications.html` | REWRITE | Add PRL paper on top; keep 6 existing papers with DOIs; label peer-reviewed vs preprint. |
| `_posts/*` (21 tutorials) | KEEP + MOVE | Files stay (URLs preserved); listed under Archive, not featured. |
| `certifications.html` | MOVE → Archive | Reframed "earlier training." Keep the more credible Deep Learning Specialization (Coursera, 2023) surfaced on About/Engineering. |
| `topics.html` | MERGE → Archive | Tag index reachable from Archive. |
| `contact.html` | SIMPLIFY/REMOVE | Replace FormKeep embed with direct links; route contact via About + footer. |
| `posts.html` | REPURPOSE | Becomes the Archive listing (or replaced by `archive.html`). |
| Minimal Mistakes theme files | REPLACE/REMOVE | Bespoke `_layouts`, `_includes`, `_sass`, `assets/css`. Remove dead MM partials safely once nothing references them. |

## 6. Visual system — "technical publication"

- **Modes:** light default; dark via `prefers-color-scheme` + a small manual toggle persisted in `localStorage`. AA contrast both.
- **Color tokens (proposed):**
  - Light: paper `#fbfbf9`, surface `#ffffff`, ink `#17171a`, muted `#5b5b63`, hairline `#e6e5e0`, accent `#1f4fb0` (deep ink-blue; spectral-teal `#0f766e` held in reserve).
  - Dark: bg `#101013`, surface `#17171b`, ink `#ececef`, muted `#a1a1ab`, hairline `#2a2a30`, accent `#7aa2ff`.
- **Typography:** three roles, but only **two web fonts** for speed —
  - **Sans (web font):** headings + UI (a grotesque, e.g. Space Grotesk / Inter).
  - **Mono (web font):** eyebrow labels & metadata (`01 / RESEARCH`) (e.g. IBM Plex Mono / JetBrains Mono).
  - **Serif (system stack, no web font):** long-form reading column on About/Research (e.g. `"Iowan Old Style", Charter, Georgia, "Times New Roman", serif`).
  - `display=swap`, `preconnect`, full system fallbacks. Final family names chosen at implementation; the role split is fixed.
- **Layout:** minimal top nav with wordmark; ~66ch reading measure; generous whitespace; **lists over cards**; hairline rules; near-zero motion (`prefers-reduced-motion`). No gradients, no glow, no neural imagery, no skill bars, no tech-logo walls.

## 7. Page content specs

**Home** — H1 name; role line (AI Engineering · Scientific Computing · Technical Leadership); 2–3 sentence statement; three pillars:
1. **AI Systems & Engineering** — production LLM systems, document intelligence, agentic workflows, evaluation/reliability. → `/engineering/`
2. **Scientific Research** — first-principles computation + ML; PRL optical-tensor work. → `/research/`
3. **Technical Leadership** — architecting and leading production AI across enterprise & scientific software. → `/about/`
Plus one compact "selected work / research highlight" and GitHub/LinkedIn.

**About** — narrative arc: physical chemistry → computational physics / materials science → scientific ML → medical & federal AI research → production AI engineering → enterprise/scientific AI → technical leadership. Framed as *expanding the radius of solvable problems*, not switching fields. Education: PhD Materials Science & Engineering, WSU 2022 (computational physics/chemistry); B.S. Chemistry, RIT 2014 (minors Mathematics, Philosophy). Current: Lead AI Engineer, Datacor [TITLE/DATE — VERIFY]. Understated, evidence-driven.

**Engineering** — intro paragraph; areas of work (production LLM systems; document/multimodal intelligence; RAG/knowledge systems; agentic workflows; AI evaluation & reliability; scientific AI; enterprise AI architecture; forward-deployed engineering; AI integrated into scientific/technical software). Selected public work with GitHub links: **ChemNER** (chemical NER / scientific document intelligence), **PyUMLS_Similarity2** (UMLS semantic similarity / clinical NLP), **Clinical-Trial-Semantic-Structure-Visualizer** (medical concept extraction), **DFT-Clustering** (research tooling). No confidential Datacor/customer detail.

**Research** — feature PRL paper: *"Quantitative and bond-traceable resonant X-ray optical tensors of organic molecules"* (Murcia, Alqahtani, Heilman, Collins; arXiv:2509.01734). Accessible explanation of the contribution pipeline: complex first-principles DFT → dimensionality reduction / clustering → physically interpretable representation → experimental refinement → quantitative optical tensors → improved modeling of molecular orientation & nanostructure; states it addresses a longstanding limitation in quantitative RSoXS/NEXAFS analysis. Sections for medical AI / clinical NLP / robotics research (VA / MAVERIC / National AI Institute; Harvard MRCAS) [DETAILS — VERIFY], and a summary of prior organic-solar-cell / X-ray spectroscopy work.

**Publications** — top: PRL paper (peer-reviewed, accepted; arXiv link; DOI *pending*). Then the 6 existing papers (peer-reviewed) with existing DOIs, most-recent first. Group headings: *Peer-reviewed* / *Preprints*. No invented metadata.

**Writing** — one short intro paragraph + a list of intended topics (reliable production AI; AI evaluation; agent architecture; document intelligence; forward-deployed AI engineering; scientific AI; AI-native scientific software; moving from computational physics to AI engineering). Explicitly no posts yet.

**Archive** — short honest framing ("earlier work — foundational ML/data-science projects and coursework"); list of the 21 tutorial posts (links preserved); the DataCamp certifications; link to the tag index.

## 8. Technical architecture (bespoke Jekyll)

New/lean structure (replacing Minimal Mistakes):

```
_layouts/     default.html, home.html, page.html, post.html, archive.html
_includes/    head.html, seo.html, analytics.html, nav.html, footer.html, theme-toggle.html, icons
_sass/        _tokens.scss, _base.scss, _typography.scss, _layout.scss, _nav.scss, _components.scss, _dark.scss
assets/css/   main.scss  (front-matter'd, @imports partials)
assets/js/    theme-toggle.js  (tiny; no framework)
```

- `default.html` wraps `<head>` (calls `head.html` → `seo.html` + `analytics.html`), header nav, `<main>`, footer.
- **`analytics.html`** re-implements the gtag snippet with `{{ site.analytics.google.tracking_id }}`, guarded by `jekyll.environment == 'production' and page.analytics != false`. Same ID, same behavior.
- **`seo.html`** emits per-page `<title>`, description, canonical, OpenGraph (with real `og_image`), Twitter card, and JSON-LD `Person` with `sameAs` = [GitHub, LinkedIn, arXiv/ORCID]. Keeps `google-site-verification` meta. Optional `ScholarlyArticle` JSON-LD on Publications.
- Pages authored as top-level `.html`/`.md` with front-matter `layout` + `permalink`. Posts render via `post.html`.
- `_config.yml`: update `subtitle`/`description`, `author.email`, populate `social.links` (→ `sameAs`), set `og_image`. **Leave analytics + verification untouched.** Trim MM-only plugins (`jekyll-gist`, `jekyll-include-cache`) and paginate if unused; **keep `jekyll-sitemap`, `jekyll-feed`.**
- Add `404.html`. Keep `favicon`/`img` assets that are still used.

## 9. SEO / metadata plan

- Per-page titles + meta descriptions; canonical URLs.
- OpenGraph + Twitter card with a real branded OG image (clean type-based card; no stock art).
- JSON-LD `Person` (name, url, jobTitle, worksFor, alumniOf, `sameAs`).
- `jekyll-sitemap` sitemap + `jekyll-feed` atom feed retained.
- Natural use of identity keywords (AI Engineering, Scientific AI, Scientific Computing, Computational Physics, Enterprise AI, Forward Deployed Engineering, LLM Systems, Physical Review Letters). No keyword stuffing.
- Preserve post URLs; add `301`-equivalent handling only if a URL must change (prefer not changing any).

## 10. Accessibility & performance

- Semantic HTML5 landmarks (`header/nav/main/article/footer`), one `<h1>` per page, logical heading order.
- Skip-to-content link, visible focus states, `aria-current` on nav, labelled theme toggle.
- Color contrast AA in both themes; `prefers-reduced-motion`; `prefers-color-scheme`.
- No render-blocking beyond one small CSS file + fonts with `display=swap`; defer/inline the tiny toggle JS; lazy-load non-critical images.

## 11. Build / verification

- Local build via `bundle exec jekyll build` (and `serve` for visual inspection). If Ruby/Bundler unavailable locally, verify config validity and rely on a clean build; document the gap.
- Manual visual QA at mobile + desktop widths, light + dark.
- Link-check internal nav + preserved post URLs.
- Confirm gtag snippet renders with `G-V1261HE8C5` in a production build.

## 12. Open items — PENDING VERIFICATION (do not fabricate)

1. **Datacor title + start date** — GitHub shows "Lead AI Engineer"; confirm exact wording/date.
2. **PRL status/DOI** — "accepted, *Physical Review Letters*" per author; publisher DOI marked *pending* until live.
3. **VA / MAVERIC / National AI Institute** and **Harvard MRCAS** — role titles, dates, one-line contribution each.
4. **Public contact email** — replacement for `@wsu.edu` (gmail? forwarding address? LinkedIn-only?). Default: LinkedIn + GitHub, no email published until confirmed.
5. **ORCID** — include in author structured data if available.

These render as tasteful, clearly-marked placeholders or are omitted — never invented.

## 13. Success criteria

- 60-second impression = "technical AI leader with scientific depth who ships real systems."
- PRL research and modern production AI work are prominent; tutorials archived, not deleted.
- GA (`G-V1261HE8C5`) fires unchanged in production; deployment unchanged; post URLs intact.
- Distinctive, restrained, typography-driven; excellent on mobile + desktop; AA accessible.
- Site builds cleanly on GitHub Pages.
