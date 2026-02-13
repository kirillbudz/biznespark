Project: marketing website for a real estate developer.

Goal:
Corporate site + ЖК landing page.
Apartments/availability handled by Profitbase widget (embed only).

Stack:
- Next.js App Router
- TypeScript (strict)
- TailwindCSS
- No CMS for now
- No database
- No admin panel

Pages:
- Home (about developer)
- ЖК (description, gallery, infrastructure, location, progress)
- Documents (optional)
- News (optional)
- Contacts (form)

UI & UX:
- Russian language UI (no lorem ipsum)
- Clean layout, reusable sections, consistent spacing

Accessibility (a11y):
- Semantic HTML
- alt text for all images
- Visible focus states for interactive elements

Images:
- Use next/image for all images (optimize, responsive)
- Keep images in /public and reference via next/image

Links:
- Internal navigation via next/link
- External links: target="_blank" + rel="noopener noreferrer" when appropriate

Profitbase:
- Only embed widget (iframe/script)
- Do NOT implement apartments logic

Forms & Secrets:
- Contact form sends to email and/or Telegram
- Do NOT store submissions
- Tokens/keys must be in env vars (.env.local), never hardcoded

Code rules:
- Server Components by default
- Use "use client" only when necessary
- Tailwind only (no inline CSS)
- No heavy UI libraries unless requested
- SEO metadata for each page
- Add not-found page (404). Add error boundary only if needed.
