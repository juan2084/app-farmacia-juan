import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { useSelector } from 'react-redux'

const Header = ({route}) => {
  const categorySelected = useSelector(state => state.shop.value.categorySelected)
  const {height, width} = useWindowDimensions()

  console.log(route.name)

  return (
    <View style = {styles.container}>
      {/* {categorySelected ? <Text style = {width > 360 ? styles.text: styles.textSmall}>{categorySelected}</Text> : <Text style = {width > 360 ? styles.text: styles.textSmall}>{route.name}</Text>} */}
      <Text style = {width > 360 ? styles.text: styles.textSmall}>{route.name}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 30,
    shadowColor: colors.grey,
    shadowOpacity: 0.50,
    fontWeight: 'bold'
  },
  container:{
    width: '100%',
    height: 70,
    backgroundColor: colors.lightOrange,
    justifyContent: 'center',
    alignItems:'center'
    }, 
    textSmall: {
      color: colors.grey,
      // fontFamily: 'Josefin',
      fontSize: 16
    }
})