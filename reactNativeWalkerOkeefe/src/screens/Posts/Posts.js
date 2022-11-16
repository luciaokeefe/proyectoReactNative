import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Camara from '../../components/Camara/Camara'

class Posts extends Component {
  
    constructor(){
        super()
        this.state={
            comment:'',
            mostrarCamara:true,
            fotoUrl:''
        }
    }

    enviarPost(text){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            comment: text,
            likes:[],
            comments:[],
            foto: this.state.fotoUrl
        })
        .then(() => this.props.navigation.navigate('Home'))
        .catch(err => this.setState({ error: err.message })) 


     }

    cuandoSubaLaFoto(url){
        this.setState({
            fotoUrl:url,
            mostrarCamara:false
        })
    }
  
    render() {
        return (
        <View style={styles.container}>
            {
                this.state.mostrarCamara ?
                <Camara
                cuandoSubaLaFoto={(url)=> this.cuandoSubaLaFoto(url)}
                /> :
                <>
                    <TextInput
                    placeholder='Deja tu descripcion'
                    onChangeText={text => this.setState({comment: text})}
                    value={this.state.comment}
                    keyboardType='default'
                    style={styles.input}
                    />
                    <TouchableOpacity onPress={()=> this.enviarPost(this.state.comment)}>
                        <Text>Enviar posts</Text>
                    </TouchableOpacity> 
                </>
                //falta volver para atras 
            }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
        
        
    },
    input:{
        height:32,
        borderWidth:1
        
    }
})
export default Posts