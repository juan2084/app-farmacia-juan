import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const Card = ({children, style}) => {
  return (
    <View style={{...styles.container, ...style}}>
        {children}
    </View>
  )
}

export default Card



const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.purple,
        height: 40,
        width: 250,
        flexDirection:'column',
        shadowColor: "#000",
        shadowOffset:{
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        elevation: 9,
        marginBottom: 10,
        marginTop: 10, 
        borderRadius: 10
    },
    text: {
        color: colors.darkPurple,
        textAlign:'center',
        fontSize: 20,
    }
})