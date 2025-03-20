import { Stack, Link } from 'expo-router';

import { Container } from '~/components/(authenticated)/(modals)/NewCategory/NewCategoryContainer';
import { ModalContent } from '~/components/(authenticated)/(modals)/NewCategory/NewCategoryModal';

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