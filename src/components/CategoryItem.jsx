import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors';
import Card from './Card';

const CategoryItem = ({category, selectCategory = () => {}}) => {
  return (
    <Card>
      <Pressable onPress = {() => selectCategory(category)}>
        <Text style = {styles.text}>{category}</Text>
      </Pressable>
    </Card>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
    categoryContainer: {
      backgroundColor: colors.darkPurple,
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
        marginTop: 10
    },
    text: {
        color: colors.salmon,
        textAlign:'center',
        fontSize: 25,
    }
})

