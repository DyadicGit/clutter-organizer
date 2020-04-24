import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Container } from '../../components/container'

const HomePage = () => {
  return (
    <>
      <Container style={styles.container}><></></Container>
      <ScrollView>
        <Text>MediaItemScreen 0</Text>
        {Array(100).fill(null).map((_, key) => (<Text key={key}>MediaItemScreen</Text>))}
      </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 1,
  }
})

export default HomePage
