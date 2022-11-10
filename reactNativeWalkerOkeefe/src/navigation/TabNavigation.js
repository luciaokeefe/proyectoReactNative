import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home/Home'
import Posts from "../screens/Posts/Posts"
import Profile from "../screens/Profile/Profile"
/* import {FontAwesome} from '@expo/vector-icons' */



const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen name={'Home'} component={Home} options={{
           /*  tabBarIcon: () => <FontAwesome name='home' color={'red'} size={32} />,
            headerShown:false */
        }}/>
   
     <Tab.Screen name={'Posts'} component={Posts} options={{
           /*  tabBarIcon: () => <FontAwesome name='home' color={'red'} size={32} />,
            headerShown:false */
        }}/>
        
        <Tab.Screen name={'Profile'} component={Profile} options={{
           /*  tabBarIcon: () => <FontAwesome name='home' color={'red'} size={32} />,
            headerShown:false */
        }}/>

    </Tab.Navigator>
  )
}