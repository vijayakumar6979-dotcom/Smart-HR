
export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  accentColor?: string;
  darkVariant?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isMostPopular?: boolean;
  ctaText: string;
}

export enum PricingPeriod {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}
