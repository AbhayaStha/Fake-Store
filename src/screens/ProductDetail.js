import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import IconButton from '../components/common/IconButton';
import LoadingIndicator from '../components/common/LoadingIndicator';
import ErrorMessage from '../components/common/ErrorMessage';

const ProductDetailScreen = ({ route, navigation }) => {
  const { id, price, title, description, image, rating } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulate loading delay for 1 second
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

  const addToCart = async () => {
    setAddingToCart(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(addItem({ id, price, title, description, image, rating }));
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorMessage message={error} />
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
              <IconButton
                iconName="backspace-outline"
                text="Back"
                onPress={() => navigation.goBack()}
              />
              <IconButton
                iconName="cart"
                text={addingToCart ? "Adding..." : "Add to Cart"}
                onPress={addToCart}
                loading={addingToCart}
              />
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
});

export default ProductDetailScreen;
