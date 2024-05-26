import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { getSession } from '../persistence';
import { setUser } from '../features/User/userSlice';


const Navigator = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth.value) 

 useEffect(() => {
   (async () => {
    try {
      const response = await getSession()

      if(response.rows._array.length){
        const user = response.rows._array[0]
        dispatch(setUser({
          email: user.email,
          localId: user.localId,
          idToken: user.token
        }))
      }
   
    } catch (error) {
      Alert.alert(
        'Error',
        'Hubo un problema al cargar los datos. Por favor, intenta nuevamente más tarde.',
        [{ text: 'OK' }]
      );
    }
   })()
 }, [])
 


  return (
    <NavigationContainer>
     {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default Navigator