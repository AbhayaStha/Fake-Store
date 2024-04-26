// CategoryScreen.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { fetchProducts } from '../datamodel/api';

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        categories.map((category, index) => (
          <Button
            key={index}
            title={category}
            onPress={() => handleCategoryPress(category)}
            style={styles.button}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default CategoryScreen;
