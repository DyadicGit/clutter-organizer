import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import LoginPage from './src/pages/login-page/login-page'
import HomePage from './src/pages/home-page/home-page'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Login" component={LoginPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App
