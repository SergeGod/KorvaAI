// ─────────────────────────────────────────────────────────────────────────────
// Services data
// Edit service titles, descriptions, features, and agent types here.
// ─────────────────────────────────────────────────────────────────────────────

export interface AgentType {
  name: string
  tagline: string
  description: string
}

export interface Service {
  id: string
  icon: string          // lucide-react icon name — mapped in Services.tsx
  title: string
  description: string
  features: string[]
  agents?: AgentType[]  // only for the AI Agents service
}

export const SERVICES: Service[] = [
  {
    id: 'websites',
    icon: 'Globe',
    title: 'Website Creation',
    description:
      'We engineer websites that convert — combining stunning design, elite performance, and scalable architecture into a single, cohesive product.',
    features: [
      'Custom design systems',
      'Sub-1s load performance',
      'SEO & Core Web Vitals',
      'CMS & headless integration',
      'Vercel / edge deployment',
    ],
  },
  {
    id: 'ai-agents',
    icon: 'Cpu',
    title: 'AI Agents',
    description:
      'Purpose-built autonomous agents that slot into your operations and automate your highest-leverage workflows — around the clock.',
    features: [
      'Custom-trained on your data',
      'Integrates with your stack',
      'Continuous 24/7 operation',
    ],
    agents: [
      {
        name: 'AI Receptionist',
        tagline: '24/7 front-desk intelligence',
        description:
          'Handles inbound inquiries, qualifies leads, routes calls, and books meetings — so no opportunity goes unattended.',
      },
      {
        name: 'AI Analyst',
        tagline: 'Real-time business intelligence',
        description:
          'Monitors your KPIs continuously, surfaces anomalies instantly, and delivers plain-English insights directly to your team.',
      },
      {
        name: 'AI Appointment Scheduler',
        tagline: 'Smart calendar automation',
        description:
          'Eliminates scheduling back-and-forth by autonomously managing availability, confirmations, and rescheduling.',
      },
    ],
  },
]
