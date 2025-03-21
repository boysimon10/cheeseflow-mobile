import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Container } from '~/components/(authenticated)/Transaction/TransactionContainer';
import { ScreenContent } from '~/components/(authenticated)/Transaction/TransactionScreenContainer';

const TransactionDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false
        }} 
      />
      <Container>
        <ScreenContent id={id} />
      </Container>
    </>
  );
}

export default TransactionDetail;