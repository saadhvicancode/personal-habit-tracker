## Loop Habit App

A minimal habit-building app built with Next.js App Router. Track habits, reflect daily, and earn playful rewards.

### Features
- Habit cards with progress and insights
- Daily reflection form (`/api/reflect` endpoint)
- Rewards screen with animated coins and confetti
- Responsive UI with Tailwind CSS

### Tech Stack
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** for animations

### Quick Start
1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Visit `http://localhost:3000`.

### Scripts
- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

### Project Structure

```
app/
  api/
    reflect/route.ts        # Reflection API endpoint
  components/               # UI components (HabitCard, InsightCard, etc.)
  dashboard/page.tsx        # Dashboard page
  rewards/page.tsx          # Rewards page with animations
  page.tsx                  # Landing/home page
  layout.tsx                # Root layout
  globals.css               # Global styles (Tailwind)
public/                     # Static assets
```

### Environment Variables
No secrets are required by default. If you add any, set them in your host (e.g., Vercel → Project → Settings → Environment Variables) and rebuild.

### Deployment (Vercel Recommended)
1. Push this repo to GitHub.
2. Go to Vercel and import the repository.
3. Accept the auto-detected Next.js settings and deploy.
4. Share the live URL (e.g., `https://your-project.vercel.app`).

CLI alternative:

```bash
npm i -g vercel
vercel --prod
```

### Contributing
PRs are welcome. Please run `npm run lint` before submitting.

### License
MIT
