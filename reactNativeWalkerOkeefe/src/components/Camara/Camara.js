import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import {storage} from '../../firebase/config'

class Camara extends Component {
    constructor(props){
        super(props)
        this.metodosDeCamara = null
        this.state = {
            mostrarCamara:false,
            fotoUri:''
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync() //pedimos permiso para usar la camara a la compu
        .then(()=> this.setState({
            mostrarCamara: true
        }))
        .catch(err => console.log(err))
    }

    sacarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(imagenEnMemoria => this.setState({
            fotoUri: imagenEnMemoria.uri, //Actualizaremos estados para guardar la url temporal de la foto y ocultar la cámara para mostrar el preview de la foto.
            mostrarCamara:false
        }))
        .catch(err => console.log(err))
        
    }

    aceptarFoto(url){
        fetch(url)
        .then(imagenEnBinario => imagenEnBinario.blob())
        .then(imagenOk =>{
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(imagenOk)
            .then(()=>{
                ref.getDownloadURL()
                .then((url)=>{
                    this.props.cuandoSubaLaFoto(url)
                })
            })
        })
        .catch(err => console.log(err))
    }

    rechazarFoto(){
        this.setState({
            fotoUri:'', 
            mostrarCamara:true
        })
    }

  render() {
    return (
      <View style={styles.container}>
        
        {
            this.state.mostrarCamara ? 
            <>
                <Camera
                    style={styles.camara}
                    type={Camera.Constants.Type.front}
                    ref={metodosDelComponente => this.metodosDeCamara = metodosDelComponente} //Ref nos permite acceder a todos los métodos internos del componente. 
                />
                <TouchableOpacity onPress={()=> this.sacarFoto()}>
                    <Text>Sacar foto</Text>
                </TouchableOpacity>
            </> 
            : this.state.mostrarCamara === false && this.state.fotoUri !== '' ?
            <>
                <Image
                    style={styles.image}
                    source={{uri: this.state.fotoUri}}
                />
                <TouchableOpacity onPress={()=> this.aceptarFoto(this.state.fotoUri)}>
                    <Text>Aceptar</Text>
                </TouchableOpacity>
                 <TouchableOpacity onPress={()=> this.rechazarFoto(this.state.fotoUri)} >  
                    <Text>Rechazar</Text> 
                </TouchableOpacity> 
            </> :
            <Text>No tienes permiso para usar la Camara</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    camara:{
        height:200
    },
    image:{
        height:200
    }
})

export default Camara