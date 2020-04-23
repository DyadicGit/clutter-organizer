import Config from 'react-native-config'

export default {
  scopes: ['profile', 'email', 'https://www.googleapis.com/auth/photoslibrary.readonly'],
  webClientId: Config.CLIENT_ID,
}
