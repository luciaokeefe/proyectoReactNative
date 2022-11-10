import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'

class Login extends Component { 

    constructor(props) {
        super(props)
        this.state = {
            email: '', 
            password: '', 
            logueado: false 
    
        }
    }

    loguear(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then( resp => this.props.navigation.navigate('TabNavigation'))
        .catch(err => console.log(err))
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {  // observa la obtención de datos del usuario desde la base de datos y posibles cambios 
            if(user !== null){
                this.props.navigation.navigate('TabNavigation') // si es distintito a null el user, nos va redirigir a 'tabNavigation' 
            }
        })
    }

    render() {
        return (
          <View style={styles.container} >
            <Text>Login</Text>
            <View>
                <TextInput
                 style={ styles.input}
                 onChangeText={ text => this.setState( {email:text} )}
                 placeholder='Ingresa tu email'
                 value={this.state.email}
                />
                <TextInput
                 style={ styles.input} 
                 onChangeText={ text => this.setState( {password:text} )}
                 placeholder='Ingresa tu contraseña'
                 value={this.state.password}
                 secureTextEntry= {true}
                />
                <View>
                    <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)}>
                        <Text>Loguearme</Text>
                    </TouchableOpacity>
                </View>
    
                <View>
                    <Text>Todavía no sos un usuario?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register') }>
                        <Text>Registrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
        )
      }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:32
    },
    input:{
        borderWidth:1
    }
})


export default Login 