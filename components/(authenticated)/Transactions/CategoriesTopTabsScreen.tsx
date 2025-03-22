import { YStack, H2, Separator, Theme, Image, Paragraph, View, Text, XStack, ScrollView } from 'tamagui';
import { Link, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, TouchableOpacity } from 'react-native';
import { TransactionCard } from '../Home/TransactionCard';
import { CategoryItem } from './CategoryItem';
import { PlusIcon } from 'react-native-heroicons/outline';
import { useFilterStore } from '~/store/useFilterStore';
import * as Haptics from 'expo-haptics';

export const CategoriesTopTabsScreen = () => {
    const router = useRouter();
    const { categoryFilter, setCategoryFilter } = useFilterStore();
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
                        <TouchableOpacity onPress={() => {
                            setCategoryFilter('ALL')
                            Haptics.selectionAsync();
                        }}>
                            <View
                                backgroundColor={categoryFilter === 'ALL' ? "#4b61dc" : "white"}
                                borderRadius="$10"
                                paddingHorizontal="$4"
                                paddingVertical="$2"
                            >
                                <Text 
                                color={categoryFilter === 'ALL' ? "white" : "#4b61dc"}
                                fontSize={14}
                                >All</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => {
                            setCategoryFilter('INCOME')
                            Haptics.selectionAsync();
                        }}>
                            <View
                                backgroundColor={categoryFilter === 'INCOME' ? "#4b61dc" : "white"}
                                borderRadius="$10"
                                paddingHorizontal="$4"
                                paddingVertical="$2"
                            >
                                <Text 
                                color={categoryFilter === 'INCOME' ? "white" : "#4b61dc"}
                                fontSize={14}
                                >Income</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => {
                            setCategoryFilter('EXPENSE')
                            Haptics.selectionAsync();
                            }}>
                            <View
                                backgroundColor={categoryFilter === 'EXPENSE' ? "#4b61dc" : "white"}
                                borderRadius="$10"
                                paddingHorizontal="$4"
                                paddingVertical="$2"
                            >
                                <Text 
                                color={categoryFilter === 'EXPENSE' ? "white" : "#4b61dc"}
                                fontSize={14}
                                >Expense</Text>
                            </View>
                        </TouchableOpacity>
                    </XStack>
                        {/* Add Transaction Button */}
                        <TouchableOpacity onPress={() => router.push('/NewCategory')}>
                            <View
                                backgroundColor="#4b61dc"
                                borderRadius="$5"
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
                    onPress={(id) => { 
                        console.log('Category pressed:', id)
                        router.push({
                            pathname: '/category/[id]',
                            params: { id: id}
                        });
                    }}
                />
                <CategoryItem 
                    id={2}
                    name="Salaire"
                    emoji="💰"
                    type="INCOME"
                    onPress={(id) => { 
                        console.log('Category pressed:', id)
                        router.push({
                            pathname: '/category/[id]',
                            params: { id: id}
                        });
                    }}
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