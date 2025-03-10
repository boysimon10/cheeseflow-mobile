import { Stack, Link } from 'expo-router';

import { Container } from '~/components/Home/HomeContainer';
import { ScreenContent } from '~/components/Home/HomeScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}  />
      <Container>
        <ScreenContent title="Simplify Your Finances"/>
      </Container>
    </>
  );
}