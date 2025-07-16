import { Employee } from '../types';

export const empleados: Employee[] = [
  {
    slug: 'eugenio-andreone',
    name: 'Eugenio Andreone',
    title: {
      en: 'Production Engineer',
      es: 'Ingeniero de Producción'
    },
    company: {
      en: 'Solware Agency',
      es: 'Agencia Solware'
    },
    photo: '/images/eugenio-andreone.jpg',
    email: 'ventas@solware.agency',
    phone: '+58 414 2323332',
    whatsapp: '584142323332',
    linkedin: 'eugenio-andreone',
    website: 'solware.agency',
    calendly: 'https://calendly.com/eugenio-andreone'
  }
];

export const getEmployeeBySlug = (slug: string): Employee | undefined => {
  return empleados.find(emp => emp.slug === slug);
};