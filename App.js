import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SplashScreen from './src/screens/SplashScreen';
import CategoryScreen from './src/screens/Category';
import ProductDetailScreen from './src/screens/ProductDetail';
import ProductListScreen from './src/screens/ProductList';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProductsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Products" component={ProductListScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Categories') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Shopping Cart') {
                    iconName = focused ? 'cart' : 'cart-outline';
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
              }}>
              <Tab.Screen name="Categories" component={CategoryScreen} />
              <Tab.Screen name="Products" component={ProductsStack} />
              <Tab.Screen name="Shopping Cart" component={ShoppingCartScreen} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
