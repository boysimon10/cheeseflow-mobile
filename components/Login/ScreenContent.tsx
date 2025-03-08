import { YStack, H2, Separator, Theme, Image, Paragraph, View } from 'tamagui';
import { Link } from 'expo-router';
import { Button } from '~/components/Button';
import { TextInput } from 'react-native-gesture-handler';


type ScreenContentProps = {
  title: string;
  /* children?: React.ReactNode; */
};

export const ScreenContent = ({ title }: ScreenContentProps) => {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center" padding="$6">
        <Image 
          source={require('../../assets/onboarding/mobile-app.png')}
          width={300}
          height={300}

          marginTop="$10"

        />
      </YStack>
      <View
          flex={1}
          width={"100%"}
          padding={"$4"}
          borderTopLeftRadius={"$10"}
          borderTopRightRadius={"$10"}
          backgroundColor={'#dde3fb'}
          marginTop={"$5"}
        >
            <Link href={{ pathname: '/'}} asChild>
              <Button title="Login" />
            </Link>
        </View>
    </Theme>
  );
};
