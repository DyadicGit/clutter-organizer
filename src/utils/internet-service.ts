import NetInfo, { NetInfoState } from '@react-native-community/netinfo'

const waitForInternetState = () =>
  new Promise<NetInfoState>((resolve) => {
    const subscription = NetInfo.addEventListener((state) => {
      if (state.isInternetReachable !== null) {
        subscription()
        resolve(state)
      }
    })
  })

export const checkNetwork = async (alert?: () => Promise<void> | void) => {
  let { isInternetReachable } = await NetInfo.fetch()

  if (isInternetReachable === null) {
    isInternetReachable = (await waitForInternetState()).isInternetReachable
  }

  if (!isInternetReachable && alert) {
    await alert()
  }

  return isInternetReachable
}
