import { Stack } from 'expo-router';

import { Container } from '~/components/Login/Container';
import { ScreenContent } from '~/components/Login/ScreenContent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login() {

  return (
    <>
      <Stack.Screen options={{ headerShown: false }}  />

      <Container>
        <ScreenContent/>
      </Container>
    </>
  );
}