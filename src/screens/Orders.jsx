import { FlatList, View, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderItem from '../components/OrderItem'
import { useGetOrdersQuery } from '../services/shopService'
import { useSelector } from 'react-redux'
import { colors } from '../constants/colors'

const OrderScreen = () => {

  const {localId} = useSelector(state => state.auth.value)
  const {data: orders, isSuccess} = useGetOrdersQuery(localId)
  const [ordersFiltered, setOrdersFiltered] = useState([])

  useEffect(() => {
    if (isSuccess && orders)  {
      const responseTransformed = Object.values(orders)
      const ordersFiltered = responseTransformed.filter(order => order.user === localId)
      setOrdersFiltered(ordersFiltered)
    }
  }, [orders, isSuccess, localId])
  



  return (
    <View>
     {ordersFiltered.length === 0 ? (
        <View style={styles.emptyOrderContainer}>
          <Text style={styles.emptyOrderText}>No hay órdenes en el historial.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={ordersFiltered}
            renderItem={({item}) => {
              return (
                <OrderItem 
                  order={item}
                />
              )
            }}
          />
        </>
        )
     }
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  emptyOrderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyOrderText: {
        fontSize: 22,
        color: colors.blue,
        marginLeft: 10,
        marginRight: 30, 
        paddingTop: 20
    }
})