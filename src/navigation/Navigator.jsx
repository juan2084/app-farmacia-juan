import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import { useSelector } from 'react-redux';


const Navigator = () => {

  const {user} = useSelector(state => state.auth.value) 
  return (
    <NavigationContainer>
     {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})