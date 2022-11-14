import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Camara from '../../components/Camara/Camara'

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            restaurant: "",
            fotoUrl: "",
            estiloComida: "",
            mostrarCamara: false

        }
    }

    registrar(email, pass) {
        if(this.state.restaurant !== "" && this.state.estiloComida !== ""){
            auth.createUserWithEmailAndPassword(email, pass)
            .then(() => {
                db.collection("users").add({
                    owner: auth.currentUser.email,
                    restaurant: this.state.restaurant,
                    estiloComida: this.state.estiloComida,

                }).then(() => this.props.navigation.navigate('Login'))
            })
            .catch(err => this.setState({ error: err.message }))

        } else {

            this.setState (
                {
                    error: "es obligatorio llenar todos los campos"
                }
            )
        }
       
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

                    {/* <View>
                        {this.state.mostrarCamara ?
                            <TouchableOpacity onPress={() => this.enviarPost(this.state.description)}>
                                <Text>Sacar foto de perfil</Text>
                            </TouchableOpacity>
                            :
                            <Camara
                                cuandoSubaLaFoto={(url) => this.cuandoSubaLaFoto(url)}
                            />
                        }
                    </View> */}


                    <View>

                        <TouchableOpacity onPress={() => this.registrar(this.state.email, this.state.password)}>
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
    }
})

export default Register