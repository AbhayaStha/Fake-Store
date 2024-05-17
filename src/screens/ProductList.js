// ProductList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { fetchProductsByCategory } from '../datamodel/api';
import { Ionicons } from '@expo/vector-icons';
import ProductItem from '../components/product/ProductItem';
import LoadingIndicator from '../components/common/LoadingIndicator';
import ErrorMessage from '../components/common/ErrorMessage';

const ProductListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductsByCategory(category);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', product);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            onPress={() => handleProductPress(item)}
          />
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleBackPress}>
        <Ionicons name='backspace-outline' size={25} color='white' />
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#728495',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
});

export default ProductListScreen;
