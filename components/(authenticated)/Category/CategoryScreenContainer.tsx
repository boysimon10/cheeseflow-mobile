import { YStack, XStack, Theme, Text, View, ScrollView } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLongLeftIcon } from "react-native-heroicons/outline";
import { PencilIcon, TrashIcon } from "react-native-heroicons/solid";

type CategoryType = 'EXPENSE' | 'INCOME';

type CategoryDetailProps = {
    id: string | string[];

    category?: {
        id: number;
        name: string;
        emoji: string;
        type: CategoryType;
        userId: number;
    }
};

export const ScreenContent = ({ id, category }: CategoryDetailProps) => {
    const router = useRouter();
    const { top } = useSafeAreaInsets();
    
    // Mock data pour la catégorie
    const mockCategory = category || {
        id: 1,
        name: "Alimentation",
        emoji: "🛒",
        type: "EXPENSE" as CategoryType,
    };
    
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
                backgroundColor={mockCategory.type === 'EXPENSE' ? "#ffeded" : "#e3fff0"}
                borderRadius={20}
                alignItems="center"
                justifyContent="center"
                width={80}
                height={80}
                marginBottom="$4"
                >
                <Text fontSize={40}>{mockCategory.emoji}</Text>
                </View>
                
                <Text 
                fontSize={24} 
                fontWeight="700" 
                color={mockCategory.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                marginBottom="$2"
                >
                {mockCategory.name}
                </Text>
                
                <XStack 
                backgroundColor={mockCategory.type === 'EXPENSE' ? "#ffeded" : "#e3fff0"}
                paddingHorizontal="$3"
                paddingVertical="$1"
                borderRadius={20}
                marginTop="$1"
                >
                <Text 
                    fontSize={16} 
                    color={mockCategory.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"} 
                    fontWeight="600"
                >
                    {mockCategory.type === 'EXPENSE' ? 'Expense' : 'Income'}
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
                    <Text fontSize={16} color="#333" fontWeight="600">#{mockCategory.id}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Name</Text>
                    <Text fontSize={16} color="#333" fontWeight="600">{mockCategory.name}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Emoji</Text>
                    <Text fontSize={16} color="#333" fontWeight="600">{mockCategory.emoji}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Type</Text>
                    <XStack alignItems="center" space="$2">
                        <View
                        width={10}
                        height={10}
                        borderRadius={5}
                        backgroundColor={mockCategory.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                        />
                        <Text 
                        fontSize={16} 
                        fontWeight="600"
                        color={mockCategory.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                        >
                        {mockCategory.type === 'EXPENSE' ? 'Expense' : 'Income'}
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
            
            <TouchableOpacity style={{ flex: 1 }}>
                <XStack
                backgroundColor="white"
                borderColor={mockCategory.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                borderWidth={1.5}
                borderRadius={16}
                height={56}
                alignItems="center"
                justifyContent="center"
                space="$2"
                >
                <TrashIcon size={20} color={mockCategory.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"} />
                <Text 
                    color={mockCategory.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"} 
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