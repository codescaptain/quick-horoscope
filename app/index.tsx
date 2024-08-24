import React from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, Pressable } from 'react-native';
import { Link } from 'expo-router';

const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/welcome.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Hoş Geldiniz</Text>
          <Text style={styles.subtitle}>Uygulamamıza hoş geldiniz!</Text>
          <Link href="/horoscopes" asChild>
            <Pressable style={styles.link}>
              <Text style={styles.linkText}>Başlayın</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end', // This will push the content to the bottom
  },
  container: {
    padding: 20,
    paddingBottom: 40, // Extra padding at the bottom
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  link: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
  },
  linkText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;