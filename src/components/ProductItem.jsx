import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import Card from './Card'

const ProductItem = ({product}) => {
  return (
    <Card style={styles.additionalStyles}>
        <Text style={styles.textCategory} >{product.title}</Text>
        <Image
            resizeMode='cover'
            style={styles.image}
            source={{uri: product.images}}
        />
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
    image: {
      height: 200,
      width: 140,
      borderRadius: 8
    },
    additionalStyles: {
      paddingLeft: 10,
      flexDirection: 'row',
      height: 200,
      width: 340,
      justifyContent: 'space-between',
      margin: 20,
    },
    textCategory: {
      color: colors.red,
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center'
    }
  })