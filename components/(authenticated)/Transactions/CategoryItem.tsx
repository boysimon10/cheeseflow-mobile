import { XStack, Text, View } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

type CategoryItemProps = {
    id: number;
    name: string;
    emoji: string;
    type: 'EXPENSE' | 'INCOME';
    onPress?: (id: number) => void;
}

export const CategoryItem = ({ 
    id,
    name, 
    emoji, 
    type, 
    onPress 
    }: CategoryItemProps) => (

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
            <Text fontSize={16} color="#333">{name}</Text>
        </XStack>
        <XStack alignItems="center" space="$2">
            <Text fontSize={14} color={type === 'EXPENSE' ? "#dc4b4b" : "#4bdc7d"}>
            {type === 'EXPENSE' ? 'Expense' : 'Income'}
            </Text>
        </XStack>
        </XStack>
    </TouchableOpacity>
);