import { useEffect } from 'react';
import { getEmployeeBySlug } from '../data/empleados';
import { trackEvent } from '../utils/analytics';

export const useEmployee = (slug: string | undefined) => {
  const employee = slug ? getEmployeeBySlug(slug) : null;

  useEffect(() => {
    if (employee) {
      trackEvent('page_view', employee.name);
      document.title = `${employee.name} - SolwareID`;
    }
  }, [employee]);

  return employee;
};