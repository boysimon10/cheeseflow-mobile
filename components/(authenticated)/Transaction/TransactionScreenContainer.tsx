    import { YStack, XStack, Theme, Text, View, ScrollView } from 'tamagui';
    import { useSafeAreaInsets } from 'react-native-safe-area-context';
    import { Dimensions, TouchableOpacity } from 'react-native';
    import { useRouter } from 'expo-router';
    import { ArrowLongLeftIcon } from "react-native-heroicons/outline";
    import { PencilIcon, TrashIcon } from "react-native-heroicons/solid";

    type TransactionType = 'EXPENSE' | 'INCOME';

    type TransactionDetailProps = {
        id: string | string[];

        transaction?: {
            amount: string;
            category: string;
            description: string;
            date: string;
            emoji: string;
            type: TransactionType;
            notes?: string;
        }
    };

    export const ScreenContent = ({ id, transaction }: TransactionDetailProps) => {
    const router = useRouter();
    const { top } = useSafeAreaInsets();
    
    //à remplacer par l'api apres
    const mockTransaction = transaction || {
        amount: "25,000",
        category: "Alimentation",
        description: "Courses au supermarché",
        date: "Mon, Feb 12, 2025",
        emoji: "🛒",
        type: "EXPENSE" as TransactionType,
        notes: "Achats pour la semaine"
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
                backgroundColor={mockTransaction.type === 'EXPENSE' ? "#ffeded" : "#e3fff0"}
                borderRadius={20}
                alignItems="center"
                justifyContent="center"
                width={64}
                height={64}
                marginBottom="$4"
                >
                <Text fontSize={32}>{mockTransaction.emoji}</Text>
                </View>
                
                <Text 
                fontSize={28} 
                fontWeight="700" 
                color={mockTransaction.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                marginBottom="$2"
                >
                {mockTransaction.type === 'EXPENSE' ? '-' : '+'}{mockTransaction.amount} XOF
                </Text>
                
                <XStack 
                backgroundColor={mockTransaction.type === 'EXPENSE' ? "#ffeded" : "#e3fff0"}
                paddingHorizontal="$3"
                paddingVertical="$1"
                borderRadius={20}
                marginTop="$1"
                >
                <Text 
                    fontSize={16} 
                    color={mockTransaction.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"} 
                    fontWeight="600"
                >
                    {mockTransaction.category}
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
                    <Text fontSize={16} color="#333" fontWeight="600">{mockTransaction.description}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Date</Text>
                    <Text fontSize={16} color="#333" fontWeight="600">{mockTransaction.date}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Category</Text>
                    <Text fontSize={16} color="#333" fontWeight="600">{mockTransaction.category}</Text>
                    </YStack>
                    
                    <YStack space="$1">
                    <Text fontSize={14} color="#888" fontWeight="500">Type</Text>
                    <XStack alignItems="center" space="$2">
                        <View
                        width={10}
                        height={10}
                        borderRadius={5}
                        backgroundColor={mockTransaction.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                        />
                        <Text 
                        fontSize={16} 
                        fontWeight="600"
                        color={mockTransaction.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                        >
                        {mockTransaction.type === 'EXPENSE' ? 'Expense' : 'Income'}
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
                borderColor={mockTransaction.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
                borderWidth={1.5}
                borderRadius={16}
                height={56}
                alignItems="center"
                justifyContent="center"
                space="$2"
                >
                <TrashIcon size={20} color={mockTransaction.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"} />
                <Text 
                    color={mockTransaction.type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"} 
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