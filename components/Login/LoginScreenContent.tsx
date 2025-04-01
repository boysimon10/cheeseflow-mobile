import { YStack, Theme, Image, View, Text } from 'tamagui';
import { Link, useRouter } from 'expo-router';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, Alert } from 'react-native';
import { EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '~/apollo/mutations';
import { useAuthStore } from '~/store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse, LoginUserInput } from '~/apollo/types';

export const ScreenContent = () => {
  const { bottom, top } = useSafeAreaInsets();
  const screenHeight = Dimensions.get('window').height;
  const minSpacing = Math.min(screenHeight * 0.5, -10);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();

  const [loginMutation, { loading }] = useMutation<
    { login: LoginResponse },
    { loginInput: LoginUserInput }
  >(LOGIN_MUTATION, {
    onCompleted: async (data) => {
      const { access_token, user } = data.login;
      await AsyncStorage.setItem('auth_token', access_token);
      login(access_token, user);
      
      router.replace('/(authenticated)/(tabs)');
    },
    onError: (error) => {
      Alert.alert(
        'Login Error', 
        error.message || 'An error occurred'
      );
    }
  });

  const handleLogin = () => {
    loginMutation({
      variables: {
        loginInput: { email, password }
      }
    });
  };

  return (
    <Theme name="light">
      <YStack flex={1} padding="$4" space={minSpacing}>
        <YStack 
          flex={1} 
          alignItems="center" 
          justifyContent="center" 
          paddingTop={top}
        >
          <Image 
            source={require('../../assets/onboarding/mobile-app.png')}
            width={250}
            height={250}
          />
        </YStack>

        <YStack paddingBottom={bottom}>
          <View
            padding={"$4"}
            borderRadius={"$10"}
            backgroundColor={'#dde3fb'}
          >
            <Text
              fontSize={32}
              fontWeight={"bold"}
              textAlign={"center"}
              marginBottom={"$2"}
              color={"#4b61dc"}
            >
              Welcome back!
            </Text>
            <Text
              fontSize={16}
              textAlign={"center"}
              marginBottom={"$4"}
              color={"#666"}
            >
              Sign in to continue
            </Text>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              icon={<EnvelopeIcon size={20} color="#9CA3AF" />}
              value={email}
              onChangeText={setEmail}
            />

            <Input
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              icon={<LockClosedIcon size={20} color="#9CA3AF" />}
              value={password}
              onChangeText={setPassword}
            />

            <Button 
              title="Login" 
              marginBottom={"$4"}
              onPress={handleLogin}
              disabled={loading}
            />
            <View paddingBottom={"$4"}>
              <Link href={{ pathname: '/register' }} asChild>
                <Text color={"#4b61dc"} textAlign='center'>
                  Don't have an account? Sign up
                </Text>
              </Link>
            </View>
          </View>
        </YStack>
      </YStack>
    </Theme>
  );
};
