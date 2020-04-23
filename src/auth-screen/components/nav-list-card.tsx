import React, { FC, ReactNode } from 'react'
import { StyleSheet, Text, TextProps, TouchableOpacity, View, ViewProps } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export type ListCardItemProps = {
  first?: boolean
  more?: boolean
  link?: boolean
  onPress: () => void
  testID?: string
} & TextProps

export const ListCardItem: FC<ListCardItemProps> = ({ first, more, onPress, style, link, testID, ...rest }) => (
  <>
    {!first && <View style={styles.separator} />}
    <TouchableOpacity onPress={onPress} style={styles.item} testID={testID}>
      <Text style={StyleSheet.flatten([styles.itemText, link && styles.link, style])} {...rest} />
      {more && <Icon name="angle-right" style={styles.arrow} />}
    </TouchableOpacity>
  </>
)

export const ListCard: FC<{ title?: ReactNode } & ViewProps> = ({ title, style, ...rest }) => {
  return (
    <>
      {title}
      <View style={StyleSheet.flatten([styles.card, style])} {...rest} />
    </>
  )
}

const styles = StyleSheet.create({
  arrow: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 20,
    width: 18
  },
  card: {
    backgroundColor: '#fcfcfce6',
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    borderTopColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '100%'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingLeft: 12
  },
  itemText: {
    color: '#444',
    flex: 1,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18
  },
  link: { color: '#007aff' },
  separator: {
    borderTopColor: '#999',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginLeft: 12
  },
  title: {
    color: '#f9faf3',
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 14,
    paddingLeft: 12,
    paddingVertical: 6,
    textTransform: 'uppercase',
    width: '100%'
  }
})
