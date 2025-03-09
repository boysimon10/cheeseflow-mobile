import { Stack } from 'expo-router';

import { Container } from '~/components/Register/Container';
import { ScreenContent } from '~/components/Register/ScreenContent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Register() {

  return (
    <>
      <Stack.Screen options={{ headerShown: false }}  />

      <Container>
        <ScreenContent/>
      </Container>
    </>
  );
}