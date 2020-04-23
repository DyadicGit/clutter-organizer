import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import googleSignInConfig from './signInConfig'
import { showNoInternetAlert, showSignInErrorAlert } from './alert'
import { checkNetwork } from './internet-service'
import { Platform } from 'react-native'
import handleError from './handleError'

GoogleSignin.configure(googleSignInConfig)
const memo = <T = any>(func: () => Promise<T>) => {
  let promise: Promise<T> | null = null
  const clear = () => {
    promise = null
  }
  return () => {
    if (promise) {
      return promise
    }
    promise = func()
    promise.then(clear, clear)
    return promise
  }
}

export const currentUser = memo(async () => ((await GoogleSignin.isSignedIn()) ? GoogleSignin.getCurrentUser() : null))

export const signInSilently = memo(async () => {
  const user = await GoogleSignin.signInSilently()
  console.log('user', user)
  return (user) || null
})

export const accessToken = memo(async () => ((await GoogleSignin.isSignedIn()) && (await GoogleSignin.getTokens()).accessToken) || null)

const trySignIn = async (retry = 0): Promise<void> => {
  try {
    await GoogleSignin.signIn()
    return
  } catch (error) {
    handleError(error)

    if (error.code && error.code === statusCodes.SIGN_IN_CANCELLED) {
      if (Platform.OS === 'android' && retry === 0) {
        return await trySignIn(retry + 1)
      }
      return
    }
    return await showSignInErrorAlert()
  }
}

export const signIn = memo(async () => {
  await checkNetwork(showNoInternetAlert)
  await GoogleSignin.hasPlayServices()

  return await trySignIn()
})

export const signOut = memo(async () => {
  await GoogleSignin.signOut()
  //set global state to initial
})

export const refreshToken = memo(async () => {
  await GoogleSignin.clearCachedAccessToken((await GoogleSignin.getTokens()).accessToken)
  return accessToken()
})
