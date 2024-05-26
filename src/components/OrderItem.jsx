import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { colors } from "../constants/colors";
import { useState } from "react";

const OrderItem = ({ order }) => {

    const [showDetails, setShowDetails] = useState(false);

    const total = order.items.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0
    );

    const totalItems = order.items.reduce(
        (acc, currentItem) => (acc += currentItem.quantity),
        0
    );

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <View style={styles.card} onPress={() => {}}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {order?.date || null}                  
                </Text>
                <Text style={styles.text2}>${total}</Text>
               
                    {showDetails && (
                        <Modal
                        transparent={true}
                        animationType="slide"
                        visible={showDetails}
                        onRequestClose={toggleDetails}
                        >
                        <>
                            <View style={styles.detailsWrapper}>
                                <ScrollView>
                                    <View style={styles.content}>
                                        <Text style={styles.detailsText}>Cantidad de items: {totalItems}</Text>
                                        {order.items.map((item, index) => (
                                            <View key={index} style={styles.itemContainer}>
                                                <Text style={styles.itemText}>Nombre: {item.description}</Text>
                                                <Text style={styles.itemText}>Marca: {item.brand}</Text>
                                                <Text style={styles.itemText}>Cantidad: {item.quantity}</Text>
                                                <Text style={styles.itemText}>Precio: ${item.price}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                                <TouchableOpacity onPress={toggleDetails} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>Cerrar</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        </Modal>
                )}
              
            </View>
            <TouchableOpacity onPress={toggleDetails}>
                <Feather name="search" size={30} color="black" />
            </TouchableOpacity> 
        </View>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: colors.lightExtraOrange,
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    text: {
        fontSize: 17,
        color: colors.black,
    },
    text2: {
        fontSize: 19,
        color: colors.grey,
    },
    content: {
        paddingBottom: 50,
    },
    detailsText: {
        fontSize: 18,
        color: colors.darkOrange,
        marginBottom: 10,
    },   
    itemContainer: {
        marginBottom: 10,
    },
    itemText: {
        fontSize: 15,
        color: colors.darkGrey,
    },
    scrollHint: {
        fontSize: 12,
        color: colors.darkGrey,
        textAlign: 'center',
        marginTop: 5,
    },
    detailsWrapper: {
        marginTop: 10,
        backgroundColor: colors.platinum,
        borderRadius: 5,
        width: '80%',
        maxHeight: '80%',
        padding: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: colors.lightExtraOrange,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        color: colors.blue,
    },
});
