import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { YStack, Theme, Text, XStack, View, Button, Input, ScrollView, Separator } from 'tamagui';
import { TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { XMarkIcon, ArrowLongLeftIcon, CalendarIcon } from 'react-native-heroicons/outline';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTransactionStore } from '~/store/useTransactionStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TRANSACTION_MUTATION, GET_CATEGORIES_QUERY } from '~/apollo/mutations';
import { 
  CreateTransactionInput, 
  CreateTransactionMutationVariables, 
  TransactionType,
  GetCategoriesResponse,
  Category
} from '~/apollo/types';


export const ModalContent = ()=> {
    const { 
        amount, 
        description, 
        type, 
        categoryId,
        setAmount,
        setDescription,
        setType,
        setCategoryId,
        reset 
    } = useTransactionStore();
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const router = useRouter();
    const { top, bottom } = useSafeAreaInsets();
    
    const { data: categoriesData, loading: categoriesLoading } = useQuery<GetCategoriesResponse>(
        GET_CATEGORIES_QUERY
    );
    
    const [createTransaction, { loading: createLoading }] = useMutation<
        { createTransaction: { id: string } }, 
        CreateTransactionMutationVariables
    >(CREATE_TRANSACTION_MUTATION);

    useEffect(() => {
        if (categoriesData?.categories) {
            const filtered = categoriesData.categories.filter(
                category => category.type === type
            );
            setFilteredCategories(filtered);
            
            if (categoryId !== null) {
                const currentCategory = categoriesData.categories.find(
                    cat => cat.id === String(categoryId)
                );
                if (currentCategory?.type !== type) {
                    setCategoryId(null);
                }
            }
        }
    }, [type, categoriesData]);

    const handleSubmit = async () => {
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (!description.trim()) {
            alert('Please enter a description');
            return;
        }

        if (categoryId === null) {
            alert('Please select a category');
            return;
        }

        const createTransactionInput: CreateTransactionInput = {
            amount: parseFloat(amount),
            description: description.trim(),
            type: type as TransactionType,
            categoryId: Number(categoryId),
            date: date.toISOString()
        };

        try {
            await createTransaction({
                variables: {
                    createTransactionInput
                },
                refetchQueries: ['GetTransactions', 'GetBalance', 'GetCurrentMonthHistory', 'GetExpensesByCategory']
            });
            
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            reset(); 
            router.back();
        } catch (error) {
            console.error('Error creating transaction:', error);
            alert('Failed to create transaction. Please try again.');
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        // Ne ferme plus le picker ici pour iOS, seulement pour Android implicitement
        // setShowDatePicker(false); // <- Supprimer ou commenter cette ligne

        if (selectedDate) {
            setDate(selectedDate);

            Haptics.selectionAsync();
        }
    };

    const getSelectedCategory = () => {
        return categoriesData?.categories.find(cat => cat.id === String(categoryId));
    };

    const formatAmount = (value: string) => {
        const cleanedValue = value.replace(/[^0-9.]/g, '');
        
        const parts = cleanedValue.split('.');
        if (parts.length > 2) {
            return parts[0] + '.' + parts.slice(1).join('');
        }
        
        return cleanedValue;
    };

    return (
        <Theme name="light">
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <YStack flex={1} backgroundColor="#fff">         
            <YStack paddingTop="$2" paddingHorizontal="$4" space="$4" flex={1}>
                {/* Header */}
                <XStack 
                alignItems="center" 
                justifyContent='space-between'
                paddingVertical="$2" 
                space={10}
            >
            <Text fontSize={24} fontWeight="bold" color={"#4b61dc"} >New Transaction</Text>
                <TouchableOpacity
                style={{
                    backgroundColor: '#dde3fb',
                    padding: 8,
                    borderRadius: 1000,
                    alignSelf: 'flex-start'
                }}
                onPress={() => router.back()}
            >
                <XMarkIcon size={25} color="#4b61dc" /> 
            </TouchableOpacity>
                </XStack>
                    
                <ScrollView showsVerticalScrollIndicator={false} flex={1} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Transaction Type */}
                <YStack space="$2" marginBottom="$4">
                    <Text fontSize={16} fontWeight="500" color="#4b61dc">Transaction Type</Text>
                    <XStack space="$2">
                    <TouchableOpacity
                        onPress={() => {
                        Haptics.selectionAsync();
                        setType('EXPENSE');
                        }}
                        style={{ flex: 1 }}
                    >
                        <View
                        backgroundColor={type === 'EXPENSE' ? "#dc4b4b" : "white"}
                        borderWidth={1}
                        borderColor={type === 'EXPENSE' ? "#dc4b4b" : "#e0e0e0"}
                        padding="$3"
                        borderRadius={10}
                        alignItems="center"
                        >
                        <Text color={type === 'EXPENSE' ? "white" : "#333"}>Expense</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={() => {
                        Haptics.selectionAsync();
                        setType('INCOME');
                        }}
                        style={{ flex: 1 }}
                    >
                        <View
                        backgroundColor={type === 'INCOME' ? "#4bdc7d" : "white"}
                        borderWidth={1}
                        borderColor={type === 'INCOME' ? "#4bdc7d" : "#e0e0e0"}
                        padding="$3"
                        borderRadius={10}
                        alignItems="center"
                        >
                        <Text color={type === 'INCOME' ? "white" : "#333"}>Income</Text>
                        </View>
                    </TouchableOpacity>
                    </XStack>
                </YStack>
                
                {/* Amount */}
                <YStack space="$2" marginBottom="$4">
                    <Text fontSize={16} fontWeight="500" color="#4b61dc">Amount</Text>
                    <XStack alignItems="center">
                    <View marginRight="$2" width={15}>
                        <Text fontSize={20} color={type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}>
                        {type === 'EXPENSE' ? '-' : '+'}
                        </Text>
                    </View>
                    <Input
                        flex={1}
                        backgroundColor="white"
                        borderWidth={1}
                        borderColor="#E2E8F0"
                        height={50}
                        paddingHorizontal={16}
                        fontSize={18}
                        fontWeight={'500'}
                        placeholder="0.00"
                        value={amount}
                        onChangeText={(text) => setAmount(formatAmount(text))}
                        keyboardType="decimal-pad"
                    />
                    </XStack>
                </YStack>
                
                {/* Description */}
                <YStack space="$2" marginBottom="$4">
                    <Text fontSize={16} fontWeight="500" color="#4b61dc">Description</Text>
                    <Input
                    backgroundColor="white"
                    borderWidth={1}
                    borderColor="#E2E8F0"
                    height={50}
                    paddingHorizontal={16}
                    fontSize={16}
                    fontWeight={'500'}
                    placeholder="Enter description"
                    value={description}
                    onChangeText={setDescription}
                    />
                </YStack>

                {/* Date Picker */}
                <YStack space="$2" marginBottom="$4">
                    <Text fontSize={16} fontWeight="500" color="#4b61dc">Date</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                    >
                        <XStack 
                            backgroundColor="white"
                            borderWidth={1}
                            borderColor="#E2E8F0"
                            height={50}
                            paddingHorizontal={16}
                            borderRadius={8}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Text fontSize={16} color="#333">
                                {date.toLocaleDateString('fr-FR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}
                            </Text>
                            <CalendarIcon size={20} color="#4b61dc" />
                        </XStack>
                    </TouchableOpacity>
                    
                    {showDatePicker && (
                        <>
                        {Platform.OS === 'ios' && (
                            <XStack justifyContent="flex-end" marginTop="$2" marginBottom="$2">
                                <TouchableOpacity onPress={() => {
                                    // Ferme le picker uniquement quand "Done" est pressé sur iOS
                                    setShowDatePicker(false);
                                    Haptics.selectionAsync(); // Retour haptique à la confirmation
                                }}>
                                    <Text color="#4b61dc" fontWeight="500" fontSize={16}>Done</Text>
                                </TouchableOpacity>
                            </XStack>
                        )}
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onDateChange} // Continue de mettre à jour la date
                            maximumDate={new Date()}
                            style={{ marginTop: 10 }}
                        />
                    </>
                    )}
                </YStack>
                
                {/* Category Selection */}
                <YStack space="$2" marginBottom="$4">
                    <Text fontSize={16} fontWeight="500" color="#4b61dc">Category</Text>
                    
                    {/* Loading state */}
                    {categoriesLoading && (
                        <Text color="#666" textAlign="center" paddingVertical="$3">Loading categories...</Text>
                    )}
                    
                    {/* Selected Category */}
                    {!categoriesLoading && categoryId !== null && (
                    <XStack marginBottom="$2" alignItems="center" justifyContent="space-between">
                        <XStack alignItems="center" space="$2">
                        <View 
                            backgroundColor={type === 'EXPENSE' ? "#ffeded" : "#e3fff0"}
                            padding="$2"
                            borderRadius={8}
                            alignItems="center"
                            justifyContent="center"
                            width={36}
                            height={36}
                        >
                            <Text fontSize={16}>{getSelectedCategory()?.emoji}</Text>
                        </View>
                        <Text fontSize={16}>{getSelectedCategory()?.name}</Text>
                        </XStack>
                        
                        <TouchableOpacity onPress={() => {
                        Haptics.selectionAsync();
                        setCategoryId(null);
                        }}>
                        <View
                            backgroundColor="#f2f2f2"
                            borderRadius={20}
                            width={28}
                            height={28}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <XMarkIcon size={16} color="#666" />
                        </View>
                        </TouchableOpacity>
                    </XStack>
                    )}
                    
                    {/* Category List */}
                    {!categoriesLoading && categoryId === null && (
                    <View
                        backgroundColor="white"
                        borderWidth={1}
                        borderColor="#e0e0e0"
                        borderRadius={10}
                        overflow="hidden"
                    >
                        
                        {filteredCategories.map((category, index) => (
                            <React.Fragment key={category.id}>
                            <TouchableOpacity
                                onPress={() => {
                                Haptics.selectionAsync();
                                setCategoryId(Number(category.id));
                                }}
                            >
                                <XStack 
                                padding="$3"
                                alignItems="center"
                                space="$3"
                                >
                                <View 
                                    backgroundColor={type === 'EXPENSE' ? "#ffeded" : "#e3fff0"}
                                    padding="$2"
                                    borderRadius={8}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Text fontSize={16}>{category.emoji}</Text>
                                </View>
                                <Text fontSize={16}>{category.name}</Text>
                                </XStack>
                            </TouchableOpacity>
                            {index < filteredCategories.length - 1 && (
                                <Separator />
                            )}
                            </React.Fragment>
                        ))}
                        
                        {filteredCategories.length === 0 && (
                            <YStack padding="$4" alignItems="center">
                            <Text color="#666">No {type.toLowerCase()} categories found</Text>
                            <TouchableOpacity 
                                onPress={() => router.push('/NewCategory')}
                                style={{ marginTop: 10 }}
                            >
                                <Text color="#4b61dc">Create a new category</Text>
                            </TouchableOpacity>
                            </YStack>
                        )}
                        
                    </View>
                    )}
                    
                    {/* Add Category Button */}
                    {!categoriesLoading && categoryId === null && filteredCategories.length > 0 && (
                    <TouchableOpacity 
                        onPress={() => router.push('/NewCategory')}
                        style={{ marginTop: 8 }}
                    >
                        <Text color="#4b61dc">+ Add new category</Text>
                    </TouchableOpacity>
                    )}
                </YStack>
                </ScrollView>
                
                {/* Submit Button */}
                <XStack position="absolute" bottom={20 + bottom} left={16} right={16}>
                <Button
                    backgroundColor={type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                    color="white"
                    fontSize={16}
                    fontWeight="500"
                    height={50}
                    flex={1}
                    onPress={handleSubmit}
                    disabled={createLoading || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0 || !description.trim() || categoryId === null}
                    opacity={(createLoading || !amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0 || !description.trim() || categoryId === null) ? 0.5 : 1}
                    borderRadius={10}
                >
                    {createLoading ? "Saving..." : "Save Transaction"}
                </Button>
                </XStack>
            </YStack>
            </YStack>
        </KeyboardAvoidingView>
        </Theme>
    );
}