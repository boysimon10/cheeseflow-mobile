import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useRef } from 'react';
import { TamaguiProvider } from 'tamagui';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot, useRouter, useSegments } from "expo-router";
import { View } from 'tamagui';

import { client } from '../apollo/client';
import config from '../tamagui.config';
import { useAuthStore } from '~/store/authStore';

function RootLayoutNav() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const checkAuthRef = useRef(useAuthStore.getState().checkAuth);
  const segments = useSegments();
  const router = useRouter();

  // Mettre à jour la référence à chaque render
  checkAuthRef.current = useAuthStore.getState().checkAuth;

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuthRef.current();
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error);
      }
    };
    
    verifyAuth();
  }, []); // Pas de dépendances pour éviter le cycle infini

  useEffect(() => {
    const inAuthGroup = segments[0] === "(authenticated)";

    if (!isAuthenticated && inAuthGroup) {
      router.replace("/login");
    } else if (isAuthenticated && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)");
    }
  }, [isAuthenticated, segments]);

  // Wrap Slot in a View with explicit background color
  return (
    <View flex={1} backgroundColor="white">
      <Slot />
    </View>
  );
}

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <TamaguiProvider config={config}>
            <BottomSheetModalProvider>
              <StatusBar style="auto" />
              <RootLayoutNav />
            </BottomSheetModalProvider>
          </TamaguiProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}