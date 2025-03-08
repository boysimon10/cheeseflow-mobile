import { Stack, Link } from 'expo-router';

import { Container } from '~/components/Home/Container';
import { ScreenContent } from '~/components/Home/ScreenContent';

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