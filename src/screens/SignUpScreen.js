import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/authSlice'; 
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const response = await dispatch(signUp({ name, email, password }));
      console.log('Sign Up Response:', response); // Log the response
      if (response.payload && response.payload.status === "OK") {
        const successMessage = response.payload.message || 'Sign up successful';
        Alert.alert('Success', successMessage);
        navigation.navigate('UserProfile'); // Navigate to UserProfile upon successful sign-up
      } else {
        const errorMessage = response.payload.message || 'Sign up failed';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
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
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ccc' }]} onPress={() => { setName(''); setEmail(''); setPassword(''); }}>
          <Ionicons name='close-circle-outline' size={24} color='black' />
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#728495' }]} onPress={handleSignUp}>
          <Ionicons name='person-add-outline' size={20} color='white' />
          <Text style={[styles.buttonText, { color: 'white' }]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.switchTextContainer} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.switchText}>Switch to: sign in</Text>
      </TouchableOpacity>
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
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  switchTextContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: 'black',
    fontSize: 16,
    fontStyle: 'italic', 
    color: 'blue'
  },
});

export default SignUpScreen;
