import config from '../config'

export const theme = {
    // backgrounds
    bgPrimary: config.theme.primaryColor,
    bgCard: 'rgba(255,255,255,0.04)',
    bgInput: 'rgba(255,255,255,0.06)',

    // text
    textPrimary: '#F4F4F5',
    textSecondary: '#A1A1AA',
    textMuted: '#71717A',
    textOnAccent: config.theme.primaryColor, // texto escuro sobre o fundo do accent (ex: dourado)

    // accent
    accent: config.theme.accentColor,

    // borders
    border: 'rgba(255,255,255,0.08)',
    borderHover: 'rgba(255,255,255,0.16)',

    // status
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
}
