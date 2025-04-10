import { YStack, XStack, Theme, Text, View, ScrollView } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {  TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLongLeftIcon } from "react-native-heroicons/outline";
import { PencilIcon, TrashIcon } from "react-native-heroicons/solid";
import { useQuery, useMutation } from '@apollo/client';
import { GET_TRANSACTION_QUERY, DELETE_TRANSACTION_MUTATION } from '~/apollo/mutations';
import { GetTransactionResponse, DeleteTransactionMutationVariables } from '~/apollo/types';
import { format, parseISO } from 'date-fns';
import { useAuthStore } from '~/store/authStore';

type TransactionDetailProps = {
    id: string;
};

export const ScreenContent = ({ id }: TransactionDetailProps) => {
    const router = useRouter();
    const { top } = useSafeAreaInsets();
    const { user } = useAuthStore();
    const currency = user?.currency;
    
    const [deleteTransaction, { loading: deleteLoading }] = useMutation<
        { deleteTransaction: { id: string } },
        DeleteTransactionMutationVariables
    >(DELETE_TRANSACTION_MUTATION, {
        onCompleted: () => {
            router.back();
        },
        onError: (error) => {
            Alert.alert('Error', 'Failed to delete transaction: ' + error.message);
        },
        update: (cache, { data }) => {
            if (data?.deleteTransaction) {
                cache.evict({ id: `Transaction:${data.deleteTransaction.id}` });
                cache.gc();
            }
        },
        refetchQueries: ['GetTransactions']
    });
    
    const { loading, error, data } = useQuery<GetTransactionResponse>(
        GET_TRANSACTION_QUERY,
        {
            variables: { id: parseFloat(id as string) },
            fetchPolicy: 'network-only',
        }
    );
    
    const handleDeleteTransaction = () => {
        Alert.alert(
            'Delete Transaction',
            'Are you sure you want to delete this transaction?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: () => {
                        deleteTransaction({
                            variables: { id: parseFloat(id as string) }
                        });
                    }
                }
            ]
        );
    };
    
    if (loading) {
        return (
            <Theme name="light">
                <YStack flex={1} justifyContent="center" alignItems="center">
                    <ActivityIndicator size="large" color="#4b61dc" />
                </YStack>
            </Theme>
        );
    }
    
    if (error || !data?.transaction) {
        return (
            <Theme name="light">
                <YStack flex={1} justifyContent="center" alignItems="center">
                    <Text color="red">Error loading transaction details</Text>
                </YStack>
            </Theme>
        );
    }
    
    const transaction = data.transaction;
    const formattedDate = format(parseISO(transaction.date), 'EEE, MMM d, yyyy');
    
    return (
        <Theme name="light">
        <YStack flex={1} backgroundColor="#f9f9f9">
            {/* Header */}
            <YStack
            paddingHorizontal="$4"
            paddingTop={top + 10}
            backgroundColor="white"
            >
            <XStack alignItems="center" paddingVertical="$2" space={10}>
                <TouchableOpacity
                style={{
                    backgroundColor: '#dde3fb',
                    padding: 12,
                    borderRadius: 1000,
                    alignSelf: 'flex-start'
                }}
                onPress={() => router.back()}
                >
                <ArrowLongLeftIcon size={25} color="#4b61dc" /> 
                </TouchableOpacity>
                <Text fontSize={22} fontWeight="700" color="#4b61dc">
                Transaction Details
                </Text>
            </XStack>
            </YStack>
            
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 100,
                paddingHorizontal: 16,
            }}
            >
            {/* Transaction Amount Card */}
            <YStack
                alignItems="center"
                paddingVertical="$6"
                marginTop="$4"
                backgroundColor="white"
                borderRadius={20}
            >
                <View 
                backgroundColor={transaction.type === 'EXPENSE' ? "#ffeded" : "#e3fff0"}
                borderRadius={20}
                alignItems="center"
                justifyContent="center"
                width={64}
                height={64}
                marginBottom="$4"
                >
                <Text fontSize={32}>{transaction.category.emoji}</Text>
                </View>
                
                <Text 
                fontSize={28} 
                fontWeight="700" 
                color={transaction.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                marginBottom="$2"
                >
                {transaction.type === 'EXPENSE' ? '-' : '+'}{transaction.amount.toLocaleString()} {currency}
                </Text>
                
                <XStack 
                backgroundColor={transaction.type === 'EXPENSE' ? "#ffeded" : "#e3fff0"}
                paddingHorizontal="$3"
                paddingVertical="$1"
                borderRadius={20}
                marginTop="$1"
                >
                <Text 
                    fontSize={16} 
                    color={transaction.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"} 
                    fontWeight="600"
                >
                    {transaction.category.name}
                </Text>
                </XStack>
            </YStack>
            
            {/* Transaction Details */}
            <YStack space="$4" marginTop="$5">
                {/* Transaction Info Section */}
                <YStack 
                backgroundColor="white" 
                borderRadius={20} 
                padding="$5" 
                space="$4"
                >
                <Text fontSize={18} fontWeight="700" color="#4b61dc" marginBottom="$1">
                    Transaction Information
                </Text>
                
                <YStack space="$3">
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Description</Text>
                    <Text fontSize={16} color="#333" fontWeight="600">{transaction.description}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Date</Text>
                    <Text fontSize={16} color="#333" fontWeight="600">{formattedDate}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Category</Text>
                    <Text fontSize={16} color="#333" fontWeight="600">{transaction.category.name}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Type</Text>
                    <XStack alignItems="center" space="$2">
                        <View
                        width={10}
                        height={10}
                        borderRadius={5}
                        backgroundColor={transaction.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                        />
                        <Text 
                        fontSize={16} 
                        fontWeight="600"
                        color={transaction.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                        >
                        {transaction.type === 'EXPENSE' ? 'Expense' : 'Income'}
                        </Text>
                    </XStack>
                    </YStack>
                </YStack>
                </YStack>

            </YStack>
            </ScrollView>
            
            {/* Action Buttons */}
            <XStack 
            position="absolute" 
            bottom={20} 
            left={0} 
            right={0} 
            justifyContent="center" 
            space="$4"
            paddingHorizontal="$4"
            >
            <TouchableOpacity style={{ flex: 1 }}>
                <XStack
                backgroundColor="#4b61dc"
                borderRadius={16}
                height={56}
                alignItems="center"
                justifyContent="center"
                space="$2"
                >
                <PencilIcon size={20} color="white" />
                <Text color="white" fontWeight="700" fontSize={16}>Edit</Text>
                </XStack>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={{ flex: 1 }} 
                onPress={handleDeleteTransaction}
                disabled={deleteLoading}
            >
                <XStack
                backgroundColor="white"
                borderColor="#dc4b4b"
                borderWidth={1.5}
                borderRadius={16}
                height={56}
                alignItems="center"
                justifyContent="center"
                space="$2"
                opacity={deleteLoading ? 0.7 : 1}
                >
                {deleteLoading ? (
                    <ActivityIndicator size="small" color="#dc4b4b" />
                ) : (
                    <>
                    <TrashIcon size={20} color="#dc4b4b" />
                    <Text 
                        color="#dc4b4b"
                        fontWeight="700" 
                        fontSize={16}
                    >
                        Delete
                    </Text>
                    </>
                )}
                </XStack>
            </TouchableOpacity>
            </XStack>
        </YStack>
        </Theme>
    );
};