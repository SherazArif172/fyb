# Research Project Manager — Frontend

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 implementation of the Figma design
(neumorphic "ice" theme, DM Sans + Fraunces). Frontend only — all data is mocked in `src/lib/`
and is meant to be replaced by API calls when the backend is built.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Routes

| Area | Route | Figma frame |
| --- | --- | --- |
| Auth | `/login` · `/signup` · `/forgot-password` · `/check-email` · `/reset-password` | Auth / * (desktop + mobile login) |
| Public | `/` · `/explore` (search with no matches → empty state) · `/explore/[slug]` | P-01 · P-02 / P-02b · P-03 |
| Student | `/student` · `/student?tour=1` · `/student?menu=open` | S-01 · S-01b · S-01c |
| | `/student/projects` · `/student/projects/new` | S-02 · S-03 |
| | `/student/projects/[id]` · `/student/projects/[id]/milestones/[m]` (`?upload=1`) | S-04 · S-05 · S-06 |
| | `/student/notifications` · `/student/settings` | S-07 · S-08 |
| Supervisor | `/supervisor` · `/supervisor/projects` · `/supervisor/reviews/[id]` | V-01 · V-02 · V-03 |
| Admin | `/admin` · `/admin/projects` (`?assign=1`) · `/admin/users` | A-01 · A-02 / A-03 · A-04 |
| | `/admin/publish-requests` · `/admin/featured` · `/admin/research-areas` | A-05 · A-06 · A-07 |

Routes not drawn in Figma but linked from the navigation (`/supervisor/reviews`, `/supervisor/notifications`,
`/supervisor/settings`, `/admin/settings`) are built from the same components.

## Structure

```
src/
  app/                 routes (auth, public, student, supervisor, admin)
  components/
    ui/                design-system primitives (Button, Input, Card, StatusChip, Modal, Drawer, Donut…)
    layout/            AppShell, Sidebar, TopBar, UserMenu, Tour
    auth/ public/ project/ admin/   feature components
    theme/             light/dark ThemeProvider
  lib/                 mock data
```

## Design tokens

All colours/shadows come from the Figma variables and live in `src/app/globals.css` as CSS variables,
exposed to Tailwind as `bg-ice`, `text-ink`, `text-muted`, `teal-*`, `peach-*`, `shadow-neu`, `shadow-neu-inset`, etc.
Dark mode (`[data-theme="dark"]`) uses the Figma dark values and is toggled from the user menu or Settings.
Icons use `lucide-react` (same geometry as the Figma icon set) so they follow the theme colour.
