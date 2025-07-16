declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, employeeName: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      employee_name: employeeName,
      page_title: document.title
    });
  }
};