import { Stack } from 'expo-router';

import { Container } from '~/components/Login/LoginContainer';
import { ScreenContent } from '~/components/Login/LoginScreenContent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login() {

  return (
    <>
      <Container>
        <ScreenContent/>
      </Container>
    </>
  );
}