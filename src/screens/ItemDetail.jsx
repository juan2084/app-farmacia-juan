import { Button, Image, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import React, { useEffect, useState } from "react"
import { useGetProductByIdQuery } from "../services/shopService"
import { useDispatch } from "react-redux"
import { addCartItem } from "../features/Cart/cartSlice"

const ItemDetail = ({ route, navigation }) => {

  const dispatch = useDispatch ()
  const [orientation, setOrientation] = useState("portrait")
  const { width, height } = useWindowDimensions()

  const {productId: idSelected} = route.params

  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected)

  useEffect(() => {
    if (width > height) setOrientation("landscape")
    else setOrientation("portrait")
  }, [width, height])

  const handleAddCart = () => {
    dispatch(addCartItem({...product, quantity: 1}))
  }

  return (
    <View>
      <Button onPress={() => navigation.goBack()} title="Atrás" />
      {product ? (
        <View
            style={
            orientation === "portrait"?
            styles.mainContainer
            : styles.mainContainerLandscape
          }
          >
          <Image
            source={{ uri: product.images}}
            style={orientation === "portrait" ? styles.image : styles.imageLandscape}
            resizeMode="cover"
          
          />
          <View style={orientation === "portrait" ? styles.textContainer : styles.textContainerLandscape}>
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.price}>Precio $ {product.price}</Text>
            <Button title="Agregar al carrito" onPress={handleAddCart}></Button>
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 30,
  },
  image: {
    width: '100%',
    height: '75%',
  },
  imageLandscape: {
    width: '65%',
    height: 200
  },
  textContainer: {
    flexDirection: "column",
  },
  price: {
    textAlign: 'right',
    width: '100%'
  }, 
  textContainerLandscape: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'start',
    gap: 10,
  },
})
