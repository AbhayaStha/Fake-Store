import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { fetchProductsByCategory } from '../datamodel/api';
import { Ionicons } from '@expo/vector-icons';

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
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductPress(item)}>
            <View style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text>Price: ${item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}/>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBackPress}>
            <Ionicons name = 'backspace-outline' size={25} color='white'/>
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
    </View>
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
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    marginBottom: 10
},
buttonText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
},
});

export default ProductListScreen;
