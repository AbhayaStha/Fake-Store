import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { payOrder, receiveOrder } from '../store/ordersSlice';

const MyOrdersScreen = () => {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  const handlePayOrder = (orderId) => {
    dispatch(payOrder(orderId));
  };

  const handleReceiveOrder = (orderId) => {
    dispatch(receiveOrder(orderId));
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderText}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
      {item.status === 'new' && (
        <TouchableOpacity style={styles.button} onPress={() => handlePayOrder(item.id)}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
      )}
      {item.status === 'paid' && (
        <TouchableOpacity style={styles.button} onPress={() => handleReceiveOrder(item.id)}>
          <Text style={styles.buttonText}>Receive</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id.toString()}
      />
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
    color: '#263A47',
  },
  orderContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#728495',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MyOrdersScreen;

