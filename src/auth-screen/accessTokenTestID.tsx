import React, { useEffect, useState } from 'react'
import { accessToken, currentUser } from '../utils/auth'
import { View, Text, Dimensions } from 'react-native'
const window = Dimensions.get('window')

export const AccessTokenTestID: React.FC = () => {
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    let canBeSet = true
    currentUser()
      .then(value => (value && canBeSet && accessToken()) || null)
      .then(token => token && canBeSet && setToken(token))
    return () => {
      canBeSet = false
    }
  }, [])
  return (
    <View
      testID="access-token"
      style={{
        top: window.height,
        bottom: -window.height
      }}
      pointerEvents="none">
      <Text>{token}</Text>
    </View>
  )
}
