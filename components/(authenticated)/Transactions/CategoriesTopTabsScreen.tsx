import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text, XStack, ScrollView } from 'tamagui';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { TransactionCard } from '../Home/TransactionCard';

export const CategoriesTopTabsScreen = () => {
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);
    
    return (
        <Theme name="light">
            <YStack flex={1} padding="$4" space={minSpacing}>
            
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                >
                    
                <TransactionCard />
            </ScrollView></YStack>
        </Theme>
    );
};