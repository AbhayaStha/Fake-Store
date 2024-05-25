// src/screens/SignInScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/authSlice'; 
import { useNavigation } from '@react-navigation/native'; 

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();   

  const handleSignIn = () => {
    dispatch(signIn({ email, password }))
      .then(response => {
        console.log('Server Response:', response); // Log the server response
        if (response.payload && response.payload.status === 'OK') {
          navigation.navigate('UserProfile'); // Navigate to UserProfileScreen
        } else {
          Alert.alert('Error', 'Wrong email or password');
        }
      })
      .catch(error => {
        console.error('Sign In Error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in with your email and password</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput 
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Clear" onPress={() => { setEmail(''); setPassword(''); }} />
        <Button title="Sign In" onPress={handleSignIn} />
      </View>
      <Text style={styles.switchText} onPress={() => navigation.navigate('SignUp')}>
        Switch to: sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  switchText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'blue',
  },
});

export default SignInScreen;
