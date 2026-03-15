# KorvaAI — Deployment Guide

## Local Development

```bash
# 1. Install dependencies (Node 18+ required)
npm install

# 2. Start the dev server
npm run dev

# Open http://localhost:3000
```

## Production Build Check (run before deploying)

```bash
npm run build
npm run start   # verify at http://localhost:3000
```

---

## Deploy to Vercel (Recommended)

### Option A — Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy (follow the prompts — accept all defaults)
vercel

# First deploy creates a preview URL.
# Promote to production:
vercel --prod
```

### Option B — Vercel Dashboard (GitHub)

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the GitHub repo.
4. Leave all framework settings as auto-detected (Next.js).
5. Click **Deploy**.

Vercel will automatically:
- Run `npm run build`
- Deploy to a global edge network
- Assign a `*.vercel.app` subdomain
- Enable HTTPS automatically

---

## Custom Domain

1. In the Vercel dashboard → your project → **Settings → Domains**.
2. Add your domain (e.g. `korva.ai`).
3. Follow the DNS instructions (add CNAME or A records at your registrar).
4. Vercel provisions an SSL certificate automatically.

---

## Environment Variables

No environment variables are required for the base project.

If you add a real email capture API (e.g. Resend, Mailchimp), create a `.env.local` file:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

And add the same key in Vercel dashboard → **Settings → Environment Variables**.

---

## Performance Notes

- The Canvas particle field pauses automatically on hidden/background tabs.
- `prefers-reduced-motion` disables all animations for accessibility.
- All images should be placed in `/public` and served via Next.js `<Image>`.
- The production build targets Lighthouse score 95+ on performance.
