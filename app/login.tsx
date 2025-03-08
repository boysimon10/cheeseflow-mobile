import { Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'tamagui';

import { Container } from '~/components/Login/Container';
import { ScreenContent } from '~/components/Login/ScreenContent';

export default function Login() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }}  />
      <Container>
        <ScreenContent/>
      </Container>
    </>
  );
}
