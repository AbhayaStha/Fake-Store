import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, updateUser } from '../store/authSlice'; 
import { useNavigation } from '@react-navigation/native';

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
      navigation.navigate('SignIn'); // Navigate to the SignIn screen when user logs out
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
        <ActivityIndicator size="large" color="#0000ff" />
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
            <Button title="Confirm" onPress={handleUpdate} color="#4CAF50" />
            <Button title="Cancel" onPress={() => setEditing(false)} color="#f44336" />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{user.email}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Update" onPress={() => setEditing(true)} color="#2196F3" />
            <Button title="Sign Out" onPress={() => dispatch(signOut())} color="#f44336" />
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
});

export default UserProfileScreen;
