import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import googleSignInConfig from './signInConfig'
import { showNoInternetAlert, showSignInErrorAlert } from './alert'
import { checkNetwork } from './internet-service'
import { Platform } from 'react-native'
import handleError from './handleError'
import { store } from "../../index";
import { clearState } from "../user/actions";

GoogleSignin.configure(googleSignInConfig)
const throttle = <T = any>(func: () => Promise<T>) => {
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

export const currentUser = throttle(async () => ((await GoogleSignin.isSignedIn()) ? GoogleSignin.getCurrentUser() : null))

export const signInSilently = throttle(async () => {
  const user = await GoogleSignin.signInSilently()
  return (user) || null
})

export const accessToken = throttle(async () => ((await GoogleSignin.isSignedIn()) && (await GoogleSignin.getTokens()).accessToken) || null)

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

export const signIn = throttle(async () => {
  await checkNetwork(showNoInternetAlert)
  await GoogleSignin.hasPlayServices()

  return await trySignIn()
})

export const signOut = throttle(async () => {
  await GoogleSignin.signOut()
  store.dispatch(clearState())
})

export const refreshToken = throttle(async () => {
  await GoogleSignin.clearCachedAccessToken((await GoogleSignin.getTokens()).accessToken)
  return accessToken()
})
