import { YStack, Theme, Text, XStack, ScrollView } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, RefreshControl } from 'react-native';
import * as Haptics from 'expo-haptics';
import { SummaryCard } from './SummaryCard';
import { ExpensesByCategoryCard } from './ExpensesByCategoryCard';
import { useQuery } from '@apollo/client';
import { 
    GET_EXPENSES_BY_CATEGORY_QUERY,
    GET_CURRENT_MONTH_HISTORY_QUERY
} from '~/apollo/mutations';
import { 
    GetExpensesByCategoryResponse,
    GetCurrentMonthHistoryResponse
} from '~/apollo/types';
import { useState, useCallback } from 'react';

export const ScreenContent = () => {
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);
    const [refreshing, setRefreshing] = useState(false);
    
    const { 
        data: monthHistoryData, 
        loading: historyLoading,
        refetch: refetchHistory 
    } = useQuery<GetCurrentMonthHistoryResponse>(GET_CURRENT_MONTH_HISTORY_QUERY);
    
    const { 
        data: expensesByCategoryData, 
        loading: categoriesLoading,
        refetch: refetchCategories 
    } = useQuery<GetExpensesByCategoryResponse>(GET_EXPENSES_BY_CATEGORY_QUERY);
    
    const currentMonthData = monthHistoryData?.currentMonthHistory;

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        
        try {
            await Promise.all([
                refetchHistory(),
                refetchCategories()
            ]);
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    }, [refetchHistory, refetchCategories]);
    
    return (
        <Theme name="light">
            <YStack flex={1} space={minSpacing}>
                <XStack
                    paddingHorizontal="$4"
                    paddingTop="$8"
                    paddingBottom="$3"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    backgroundColor={"white"}
                >
                    <Text
                        fontSize={30}
                        fontWeight="700"
                        color="#4b61dc"
                    >
                        Statistics
                    </Text>
                </XStack>
                <YStack paddingHorizontal={"$4"}>
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
                        <YStack space="$1">
                            <SummaryCard 
                                monthlyExpenses={currentMonthData?.expenses} 
                                monthlyIncomes={currentMonthData?.incomes}
                                balance={currentMonthData?.balance}
                                isLoading={historyLoading}
                            />
                            <ExpensesByCategoryCard 
                                expensesByCategory={expensesByCategoryData?.expensesByCategory}
                                isLoading={categoriesLoading}
                            />
                        </YStack>
                    </ScrollView>
                </YStack>
            </YStack>
        </Theme>
    );
};