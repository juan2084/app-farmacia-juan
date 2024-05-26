import { FlatList, Pressable, StyleSheet, Text, Modal, View, Button } from 'react-native'
import React from 'react'
import CartItem from '../components/CartItem';
import { colors } from '../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import { usePostOrderMutation } from '../services/shopService';
import { emptyCart } from "../features/Cart/cartSlice";
import { Alert } from 'react-native';
import { useState } from 'react';




const Cart = () => {

    const dispatch = useDispatch()
    const {localId} = useSelector(state => state.auth.value)
    const {items: CartData, total} = useSelector(state => state.cart.value)
    const [triggerPostOrder, result] = usePostOrderMutation()
    const [modalVisible, setModalVisible] = useState(false);



    const onConfirmOrder = async () => {
        try {
            await triggerPostOrder({ items: CartData, user: localId, total});        
            setModalVisible(true);
        } catch (error) {
            Alert.alert(
                'Error',
                'Error al confirmar la orden.',
                [{ text: 'OK' }]
              );
        }
    };


    const onCloseModal = () => {
        setModalVisible(false);
        dispatch(emptyCart());
    };


 
    return (
            <View style={styles.container}>
                    {CartData.length === 0 ? (
                        <View style={styles.emptyCartContainer}>
                            <Text style={styles.emptyCartText}>No hay elementos en el carrito.</Text>
                        </View>
                    ) : (
                        <>
                            <FlatList
                                data={CartData}
                                keyExtractor={cartItem => cartItem.id}
                                renderItem={({item})=> {
                                    return (
                                        <CartItem
                                            cartItem={item}
                                        />
                                    )
                                }}
                            />
                            <View style={styles.totalContainer}>
                                <Pressable>
                                    <Text style={styles.confirmText} onPress={onConfirmOrder}>
                                        Confirmar
                                    </Text>
                                </Pressable>
                                <Text>Total: ${total}</Text>
                            </View> 
                        </>
                    )}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Tu orden ha sido confirmada.</Text>
                                <Button title="OK" onPress={onCloseModal} />
                            </View>
                        </View>
                    </Modal>
            </View>
            
  )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: 120,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmText: {
        fontSize: 18,
        color: colors.blue,
        marginLeft: 10,
        marginRight: 30
    }, 
    emptyCartContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 22,
        color: colors.blue,
        marginLeft: 10,
        marginRight: 30, 
        paddingTop: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
})