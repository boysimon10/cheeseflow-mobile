import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text, XStack, ScrollView } from 'tamagui';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, TouchableOpacity } from 'react-native';
import { TransactionCard } from '../Home/TransactionCard';
import { CategoryItem } from './CategoryItem';
import { PlusIcon } from 'react-native-heroicons/outline';

export const CategoriesTopTabsScreen = () => {
    const { bottom, top } = useSafeAreaInsets();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);
    
    return (
        <Theme name="light">
            <YStack flex={1} paddingHorizontal="$4" space={minSpacing}>
            
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100,
                    paddingTop: 10,
                }}
                >
                    {/* Filter XStack with Add Button */}
                    <XStack
                        paddingVertical="$2"
                        marginBottom="$3"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {/* Filter Options */}
                        <XStack space="$2">
                            <TouchableOpacity>
                                <View
                                    backgroundColor="#4b61dc"
                                    borderRadius="$10"
                                    paddingHorizontal="$4"
                                    paddingVertical="$2"
                                >
                                    <Text color="white">All</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity>
                                <View
                                    backgroundColor="white"
                                    borderRadius="$10"
                                    paddingHorizontal="$4"
                                    paddingVertical="$2"
                                >
                                    <Text color="#4b61dc">Income</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity>
                                <View
                                    backgroundColor="white"
                                    borderRadius="$10"
                                    paddingHorizontal="$4"
                                    paddingVertical="$2"
                                >
                                    <Text color="#4b61dc">Expense</Text>
                                </View>
                            </TouchableOpacity>
                        </XStack>
                        {/* Add Transaction Button */}
                        <TouchableOpacity onPress={() => console.log('Add transaction')}>
                            <View
                                backgroundColor="#4b61dc"
                                borderRadius="$10"
                                width={36}
                                height={36}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <PlusIcon size={20} color="white" />
                            </View>
                        </TouchableOpacity>
                    </XStack>

                        
                <CategoryItem 
                    id={1}
                    name="Alimentation"
                    emoji="🍔"
                    type="EXPENSE"
                    onPress={(id) => console.log('Category pressed:', id)}
                />
                <CategoryItem 
                    id={2}
                    name="Salaire"
                    emoji="💰"
                    type="INCOME"
                    onPress={(id) => console.log('Category pressed:', id)}
                />
                <CategoryItem 
                    id={3}
                    name="Transport"
                    emoji="🚗"
                    type="EXPENSE"
                    onPress={(id) => console.log('Category pressed:', id)}
                />
                <CategoryItem 
                    id={4}
                    name="Loisirs"
                    emoji="🎮"
                    type="EXPENSE"
                    onPress={(id) => console.log('Category pressed:', id)}
                />
                <CategoryItem 
                    id={5}
                    name="Freelance"
                    emoji="💻"
                    type="INCOME"
                    onPress={(id) => console.log('Category pressed:', id)}
                />
            </ScrollView></YStack>
        </Theme>
    );
};