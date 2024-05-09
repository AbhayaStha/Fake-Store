// ShoppingCartScreen.js
import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateItemQuantity } from '../store/cartSlice';

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

  return (
    <View>
      <Text>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text>Your shopping cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Button title="+" onPress={() => increaseQuantity(item.id)} />
              <Button title="-" onPress={() => decreaseQuantity(item.id)} />
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

export default ShoppingCartScreen;
