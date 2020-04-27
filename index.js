import 'react-native-gesture-handler';
import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import App from './App'
import { name as appName } from './app.json'
import auth from './src/user/reducer'

export const rootEpic = combineEpics()
export const rootReducer = combineReducers({ auth })

const epicMiddleware = createEpicMiddleware()
export const store = createStore(rootReducer, applyMiddleware(epicMiddleware))
epicMiddleware.run(rootEpic)

const Root = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SafeAreaProvider>
)

AppRegistry.registerComponent(appName, () => Root)
