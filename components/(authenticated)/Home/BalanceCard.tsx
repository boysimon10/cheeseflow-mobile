import { XStack, YStack, Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { PlusIcon } from 'react-native-heroicons/outline';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router'

export const BalanceCard = () => {
    const router = useRouter();
    return (
        <XStack
            backgroundColor={"#dde3fb"}
            borderRadius={20}
            padding={"$5"}
            justifyContent='space-between'
        >
            <YStack>
                <Text
                    fontSize={12}
                    color="#4b61dc"
                >
                    Your Balance
                </Text>
                <XStack alignItems="baseline">
                    <Text
                        fontSize={30}
                        fontWeight="600"
                        color="#4b61dc"
                    >
                        10000{' '}
                    </Text>
                    <Text
                        fontSize={16}
                        fontWeight="500"
                        color="#4b61dc"
                    >
                        XOF
                    </Text>
                </XStack>
            </YStack>
            <TouchableOpacity
                style={{
                    backgroundColor: 'white',
                    padding: 8,
                    borderRadius: 1000,
                    alignSelf: 'flex-start'
                }}
                onPress={() => {Haptics.selectionAsync(), router.push('/NewTransaction')}}
            >
                <PlusIcon size={25} color="#4b61dc" />
            </TouchableOpacity>
        </XStack>
    );
};