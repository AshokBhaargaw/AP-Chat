import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


export default function Photos() {

  return (
    <View style={[styles.screen,]}>

      <View style={[styles.plusStyle,]}>
        <Text style={styles.plusTextStyle} >+</Text>
      </View>
    </View >
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 0,
  },

  plusStyle: {
    backgroundColor: "#0000fa",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: '-50%' }],

  },

  plusTextStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white'
  }
})