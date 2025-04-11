import { Stack, Link } from 'expo-router';

import { Container } from '~/components/Welcome/WelcomeContainer';
import { ScreenContent } from '~/components/Welcome/WelcomeScreenContent';


export default function Welcome() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}  />
      <Container>
        <ScreenContent/>
      </Container>
    </>
  );
}