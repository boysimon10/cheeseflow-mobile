import { Stack, useRouter } from 'expo-router';
import { YStack, Theme, Text, XStack, View, Button, Input, ScrollView } from 'tamagui';
import { TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import {   ArrowLongLeftIcon  } from 'react-native-heroicons/outline';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EMOJI_OPTIONS } from '~/constants/emoji_options'
import { useCategoryStore } from '~/store/useCategoryStore';

export const ModalContent = ()=> {
    const { 
        name, 
        emoji, 
        type, 
        setName,
        setEmoji,
        setType,
        reset 
    } = useCategoryStore();
        const router = useRouter();
        const { top } = useSafeAreaInsets();

    const handleSubmit = () => {
        if (!name.trim()) {
        alert('Please enter a category name');
        return;
        }

        if (!emoji) {
        alert('Please select an emoji');
        return;
        }

        const createCategoryInput = {
        name: name.trim(),
        emoji,
        type
        };

        console.log('Submitting category:', createCategoryInput);
        
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.back();
    };

    const handleEmojiSelect = (selectedEmoji: string) => {
        Haptics.selectionAsync();
        setEmoji(selectedEmoji);
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
            <Text fontSize={24} fontWeight="bold" color={"#4b61dc"}>New Category</Text>
            </XStack>
            
            
            <ScrollView showsVerticalScrollIndicator={false} flex={1} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Category Name */}
                <YStack space="$2" marginBottom="$4">
                <Text fontSize={16} fontWeight="500" color={"#4b61dc"}>Category Name</Text>
                <Input
                    backgroundColor="white"
                    borderWidth={1}
                    borderColor="#E2E8F0"
                    height={50}
                    paddingHorizontal="$3"
                    fontSize={16}
                    fontWeight={'500'}
                    placeholder="Enter category name"
                    value={name}
                    onChangeText={setName}
                />
                </YStack>
                
                {/* Category Type */}
                <YStack space="$2" marginBottom="$4">
                <Text fontSize={16} fontWeight="500" color={"#4b61dc"}>Category Type</Text>
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
                {/* Emoji Selection */}
                <YStack space="$2" marginBottom="$4">
                <Text fontSize={16} fontWeight="500">Select Emoji</Text>
                <View
                    backgroundColor="white"
                    borderWidth={1}
                    borderColor="#e0e0e0"
                    padding="$3"
                    borderRadius={10}
                >
                    <XStack flexWrap="wrap" justifyContent="flex-start">
                    {EMOJI_OPTIONS.map((emojiOption, index) => (
                        <TouchableOpacity
                        key={index}
                        onPress={() => handleEmojiSelect(emojiOption)}
                        style={{ width: '16.66%', marginBottom: 12 }}
                        >
                        <View
                            backgroundColor={emoji === emojiOption ? "#e8ebff" : "transparent"}
                            borderRadius={8}
                            padding="$1"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text fontSize={24}>{emojiOption}</Text>
                        </View>
                        </TouchableOpacity>
                    ))}
                    </XStack>
                </View>
                </YStack>
                
                {/* Preview */}
                {(name || emoji) && (
                <YStack space="$2" marginBottom="$6">
                    <Text fontSize={16} fontWeight="500">Preview</Text>
                    <XStack 
                    backgroundColor="white" 
                    padding="$4" 
                    borderRadius={12}
                    alignItems="center"
                    justifyContent="space-between"
                    >
                    <XStack alignItems="center" space="$3">
                        <View 
                        backgroundColor={type === 'EXPENSE' ? "#ffeded" : "#e3fff0"}
                        padding="$2"
                        borderRadius={8}
                        alignItems="center"
                        justifyContent="center"
                        width={40}
                        height={40}
                        >
                        <Text fontSize={18}>{emoji || '?'}</Text>
                        </View>
                        <Text fontSize={16} color="#333">{name || 'Category Name'}</Text>
                    </XStack>
                    <XStack alignItems="center" space="$2">
                        <Text fontSize={14} color={type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}>
                        {type === 'EXPENSE' ? 'Expense' : 'Income'}
                        </Text>
                    </XStack>
                    </XStack>
                </YStack>
                )}
            </ScrollView>
            
            {/* Submit Button */}
            <XStack position="absolute" bottom={20} left={16} right={16}>
                <Button
                backgroundColor={type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                color="white"
                fontSize={16}
                fontWeight="500"
                height={50}
                flex={1}
                onPress={handleSubmit}
                disabled={!name.trim() || !emoji}
                opacity={!name.trim() || !emoji ? 0.5 : 1}
                borderRadius={10}
                >
                Create Category
                </Button>
            </XStack>
            </YStack>
        </YStack>
        </KeyboardAvoidingView>
        </Theme>
    );
}