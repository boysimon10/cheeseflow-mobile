import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text, XStack, ScrollView } from 'tamagui';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { MagnifyingGlassIcon, PlusIcon} from 'react-native-heroicons/outline';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { BalanceCard } from './BalanceCard';
import { TransactionCard } from './TransactionCard';
import { CategoryCard } from './CategoryCard';


export const ScreenContent = () => {
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);

    return (
    <Theme name="light">
        <YStack flex={1} padding="$4" space={minSpacing}>
            <XStack 
                paddingVertical="$2"
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
            <ScrollView 

                    showsVerticalScrollIndicator={false}
            >
            <YStack paddingTop="$4">
                <BalanceCard />
                {/* <XStack 
                        justifyContent="space-between" 
                        alignItems="center"
                        paddingVertical="$2"
                    >
                        <Text
                            fontSize={18}
                            fontWeight="700"
                            color="#4b61dc"
                        >
                            Categories
                        </Text>
                        <TouchableOpacity onPress={() => {Haptics.selectionAsync();}}>
                            <Text
                                fontSize={14}
                                color="#4b61dc"
                            >
                                See all
                            </Text>
                        </TouchableOpacity>
                    </XStack>
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
                    <CategoryCard />
                </ScrollView> */}
                <YStack space={6}>
                    <XStack 
                        justifyContent="space-between" 
                        alignItems="center"
                        paddingVertical="$2"
                        paddingTop="$4"
                    >
                        <Text
                            fontSize={18}
                            fontWeight="700"
                            color="#4b61dc"
                        >
                            Recent Transactions
                        </Text>
                        <TouchableOpacity onPress={() => {Haptics.selectionAsync();}}>
                            <Text
                                fontSize={14}
                                color="#4b61dc"
                            >
                                See all
                            </Text>
                        </TouchableOpacity>
                    </XStack>
                    <TransactionCard />
                    <TransactionCard />
                    <TransactionCard />
                    <TransactionCard />
                </YStack>
            </YStack>
            </ScrollView>
        </YStack>
    </Theme>
    );
};