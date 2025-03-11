import { Stack, Link } from 'expo-router';

import { Container } from '~/components/(authenticated)/Home/HomeContainer';
import { ScreenContent } from '~/components/(authenticated)/Home/HomeScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}  />
      <Container>
        <ScreenContent/>
      </Container>
    </>
  );
}