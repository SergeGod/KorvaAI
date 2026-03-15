// ─────────────────────────────────────────────────────────────────────────────
// Projects data
// To swap an image: change the `image` field to your desired path (relative to /public)
// or an external URL. Title and description are fully editable here.
// ─────────────────────────────────────────────────────────────────────────────

export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  image: string   // path relative to /public  (e.g. "/projects/project-1.svg")
  tag: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'NexaCore CRM',
    subtitle: 'Enterprise Platform',
    description:
      'Full-stack CRM with AI-driven lead scoring, real-time analytics dashboards, and automated follow-up workflows.',
    image: '/projects/project-1.svg',
    tag: 'Web App',
  },
  {
    id: 2,
    title: 'PulseDesk',
    subtitle: 'AI Receptionist Deploy',
    description:
      'Deployed a 24/7 AI receptionist for a medical clinic — handles 300+ daily inquiries, books appointments, and escalates critical cases.',
    image: '/projects/project-2.svg',
    tag: 'AI Agent',
  },
  {
    id: 3,
    title: 'Orbita Studio',
    subtitle: 'Brand & Web',
    description:
      'High-performance marketing site for a design agency. 99 Lighthouse score, sub-1s LCP, and a fully animated 3D hero section.',
    image: '/projects/project-3.svg',
    tag: 'Website',
  },
  {
    id: 4,
    title: 'FlowIntel',
    subtitle: 'Analytics AI Agent',
    description:
      'Autonomous analyst agent that monitors KPIs, surfaces anomalies, and delivers plain-English reports to Slack — daily, without human input.',
    image: '/projects/project-4.svg',
    tag: 'AI Agent',
  },
]
