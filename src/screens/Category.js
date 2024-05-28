// category.js
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { fetchProducts } from '../datamodel/api';
import ProductCategoryItem from '../components/product/ProductCategoryItem';
import LoadingIndicator from '../components/common/LoadingIndicator';
import ErrorMessage from '../components/common/ErrorMessage';

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate('Products', { category });
  };

  const renderCategoryItem = ({ item }) => (
    <ProductCategoryItem category={item} onPress={() => handleCategoryPress(item)} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      {isLoading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.categoryList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#263A47'
  },
  categoryList: {
    width: '100%'
  },
});

export default CategoryScreen;
