import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text, XStack, ScrollView } from 'tamagui';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { TransactionCard } from '../Home/TransactionCard';
import { TransactionItem } from './TransactionItem';

export const TransactionsTopTabsScreen = () => {
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
                    
                <TransactionItem 
                    id={1}
                    amount="25,000"
                    category="Alimentation"
                    description="Courses au supermarché"
                    date="Mon, Feb 12, 2025"
                    emoji="🛒"
                    type="EXPENSE"
                    onPress={(id) => console.log('Transaction pressed:', id)}
                />
                <TransactionItem 
                    id={2}
                    amount="150,000"
                    category="Salaire"
                    description="Salaire Novembre"
                    date="Mon, Feb 12, 2025"
                    emoji="💰"
                    type="INCOME"
                    onPress={(id) => console.log('Transaction pressed:', id)}
                />
                <TransactionItem 
                    id={3}
                    amount="5,000"
                    category="Transport"
                    description="Taxi"
                    date="Mon, Feb 12, 2025"
                    emoji="🚕"
                    type="EXPENSE"
                    onPress={(id) => console.log('Transaction pressed:', id)}
                />
            </ScrollView>
            </YStack>
        </Theme>
    );
};