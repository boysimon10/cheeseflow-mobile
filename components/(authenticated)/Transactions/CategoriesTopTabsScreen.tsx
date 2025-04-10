import { YStack, Theme, View, Text, XStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { Dimensions, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { PlusIcon } from 'react-native-heroicons/outline';
import { useFilterStore } from '~/store/useFilterStore';
import * as Haptics from 'expo-haptics';
import { CategoriesList } from './CategoriesList';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES_QUERY } from '~/apollo/mutations';
import { Category } from '~/apollo/types';
import { useEffect, useState } from 'react';

type GetCategoriesResponse = {
    categories: Category[];
};

export const CategoriesTopTabsScreen = () => {
    const router = useRouter();
    const { categoryFilter, setCategoryFilter } = useFilterStore();
    const screenHeight = Dimensions.get('window').height;
    const minSpacing = Math.min(screenHeight * 0.5, -10);
    
    const { loading, error, data, refetch } = useQuery<GetCategoriesResponse>(
        GET_CATEGORIES_QUERY,
        {
            variables: {
                filters: {} 
            },
            fetchPolicy: 'network-only',
        }
    );

    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    // Filter
    const filteredCategories = data?.categories 
        ? categoryFilter === 'ALL' 
            ? data.categories 
            : data.categories.filter(category => category.type === categoryFilter)
        : [];

    useEffect(() => {
        refetch();
    }, [categoryFilter, refetch]);
    
    return (
        <Theme name="light">
            <YStack flex={1} paddingHorizontal="$4">
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 100,
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#4b61dc"]}
                            tintColor="#4b61dc"
                        />
                    }
                >
                    {/* Filter XStack with Add Button */}
                    <XStack
                        paddingVertical="$4"
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
                        
                        {/* Add Category Button */}
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

                    {/* Categories List */}
                    <CategoriesList 
                        categories={filteredCategories}
                        loading={loading}
                        error={error}
                        disableScroll={true}
                    />
                </ScrollView>
            </YStack>
        </Theme>
    );
};