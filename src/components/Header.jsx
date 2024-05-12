import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const Header = ({title}) => {
  const {height, width} = useWindowDimensions()
  return (
    <View style = {styles.container}>
      <Text style = {width > 360 ? styles.text: styles.textSmall}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 30,
    shadowColor: colors.lightGrey,
    shadowOpacity: 0.50,
    fontWeight: 'bold'
  },
  container:{
    width: '100%',
    height: 70,
    backgroundColor: colors.salmon,
    justifyContent: 'center',
    alignItems:'center'
    }, 
    textSmall: {
      color: colors.lightGrey,
      fontFamily: 'Josefin',
      fontSize: 16
    }
})