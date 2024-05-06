import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const Header = ({Title}) => {
  return (
    <View style={styles.container}>
      <Text style = {styles.text}>{Title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 30,
    textShadowColor: colors.lightGrey,
    shadowOpacity: 0.50,
    fontWeight: 'bold'
  },
  container:{
    width: '100%',
    height: 70,
    backgroundColor: colors.salmon,
    justifyContent: 'center',
    alignItems:'center'
    }
})