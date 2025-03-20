import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { YStack, Theme, Text, XStack, View, Button, Input, ScrollView, Separator } from 'tamagui';
import { TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import {  XMarkIcon, ArrowLongLeftIcon } from 'react-native-heroicons/outline';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTransactionStore } from '~/store/useTransactionStore';

type Category = {
  id: number;
  name: string;
  emoji: string;
  type: 'EXPENSE' | 'INCOME';
};

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Alimentation", emoji: "🍔", type: "EXPENSE" },
  { id: 2, name: "Salaire", emoji: "💰", type: "INCOME" },
  { id: 3, name: "Transport", emoji: "🚗", type: "EXPENSE" },
  { id: 4, name: "Loisirs", emoji: "🎮", type: "EXPENSE" },
  { id: 5, name: "Freelance", emoji: "💻", type: "INCOME" },
];

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
    const router = useRouter();
    const { top, bottom } = useSafeAreaInsets();

    useEffect(() => {
        const filtered = MOCK_CATEGORIES.filter(category => category.type === type);
        setFilteredCategories(filtered);
        
        if (categoryId !== null) {
        const currentCategory = MOCK_CATEGORIES.find(cat => cat.id === categoryId);
        if (currentCategory?.type !== type) {
            setCategoryId(null);
        }
        }
    }, [type]);

    const handleSubmit = () => {

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

    const createTransactionInput = {
        amount: parseFloat(amount),
        description: description.trim(),
        type,
        categoryId
    };

    console.log('Submitting transaction:', createTransactionInput);
    

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
    };

    const getSelectedCategory = () => {
        return MOCK_CATEGORIES.find(cat => cat.id === categoryId);
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
            <Stack.Screen 
                options={{ 
                headerShown: false 
                }} 
            />
            
            <YStack paddingTop={top} paddingHorizontal="$4" space="$4" flex={1}>
                {/* Header */}
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
            <Text fontSize={24} fontWeight="bold" color={"#4b61dc"} >New Transaction</Text>
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
                
                {/* Category Selection */}
                <YStack space="$2" marginBottom="$4">
                    <Text fontSize={16} fontWeight="500" color="#4b61dc">Category</Text>
                    
                    {/* Selected Category */}
                    {categoryId !== null && (
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
                    {categoryId === null && (
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
                                setCategoryId(category.id);
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
                    {categoryId === null && filteredCategories.length > 0 && (
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
                    disabled={!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0 || !description.trim() || categoryId === null}
                    opacity={!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0 || !description.trim() || categoryId === null ? 0.5 : 1}
                    borderRadius={10}
                >
                    Save Transaction
                </Button>
                </XStack>
            </YStack>
            </YStack>
        </KeyboardAvoidingView>
        </Theme>
    );
}