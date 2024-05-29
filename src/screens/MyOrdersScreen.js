import React, { useState, useEffect ,useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { payOrder, receiveOrder } from '../store/ordersSlice';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';



const MyOrdersScreen = () => {
  // const orders = useSelector(state => state.orders.orders);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const API_BASE_URL = 'http://192.168.1.108:3000';

  const [expandedSections, setExpandedSections] = useState({
    new: false,
    paid: false,
    delivered: true,
  });

  const loadOrders = async () => {
    const token = user.token;
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await response.data;
      const parsedOrders = data.orders.map(order => ({
        ...order,
        order_items: JSON.parse(order.order_items)
      }));

      // setOrders(parsedOrders);
      setOrders(parsedOrders);
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Failed to load orders. Please try again later.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );



  useEffect(() => {
    loadOrders();
  }, []);
  console.log(orders)


  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handlePayOrder = (orderId) => {
    dispatch(payOrder(orderId));
  };

  const handleReceiveOrder = (orderId) => {
    dispatch(receiveOrder(orderId));
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const renderOrderItem = ({ item }) => {
    return (
      <View style={styles.orderItemContainer}>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.orderText}>Order ID: {item.id}</Text>
          <Text style={styles.orderText}>Items: </Text>
          <Text style={styles.orderText}>Total: ${calculateTotal(item.items)}</Text>
        </View>
        {item.items.map((product, index) => (
          <View key={index} style={styles.itemBox}>
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.itemImage} />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{product.title}</Text>
                <Text style={styles.price}>Price: ${product.price}</Text>
                <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
              </View>
            </View>
          </View>
        ))}
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
  };

  const renderSection = (title, data, sectionKey) => (
    <View style={styles.sectionContainer}>
      <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection(sectionKey)}>
        <Text style={styles.sectionTitle}>{title}: {data.length}</Text>
        <Text style={styles.sectionArrow}>{expandedSections[sectionKey] ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {expandedSections[sectionKey] && (
        <FlatList
          data={data}
          renderItem={renderOrderItem}
          keyExtractor={(item) => `${sectionKey}-${item.id}`}
        />
      )}
    </View>
  );

  const newOrders = orders.filter(order => order.is_paid === 0 && order.is_delivered === 0);
  const paidOrders = orders.filter(order => order.is_paid === 1 && order.is_delivered === 0);
  const deliveredOrders = orders.filter(order => order.is_delivered === 1);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {renderSection('New Orders', newOrders, 'new')}
      {renderSection('Paid Orders', paidOrders, 'paid')}
      {renderSection('Delivered Orders', deliveredOrders, 'delivered')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 45,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#263A47',
  },
  sectionContainer: {
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#728495',
    padding: 15,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
  },
  sectionArrow: {
    fontSize: 18,
    color: 'white',
  },
  orderItemContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 30,
    padding: 15,
  },
  orderInfoContainer: {
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
  quantity: {
    fontSize: 14,
    color: '#888',
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
