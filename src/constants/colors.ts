// constants/colors.ts

export const COLORS = {
    // Базовые цвета
    primary:    '#2A4DBA',
    secondary:  '#6C757D',
    success:    '#28A745',
    danger:     '#DC3545',
    warning:    '#FFC107',
    info:       '#17A2B8',
    
    // Текст
    text: {
      primary:   '#212529',
      secondary: '#6C757D',
      inverted:  '#FFFFFF',
    },
  
    // Фоны
    background: {
      primary:   '#FFFFFF',
      secondary: '#F8F9FA',
      dark:      '#1A1A1A',
    },
  
    // Границы
    border:      '#DEE2E6',
    
    // Дополнительные
    white:       '#FFFFFF',
    black:       '#000000',
    transparent: 'transparent',
  } as const;
  
  // Типы для TypeScript
  export type ColorKey     = keyof typeof COLORS;
  export type TextColorKey = keyof typeof COLORS.text;