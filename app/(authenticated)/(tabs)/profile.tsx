import { Stack, Link } from 'expo-router';

import { Container } from '~/components/(authenticated)/Profile/ProfileContainer';
import { ScreenContent } from '~/components/(authenticated)/Profile/ProfileScreenContent';

export default function Profile() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}  />
      <Container>
        <ScreenContent/>
      </Container>
    </>
  );
}