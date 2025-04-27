
/**
 * Главная точка входа приложения для нативных платформ
 * 
 * - Регистрирует корневой React-компонент для работы с Expo
 * - Обеспечивает кросс-платформенную совместимость (iOS/Android)
 * - Интегрирует приложение с нативным окружением
 * 
 * @requires expo Регистрация корневого компонента
 * @requires ./src/app Основной компонент приложения
*/

import { registerRootComponent } from 'expo';
import App                       from './src/app';

registerRootComponent(App);