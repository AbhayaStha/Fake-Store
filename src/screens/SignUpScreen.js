// src/screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/authSlice'; // Implement this action in your authSlice

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(signUp({ name, email, password })).then(response => {
      if (response.error) {
        Alert.alert('Error', response.error.message);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up a new user</Text>
      <TextInput 
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
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
        <Button title="Clear" onPress={() => { setName(''); setEmail(''); setPassword(''); }} />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
      <Text style={styles.switchText} onPress={() => navigation.navigate('SignIn')}>
        Switch to: sign in
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

export default SignUpScreen;
