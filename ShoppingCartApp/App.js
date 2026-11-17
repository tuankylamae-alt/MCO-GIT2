
import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 1. Create Global Context
const CartContext = createContext();

// 2. Create Provider
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const addToCart = (product) => {
    setLoading(true);

    setTimeout(() => {
      setCart((previousCart) => [...previousCart, product]);
      setLoading(false);
    }, 1000);
  };

  const removeFromCart = (index) => {
    setCart((previousCart) =>
      previousCart.filter((_, i) => i !== index)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 3. Shop Screen
function ShopScreen() {
  const { cart, addToCart, loading } = useContext(CartContext);

  const products = [
    { id: '1', name: 'T-Shirt', price: 250 },
    { id: '2', name: 'Sneakers', price: 1200 },
    { id: '3', name: 'Backpack', price: 750 },
    { id: '4', name: 'Wrist Watch', price: 500 }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Online Shop</Text>
      <Text style={styles.subtitle}>
        Choose your favorite products!
      </Text>

      <Text style={styles.count}>
        Cart Items: {cart.length}
      </Text>

      {loading && <Text style={styles.loading}>Adding product...</Text>}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.product}>{item.name}</Text>
            <Text style={styles.price}>₱{item.price}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item)}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// 4. Cart Screen
function CartScreen() {
  const { cart, removeFromCart, loading } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Shopping Cart</Text>

      {loading && <Text style={styles.loading}>Updating cart...</Text>}

      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <Text style={styles.product}>{item.name}</Text>
                <Text style={styles.price}>₱{item.price}</Text>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(index)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.total}>
            Total: ₱{total.toLocaleString('en-PH')}
          </Text>
        </>
      )}
    </View>
  );
}

// 5. Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function MainNavigation() {
  const { cart } = useContext(CartContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen name="Shop" component={ShopScreen} />

        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarBadge: cart.length > 0 ? cart.length : undefined
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// 6. Main App
export default function App() {
  return (
    <CartProvider>
      <MainNavigation />
    </CartProvider>
  );
}

// 7. Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    paddingTop: 55
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10
  },
  product: {
    fontSize: 19,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 16,
    marginVertical: 8
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  removeButton: {
    backgroundColor: '#dc2626',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  loading: {
    color: '#2563eb',
    marginBottom: 12,
    fontWeight: 'bold'
  },
  empty: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20
  },
  total: {
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10
  }
});
