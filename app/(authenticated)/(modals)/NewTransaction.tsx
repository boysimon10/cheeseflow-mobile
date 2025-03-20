import { Stack, Link } from 'expo-router';

import { Container } from '~/components/(authenticated)/(modals)/NewTransaction/NewTransactionContainer';
import { ModalContent } from '~/components/(authenticated)/(modals)/NewTransaction/NewTransactionModal';

export default function NewTransaction() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}  />
      <Container>
        <ModalContent/>
      </Container>
    </>
  );
}