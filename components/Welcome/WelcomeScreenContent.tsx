import React from 'react';
import { YStack, H2, Theme, Image, Paragraph, View } from 'tamagui';
import { Link } from 'expo-router';
import { Button } from '~/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing,
  interpolate
} from 'react-native-reanimated';

export const ScreenContent = () => {
  const { bottom, top } = useSafeAreaInsets();
  const screenHeight = Dimensions.get('window').height;
  
  const minSpacing = Math.min(screenHeight * 0.5, -10);


  const imageAnimation = useSharedValue(0);
  
  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      opacity: imageAnimation.value,
      transform: [
        { scale: interpolate(imageAnimation.value, [0, 1], [0.8, 1]) }
      ]
    };
  });
  
  const textContainerAnimation = useSharedValue(0);
  
  const animatedTextContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(textContainerAnimation.value, [0, 1], [0, 1]),
      transform: [
        { translateY: interpolate(textContainerAnimation.value, [0, 1], [30, 0]) }
      ]
    };
  });
  
  React.useEffect(() => {
    
    imageAnimation.value = withTiming(1, { 
      duration: 800, 
      easing: Easing.out(Easing.quad) 
    });
    
    textContainerAnimation.value = withDelay(
      400, 
      withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) })
    );
  }, []);
  
  return (
    <Theme name="light">
      <YStack flex={1} padding="$4" space={minSpacing}>
        <YStack 
          flex={1} 
          alignItems="center" 
          justifyContent="center" 
          paddingTop={top}
        >
          <Animated.View style={animatedImageStyle}>
            <Image 
              source={require('../../assets/onboarding/accounting.png')}
              width={300}
              height={300}
            />
          </Animated.View>
        </YStack>
        
        <Animated.View style={animatedTextContainerStyle}>
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
                paddingHorizontal={"$8"}
                paddingTop={"$2"}
                marginTop={"$2"}
              >
                Simplify Your Finances
              </H2>
              <Paragraph
                color="$gray12"
                textAlign="center"
                fontSize="$4"
                fontWeight={500}
                marginBottom={"$3"}
                paddingHorizontal={"$4"}
              >
                Track expenses, manage budgets, and reach your financial goals with ease. CheeseFlow makes money management delightfully simple
              </Paragraph>
              <Link href={{ pathname: '/login'}} asChild>
                <Button title="Get Started" />
              </Link>
            </View>
          </YStack>
        </Animated.View>
      </YStack>
    </Theme>
  );
};