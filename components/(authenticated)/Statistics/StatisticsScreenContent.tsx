import { YStack, Theme,  Text, XStack, ScrollView} from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
//import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import { SummaryCard } from './SummaryCard';
import { ExpensesByCategoryCard } from './ExpensesByCategoryCard';


export const ScreenContent = () => {
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);
    
    return (
        <Theme name="light">
            <YStack flex={1} space={minSpacing}>
                <XStack
                    paddingHorizontal="$3"
                    paddingTop="$6"
                    paddingBottom="$3"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    backgroundColor={"white"}
                >
                    <Text
                        fontSize={30}
                        fontWeight="700"
                        color="#4b61dc"
                    >
                        Statistics
                    </Text>
                </XStack>
                <YStack paddingHorizontal={"$4"}>
                    <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 200,
                    }}
                    >
                        <YStack space="$1">
                                <SummaryCard />
                                <ExpensesByCategoryCard />
                        </YStack>
                    </ScrollView>
                </YStack>
            </YStack>
        </Theme>
    );
};