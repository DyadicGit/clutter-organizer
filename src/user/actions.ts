import { Action } from 'redux';
import { User } from '@react-native-community/google-signin';
import { ofType } from "redux-observable";
import { map, mapTo, mergeMap } from "rxjs/operators";

interface PA<T, P> extends Action<T> {
    payload: P;
}

export type UserSetAction = PA<typeof SET_USER, User | null>;

export const SET_USER = 'SET_USER';

export const setUser = (payload: User | null): UserSetAction => ({
    type: SET_USER,
    payload,
});

/*export const setUser = action$ =>
  action$.pipe(
    ofType(SET_USER),
    map(action => ({
        type: SET_USER,
        payload: action.payload,
    }))
  )*/
