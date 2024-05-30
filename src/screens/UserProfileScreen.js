import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut, updateUser } from '../store/authSlice'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const status = useSelector(state => state.auth.status);
  const navigation = useNavigation();
  
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (status === 'idle' && !user) {
      navigation.navigate('SignIn'); 
    }
  }, [status, user, navigation]);

  const handleUpdate = () => {
    if (!name || !password) {
      Alert.alert('Error', 'Name and Password cannot be empty.');
      return;
    }

    dispatch(updateUser({ name, password, token: user.token })).then(response => {
      if (response.error) {
        Alert.alert('Error', response.error.message);
      } else {
        Alert.alert('Success', 'Profile updated successfully');
        setEditing(false);
      }
    });
  };

  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#728495" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {editing ? (
        <>
          <TextInput 
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput 
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Ionicons name='checkmark-circle' size={24} color='green' />
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setEditing(false)}>
              <Ionicons name='close-circle' size={24} color='red' />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{user.email}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#ccc' }]} onPress={() => setEditing(true)}>
              <Ionicons name='create' size={24} color='black' />
              <Text style={[styles.buttonText, { color: 'black' }]}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#728495' }]} onPress={() => dispatch(signOut())}>
              <Ionicons name='log-out' size={24} color='white' />
              <Text style={[styles.buttonText, { color: 'white' }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
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
    marginLeft: 5,
    fontSize: 16,
  },
});

export default UserProfileScreen;
