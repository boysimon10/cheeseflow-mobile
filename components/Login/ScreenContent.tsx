import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text } from 'tamagui';
import { Link } from 'expo-router';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';


/* type ScreenContentProps = {
  title: string;
   children?: React.ReactNode; 
}; */

export const ScreenContent = () => {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center" padding="$4">
        <Image 
          source={require('../../assets/onboarding/mobile-app.png')}
          width={210}
          height={210}

          marginTop="$10"

        />

      <View
          flex={1}
          width={"100%"}
          padding={"$4"}
          borderRadius={"$10"}
          backgroundColor={'#dde3fb'}
          marginTop={"$5"}
        >
            <Text
              fontSize={32}
              fontWeight={"bold"}
              textAlign={"center"}
              marginBottom={"$2"}
              color={"#4b61dc"}
            >
              Welcome back!
            </Text>
            <Text
              fontSize={16}
              textAlign={"center"}
              marginBottom={"$4"}
              color={"#666"}
            >
              Sign in to continue
            </Text>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Link href={{ pathname: '/'}} asChild>
              <Button title="Login" marginBottom={"$4"}/>
            </Link>
            <View paddingBottom={"$4"}>
              <Link href={{ pathname: '/register' }} asChild>
                <Text color={"#4b61dc"} textAlign='center'>
                  Don't have an account? Sign up
                </Text>
              </Link>
            </View>
        </View>
        </YStack>
    </Theme>
  );
};
