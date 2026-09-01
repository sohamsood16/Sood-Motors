# Sood Motors Detailing Studio

A cinematic, dark-mode marketing site for a premium car detailing studio in
Kurukshetra, Haryana — built as a software-engineering portfolio piece as
much as a business website.

---

## Stack

| Layer          | Choice                                            |
| -------------- | -------------------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack)                 |
| Language       | TypeScript (strict mode)                           |
| Styling        | Tailwind CSS v4 (CSS-first `@theme` tokens)         |
| 3D             | Three.js via `@react-three/fiber`                   |
| Animation      | GSAP + ScrollTrigger                                |
| Icons          | lucide-react                                        |
| Fonts          | Big Shoulders Display + IBM Plex Sans/Mono, self-hosted via `@fontsource` (no runtime Google Fonts fetch) |

## Architecture

```
app/
  layout.tsx        Root layout: fonts, metadata, JSON-LD, WhatsApp float
  page.tsx           Composes every section inside <BookingProvider>
  globals.css         Design tokens (@theme), reduced-motion rules, textures
  sitemap.ts, robots.ts

components/
  sections/          One file per page section (Hero, Services, Booking, ...)
  ui/                 Small shared UI (WhatsAppFloat)
  three/              R3F scene, canvas hosts, SVG/fallback compositions

lib/
  business.ts         SINGLE SOURCE OF TRUTH for all business data
  gallery.ts           Gallery tile content/config
  gsap.ts               Shared GSAP registration + reduced-motion helper
  useScrollReveal.ts     Reusable scroll-reveal hook
  BookingContext.tsx      Shares the selected service between Services → Booking
```

### Centralized business data

Every business fact — name, phone, WhatsApp number, address, hours, services,
Instagram URL — lives in `lib/business.ts`. No component hard-codes a phone
number, address line, or service list; they all import from this file. To
update the business (new hours, a new service, a different WhatsApp number),
edit `lib/business.ts` only.

## 3D implementation

The brief called for a 3D automotive experience but explicitly discouraged
forcing in a low-quality car model. Since no licensed vehicle mesh was
available, the site uses an **abstract precision composition** instead: a
metallic alloy-wheel assembly, a blueprint-style floor grid, and a drifting
particle field, lit with automotive three-point lighting (warm key, cool
rim, copper accent).

- **Hero** (`components/three/HeroCanvas.tsx`): the wheel assembly gently
  parallaxes with pointer position.
- **3D Automotive Experience section** (`components/three/ExperienceCanvas.tsx`):
  the same assembly rotates based on scroll progress through the section,
  driven by a GSAP `ScrollTrigger`.

Both canvases:
- are **dynamically imported with `ssr: false`** so Three.js never ships to
  the server bundle or blocks first paint;
- **pause rendering** (`frameloop="never"`) when scrolled out of view, via
  `IntersectionObserver`;
- **respect `prefers-reduced-motion`**, skipping rotation entirely;
- fall back to a **static SVG composition** on small viewports (< 640px)
  and when reduced motion is requested, instead of paying for a WebGL
  context on devices that don't benefit from it.

## WhatsApp booking

The booking form (`components/sections/Booking.tsx`) is a real, validated
form — not a fake backend. On submit it:

1. Validates name, phone, vehicle, service, date and time client-side.
2. Builds a formatted message via `buildBookingMessage()` in `lib/business.ts`.
3. Opens `https://wa.me/<number>?text=<encoded message>` in a new tab.

No server, database, or API route is involved — this matches the brief's
instruction not to build fake backend functionality. The WhatsApp number is
configured once, in `lib/business.ts`.

Clicking a service card on the Services section pre-fills that service in
the booking form and scrolls you there (`lib/BookingContext.tsx`).

## Replacing gallery imagery

**Important:** this environment has no network access to stock-photo
providers, so the Gallery and Instagram sections currently ship with
hand-tuned CSS/SVG gradient "plates" (`lib/gallery.ts`) standing in for real
studio photography — not photos, and not lorem-ipsum placeholders. Before
this goes to production, replace them with real photos:

1. Drop your images into `public/images/gallery/` (e.g. `foam-wash.jpg`).
2. In `lib/gallery.ts`, add an `image: "/images/gallery/foam-wash.jpg"`
   field to the relevant item.
3. In `components/sections/Gallery.tsx`, swap the `style={{ background: item.gradient }}`
   div for a Next.js `<Image>` using `item.image`, keeping the existing
   hover/zoom/lightbox behaviour.

The same applies to the Instagram section's tile grid.

## SEO

- Per-page `<title>`/`<meta description>`/OpenGraph/Twitter tags via the App
  Router `metadata` export (`app/layout.tsx`).
- JSON-LD `AutoDetailing` structured data (name, address, phone, hours).
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and
  `/robots.txt`.
- Semantic HTML (`<address>`, `<nav>`, `<main>`, `<footer>`, heading order)
  throughout.

## Accessibility

- Every interactive element is keyboard-reachable with a visible focus ring
  (`:focus-visible` in `globals.css`).
- Form fields have associated `<label>`s and `aria-invalid`/`aria-describedby`
  wiring for validation errors.
- The gallery lightbox is a labelled dialog (`role="dialog"`,
  `aria-modal`) with Escape/Arrow-key navigation.
- `prefers-reduced-motion` disables GSAP animation, 3D rotation, and the
  WhatsApp button's pulse ring.

## Local setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

### Environment variables

None are required — this is a static-content site with no backend. If you
later add analytics or a real backend, add a `.env.local` (already
git-ignored) and document the variables here.

## Build & lint

```bash
npm run lint    # ESLint (eslint-config-next, strict react-hooks rules)
npm run build   # Production build (Turbopack)
npm run start   # Serve the production build locally
```

Both `lint` and `build` currently pass cleanly.

## Deployment (Vercel)

This project has **not been deployed** from the environment it was built
in — that sandbox only has network access to package registries (npm,
GitHub, etc.), not to `vercel.com`, so the Vercel CLI cannot authenticate or
deploy from there. To deploy:

**Option A — Vercel dashboard (recommended, no CLI needed)**
1. Push this repository to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new), import the repository.
3. Framework preset: Next.js (auto-detected). No environment variables are
   required.
4. Deploy. Vercel will run `npm run build` and give you a production URL.

**Option B — Vercel CLI, from your own machine**
```bash
npm i -g vercel
vercel login
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

### Pushing to GitHub

```bash
git init                       # already done for this project
git add .
git commit -m "Initial commit: Sood Motors Detailing Studio"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

## Quality notes / known trade-offs

- **Gallery & Instagram imagery** are generative CSS/SVG placeholders, not
  real photography — see [Replacing gallery imagery](#replacing-gallery-imagery).
  No stock photos were used or hotlinked, to avoid licensing risk.
- **No prices, awards, certifications, years-in-business, or testimonials**
  are shown, per the brief — these weren't supplied and weren't invented.
  Add them to `lib/business.ts` / the relevant section once you have real
  figures.
- The map embed uses Google's no-API-key `output=embed` URL, so no Maps API
  key or billing account is required.
