// ShoppingCartScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShoppingCartScreen = () => {
  const cartItems = []; 

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text>Your shopping cart is empty</Text>
      ) : (
        <Text>Cart Items</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShoppingCartScreen;
