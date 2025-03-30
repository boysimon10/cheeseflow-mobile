import { XStack, Text, View, YStack } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

type TransactionItemProps = {
    id: number;
    amount: string;
    category: string;
    description: string;
    date: string;
    emoji: string;
    type: 'EXPENSE' | 'INCOME';
    currency: string;
    onPress?: (id: number) => void;
}

export const TransactionItem = ({ 
    id,
    amount, 
    category, 
    description, 
    date, 
    emoji, 
    type, 
    currency,
    onPress 
}: TransactionItemProps) => (
    <TouchableOpacity 
        onPress={() => {
        Haptics.selectionAsync();
        onPress && onPress(id);
        }}
        style={{ marginBottom: 8 }}
    >
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
                <Text fontSize={18}>{emoji}</Text>
            </View>
            <YStack>
                <Text fontSize={16} color="#333" fontWeight="500">{category}</Text>
                <Text fontSize={14} color="#666">
                    {description.length > 17 ? description.substring(0, 17) + '...' : description}
                </Text>
                <Text fontSize={12} color="#999">{date}</Text>
            </YStack>
        </XStack>
        <Text 
            fontSize={16} 
            fontWeight="600" 
            color={type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}
        >
            {type === 'EXPENSE' ? '-' : '+'}{amount} {currency}
        </Text>
        </XStack>
    </TouchableOpacity>
);