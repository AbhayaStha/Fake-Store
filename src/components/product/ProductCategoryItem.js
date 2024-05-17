// ProductCategoryItem.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ProductCategoryItem = ({ category, onPress }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
    <Text style={styles.categoryText}>{category}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryItem: {
    backgroundColor: '#728495',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  categoryText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProductCategoryItem;
