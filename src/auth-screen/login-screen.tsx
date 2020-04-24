import React, { FC, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { signIn } from '../utils/auth'
import { useSelector } from 'react-redux';
import { Container } from '../components/container'
import { SignOutButton } from '../components/sign-out-button'
import { SignInButton } from '../components/sign-in-button'
import { LIZARD } from '../utils/pallete'
import { checkUserState } from "./user-state";

export const LoginScreen: FC = () => {
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    checkUserState()
  }, [])

  const onSignIn = useCallback(() => {
    signIn().then(checkUserState)
  }, [])


  if (!Object.getOwnPropertyNames(auth).length || (auth.type === 'READY' && Object.getOwnPropertyNames(auth).length === 1)) {
    return <Container />
  }
  
  if (auth.type === 'NO_AUTH') {
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
      <SignOutButton style={styles.logoutButton}>
        <Text>Log out {JSON.stringify(auth.user.user.name).replace(/^.|.$/g, '')}</Text>
      </SignOutButton>
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
