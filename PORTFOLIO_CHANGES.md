# Portfolio comparison — Hackathons & Finland Journey

Based on `ehsan-portfolio-redesign-v1(1).zip` uploaded 14 October 2026.

## What changed

- `index.html`: the Witas selected-work card now features the three hackathons with an authentic group photo and links to the new case study. The My Journey teaser starts with the -30°C Finland arrival.
- `projects.html`: refined the hackathon card and linked it to the detailed case study.
- `projects/hackathons.html` **NEW**: dedicated case study using existing Witas/hackathon pictures, showing role, process, collaboration, and learnings. Dates and outcomes for all three individual events need confirmation before publishing detailed numbers.
- `case-study.css` **NEW**: responsive style for new case-study content.
- `my-story/index.html`: added a bilingual early chapter covering arrival, Finnish/JAMK studies, Talent Boost, Viitasaari hackathon, traineeship and commute, before the existing entrepreneurial story. Existing narrative retained.
- `experience.html`: more explicit Witas hackathon responsibilities.
- `translations.js`: Finnish counterparts for modified site copy.
- `sitemap.xml`, `scripts/check_site.py`: includes the new case study in site validation.

## Deliberately unchanged

- Your CV, personal contact information, business links, visual identity and existing content outside these sections.
- Project dates and attendance numbers not verified for each of the three events.

## Test

Run `python3 scripts/check_site.py` from the website root.
Local preview: `python3 -m http.server 8080` and visit http://localhost:8080.

## Review before publishing

- Verify captions and permissions for event photography.
- Confirm the exact three hackathon events, dates, personal responsibilities, and factual outcomes.
- Check the website in a browser on mobile and desktop.
