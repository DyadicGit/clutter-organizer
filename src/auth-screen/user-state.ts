import { User } from '@react-native-community/google-signin'
import { signInSilently } from '../utils/auth'
import { checkNetwork } from '../utils/internet-service'
import { showNoInternetAlert } from '../utils/alert'
import { setUser } from "../user/actions";
import { store } from "../../index";

export const checkUserState = async (): Promise<void> => {
  await checkNetwork(showNoInternetAlert)

  let user: User | null
  try {
    user = await signInSilently()
  } catch (e) {
    console.log('not signed in')
    user=null
  }

  if (!user) {
    store.dispatch(setUser({user: null, type: 'NO_AUTH' }))
    return;
  }
  store.dispatch(setUser({user,  type: 'READY' }))
  return;
}
