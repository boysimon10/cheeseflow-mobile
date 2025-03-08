import { YStack, H2, Separator, Theme, Image, Paragraph, View } from 'tamagui';
import { Link } from 'expo-router';
import { Button } from '~/components/Button';


type ScreenContentProps = {
  title: string;
  /* children?: React.ReactNode; */
};

export const ScreenContent = ({ title }: ScreenContentProps) => {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center" padding="$4">
        <Image 
          source={require('../../assets/onboarding/accounting.png')}
          width={300}
          height={300}
          marginBottom="$2"

        />
        <View
          padding={"$3"}
          borderRadius={"$10"}
          backgroundColor={'#dde3fb'}
          marginTop={"$4"}
        >
            <H2 
              color="$gray12" 
              textAlign="center"
              fontSize="$10"
              fontWeight="bold"
              padding={"$2"}
              marginTop={"$2"}
            >
              {title}
            </H2>
            <Paragraph
              color="$gray12"
              textAlign="center"
              fontSize="$4"
              fontWeight={600}
              marginBottom="$2"
            >
              Track expenses, manage budgets, and reach your financial goals with ease. CheeseFlow makes money management delightfully simple
            </Paragraph>
            <Link href={{ pathname: '/login'}} asChild>
              <Button title="Get Started" />
            </Link>
        </View>
      </YStack>
    </Theme>
  );
};
