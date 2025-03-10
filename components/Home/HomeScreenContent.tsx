import { YStack, H2, Separator, Theme, Image, Paragraph, View } from 'tamagui';
import { Link } from 'expo-router';
import { Button } from '~/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

type ScreenContentProps = {
  title: string;
};

export const ScreenContent = ({ title }: ScreenContentProps) => {
  const { bottom, top } = useSafeAreaInsets();
  const screenHeight = Dimensions.get('window').height;
  
  const minSpacing = Math.min(screenHeight * 0.5, -10);
  
  return (
    <Theme name="light">
      <YStack flex={1} padding="$4" space={minSpacing}>
        <YStack 
          flex={1} 
          alignItems="center" 
          justifyContent="center" 
          paddingTop={top}
        >
          <Image 
            source={require('../../assets/onboarding/accounting.png')}
            width={300}
            height={300}
          />
        </YStack>
        
        <YStack paddingBottom={bottom}>
          <View
            padding={"$3"}
            borderRadius={"$10"}
            backgroundColor={'#dde3fb'}
          >
            <H2 
              color="#4b61dc" 
              textAlign="center"
              fontSize="$10"
              fontWeight="bold"
              paddingHorizontal={"$3"}
              paddingTop={"$2"}
              marginTop={"$2"}
            >
              {title}
            </H2>
            <Paragraph
              color="$gray12"
              textAlign="center"
              fontSize="$4"
              fontWeight={500}
              marginBottom="$3"
            >
              Track expenses, manage budgets, and reach your financial goals with ease. CheeseFlow makes money management delightfully simple
            </Paragraph>
            <Link href={{ pathname: '/login'}} asChild>
              <Button title="Get Started" />
            </Link>
          </View>
        </YStack>
      </YStack>
    </Theme>
  );
};