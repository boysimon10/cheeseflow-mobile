import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text, XStack, ScrollView } from 'tamagui';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { MagnifyingGlassIcon, PlusIcon} from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { BalanceCard } from './BalanceCard';
import { TransactionCard } from './TransactionCard';


export const ScreenContent = () => {
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);

    return (
    <Theme name="light">
        <YStack flex={1} padding="$4" space={minSpacing}>
            <XStack 
                paddingVertical="$3"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
            >
                <YStack>
                    <Text
                        fontSize={16}
                        fontWeight="400"
                        color="#4b61dc"
                    >
                        Hello,
                    </Text>
                    <Text
                        fontSize={24}
                        fontWeight="700"
                        color="#4b61dc"
                    >
                        Simon
                    </Text>
                </YStack>
                <TouchableOpacity
                style={{
                    backgroundColor: '#dde3fb',
                    padding: 8,
                    borderRadius: 1000,
                    alignSelf: 'flex-start'
                    }}
                onPress={() => {Haptics.selectionAsync();}}
                >
                    <MagnifyingGlassIcon size={25} color="#4b61dc" />
                </TouchableOpacity>
            </XStack>
            <YStack>
                <BalanceCard />
                <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginHorizontal: -18,
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: 16, 
                        gap: 16,
                        paddingTop: 16,
                        paddingBottom: 16,
                    }}
                >
                <YStack
                        backgroundColor="#4b61dc"
                        borderRadius={20}
                    >
                    <YStack
                        margin={15}
                    >
                        <View
                            width={35}
                            height={35}
                            borderRadius={100}
                            backgroundColor={"#fff"}
                        >
                        </View>
                            <YStack
                            paddingTop={10}
                            >
                                <Text
                                    fontSize={14}
                                    fontWeight="400"
                                    color="white"
                                >
                                    Nourritures
                                </Text>
                                <Text
                                    fontSize={18}
                                    fontWeight="700"
                                    color="white"
                                >
                                    10000 F CFA
                                </Text>
                            </YStack>
                    </YStack>
                </YStack>
                </ScrollView>
                <YStack
                    space={10}

                >
                    <TransactionCard />
                    <TransactionCard />
                    <TransactionCard />

                </YStack>
            </YStack>
        </YStack>
    </Theme>
    );
};