import React, { FC, useCallback, useState } from 'react'
import { Image, LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native'

const useProportion = (proportion: number, { style, onLayout, ...rest }: ViewProps): ViewProps => {
  const [height, setHeight] = useState(() => StyleSheet.flatten(style).height)
  return Object.assign(rest, {
    style: [style, { height }],
    onLayout: useCallback(
      (event: LayoutChangeEvent) => {
        if (onLayout) onLayout(event)
        setHeight(event.nativeEvent.layout.width / proportion)
      },
      [onLayout]
    )
  })
}

export const Header: FC<ViewProps & { proportion: number }> = ({ proportion, children, ...rest }) => (
  <View {...useProportion(proportion, { ...rest, style: [styles.header, rest.style] })}>
    <Image style={styles.logo} source={require('../assets/clutter-organizer-logo.png')} />
    {children}
  </View>
)

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: '10%',
  },
  logo: {
    alignSelf: 'center',
    height: '25%',
    resizeMode: 'contain',
    width: '70%'
  }
})
