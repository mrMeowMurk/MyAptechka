
/**
 * Корневая конфигурация навигации приложения
 * Определяет глобальную структуру навигации и видимость заголовков
*/

import { Stack } from 'expo-router';


export default function RootLayout() 
{
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
    </Stack>
  );
}
