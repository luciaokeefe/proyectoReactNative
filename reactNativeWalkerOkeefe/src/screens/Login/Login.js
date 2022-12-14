import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'
import { Feather } from '@expo/vector-icons';


class Login extends Component { 

    constructor(props) {
        super(props)
        this.state = {
            email: '', 
            password: '', 
            logueado: false,
            error: ""
    
        }
    }

    loguear(email, pass){

       
        auth.signInWithEmailAndPassword(email, pass)
        .then( resp => this.props.navigation.navigate('TabNavigation'))
        .catch(err => {console.log(err) 
            this.setState({
                error: err.message,
            })
        })
    

      
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
            <Text style={styles.text}>Login</Text>
            <View>
                <TextInput
                 style={ styles.campo}
                 onChangeText={ text => this.setState( {email:text} )}
                 placeholder='Ingresa tu email'
                 value={this.state.email}
                />
                <TextInput
                 style={ styles.campo} 
                 onChangeText={ text => this.setState( {password:text} )}
                 placeholder='Ingresa tu contraseña'
                 value={this.state.password}
                 secureTextEntry= {true}
                />
                <View>
                    <TouchableOpacity 
                    onPress={()=> this.loguear(this.state.email, this.state.password)}
                    style ={ styles.login}>
                    <Feather name="arrow-right-circle" size={24} color="black" />
                    </TouchableOpacity>
                </View>
    
                <View>
                    <Text>Todavía no sos un usuario?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register') }>
                        <Text>Registrate</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.error}> {this.state.error} </Text>
            </View>
          </View>
        )
      }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:30,
        

    },
    campo:{
        backgroundColor: 'white',
        fontFamily: 'arial',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'left',
        color: 'rgb(115, 115, 115)',
        padding: 5
    },
    login:{
        flex:1, 
        paddingTop:4, 
        paddingBottom:4
    }, 
    text:{
        paddingBottom:4,
        
    }
})


export default Login 