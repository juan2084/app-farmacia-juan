import { StyleSheet, Text, View, Pressable, Modal, TouchableOpacity  } from "react-native";
import React, { useState } from "react";
import { colors } from "../constants/colors";
import { Entypo } from "@expo/vector-icons";
import { removeCartItem } from '../features/Cart/cartSlice'
import { useDispatch } from "react-redux"




const CartItem = ({ cartItem }) => {

    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);

    const handleRemoveFromCart = () => {
        setModalVisible(true);
      }

    const confirmRemoveFromCart = () => {
        dispatch(removeCartItem({ id: cartItem.id }));
        setModalVisible(false);
    };

    return (
        <View style={styles.card} onPress={() => {}}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{cartItem.title} ({cartItem.quantity})</Text>
                <Text style={styles.text2}>{cartItem.brand}</Text>
                <Text style={styles.text2}>${cartItem.price}</Text>
            </View>
            <Pressable onPress={handleRemoveFromCart}>
              <Entypo name="trash" size={30} color="black" />
            </Pressable>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>¿Estás seguro que deseas eliminar este artículo del carrito?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonCancel]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonDelete]}
                                onPress={confirmRemoveFromCart}
                            >
                                <Text style={styles.textStyle}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: colors.lightBlue,
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textContainer: {
        width: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
        color: colors.blue,
    },
    text2: {
        fontSize: 14,
        color: colors.purple,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonCancel: {
        backgroundColor: colors.grey,
        marginRight: 10
    },
    buttonDelete: {
        backgroundColor: colors.red
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
