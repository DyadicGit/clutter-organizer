import { Action } from 'redux'
import { User } from '@react-native-community/google-signin'

interface PA<T, P> extends Action<T> {
  payload: P
}
export type AuthState = { type: 'NO_AUTH' | 'READY' }
type UserState = AuthState & { user: User | null }

export type AuthSetAction = PA<typeof SET_USER, UserState | null>

export const SET_USER = 'SET_USER'
export const CLEAR = 'CLEAR'

export const setUser = (payload: UserState): AuthSetAction => ({ type: SET_USER, payload })
export const clearState = () => ({ type: CLEAR })
