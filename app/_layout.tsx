import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/client';


import config from '../tamagui.config';
import { useAuthStore } from '~/store/authStore';
import { useProtectedRoute } from '~/hooks/useProtectedRoute';

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const { checkAuth } = useAuthStore();
  useProtectedRoute();

  useEffect(() => {
    if (loaded) {
      checkAuth();
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView>
      <ApolloProvider client={client}>
        <TamaguiProvider config={config}>
          <StatusBar style="auto" />
          <BottomSheetModalProvider>
            <Stack> 
              <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }}  />
              <Stack.Screen name="login" options={{ headerShown: false }}  />
              <Stack.Screen name="register" options={{ headerShown: false }}  />
            </Stack>
          </BottomSheetModalProvider>
        </TamaguiProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
    
  );
}