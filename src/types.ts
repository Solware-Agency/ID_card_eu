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