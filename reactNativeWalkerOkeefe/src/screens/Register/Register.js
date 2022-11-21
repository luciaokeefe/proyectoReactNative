import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import * as ImagePicker from 'expo-image-picker'
import { AntDesign } from '@expo/vector-icons';
import Camara from '../../components/Camara/Camara'
import {storage} from '../../firebase/config'


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
                <Text>Register</Text>
                <View>

                    <TextInput
                        style={styles.input}
                        placeholder='Escribi tu email'
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Escribi tu password'
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Nombre Restaurant'
                        onChangeText={text => this.setState({ restaurant: text })}
                        value={this.state.restaurant}
                    />

                    <TextInput
                        placeholder='Que tipo de restaurante sos'
                        onChangeText={text => this.setState({ estiloComida: text })}
                        value={this.state.estiloComida}
                        keyboardType='default'
                        style={styles.input}
                    />

                   {/*  <View style={styles.fotoPerfil}>
                        <TouchableOpacity onPress={() => this.subirfoto()}>
                            <AntDesign name="picture" size={60} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.botton}>Elija su foto de perfil</Text>
                    </View> */}

                    {
                        this.state.mostrarCamara ?
                            <View>
                                <Camara cuandoSubaLaFoto={(url) => this.cuandoSubaLaFoto(url)} />
                            </View>
                            :
                            <TouchableOpacity onPress={() => this.setState({ mostrarCamara: true })}>
                                <Text style={styles.botonFoto} > Tomar foto de perfil</Text>
                            </TouchableOpacity>
                    }


                    <View>

                        <TouchableOpacity onPress={() => this.registrar(this.state.email, this.state.password, this.state.fotoUrl, this.state.restaurant)}>
                            <Text>Registrar usuario</Text>
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
    input: {
        borderWidth: 1
    },
    fotoPerfil: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
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
})

export default Register