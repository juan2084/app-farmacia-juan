import { Image, Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import Card from './Card'

const ProductItem = ({
  product,
  setProductSelected = () => {},
  navigation
}) => {
  return (
    <Card style={styles.additionalStyles}>
      <Pressable
        style= {styles.pressable}
        onPress={() => navigation.navigate('ItemDetail', {productId: product.id})}
      >
        <Text style={styles.textCategory} >{product.title}</Text>
          <Image
              resizeMode='cover'
              style={styles.image}
              source={{uri: product.images}}
          />
      </Pressable>
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
    image: {
      height: 200,
      width: 140,
    },
    additionalStyles: {
      paddingLeft: 10,
      flexDirection: 'row',
      height: 200,
      width: 340,
      justifyContent: 'space-between',
      margin: 20,
      backgroundColor: colors.salmon
    },
    textCategory: {
      color: colors.red,
      fontSize: 16
    },
    pressable: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 10,
    },
  })