
/**
 * SplashScreen Component
 * 
 * @description
 * Компонент экрана-заставки приложения. Использует Lottie анимацию для отображения интерактивного стартового экрана.
 * После полного проигрывания анимации автоматически вызывает колбэк для уведомления родительского компонента о завершении.
 * 
 * @props
 * @param {Function} onFinish - Колбэк, вызываемый по завершении анимации. Должен обрабатывать переход на следующий экран.
*/


import React, {FunctionComponent, useRef, useCallback} from 'react';
import {Animated}                                      from 'react-native';
import LottieView                                      from "lottie-react-native";


interface Props {
  onFinish: (param: boolean) => void;
}


const SplashScreen: FunctionComponent<Props> = ({ onFinish }) => {
  const fade = useRef(new Animated.Value(1)).current;


  const handleAnim = useCallback(() => {
    Animated.timing(fade, {
      toValue: 0, duration: 500, useNativeDriver: true,
    }).start(() => onFinish(true));
  }, [fade, onFinish]);

  
  return (
    <Animated.View style={{ opacity: fade }}>
      <LottieView 
        loop={false} autoPlay  style={{ width: '100%', height: '100%' }} 
        source={require('../../../assets/animations/splash-screen.json')} 
        onAnimationFinish={handleAnim}
      />
    </Animated.View>
  );
};

export default SplashScreen;

