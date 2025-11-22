export const tokens = {
  colors: {
    background: '#f5f7fb',
    surface: '#ffffff',
    surfaceMuted: '#eef2f6',
    border: '#d4dbe8',
    accent: '#4f46e5',
    accentMuted: '#e0e7ff',
    textPrimary: '#0f172a',
    textSecondary: '#475467',
    success: '#0f9d58',
    error: '#b42318',
    warning: '#b76e00',
    info: '#0369a1',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    pill: '999px',
  },
  shadow: {
    xs: '0 1px 2px rgb(15 23 42 / 0.08)',
    md: '0 8px 20px rgb(15 23 42 / 0.12)',
    lg: '0 20px 45px rgb(15 23 42 / 0.16)',
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      display: '2.5rem',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      snug: 1.35,
      relaxed: 1.5,
    },
  },
} as const

export type DesignTokens = typeof tokens

