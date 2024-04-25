import React from 'react';
import { View, Text } from 'react-native';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Product Detail Screen</Text>
    </View>
  );
}

export default ProductDetailScreen;
