import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import * as ImagePicker from 'expo-image-picker'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Camara from '../../components/Camara/Camara'
import { storage } from '../../firebase/config'


class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            restaurant: '',
            estiloComida: '',
            fotoUrl: '',
            mostrarCamara: false,

        }
    }

    registrar(email, pass) {
        if (this.state.restaurant !== "" && this.state.estiloComida !== "") {
            auth.createUserWithEmailAndPassword(email, pass)
                .then(() => {
                    db.collection("users").add({
                        owner: auth.currentUser.email,
                        restaurant: this.state.restaurant,
                        estiloComida: this.state.estiloComida,
                        foto: this.state.fotoUrl,
                        contraseña: this.state.password

                    }).then(() => this.props.navigation.navigate('Login'))
                })
                .catch(err => this.setState({ error: err.message }))

        } else {

            this.setState(
                {
                    error: "es obligatorio llenar todos los campos"
                }
            )
        }
    }

    cuandoSubaLaFoto(url) {
        this.setState({
            fotoUrl: url,
            mostrarCamara: false
        })
    }

    subirfoto() {
        ImagePicker.launchImageLibraryAsync()
            .then(resp => {
                fetch(resp.uri)
                    .then(data => data.blob())
                    .then(img => {
                        const ref = storage.ref(`foto/${Date.now()}.jpg`)
                        ref.put(img)
                            .then(() => {
                                ref.getDownloadURL()
                                    .then(url => {
                                        this.setState({ fotoUrl: url })
                                    }
                                    )
                            })
                    }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.registerTitle}>Register</Text>
                <View>

                    <TextInput
                        style={styles.campo}
                        placeholder='Escribi tu email'
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email}
                    />

                    <TextInput
                        style={styles.campo}
                        placeholder='Escribi tu password'
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />

                    <TextInput
                        style={styles.campo}
                        placeholder='Nombre Restaurant'
                        onChangeText={text => this.setState({ restaurant: text })}
                        value={this.state.restaurant}
                    />

                    <TextInput
                        placeholder='Que tipo de restaurante sos'
                        onChangeText={text => this.setState({ estiloComida: text })}
                        value={this.state.estiloComida}
                        keyboardType='default'
                        style={styles.campo}
                    />

                    <View style={styles.subirFotoPerfil}>
                        <TouchableOpacity onPress={() => this.subirfoto()}>
                            <AntDesign name="picture" size={40} color="black" />
                            
                        </TouchableOpacity>
                        
                    </View>

                    {
                        this.state.mostrarCamara ?
                            <View>
                                <Camara cuandoSubaLaFoto={(url) => this.cuandoSubaLaFoto(url)} />
                            </View>
                            :
                            <View style={styles.subirFotoPerfil} >
                                <TouchableOpacity onPress={() => this.setState({ mostrarCamara: true })}>
                                    <Feather name="camera" size={40} color="black" />
                                    

                                </TouchableOpacity>
                            </View>}

                    {this.state.fotoUrl != '' ?
                        <View style={styles.contenedorMensaje}>
                            <Text style={styles.mensaje}> La imágen se subió correctamente </Text>     </View> : ''

                    }

                    <View style={styles.botonRegistro}>

                        <TouchableOpacity onPress={() => this.registrar(this.state.email, this.state.password, this.state.fotoUrl, this.state.restaurant)}>
                            <Text style={styles.textoBotonRegistro}>Registrar usuario</Text>
                        </TouchableOpacity>

                    </View>

                    <View>
                        <Text>Ya sos un usuario?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>Logueate</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.error !== '' ?
                            <Text>{this.state.error}</Text> :
                            ''
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32
    },
    registerTitle: {
        fontFamily: 'arial',
        fontSize: 25,
        margin: 10,
        textAlign: 'center'


    },
    camara: {
        flex: 1
    },
 
    SubirFotoPerfil: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        flex: 1,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    botonFoto: {
        fontFamily: 'arial',
        fontSize: 14,
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'white',

        textAlign: 'center',
        padding: 5
    },
    mensaje: {
        fontWeight: 700,
        color: 'black'
    },
    contenedorMensaje: {
        backgroundColor: "rgb(255,61,61)",
        padding: 5,
        textAlign: 'center'

    },
    botonRegistro: {
        backgroundColor: "rgb(160,160,160)",
        padding: 5,
        margin: 10,
        textAlign: 'center',
        borderRadius: 10,

    },

    textoBotonRegistro: {
        fontWeight: 700,
        color: 'black'
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
    }
})

export default Register