import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type FormType = 'signUp' | 'signIn';

const { width, height } = Dimensions.get('window');

interface AuthFormProps {
  formType: FormType;
  onBack: () => void;
}

const AuthFlow: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<FormType>('signUp');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  const imagePosition = useRef(new Animated.Value(0)).current;
  const formPosition = useRef(new Animated.Value(height)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const welcomeContentPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const animateComponents = (toValue: number) => {
    Animated.parallel([
      Animated.timing(imagePosition, {
        toValue,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(formPosition, {
        toValue: toValue === 1 ? -keyboardHeight : height,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: toValue === 1 ? 0 : 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(welcomeContentPosition, {
        toValue: toValue === 1 ? 1 : 0,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleAuthAction = (type: FormType) => {
    setFormType(type);
    setShowForm(true);
    animateComponents(1);
  };

  const handleBack = () => {
    Keyboard.dismiss();
    animateComponents(0);
    setTimeout(() => setShowForm(false), 400);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, {
        transform: [
          { 
            translateY: imagePosition.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -height * 0.15]
            })
          },
          {
            scale: imagePosition.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.8]
            })
          }
        ]
      }]}>
        <Image
          source={require('../../assets/icons/android/icon.png')}
          style={styles.welcomeImage}
        />
      </Animated.View>

      <Animated.View style={[styles.welcomeContent, { 
        opacity: contentOpacity,
        transform: [
          {
            translateY: welcomeContentPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 50]
            })
          }
        ]
      }]}>
        <Text style={styles.title}>Welcome to MyAptechka</Text>
        <Text style={styles.subtitle}>Your personal health assistant</Text>
        
        <Animated.View style={[styles.buttonContainer, {
          opacity: contentOpacity,
          transform: [
            {
              translateY: welcomeContentPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 20]
              })
            }
          ]
        }]}>
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={() => handleAuthAction('signUp')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAuthAction('signIn')}>
            <Text style={styles.bottomText}>
              Already have an account? <Text style={styles.boldText}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {showForm && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <Animated.View style={[styles.formContainer, {
            transform: [{ translateY: formPosition }]
          }]}>
            <AuthForm 
              formType={formType}
              onBack={handleBack}
            />
          </Animated.View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const AuthForm: React.FC<AuthFormProps> = ({ formType, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.authForm}>
      <View style={styles.formHeader}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#5F63FE" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {formType === 'signUp' ? (
        <>
          <TextInput 
            style={styles.input} 
            placeholder="Email"
            placeholderTextColor="#999"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Username" 
            placeholderTextColor="#999"
          />
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Password" 
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={showPassword ? 'eye-off' : 'eye'} 
                size={24} 
                color="#999" 
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <TextInput 
            style={styles.input} 
            placeholder="Email"
            placeholderTextColor="#999"
          />
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Password" 
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={showPassword ? 'eye-off' : 'eye'} 
                size={24} 
                color="#999" 
              />
            </TouchableOpacity>
          </View>
        </>
      )}

      <TouchableOpacity style={styles.mainButton}>
        <Text style={styles.buttonText}>
          {formType === 'signUp' ? 'Sign Up' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or continue with</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={24} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={24} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.switchFormButton}>
        <Text style={styles.switchFormText}>
          {formType === 'signUp' 
            ? "Already have an account? Sign In" 
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5F63FE',
  },
  imageContainer: {
    position: 'absolute',
    top: height * 0.17,
    alignItems: 'center',
    width: '100%',
  },
  welcomeImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  welcomeContent: {
    position: 'absolute',
    width: '100%',
    top: height * 0.5,
    alignItems: 'center',
    bottom: 0, // Добавляем нижнюю привязку
    justifyContent: 'space-between', // Распределяем пространство
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: -260,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40, // Отступ от нижнего края
  },
  signUpButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomText: {
    color: '#FFF',
    fontSize: 14,
  },
  boldText: { fontWeight: 'bold', color: '#FFC107' }, 
  keyboardAvoid: {
    flex: 1,
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.7,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  authForm: {
    flex: 1,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  skipText: {
    color: '#5F63FE',
    fontSize: 16,
    fontWeight: '600',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 13,
    zIndex: 1,
  },
  mainButton: {
    backgroundColor: '#5F63FE',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 20,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchFormButton: {
    marginTop: 20,
  },
  switchFormText: {
    color: '#5F63FE',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default AuthFlow;