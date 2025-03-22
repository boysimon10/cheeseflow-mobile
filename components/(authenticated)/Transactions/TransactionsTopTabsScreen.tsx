import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text, XStack, ScrollView } from 'tamagui';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, TouchableOpacity } from 'react-native';
import { TransactionCard } from '../Home/TransactionCard';
import { TransactionItem } from './TransactionItem';
import { PlusIcon } from "react-native-heroicons/outline";
import { useRouter } from 'expo-router';
import { useFilterStore } from '~/store/useFilterStore';
import * as Haptics from 'expo-haptics';

export const TransactionsTopTabsScreen = () => {
    const router = useRouter();
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);
    const { transactionFilter, setTransactionFilter } = useFilterStore();
    
    return (
        <Theme name="light">
            <YStack flex={1} paddingHorizontal="$4" space={minSpacing}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 100,
                        paddingTop: 10,
                    }}
                >
                    {/* Filter XStack with Add Button */}
                    <XStack
                        paddingVertical="$2"
                        marginBottom="$3"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {/* Filter Options */}
                        <XStack space="$2">
                            <TouchableOpacity onPress={() =>{ 
                                setTransactionFilter('ALL');
                                Haptics.selectionAsync();
                                }}>
                                <View
                                    backgroundColor={transactionFilter === 'ALL' ? "#4b61dc" : "white"}
                                    borderRadius="$10"
                                    paddingHorizontal="$4"
                                    paddingVertical="$2"
                                >
                                    <Text 
                                    color={transactionFilter === 'ALL' ? "white" : "#4b61dc"}
                                    fontSize={14}
                                    >All</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() => {
                                setTransactionFilter('INCOME')
                                Haptics.selectionAsync();
                                }}>
                                <View
                                    backgroundColor={transactionFilter === 'INCOME' ? "#4b61dc" : "white"}
                                    borderRadius="$10"
                                    paddingHorizontal="$4"
                                    paddingVertical="$2"
                                >
                                    <Text 
                                    color={transactionFilter === 'INCOME' ? "white" : "#4b61dc"}
                                    fontSize={14}>Income</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() => {
                                setTransactionFilter('EXPENSE')
                                Haptics.selectionAsync();
                                }}>
                                <View
                                    backgroundColor={transactionFilter === 'EXPENSE' ? "#4b61dc" : "white"}
                                    borderRadius="$10"
                                    paddingHorizontal="$4"
                                    paddingVertical="$2"
                                >
                                    <Text 
                                    color={transactionFilter === 'EXPENSE' ? "white" : "#4b61dc"}
                                    fontSize={14}
                                    >Expense</Text>
                                </View>
                            </TouchableOpacity>
                        </XStack>
                        
                        {/* Add Transaction Button */}
                        <TouchableOpacity onPress={() => router.push('/NewTransaction')}>
                            <View
                                backgroundColor="#4b61dc"
                                borderRadius="$5"
                                width={36}
                                height={36}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <PlusIcon size={20} color="white" />
                            </View>
                        </TouchableOpacity>
                    </XStack>

                    <YStack>
                    <XStack 
                                justifyContent="space-between" 
                                alignItems="center" 
                                paddingVertical="$2"
                                marginBottom="$2"
                            >
                                <Text 
                                    fontSize={16} 
                                    fontWeight="600" 
                                    color="#333"
                                >
                                    February 2025
                                </Text>
                                
                                {/* Optional summary statistics */}
                                <Text 
                                    fontSize={14} 
                                    color="#666"
                                >
                                    3 transactions
                                </Text>
                            </XStack>
                    {/* Transaction Items */}
                        <TransactionItem 
                            id={1}
                            amount="25,000"
                            category="Alimentation"
                            description="Courses au supermarché"
                            date="Mon, Feb 12, 2025"
                            emoji="🛒"
                            type="EXPENSE"
                            onPress={(id) => {
                                console.log('Transaction pressed:', id);
                                router.push({
                                    pathname: '/transaction/[id]',
                                    params: { id: id}
                                });
                            }}
                        />
                        <TransactionItem 
                            id={2}
                            amount="150,000"
                            category="Salaire"
                            description="Salaire Novembre"
                            date="Mon, Feb 12, 2025"
                            emoji="💰"
                            type="INCOME"
                            onPress={(id) => {
                                console.log('Transaction pressed:', id);
                                router.push({
                                    pathname: '/transaction/[id]',
                                    params: { id: id }
                                });
                            }}
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
                    </YStack>
                </ScrollView>
            </YStack>
        </Theme>
    );
};