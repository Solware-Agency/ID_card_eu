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
    photo: 'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Equipo/Eugenio.png',
    email: 'ventas@solware.agency',
    phone: '+58 414 2323332',
    whatsapp: '584142323332',
    linkedin: 'eugenio-andreone',
    website: 'solware.agency',
    calendly: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ28TbL6x8Jj7yLpzgpH2OQ1MV5t5zdvwYRbjCTVKTjj-pNNzSSZ3mGSpguP7Sv4AksuyRdav2bJ'
  }
];

export const getEmployeeBySlug = (slug: string): Employee | undefined => {
  return empleados.find(emp => emp.slug === slug);
};