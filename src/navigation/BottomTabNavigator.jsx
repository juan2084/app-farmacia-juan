import React from "react"
import { StyleSheet, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStackNavigator from "./HomeStackNavigator"
import { colors } from "../constants/colors"
import CartStack from "./CartStackNavigator"
import OrderStack from "./OrderStackNavigator"
import Header from "../components/Header"
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                    return <Header route={route} />
                },
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen
                name="Tienda"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name="store"
                                    size={24}
                                    color={focused ? "black" : colors.lightGrey}
                                />
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Carrito"
                component={CartStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome6
                                    name="cart-shopping"
                                    size={24}
                                    color={focused ? "black" : colors.lightGrey}
                                />
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Orden"
                component={OrderStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons
                                    name="receipt"
                                    size={24}
                                    color={focused ? "black" : colors.lightGrey}
                                />
                            </View>
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.lightOrange,
        shadowColor: "black",
        elevation: 6,
        borderRadius: 15,
        height: 60
    },
})
