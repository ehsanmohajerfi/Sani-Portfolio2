# Ehsan Mohajer — Personal Portfolio

A personal portfolio for **ehsanmohajer.fi**, showcasing my software development, project work, mentoring and entrepreneurial journey in Jyväskylä, Finland.

Built with static HTML, CSS and JavaScript. No installation, dependencies or build step is required.

Repository: [ehsanmohajerfi/portfolio](https://github.com/ehsanmohajerfi/portfolio)

## Pages

- `index.html` — introduction, selected projects, professional experience and speaking invitations.
- `about.html` — professional background and working approach.
- `experience.html` — career history, entrepreneurship milestone and speaking invitations.
- `projects.html` — selected projects, contributions and project status.
- `my-story/index.html` — personal and entrepreneurial story, with English/Finnish content and media.
- `contact.html` — direct email, WhatsApp chat, consultation booking and business enquiries.

## Recent changes

### Branding and appearance

- Replaced the text header title with the SANI / Ehsan Mohajer logo on all pages.
- Added separate light and dark logo assets.
- Made the light-mode header completely white to match the logo background, including the main navigation dropdown.
- Added a dark-mode toggle. The initial theme follows the device preference unless a theme has been saved.
- Saved theme preferences across page navigation and repeat visits.

### Language and navigation

- Added English/Finnish switching and Finnish translations to the main portfolio pages.
- Connected the existing bilingual My Story page to the shared language preference.
- Saved the language selection across pages and repeat visits.
- Added back-to-top buttons to the main pages and retained the existing button on My Story.
- Added mobile navigation controls, keyboard focus styles and reduced-motion support for scrolling.

### Projects

- Renamed the Saaren Pizza & Kebab project to **Restaurant website** on the Projects page.
- Replaced the restaurant project card on the homepage with a customer website development card, an original desktop/mobile website illustration, and a link to discuss a website project.
- Linked the project title to [saarenkebabpizza.fi](https://saarenkebabpizza.fi/).
- Added a prominent invitation on the Projects page to discover more projects, products and business solutions at [techjyva.fi](https://techjyva.fi/), with Finnish translations.

### Entrepreneurship and speaking

- Added **10.2026 — Entrepreneurship · A new chapter** to the Home and Experience timelines.
- Updated the Experience introduction to reflect the start of my entrepreneurial journey in October 2026.
- Added **Hire me to speak** sections on Home and Experience.
- Highlighted my student mentoring experience and talks about my path to entrepreneurship.
- Added email request links with a prepared message for event details, audience, date, location, topic and budget.
- Explained that I will reply to requests and that speaking fees are negotiable based on the budget and event scope.
- Added Finnish translations for the new milestone and speaking content.
- Added a business solutions section immediately after Speaking & Mentoring on Home and Experience, with direct hiring and [Tech Jyvä services](https://techjyva.fi/) links.

### Direct contact

- Displayed my email: [ehsanmohajer.fi@gmail.com](mailto:ehsanmohajer.fi@gmail.com).
- Added the supplied WhatsApp chat link: [@ehsanmohajer](https://wa.me/ehsanmohajer).
- Added a **Book a consultation** button linking to [Google Calendar booking](https://calendar.app.google/pavvEdH1zKbH6GrY6).
- Added Finnish translations for the new contact content.

## Main files

- `site.css` — shared layout, typography and component styles.
- `site.js` — navigation, language switching, theme toggle and back-to-top behavior.
- `preferences.css` — shared theme, logo and header styling, including My Story overrides.
- `preferences.js` — applies saved theme/language preferences before the page renders.
- `translations.js` — Finnish translations for the main portfolio pages.
- `assets/` — logos, portraits, project images and icons.
- `my-story/` — story page and its supporting media.
- `CNAME` — custom domain configuration for GitHub Pages.

Preferences are stored in the visitor's browser using `localStorage`. Contact and speaking requests open the visitor's email application; there is no server-side form submission. External chat and booking links open their respective services.

## Run locally

From the project directory:

```sh
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080). Alternatively, use VS Code Live Server and open `index.html`.

## Validation

JavaScript syntax and local asset references were checked during the update. The restaurant project link, all three direct contact links, and the speaking request links were checked in the HTML. Browser visual verification remains pending.

For a quick JavaScript syntax check:

```sh
node --check site.js
node --check preferences.js
node --check translations.js
```

Before publishing, preview the pages at desktop and mobile widths, switch between English/Finnish and light/dark mode, and try the navigation, back-to-top buttons and external contact links.

## Push updates to GitHub

This folder is connected to `https://github.com/ehsanmohajerfi/portfolio.git` on the `main` branch.

From the project directory, review the changes, stage the website files, commit and push:

```sh
git status --short

git diff

git add README.md CNAME index.html about.html experience.html projects.html contact.html site.css site.js preferences.css preferences.js translations.js assets my-story

git diff --cached --stat

git commit -m "Update portfolio content and features"

git push origin main
```

GitHub authentication and write access to the repository are required to push.

## Hosting

The website can be served directly by GitHub Pages or another static host. For GitHub Pages, configure the repository's publishing source to use the branch containing these files and the repository root. Keep `CNAME` aligned with the intended custom domain, and verify the domain and HTTPS configuration after deployment.
