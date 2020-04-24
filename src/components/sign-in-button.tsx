import React, { FC } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

export const SignInButton: FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} testID="signIn">
    <Image style={styles.logo} source={require('../assets/google-icon.png')} />
    <Text maxFontSizeMultiplier={1.5} style={styles.text} numberOfLines={1}>
      Log in with Google
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    maxWidth: 300,
    padding: 10,
    paddingHorizontal: 20,
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    borderRadius: 10
  },
  logo: {
    height: 30,
    marginRight: 20,
    width: 30
  },
  text: {
    color: '#414141',
    flex: 1,
    fontSize: 17,
    marginRight: 20,
    textAlign: 'center'
  },
})

