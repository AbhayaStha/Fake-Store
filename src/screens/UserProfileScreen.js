//UserProfileScreen
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, updateUser } from '../store/authSlice'; 

const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleUpdate = () => {
    if (!name || !password) {
      Alert.alert('Error', 'Name and Password cannot be empty.');
      return;
    }

    dispatch(updateUser({ name, password })).then(response => {
      if (response.error) {
        Alert.alert('Error', response.error.message);
      } else {
        Alert.alert('Success', 'Profile updated successfully');
        setEditing(false);
      }
    });
  };

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
            <Button title="Confirm" onPress={handleUpdate} />
            <Button title="Cancel" onPress={() => setEditing(false)} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.text}>Name: {user.name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Button title="Update" onPress={() => setEditing(true)} />
          <Button title="Sign Out" onPress={() => dispatch(signOut())} />
        </>
      )}
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
  text: {
    fontSize: 18,
    marginBottom: 10,
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
});

export default UserProfileScreen;
