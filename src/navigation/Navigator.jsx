import { StyleSheet } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import HomeStackNavigator from './HomeStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';


const Navigator = () => {
  return (
    <NavigationContainer>
        <BottomTabNavigator/>
        {/* <HomeStackNavigator/> */}
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})