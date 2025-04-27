export const SIZES = {
    // Глобальные размеры
    base: 8, // Базовый единица (используйте кратные этому значению)
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 16,
      full: 1000,
    },
  
    // Отступы
    padding: {
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
  
    // Размеры элементов
    button: {
      height: 48,
      minWidth: 120,
    },
  
    // Иконки
    icon: {
      sm: 16,
      md: 24,
      lg: 32,
    },
  
    // Текст
    text: {
      sm: 12,
      md: 14,
      lg: 16,
      xl: 20,
    },
  } as const;
  
  export type SizeKey = keyof typeof SIZES;