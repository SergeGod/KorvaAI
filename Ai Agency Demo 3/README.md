# AmenityAI — Website

A production-ready, Vercel-deployable landing page for **AmenityAI**, featuring a hyper-realistic animated WebGL black hole background built with React Three Fiber and a custom GLSL fragment shader.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS v3 |
| 3D / WebGL | React Three Fiber + Three.js |
| Shader | Custom GLSL (fragment shader) |
| Post-processing | `@react-three/postprocessing` (Bloom) |
| Animation | Framer Motion |
| Icons | Lucide React |

---

## Quick Start

```bash
# 1. Install dependencies
npm install          # or: pnpm install / yarn install / bun install

# 2. Run dev server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

### Build for production

```bash
npm run build
npm run start
```

### Deploy to Vercel (one command)

```bash
npx vercel --prod
```
> The project is zero-config for Vercel. No environment variables are required.

---

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Single-page entry (imports all sections)
│   └── globals.css         # Tailwind + custom CSS / keyframes
│
├── components/
│   ├── BlackHole/
│   │   ├── shaders.ts         # GLSL vertex + fragment shader source
│   │   ├── BlackHoleMesh.tsx  # R3F mesh; drives uniforms / time
│   │   ├── BlackHoleScene.tsx # Scene root + Bloom postprocessing
│   │   └── BlackHoleCanvas.tsx# <Canvas> wrapper; perf tier + DPR
│   ├── sections/
│   │   ├── Hero.tsx        # Full-screen hero with black hole
│   │   ├── Services.tsx    # Services cards
│   │   ├── Projects.tsx    # 2×2 project grid with glitch reveal
│   │   └── Contact.tsx     # Centered contact section
│   └── ui/
│       ├── Button.tsx      # Reusable CTA button
│       └── SectionTitle.tsx# Animated section heading
│
├── hooks/
│   ├── usePerformanceTier.ts  # GPU/CPU detection → 'high' | 'medium'
│   └── useReducedMotion.ts    # Respects prefers-reduced-motion
│
├── data/
│   ├── projects.ts         # ← EDIT PROJECT DATA HERE
│   └── services.ts         # ← EDIT SERVICE DATA HERE
│
└── public/
    └── projects/
        ├── project-1.svg   # ← SWAP WITH REAL IMAGES
        ├── project-2.svg
        ├── project-3.svg
        └── project-4.svg
```

---

## Customization Guide

### Company name & tagline
Edit `components/sections/Hero.tsx`:
```tsx
<h1>AmenityAI</h1>        {/* ← Change company name */}
<p>Intelligence that works while you sleep.</p>  {/* ← Change tagline */}
```

### Projects (titles, descriptions, images)
Edit `data/projects.ts`. To swap an image, change the `image` field to any path under `/public/` or an external URL:
```ts
{
  id: 1,
  title: 'Your Project Title',
  image: '/projects/your-image.jpg',   // ← put real images in /public/projects/
  // ...
}
```

### Services & AI agents
Edit `data/services.ts`. All titles, descriptions, features, and agent types live there.

### Contact links
Edit `components/sections/Contact.tsx`:
```tsx
<ContactLink href="mailto:your@email.com" ... />
<ContactLink href="https://wa.me/YOURNUMBER" ... />
<ContactLink href="tel:+YOURNUMBER" ... />
```
Also update "Madrid, Spain" to your location in the same file.

### Brand colors
Edit `tailwind.config.ts` → `theme.extend.colors.brand` to change the amber/orange accent.

### Black hole appearance
Edit `components/BlackHole/shaders.ts` → `FRAGMENT_SHADER`. Key parameters at the top of `main()`:
```glsl
float R_EH     = 0.090;  // event horizon size (bigger = larger black circle)
float R_PHOTON = 0.117;  // photon ring position
float R_IN     = 0.140;  // accretion disk inner edge
float R_OUT    = 0.520;  // accretion disk outer edge
```
Color palette variables: `c_hot`, `c_warm`, `c_cool` (hot = inner disk, cool = outer disk).

---

## Performance Notes

### Quality tiers
`hooks/usePerformanceTier.ts` auto-detects device capability:

| Signal | Tier assigned |
|---|---|
| `hardwareConcurrency` ≤ 4 | `medium` |
| `deviceMemory` ≤ 4 GB (Chromium) | `medium` |
| Integrated/mobile GPU (WEBGL_debug_renderer_info) | `medium` |
| Mobile viewport (< 768 px) | `medium` |
| Otherwise | `high` |

**High tier**: 6-octave FBM, DPR cap at 2×, full Bloom.
**Medium tier**: 4-octave FBM, DPR cap at 1.5×, reduced Bloom intensity.

### Reduced motion
When `prefers-reduced-motion: reduce` is set:
- The black hole shader stops animating (`uTime` is frozen).
- Framer Motion animations are suppressed via `globals.css`.
- Bloom postprocessing is removed entirely.
The static black hole still renders; it just doesn't move.

### 60 fps targets
- Shader uses `gl_FragCoord` (no vertex interpolation overhead).
- `useFrame` updates only a single float uniform per frame.
- `depthWrite: false` + `depthTest: false` on the background mesh.
- DPR clamped per tier.
- `Bloom` uses `multisampling={0}` to skip MSAA on post-pass.

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge 90+ | ✅ Full (WebGL 2, DPR, deviceMemory) |
| Firefox 90+ | ✅ Full |
| Safari 15.4+ | ✅ Full |
| Safari < 15.4 | ⚠️ Medium tier (no deviceMemory API) |
| Mobile Chrome / Safari | ✅ Medium tier |
| No WebGL | ❌ Black background only |

---

## License

MIT — free to use and modify.
