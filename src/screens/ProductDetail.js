import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchProductsByCategory } from '../datamodel/api';

const ProductDetailScreen = ({ route, navigation }) => {
  const { price, description, image, rating } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.boxOutline}>
              <Text style={styles.infoText}>
                Rate: {rating.rate}  Sold: {rating.count}  Price: ${price}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Ionicons name="backspace-outline" size={25} color="white" />
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => console.log('Add to cart pressed')}>
                <Ionicons name="cart" size={20} color="white" />
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.descriptionHeader}>Description:</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 45,
    backgroundColor: 'white',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 250,
  },
  detailsContainer: {
    marginTop: 20,
  },
  boxOutline: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  descriptionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#728495',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default ProductDetailScreen;
