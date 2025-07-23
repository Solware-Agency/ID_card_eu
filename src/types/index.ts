export interface Employee {
  slug: string;
  name: string;
  title: {
    en: string;
    es: string;
  };
  company: {
    en: string;
    es: string;
  };
  photo: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin?: string;
  website?: string;
  calendly?: string;
}

export interface Language {
  code: 'es' | 'en';
  name: string;
}

export interface ContactOption {
  icon: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  action: string;
  variant: ButtonVariant;
  ariaLabel: string;
  label: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'social' | 'language' | 'solware';

export interface AnimationConfig {
  delay: number;
  duration: number;
  easing: string;
  threshold: number;
}

export interface StyleConfig {
  borderWidth: string;
  borderColor: string;
  borderRadius: string;
  boxShadow: string;
}