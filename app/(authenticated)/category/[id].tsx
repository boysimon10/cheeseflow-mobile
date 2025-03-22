import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Container } from '~/components/(authenticated)/Category/CategoryContainer';
import { ScreenContent } from '~/components/(authenticated)/Category/CategoryScreenContainer';

const CategoryDetails = () => {
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

export default CategoryDetails;