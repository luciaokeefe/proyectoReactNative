import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React, {Component} from 'react'
import Login from '../screens/Login/Login'
import Register from '../screens/Register/Register'
import TabNavigation from './TabNavigation'
import Comments from '../screens/Comments/Comments'
import Profile from '../screens/Profile/Profile'
import PerfilesScreen from '../screens/PerfilesScreen/PerfilesScreen'

const Stack = createNativeStackNavigator() 

class MainNavigation extends Component {
    constructor(props){
        super(props)
        this.state = {
            initialScreen:'Login'
        }
    }

    render(){
        
        return (
          <NavigationContainer> 
              <Stack.Navigator
              initialRouteName={this.state.initialScreen}
              >
                   <Stack.Screen 
                      name='Login' 
                      component={Login}
                     
                    /> 
                    <Stack.Screen 
                      name='Register' 
                      component={Register}
                      />
                 
                  <Stack.Screen
                      name='TabNavigation'
                      component={TabNavigation} 
                      options={{
                          headerShown:false
                        }}
                        />

                <Stack.Screen
                        name='Comments'
                        component={Comments}
                    />

                <Stack.Screen
                        name='Profile'
                        component={Profile}
                        unmountONBlur= {true}
                    />
                    <Stack.Screen
                        name='PerfilesScreen'
                        component={PerfilesScreen}
                    />

              </Stack.Navigator>
            
              
              
          </NavigationContainer>
        )
    }
}


export default MainNavigation