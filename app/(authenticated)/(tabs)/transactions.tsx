import { Stack, Link } from 'expo-router';

import { Container } from '~/components/(authenticated)/Transactions/TransactionsContainer';
import { ScreenContent } from '~/components/(authenticated)/Transactions/TransactionsScreenContent';

export default function Transactions() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}  />
      <Container>
        <ScreenContent/>
      </Container>
    </>
  );
}