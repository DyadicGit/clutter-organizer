import React, { FC, useEffect, useState } from 'react'
import { ActivityIndicator, Animated, SafeAreaView, StyleSheet, Text, View, ViewProps } from 'react-native'
import { Header } from './brand-header'
import { LIZARD } from '../../utils/pallete'

export const Indicator: FC = () => {
  const [fade] = useState(new Animated.Value(0))
  useEffect(() => {
    const anim = Animated.timing(fade, { useNativeDriver: true, toValue: 1, duration: 300 })
    anim.start()
    return () => anim.stop()
  }, [])

  return (
    <Animated.View style={{ opacity: fade, marginTop: 30 }}>
      <ActivityIndicator color={LIZARD.hex} size="large" />
    </Animated.View>
  )
}

export const Container: FC<ViewProps> = ({ children, style, ...rest }) => (
  <SafeAreaView style={StyleSheet.flatten(style)} {...rest}>
    <Header style={{ height: 1 }} proportion={5 / 4}>
      <Text allowFontScaling={false} style={styles.slogan}>
        Organize your clutter images
      </Text>
    </Header>
    <View style={styles.content}>{children || <Indicator />}</View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  base: {  },
  content: {  },
  slogan: {
    color: LIZARD.rgba(0.15),
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
    marginVertical: 18,
    textAlign: 'center',
    width: '70%'
  }
})
