import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { format, parseISO } from 'date-fns';
import { YStack, XStack, Text, View } from 'tamagui';
import { TransactionItem } from './TransactionItem';
import { useRouter } from 'expo-router';
import { Transaction } from '~/apollo/types';
import * as Haptics from 'expo-haptics';
import { useAuthStore } from '~/store/authStore';
import { ApolloError } from '@apollo/client';

type GroupedTransactions = {
  month: string;
  data: Transaction[];
};

type TransactionsListProps = {
  filterType?: string;
  transactions: Transaction[];
  loading: boolean;
  error?: ApolloError;
  refetch: () => void;
  disableScroll?: boolean;
};

export const TransactionsList = ({ 
  filterType, 
  transactions, 
  loading, 
  error, 
  refetch,
  disableScroll
}: TransactionsListProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const currency = user?.currency;
  const [groupedTransactions, setGroupedTransactions] = useState<GroupedTransactions[]>([]);
  
  // Group transactions by month
  useEffect(() => {
    if (transactions.length > 0) {
      const grouped: Record<string, Transaction[]> = {};
      
      transactions.forEach(transaction => {
        const date = parseISO(transaction.date);
        const monthYear = format(date, 'MMMM yyyy');
        
        if (!grouped[monthYear]) {
          grouped[monthYear] = [];
        }
        
        grouped[monthYear].push(transaction);
      });
      
      // Convert to array for FlatList
      const result = Object.keys(grouped).map(month => ({
        month,
        data: grouped[month],
      }));
      
      // Sort by date (most recent month first)
      result.sort((a, b) => {
        const dateA = parseISO(a.data[0].date);
        const dateB = parseISO(b.data[0].date);
        return dateB.getTime() - dateA.getTime();
      });
      
      setGroupedTransactions(result);
    } else {
      setGroupedTransactions([]);
    }
  }, [transactions]);

  // grouper les transations par mois
  const renderGroup = ({ item }: { item: GroupedTransactions }) => (
    <YStack marginBottom="$4">
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
          {item.month}
        </Text>
        
        <Text 
          fontSize={14} 
          color="#666"
        >
          {item.data.length} transaction{item.data.length > 1 ? 's' : ''}
        </Text>
      </XStack>
      
      {item.data.map(transaction => (
        <TransactionItem 
          key={transaction.id}
          id={Number(transaction.id)}
          amount={transaction.amount.toLocaleString()}
          category={transaction.category.name}
          description={transaction.description}
          date={format(parseISO(transaction.date), 'EEE, MMM d, yyyy')}
          emoji={transaction.category.emoji}
          type={transaction.type as 'EXPENSE' | 'INCOME'}
          currency={currency || ''}
          onPress={(id) => {
            Haptics.selectionAsync();
            router.push({
              pathname: '/transaction/[id]',
              params: { id }
            });
          }}
        />
      ))}
    </YStack>
  );

  if (loading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#4b61dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text color="red">Error: {error.message}</Text>
      </View>
    );
  }

  if (transactions.length === 0) {
    return (
      <View flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text color="#666" textAlign="center">
          No transactions found. Create a new transaction to get started.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={groupedTransactions}
      renderItem={renderGroup}
      keyExtractor={item => item.month}
      showsVerticalScrollIndicator={false}
      scrollEnabled={!disableScroll} 
      refreshControl={
        <RefreshControl 
          refreshing={loading}
          onRefresh={refetch}
          colors={["#4b61dc"]}
          tintColor="#4b61dc"
        />
      }
      contentContainerStyle={{
        paddingBottom: disableScroll ? 0 : 100, 
        paddingTop: 10
      }}
    />
  );
};
