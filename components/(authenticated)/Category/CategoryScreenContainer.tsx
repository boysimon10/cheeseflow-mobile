import { YStack, XStack, Theme, Text, View, ScrollView } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLongLeftIcon } from "react-native-heroicons/outline";
import { PencilIcon, TrashIcon } from "react-native-heroicons/solid";
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_QUERY } from '~/apollo/mutations';
import { GetCategoryResponse, Category } from '~/apollo/types';

type CategoryType = 'EXPENSE' | 'INCOME';

type CategoryDetailProps = {
    id: string;
};

export const ScreenContent = ({ id }: CategoryDetailProps) => {
    const router = useRouter();
    const { top } = useSafeAreaInsets();
    
    const { loading, error, data } = useQuery<GetCategoryResponse>(
        GET_CATEGORY_QUERY,
        {
            variables: {
                id: Number(id)
            },
            fetchPolicy: 'network-only',
        }
    );
    
    if (loading) {
        return (
            <Theme name="light">
                <YStack flex={1} backgroundColor="#f9f9f9" justifyContent="center" alignItems="center">
                    <ActivityIndicator size="large" color="#4b61dc" />
                </YStack>
            </Theme>
        );
    }
    
    if (error) {
        return (
            <Theme name="light">
                <YStack flex={1} backgroundColor="#f9f9f9" justifyContent="center" alignItems="center" padding="$4">
                    <Text color="red" textAlign="center">Error: {error.message}</Text>
                </YStack>
            </Theme>
        );
    }
    
    const category = data?.category;
    
    if (!category) {
        return (
            <Theme name="light">
                <YStack flex={1} backgroundColor="#f9f9f9" justifyContent="center" alignItems="center" padding="$4">
                    <Text color="#666" textAlign="center">Category not found</Text>
                </YStack>
            </Theme>
        );
    }
    
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
                Category Details
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
            {/* Category Header Card */}
            <YStack
                alignItems="center"
                paddingVertical="$6"
                marginTop="$4"
                backgroundColor="white"
                borderRadius={20}
            >
                <View 
                backgroundColor={category.type === 'EXPENSE' ? "#ffeded" : "#e3fff0"}
                borderRadius={20}
                alignItems="center"
                justifyContent="center"
                width={80}
                height={80}
                marginBottom="$4"
                >
                <Text fontSize={40}>{category.emoji}</Text>
                </View>
                
                <Text 
                fontSize={24} 
                fontWeight="700" 
                color={category.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                marginBottom="$2"
                >
                {category.name}
                </Text>
                
                <XStack 
                backgroundColor={category.type === 'EXPENSE' ? "#ffeded" : "#e3fff0"}
                paddingHorizontal="$3"
                paddingVertical="$1"
                borderRadius={20}
                marginTop="$1"
                >
                <Text 
                    fontSize={16} 
                    color={category.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"} 
                    fontWeight="600"
                >
                    {category.type === 'EXPENSE' ? 'Expense' : 'Income'}
                </Text>
                </XStack>
            </YStack>
            
            {/* Category Details */}
            <YStack space="$4" marginTop="$5">
                {/* Category Info Section */}
                <YStack 
                backgroundColor="white" 
                borderRadius={20} 
                padding="$5" 
                space="$4"
                >
                <Text fontSize={18} fontWeight="700" color="#4b61dc" marginBottom="$1">
                    Category Information
                </Text>
                
                <YStack space="$3">
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Identifier</Text>
                    <Text fontSize={16} color="#333" fontWeight="600">#{category.id}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Name</Text>
                    <Text fontSize={16} color="#333" fontWeight="600">{category.name}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Emoji</Text>
                    <Text fontSize={16} color="#333" fontWeight="600">{category.emoji}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Type</Text>
                    <XStack alignItems="center" space="$2">
                        <View
                        width={10}
                        height={10}
                        borderRadius={5}
                        backgroundColor={category.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                        />
                        <Text 
                        fontSize={16} 
                        fontWeight="600"
                        color={category.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                        >
                        {category.type === 'EXPENSE' ? 'Expense' : 'Income'}
                        </Text>
                    </XStack>
                    </YStack>
                    
                    {category.createdAt && (
                    <YStack space="$1">
                        <Text fontSize={14} color="#888" fontWeight="500">Created</Text>
                        <Text fontSize={16} color="#333" fontWeight="600">
                            {new Date(category.createdAt).toLocaleDateString()}
                        </Text>
                    </YStack>
                    )}
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
            
            <TouchableOpacity style={{ flex: 1 }}>
                <XStack
                backgroundColor="white"
                borderColor={"#dc4b4b"}
                borderWidth={1.5}
                borderRadius={16}
                height={56}
                alignItems="center"
                justifyContent="center"
                space="$2"
                >
                <TrashIcon size={20} color={"#dc4b4b"} />
                <Text 
                    color={"#dc4b4b"} 
                    fontWeight="700" 
                    fontSize={16}
                >
                    Delete
                </Text>
                </XStack>
            </TouchableOpacity>
            </XStack>
        </YStack>
        </Theme>
    );
};