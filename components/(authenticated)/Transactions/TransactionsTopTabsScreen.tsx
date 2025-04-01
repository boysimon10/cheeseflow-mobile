import { YStack, Theme, View, Text, XStack } from 'tamagui';
import { Dimensions, TouchableOpacity } from 'react-native';
import { PlusIcon } from "react-native-heroicons/outline";
import { useRouter } from 'expo-router';
import { useFilterStore } from '~/store/useFilterStore';
import * as Haptics from 'expo-haptics';
import { TransactionsList } from './TransactionsList';
import { useQuery } from '@apollo/client';
import { GET_TRANSACTIONS_QUERY } from '~/apollo/mutations';
import { GetTransactionsResponse } from '~/apollo/types';

export const TransactionsTopTabsScreen = () => {
    const router = useRouter();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);
    const { transactionFilter, setTransactionFilter } = useFilterStore();
    
    const { loading, error, data, refetch } = useQuery<GetTransactionsResponse>(
        GET_TRANSACTIONS_QUERY,
        {
            variables: {
                filters: {
                    type: transactionFilter !== 'ALL' ? transactionFilter : undefined,
                },
            },
            fetchPolicy: 'network-only',
        }
    );
    
    return (
        <Theme name="light">
            <YStack flex={1} paddingHorizontal="$4" space={minSpacing}>
                {/* Filter XStack with Add Button */}
                <XStack
                    paddingVertical="$4"
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

                {/* Transactions List */}
                <TransactionsList 
                    filterType={transactionFilter} 
                    transactions={data?.transactions || []}
                    loading={loading}
                    error={error}
                    refetch={refetch}
                />
            </YStack>
        </Theme>
    );
};