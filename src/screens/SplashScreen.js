import React, { useEffect } from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
// import Icon from "../constant/splash_image.png"
import Icon from "../../assets/splash_image.png"

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Categories');
    }, 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Icon} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // You can set a background color if needed
  },
  image: {
    width: Dimensions.get('window').width, // Set width to full screen width
    height: Dimensions.get('window').height, // Set height to full screen height
    resizeMode: 'cover', // Scale the image to cover the entire screen
  },
});

export default SplashScreen;
