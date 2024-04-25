import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { fetchProductsByCategory } from '../datamodel/api';

const ProductListScreen = ({ route }) => {
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsByCategory(categoryId)
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, [categoryId]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Product List Screen</Text>
    </View>
  );
}

export default ProductListScreen;
