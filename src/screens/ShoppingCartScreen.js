// ShoppingCartScreen.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateItemQuantity, clearCart } from '../store/cartSlice';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addOrder } from '../store/ordersSlice';

const ShoppingCartScreen = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const increaseQuantity = (itemId) => {
    dispatch(updateItemQuantity({ id: itemId, quantity: cartItems.find(item => item.id === itemId).quantity + 1 }));
  };

  const decreaseQuantity = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item.quantity > 1) {
      dispatch(updateItemQuantity({ id: itemId, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ id: itemId }));
    }
  };
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const order = {
      items: cartItems,
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
    };
    dispatch(addOrder(order));
    dispatch(clearCart());
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.itemBox}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.title}</Text>
          <Text style={styles.price}>Price: ${item.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
              <Ionicons name="remove-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
              <Ionicons name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your shopping cart is empty</Text>
      ) : (
        <>
          <View style={styles.topSection}>
            <Text>Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</Text>
            <Text>Total Cost: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</Text>
          </View>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
          />
          <TouchableOpacity style={styles.button} onPress={handleCheckout}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#263A47'
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    textAlign: 'left',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default ShoppingCartScreen;
