
/**
 * @module App
 * @description Корневой компонент приложения, реализующий:
 * - Отображение загрузочного экрана
 * - Инициализацию маршрутизации
 * - Управление состоянием инициализации приложения
 * 
*/


import React, {FunctionComponent, useState} from 'react';
import { ExpoRoot }                         from 'expo-router';
import { SplashScreen }                     from './componets';
import AuthScreen from './screens/login/index'

const  App : FunctionComponent = () => 
{
  const [animationCompleted, setAnimationComplete] = useState<Boolean>(false);
  const [loginCompleted,     setLoginCompletete]   = useState<Boolean>(false);


  if (!animationCompleted) 
    return <SplashScreen onFinish={() => setAnimationComplete(true)}/>;

  if (!loginCompleted) 
  {
    return(
      <AuthScreen>

      </AuthScreen>
    );
  }



  // СЮДА ДОБАВИТЬ ПРОВЕРКУ ЛОГИНА И СТРАНИЦУ ЛОГИНА

  // return (
  //   <ExpoRoot context={(require as any).context('./screens/(tabs)', true, /\.(t|j)sx?$/)}/>
  // );
};

export default App;