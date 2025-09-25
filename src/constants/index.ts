// Animation constants
export const ANIMATION_CONFIG = {
  BLUR_TEXT: {
    delay: 400,
    duration: 2000,
    stepDuration: 0.8,
    threshold: 0.05,
    easing: 'ease-out'
  },
  FADE_CONTENT: {
    duration: 2000,
    easing: 'ease-out',
    initialOpacity: 0
  }
} as const;

// Visual effects constants
export const VISUAL_EFFECTS = {
  CARD_BLUR: 'blur(20px)',
  WEBKIT_BLUR: 'blur(20px)',
  GLASS_BACKGROUND: 'rgba(255, 255, 255, 0.25)',
  GLASS_BORDER: 'rgba(255, 255, 255, 0.18)'
} as const;

// Image URLs
export const IMAGES = {
  EMPLOYEE_PHOTO: 'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Equipo/Jesus.png',
  SOLWARE_LOGO: 'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Logos/Svg/Logo_Blanco_Solware.svg',
} as const;

// Button style variants
export const BUTTON_STYLES = {
  primary: {
    base: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white",
    boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.7)"
  },
  secondary: {
    base: "bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100",
    boxShadow: "inset 0 0 0 2px rgba(37, 99, 235, 1)"
  },
  success: {
    base: "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white",
    boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.7)"
  },
  social: {
    base: "bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white",
    boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.7)"
  },
  solware: {
    base: "bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white",
    boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.7)"
  },
  language: {
    base: "bg-indigo-600/40 backdrop-blur-sm text-white hover:bg-indigo-500/60 !w-8 !h-8 sm:!w-10 sm:!h-10 !rounded-xl",
    boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.5)"
  }
} as const;

// Card style configurations
export const CARD_STYLES = {
  main: {
    boxShadow: "inset 0 0 0 3px rgba(255, 255, 255, 0.8), 0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    borderRadius: "rounded-3xl",
    background: "backdrop-blur-2xl bg-white/25"
  },
  header: {
    background: "bg-gradient-to-br from-slate-800/90 to-indigo-900/90 backdrop-blur-sm",
    borderBottom: "border-b border-white/10"
  },
  content: {
    background: "bg-white/10 backdrop-blur-sm",
    separator: "bg-white/50"
  }
} as const;

// Icon and avatar styles
export const ELEMENT_STYLES = {
  avatar: {
    boxShadow: "inset 0 0 0 3px rgba(255, 255, 255, 0.8), 0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    size: "w-20 h-20 sm:w-24 sm:h-24"
  },
  contactIcon: {
    boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.7), 0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    size: "w-12 h-12 sm:w-14 sm:h-14",
    base: "bg-slate-800/60 hover:bg-indigo-600/80 backdrop-blur-sm rounded-full"
  },
  actionButton: {
    primary: {
      boxShadow: "inset 0 0 0 3px rgba(255, 255, 255, 0.8), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      background: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
    },
    secondary: {
      boxShadow: "inset 0 0 0 2px rgba(255, 255, 255, 0.7), 0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      background: "bg-slate-800/30 hover:bg-slate-700/40"
    }
  }
} as const;

// Text content
export const TEXT_CONTENT = {
  es: {
    whatsapp: 'WhatsApp',
    scheduleMeeting: 'Pongamos fecha',
    notFound: 'Contacto no encontrado',
    notFoundDesc: 'El perfil solicitado no existe.',
    languageToggle: 'Cambiar idioma'
  },
  en: {
    whatsapp: 'WhatsApp',
    scheduleMeeting: 'Schedule meeting',
    notFound: 'Contact not found',
    notFoundDesc: 'The requested profile does not exist.',
    languageToggle: 'Change language'
  }
} as const;