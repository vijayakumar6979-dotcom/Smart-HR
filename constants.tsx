
import { PricingPlan } from './types';

export const CORE_FEATURES = [
  {
    icon: 'payments',
    title: 'Payroll Precision',
    description: 'Automated calculations compliant with Malaysian tax laws. One-click salary disbursement.'
  },
  {
    icon: 'calendar_month',
    title: 'Leave Management Flow',
    description: 'Apply and approve leave on the go. Custom policies for annual, medical, and emergency leave.'
  },
  {
    icon: 'receipt_long',
    title: 'Claim Clarity',
    description: 'Paperless expense claims. Snap a photo of receipts and submit for instant approval.'
  },
  {
    icon: 'fingerprint',
    title: 'Attendance Insights',
    description: 'GPS-enabled clock-in/out via mobile app. Perfect for office and remote teams.'
  }
];

export const ADVANCED_FEATURES = [
  {
    icon: 'trending_up',
    title: 'Performance Pathways',
    description: 'Streamline performance reviews with customizable KPIs and 360-degree feedback loops.'
  },
  {
    icon: 'badge',
    title: 'Seamless Transitions',
    description: 'Digital checklists and automated workflows for smooth employee transitions.'
  },
  {
    icon: 'draw',
    title: 'Smart Document Handling',
    description: 'Generate HR letters with AI and sign documents digitally anywhere, anytime on mobile.'
  },
  {
    icon: 'visibility',
    title: 'Data-Driven Decisions',
    description: 'Full visibility on changes with detailed audit logs. Secure and transparent data management.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for startups',
    monthlyPrice: 50,
    yearlyPrice: 40,
    features: ['Up to 10 Employees', 'Payroll & e-Leave', 'Mobile App Access'],
    ctaText: 'Start Free Trial'
  },
  {
    id: 'sme-growth',
    name: 'SME Growth',
    description: 'For growing teams',
    monthlyPrice: 150,
    yearlyPrice: 120,
    features: ['Up to 50 Employees', 'All Features included', 'Priority Support', 'AI Templates & E-Sign'],
    isMostPopular: true,
    ctaText: 'Get Started'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: 0, // Zero represents custom
    yearlyPrice: 0,
    features: ['Unlimited Employees', 'Dedicated Account Manager', 'On-premise Deployment', 'Custom Integration'],
    ctaText: 'Contact Sales'
  }
];
