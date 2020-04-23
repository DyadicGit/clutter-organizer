import { User } from '@react-native-community/google-signin'
import { useCallback, useEffect, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signInSilently, signOut } from '../utils/auth'
import { checkNetwork } from '../utils/internet-service'
import { showNoInternetAlert } from '../utils/alert'
import { setUser } from "../user/actions";
import { store } from "../../index";

type NoAuth = { type: 'NO_AUTH' }
type Ready = { type: 'READY'; user: User }
type UserState = NoAuth | Ready

export const checkUserState = async (): Promise<UserState> => {
  await checkNetwork(showNoInternetAlert)

  let user: User | null
  try {
    user = await signInSilently()
  } catch (e) {
    console.log('checkUserState error',e)
    user=null
  }

  if (!user) {
    store.dispatch(setUser(null))
    return { type: 'NO_AUTH' }
  }

  store.dispatch(setUser(user))

  return { type: 'READY', user }
}

export const useUserState = (): [UserState | null, () => void] => {
  const [state, setState] = useState<UserState | null>(null)

  const resetState = useCallback(() => {
    setState(null)
    checkUserState().then(setState)
  }, [])

  useEffect(resetState, [])

  return [state, resetState]
}
