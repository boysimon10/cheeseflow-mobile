import { Stack } from 'expo-router';

import { Container } from '~/components/(authenticated)/Statistics/StatisticsContainer';
import { ScreenContent } from '~/components/(authenticated)/Statistics/StatisticsScreenContent';

export default function Statistics() {
  return (
    <>
        <Stack.Screen options={{ headerShown: false }}  />
        <Container>
          <ScreenContent/>
        </Container>
    </>
  );
}