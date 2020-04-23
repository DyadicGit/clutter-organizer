import { Alert, AlertOptions, AlertButton, Platform, Linking } from 'react-native'
import { checkNetwork } from './internet-service'
import AndroidOpenSettings from 'react-native-android-open-settings'

let isAlertOpen = false

export interface AlertProperties {
  title: string
  message: string
  buttons?: AlertButton[]
  options?: AlertOptions
}

export const createAlert = ({ title, message, buttons, options }: AlertProperties): Promise<void> => {
  if (isAlertOpen) return Promise.resolve()
  isAlertOpen = true
  return new Promise(resolve => {
    if (!buttons || !buttons.length) {
      buttons = [{}]
    }
    Alert.alert(
      title,
      message,
      buttons.map(button => ({
        ...button,
        onPress: () => {
          isAlertOpen = false
          resolve()
          button.onPress && button.onPress()
        }
      })),
      options
    )
  })
}

const sessionExpiredAlert: AlertProperties = {
  title: 'Session Expired',
  message: 'Please login again',
  buttons: [
    {
      text: 'Go to login',
      onPress: () => console.log('navigateToLogin')
    }
  ],
  options: { cancelable: false }
}

export const showSessionExpiredAlert = () => createAlert(sessionExpiredAlert)

const noInternetAlert: AlertProperties = {
  title: 'No internet',
  message: 'Oops! Are you connected to the internet?',
  options: { cancelable: false },
  buttons: [
    {
      text: 'SETTINGS',
      onPress: () => {
        Platform.OS === 'ios' ? Linking.openURL('App-Prefs:root') : AndroidOpenSettings.generalSettings()
      }
    },
    {
      text: 'OK'
    }
  ]
}

export const showNoInternetAlertOnce = () => {
  createAlert(noInternetAlert)
}

const unexpectedAlert: AlertProperties = {
  title: 'Unexpected error',
  message: 'Oops! Something went wrong. Please try again later',
  options: { cancelable: false }
}

export const showUnexpectedAlert = () => createAlert(unexpectedAlert)

const noLocationAlert: AlertProperties = {
  title: 'No rooms',
  message: 'No rooms found in Calendar',
  buttons: [
    {
      text: 'Log out'
    }
  ],
  options: { cancelable: false }
}

export const showNoLocationAlert = () => createAlert(noLocationAlert)

export const showNoInternetAlert = async (): Promise<void> => {
  if (isAlertOpen) return
  await createAlert(noInternetAlert)
  await checkNetwork(showNoInternetAlert)
}

export const showSignInErrorAlert = async () => {
  const interuptedSignInAlert: AlertProperties = {
    title: 'Log in interupted',
    message: "Couldn't log in. Please try again later",
    options: { cancelable: false },
    buttons: [
      {
        text: 'Ok'
      }
    ]
  }
  await createAlert(interuptedSignInAlert)
}
