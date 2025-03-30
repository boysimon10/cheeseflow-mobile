import { YStack, Text, Spinner } from "tamagui";
import { TransactionCard } from "./TransactionCard";
import { format } from "date-fns";
import { ApolloError } from "@apollo/client";
import { Transaction } from "~/apollo/types";

type LastTransactionsListProps = {
  transactions: Transaction[];
  loading: boolean;
  error?: ApolloError;
  currency: string;
}

export const LastTransactionsList = ({ 
  transactions, 
  loading, 
  error, 
  currency 
}: LastTransactionsListProps) => {

  if (loading) {
    return (
      <YStack alignItems="center" paddingVertical="$4">
        <Spinner size="large" color="#4b61dc" />
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack alignItems="center" paddingVertical="$4">
        <Text color="#dc4b4b">Error loading transactions</Text>
      </YStack>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <YStack alignItems="center" paddingVertical="$4">
        <Text color="#666">No transactions found</Text>
      </YStack>
    );
  }

  return (
    <YStack space={6}>
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          category={transaction.category.name}
          emoji={transaction.category.emoji}
          date={format(new Date(transaction.date), "EEE, MMM d")}
          description={transaction.description}
          amount={transaction.amount.toString()}
          currency={currency}
          type={transaction.type}
        />
      ))}
    </YStack>
  );
};