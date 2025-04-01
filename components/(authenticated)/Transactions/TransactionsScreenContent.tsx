import { YStack, Theme, Text, XStack } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CategoriesTopTabsScreen } from './CategoriesTopTabsScreen';
import { TransactionsTopTabsScreen } from './TransactionsTopTabsScreen';

const Tab = createMaterialTopTabNavigator();

export const ScreenContent = () => {
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);
    
    return (
        <Theme name="light">
            <YStack flex={1}  space={minSpacing}>
                <XStack
                    paddingHorizontal="$3"
                    paddingTop="$8"
                    paddingBottom="$2"
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
                        Transactions
                    </Text>
                </XStack>
                
                <YStack flex={1}>
                    <Tab.Navigator
                        screenOptions={{
                            tabBarActiveTintColor: '#4b61dc',
                            tabBarInactiveTintColor: 'gray',
                            tabBarLabelStyle: { 
                                fontSize: 14,
                                fontWeight: '600',
                                textTransform: 'none'
                            },
                            tabBarStyle: { 
                                backgroundColor: 'white',
                            },
                            tabBarIndicatorStyle: {
                                backgroundColor: '#4b61dc',
                                height: 3,
                            }
                        }}
                    >
                        <Tab.Screen name="Transactions" component={TransactionsTopTabsScreen} />
                        <Tab.Screen name="Categories" component={CategoriesTopTabsScreen} />
                    </Tab.Navigator>
                </YStack>
            </YStack>
        </Theme>
    );
};