import { Button, Image, StyleSheet, Text, View, useWindowDimensions, Pressable,  Modal } from "react-native"
import React, { useEffect, useState } from "react"
import { useGetProductByIdQuery } from "../services/shopService"
import { useDispatch } from "react-redux"
import { addCartItem } from "../features/Cart/cartSlice"
import { colors } from "../constants/colors"


const ItemDetail = ({ route, navigation }) => {

  const dispatch = useDispatch ()
  const [orientation, setOrientation] = useState("portrait")
  const { width, height } = useWindowDimensions()
  const [modalVisible, setModalVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);


  const {productId: idSelected} = route.params

  const {data: product, error, isLoading} = useGetProductByIdQuery(idSelected)

  useEffect(() => {
    if (width > height) setOrientation("landscape")
    else setOrientation("portrait")
  }, [width, height])

  const handleAddCart = () => {
    setModalVisible(true);
  }


  const confirmAddCart = () => {
    dispatch(addCartItem({ ...product, quantity: 1 }));
    setModalVisible(false);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };



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

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¿Desea agregar este producto al carrito?</Text>
            <Pressable
              style={[styles.button, styles.buttonConfirm]}
              onPress={confirmAddCart}
            >
              <Text style={styles.textStyle}>Confirmar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {showConfirmation && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>Se agregó el item al carrito correctamente</Text>
        </View>
      )}
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 35,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonConfirm: {
    backgroundColor: colors.blue,
  },
  buttonCancel: {
    backgroundColor: colors.red,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  confirmationContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",  
  },
  confirmationText: {
    backgroundColor: colors.blue,
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
})
