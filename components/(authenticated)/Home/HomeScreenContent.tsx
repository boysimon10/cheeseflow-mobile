import { YStack, Theme, Text, XStack, ScrollView, Spinner } from 'tamagui';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, RefreshControl } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { BalanceCard } from './BalanceCard';
import { useAuthStore } from '~/store/authStore';
import { GET_BALANCE_QUERY, GET_TRANSACTIONS_QUERY } from '~/apollo/mutations';
import { useQuery } from '@apollo/client';
import { LastTransactionsList } from './LastTransactionsList';
import { useState, useCallback } from 'react';
import { GetBalanceResponse, GetTransactionsResponse, TransactionFilterInput } from '~/apollo/types';

export const ScreenContent = () => {
    const router = useRouter();
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);
    const { user } = useAuthStore();
    const [refreshing, setRefreshing] = useState(false);

    const { data: balanceData, loading: balanceLoading, refetch: refetchBalance } = useQuery<GetBalanceResponse>(GET_BALANCE_QUERY);
    const balance = balanceData?.balance || 0;
    
    const { 
        data: transactionsData, 
        loading: transactionsLoading, 
        error: transactionsError,
        refetch: refetchTransactions 
    } = useQuery<GetTransactionsResponse, { filters?: TransactionFilterInput }>(GET_TRANSACTIONS_QUERY, {
        variables: {
            filters: {
                limit: 5
            }
        }
    });

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        
        try {
            await Promise.all([
                refetchBalance(),
                refetchTransactions()
            ]);
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    }, [refetchBalance, refetchTransactions]);
    
    return (
    <Theme name="light">
        <YStack flex={1} paddingHorizontal="$4" space={minSpacing}>
            <XStack
                paddingTop="$6"
                paddingBottom="$2"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
            >
                <YStack>
                    <Text
                        fontSize={16}
                        fontWeight="400"
                        color="#4b61dc"
                    >
                        Hello,
                    </Text>
                    <Text
                        fontSize={24}
                        fontWeight="700"
                        color="#4b61dc"
                    >
                        {user?.name}
                    </Text>
                </YStack>
                <TouchableOpacity
                style={{
                    backgroundColor: '#dde3fb',
                    padding: 8,
                    borderRadius: 1000,
                    alignSelf: 'flex-start'
                    }}
                onPress={() => {Haptics.selectionAsync();}}
                >
                    <MagnifyingGlassIcon size={25} color="#4b61dc" />
                </TouchableOpacity>
            </XStack>
            <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 200,
                    }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#4b61dc"
                        colors={["#4b61dc"]}
                    />
                }
            >
            <YStack paddingTop="$2">
                <BalanceCard balance={balance}/>

                <YStack space={6}>
                    <XStack 
                        justifyContent="space-between" 
                        alignItems="center"
                        paddingVertical="$2"
                        paddingTop="$4"
                    >
                        <Text
                            fontSize={18}
                            fontWeight="700"
                            color="#4b61dc"
                        >
                            Recent Transactions
                        </Text>
                        <TouchableOpacity onPress={() => {Haptics.selectionAsync();}}>
                            <Text
                                fontSize={14}
                                fontWeight={"500"}
                                color="#4b61dc"
                                onPress={() => {
                                    Haptics.selectionAsync();
                                    router.push('/transactions');
                                }}
                            >
                                See all
                            </Text>
                        </TouchableOpacity>
                    </XStack>
                    <LastTransactionsList 
                        transactions={transactionsData?.transactions || []}
                        loading={transactionsLoading}
                        error={transactionsError}
                        currency={user?.currency || "XOF"}
                    />
                </YStack>
            </YStack>
            </ScrollView>
        </YStack>
    </Theme>
    );
};