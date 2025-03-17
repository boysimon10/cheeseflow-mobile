import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text, XStack, ScrollView } from 'tamagui';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { TransactionCard } from '../Home/TransactionCard';
import { CategoryItem } from './CategoryItem';

export const CategoriesTopTabsScreen = () => {
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);
    
    return (
        <Theme name="light">
            <YStack flex={1} paddingHorizontal="$4" space={minSpacing}>
            
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100,
                    paddingTop: 20,
                }}
                >
                    
                <CategoryItem 
                    id={1}
                    name="Alimentation"
                    emoji="🍔"
                    type="EXPENSE"
                    onPress={(id) => console.log('Category pressed:', id)}
                />
                <CategoryItem 
                    id={2}
                    name="Salaire"
                    emoji="💰"
                    type="INCOME"
                    onPress={(id) => console.log('Category pressed:', id)}
                />
                <CategoryItem 
                    id={3}
                    name="Transport"
                    emoji="🚗"
                    type="EXPENSE"
                    onPress={(id) => console.log('Category pressed:', id)}
                />
                <CategoryItem 
                    id={4}
                    name="Loisirs"
                    emoji="🎮"
                    type="EXPENSE"
                    onPress={(id) => console.log('Category pressed:', id)}
                />
                <CategoryItem 
                    id={5}
                    name="Freelance"
                    emoji="💻"
                    type="INCOME"
                    onPress={(id) => console.log('Category pressed:', id)}
                />
            </ScrollView></YStack>
        </Theme>
    );
};