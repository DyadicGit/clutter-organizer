import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import App from './App'
import { name as appName } from './app.json'
import user from './src/user/reducer'

export const rootEpic = combineEpics()
export const rootReducer = combineReducers({ user })

const epicMiddleware = createEpicMiddleware()
export const store = createStore(rootReducer, applyMiddleware(epicMiddleware))
epicMiddleware.run(rootEpic)

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Root)
