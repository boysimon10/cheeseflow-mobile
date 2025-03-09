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
            placeholder="Full Name"
            autoCapitalize="words"
            autoCorrect={false}
          />
          
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
          
          <Input
            placeholder="Confirm Password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <Link href={{ pathname: '/'}} asChild>
            <Button title="Register" marginBottom={"$4"}/>
          </Link>
          
          <View paddingBottom={"$4"}>
            <Link href={{ pathname: '/' }} asChild>
              <Text color={"#4b61dc"} textAlign='center'>
                Already have an account? Sign in
              </Text>
            </Link>
          </View>
        </View>
        </YStack>
    </Theme>
  );
};
