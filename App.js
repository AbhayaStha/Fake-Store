import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { initializeStore } from './src/store/store';
import CategoryScreen from './src/screens/Category';
import ProductDetailScreen from './src/screens/ProductDetail';
import ProductListScreen from './src/screens/ProductList';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';
import MyOrdersScreen from './src/screens/MyOrdersScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { Alert } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const totalItems = useSelector(state => state.cart.totalItems); 
  const newOrdersCount = useSelector(state => state.orders.newOrdersCount); 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 


  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Product') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Shopping Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'My Orders') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarBadge: route.name === 'Shopping Cart' ? (isLoggedIn && totalItems > 0 ? totalItems : null) : (route.name === 'My Orders' ? (isLoggedIn && newOrdersCount > 0 ? newOrdersCount : null) : null),
        tabBarStyle: { display: 'flex' },
      })}
    >
      {isLoggedIn ? (
        <>
          <Tab.Screen name="Product" component={MainStackNavigator} options={{ headerShown: false }} />
          <Tab.Screen name="Shopping Cart" component={ShoppingCartScreen} options={{ headerShown: false }} />
          <Tab.Screen name="My Orders" component={MyOrdersScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Tab.Screen 
            name="Product" 
            listeners={{
              tabPress: e => {
                e.preventDefault();
                Alert.alert('Not logged in', 'You must log in to view this tab');
              },
            }}
            component={MainStackNavigator} 
            options={{ headerShown: false }} 
          />
          <Tab.Screen 
            name="Shopping Cart" 
            listeners={{
              tabPress: e => {
                e.preventDefault();
                Alert.alert('Not logged in', 'You must log in to view this tab');
              },
            }}
            component={ShoppingCartScreen} 
            options={{ headerShown: false }} 
          />
          <Tab.Screen 
            name="My Orders" 
            listeners={{
              tabPress: e => {
                e.preventDefault();
                Alert.alert('Not logged in', 'You must log in to view this tab');
              },
            }}
            component={MyOrdersScreen} 
            options={{ headerShown: false }} 
          />
        </>
      )}
      <Tab.Screen name="Profile" component={isLoggedIn ? UserProfileScreen : AuthStackNavigator} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Products" component={ProductListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ headerShown: false}} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const initializeReduxStore = async () => {
      const initializedStore = await initializeStore();
      setStore(initializedStore);
    };

    initializeReduxStore();
  }, []);

  if (!store) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}
