import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text } from 'tamagui';
import { Link } from 'expo-router';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/outline';

/* type ScreenContentProps = {
  title: string;
   children?: React.ReactNode; 
}; */

export const ScreenContent = () => {
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
            source={require('../../assets/onboarding/mobile-app.png')}
            width={250}
            height={250}
          />
        </YStack>

        <YStack paddingBottom={bottom}>
          <View
            padding={"$4"}
            borderRadius={"$10"}
            backgroundColor={'#dde3fb'}
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
              icon={<EnvelopeIcon size={20} color="#9CA3AF" />}
            />

            <Input
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              icon={<LockClosedIcon size={20} color="#9CA3AF" />}
            />

            <Link href={{ pathname: '/(authenticated)/(tabs)'}} asChild>
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
        </YStack>
    </Theme>
  );
};
