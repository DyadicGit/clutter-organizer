import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { signOut } from '../utils/auth'

const logoutPrompt = () =>
  new Promise((resolve, reject) =>
    Alert.alert('Log out?', undefined, [
      { text: 'Yes', style: 'destructive', onPress: resolve },
      { text: 'Cancel', style: 'cancel', onPress: reject }
    ])
  )

const onSignOut = () => logoutPrompt().then(signOut)

export const SignOutButton = ({ style = {}, children }) => (
  <TouchableOpacity onPress={onSignOut} style={StyleSheet.flatten(style)}>
    {children || <Text>Log out</Text>}
  </TouchableOpacity>
)
