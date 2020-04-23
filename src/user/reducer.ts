import { Reducer, Action } from 'redux';
import { User } from '@react-native-community/google-signin';

import { UserSetAction, SET_USER } from './actions';

export type UserState = User | null;

const initialState: UserState = null;

export type Actions = UserSetAction;

const reducer: Reducer<UserState, Actions | Action<'ANY'>> = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return action.payload;
        }
    }
    return state;
};
export default reducer;
