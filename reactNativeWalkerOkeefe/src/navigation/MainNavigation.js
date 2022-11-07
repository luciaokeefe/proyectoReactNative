import { View, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {Component} from 'react'
import Login from '../screens/Login/Login'
import TabNavigation from './TabNavigation'
import { auth } from '../firebase/config'


const Stack = createNativeStackNavigator() //estamos implementando la nevegacion en React (es el paso 3 de la implemetación)

class MainNavigation extends Component {
    constructor(props){
        super(props)
        this.state = {
            initialScreen:'Login'
        }
    }

    // navigationContainer contiene la estructura de navegación 
    //Stack.Navigator define el tipo de navegación y contiene la lista de pantallas relacionadas por el tipo de navegacion 
    //Stack.Screen representa a cada una de las pantallas a las que podremos acceder 

    render(){
        
        return (
          <NavigationContainer> 
              <Stack.Navigator
              initialRouteName={this.state.initialScreen}
              >
                   <Stack.Screen 
                      name='Login' 
                      component={Login}
                      options={{
                          headerShown:false
                        }}
                    /> 
                 
                    
                  <Stack.Screen
                      name='TabNavigation' //identifica al elemento navegable
                      component={TabNavigation} //que pantalla va a mostrar 
                      options={{
                          headerShown:false
                        }}
                        />

              </Stack.Navigator>
              
          </NavigationContainer>
        )
    }
}


export default MainNavigation