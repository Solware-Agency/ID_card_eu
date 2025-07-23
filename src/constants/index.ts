export const ANIMATION_DELAYS = {
  BLUR_TEXT: 400,
  FADE_CONTENT: 2000,
  STEP_DURATION: 0.8,
} as const;

export const BLUR_EFFECTS = {
  CARD_BLUR: 'blur(20px)',
  WEBKIT_BLUR: 'blur(20px)',
} as const;

export const IMAGES = {
  EMPLOYEE_PHOTO: 'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Equipo/Eugenio.png',
  SOLWARE_LOGO: 'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Logos/Svg/Logo_Blanco_Solware.svg',
} as const;

export const BUTTON_VARIANTS = {
  primary: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md hover:shadow-lg border-3 border-solid border-white/80",
  secondary: "bg-white border-3 border-solid border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 shadow-md hover:shadow-lg",
  success: "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-md hover:shadow-lg border-3 border-solid border-white/80",
  social: "bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white shadow-md hover:shadow-lg border-3 border-solid border-white/80",
  solware: "bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 active:from-blue-700 active:to-blue-900 text-white shadow-md hover:shadow-lg border-3 border-solid border-white/80",
  language: "bg-indigo-600/40 backdrop-blur-sm text-white hover:bg-indigo-500/60 hover:scale-105 hover:shadow-lg hover:shadow-indigo-400/30 active:bg-indigo-700/50 active:scale-95 border-3 border-solid border-white/70 hover:border-white/90 !w-8 !h-8 sm:!w-10 sm:!h-10 !rounded-xl focus:ring-2 focus:ring-indigo-300/60 focus:ring-opacity-50 focus:outline-none transition-all duration-300",
} as const;