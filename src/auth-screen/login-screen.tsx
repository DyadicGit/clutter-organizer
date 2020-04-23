import React, { FC, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { signIn } from '../utils/auth'
import { useUserState } from './user-state'
import { Container } from './components/container'
import { SignOutButton } from './components/sign-out-button'
import { SignInButton } from './components/sign-in-button'
import { AccessTokenTestID } from './accessTokenTestID'
import { LIZARD } from '../utils/pallete'

export const LoginScreen: FC = () => {
  const [state, resetState] = useUserState()

  const onSignIn = useCallback(() => {
    signIn().then(resetState)
  }, [])

  useEffect(() => {
    if (state) SplashScreen.hide()
  }, [state && state.type])

  if (state === null || (state.type === 'READY' && Object.getOwnPropertyNames(state).length === 1)) {
    // if (state === null || state.type === 'READY') {
    return <Container />
  }

  if (state.type === 'NO_AUTH') {
    return (
      <Container>
        <View style={styles.signInContent}>
          <SignInButton onPress={onSignIn} />
        </View>
      </Container>
    )
  }

  return (
    <Container>
      <SignOutButton onPress={resetState} style={styles.logoutButton}>
        <Text>Log out {JSON.stringify(state.user.user.name).replace(/^.|.$/g, '')}</Text>
      </SignOutButton>
      {__DEV__ && <AccessTokenTestID />}
    </Container>
  )
}

const styles = StyleSheet.create({
  logoutButton: {
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: LIZARD.hex,
    borderRadius: 10,
  },
  signInContent: {
    alignItems: 'center'
  }
})
