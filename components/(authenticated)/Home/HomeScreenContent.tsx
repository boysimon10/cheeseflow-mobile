import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text } from 'tamagui';
import { Link } from 'expo-router';
import { Button } from '~/components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';


export const ScreenContent = () => {
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
  
    const minSpacing = Math.min(screenHeight * 0.5, -10);

    return (
    <Theme name="light">
        <YStack flex={1} padding="$4" space={minSpacing}>
            <Text>
                Welcome
            </Text>
        </YStack>
    </Theme>
    );
};