import { Stack } from 'expo-router';

import { Container } from '~/components/Register/RegisterContainer';
import { ScreenContent } from '~/components/Register/RegisterScreenContent';
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