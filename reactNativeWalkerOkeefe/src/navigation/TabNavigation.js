import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home/Home'
import Posts from "../screens/Posts/Posts"
import Profile from "../screens/Profile/Profile"
import Buscador from '../screens/Buscador/Buscador'
import { Foundation, FontAwesome, Ionicons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}} >
        <Tab.Screen name={'Home'} component={Home} options={{
          tabBarIcon: () => <Foundation name="home" size={24} color="black" />,
          headerShown:false 
        }}/>
   
     <Tab.Screen name={'Posts'} component={Posts} options={{
          tabBarIcon: () =><FontAwesome name="camera" size={22} color="black" />,
          headerShown:false 
        }}/>
        
        <Tab.Screen name={'Profile'} component={Profile} options={{
          tabBarIcon: () => <Ionicons name="person" size={24} color="black" />,
          headerShown:false
        }}/>

      <Tab.Screen name={'Buscador'} component={Buscador} options={{
            tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />,
            headerShown:false
        }} />

    </Tab.Navigator>
  )
}
