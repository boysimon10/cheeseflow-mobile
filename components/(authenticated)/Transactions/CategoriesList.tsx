import { FlatList, ActivityIndicator } from 'react-native';
import { View, Text } from 'tamagui';
import { CategoryItem } from './CategoryItem';
import { useRouter } from 'expo-router';
import { Category } from '~/apollo/types';
import * as Haptics from 'expo-haptics';
import { ApolloError } from '@apollo/client';

type CategoriesListProps = {
  categories: Category[];
  loading: boolean;
  error?: ApolloError;
  disableScroll?: boolean; 
};

export const CategoriesList = ({ categories, loading, error, disableScroll }: CategoriesListProps) => {
  const router = useRouter();
  
  // render a category item
  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryItem 
      key={item.id}
      id={Number(item.id)}
      name={item.name}
      emoji={item.emoji}
      type={item.type as 'EXPENSE' | 'INCOME'}
      onPress={(id) => {
        Haptics.selectionAsync();
        router.push({
          pathname: '/category/[id]',
          params: { id }
        });
      }}
    />
  );

  if (loading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#4b61dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text color="red">Error: {error.message}</Text>
      </View>
    );
  }

  // if no categories found
  if (categories.length === 0) {
    return (
      <View flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text color="#666" textAlign="center">
          No categories found. Create a new category to get started.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      scrollEnabled={!disableScroll} 
      contentContainerStyle={{
        paddingBottom: disableScroll ? 0 : 100,
        paddingTop: 10,
      }}
    />
  );
};