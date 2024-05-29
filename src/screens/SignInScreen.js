import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/authSlice'; 
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();   

  const handleSignIn = () => {
    dispatch(signIn({ email, password }))
      .then(response => {
        console.log('Server Response:', response); 
        if (response.payload && response.payload.status === 'OK') {
          navigation.navigate('UserProfile'); 
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
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ccc' }]} onPress={() => { setEmail(''); setPassword(''); }}>
          <Ionicons name='close-circle-outline' size={24} color='black' />
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#728495' }]} onPress={handleSignIn}>
          <Ionicons name='log-in-outline' size={24} color='white' />
          <Text style={[styles.buttonText, { color: 'white' }]}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.switchTextContainer} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.switchText}>Switch to: sign up</Text>
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

export default SignInScreen;
