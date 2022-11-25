import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { db, auth } from '../../firebase/config';


class Buscador extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            users: [],
            results: [],
            buscando: false
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let info = [];
                docs.forEach(doc => {
                    info.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        users: info
                    })
                })
            }
        )
    }

    filtrar(text) {
        if (text === '') {
            this.setState({
                results: [],
                input: '',
                buscando: false
            })
        } else {
            let filtrado = this.state.users.filter((usuario) => usuario.data.owner.toLowerCase().includes(text.toLowerCase()))
            this.setState({
                results: filtrado,
                input: text,
                buscando: true
            })
        }

    }


    irAPerfil(item) {
        if (item.data.owner === auth.currentUser.email) {
            this.props.navigation.navigate('Profile')
        } else {
            this.props.navigation.navigate('PerfilesScreen', { email: item.data.owner })
        }
    }

    render() {
        return (

            <View style={styles.container}>

                <View style={styles.form}>
                    <TextInput
                        placeholder='Email'
                        keyboardType='default'
                        onChangeText={text => this.filtrar(text)}
                        value={this.state.input}
                        style={styles.campo}
                    />
                   <FontAwesome name="search" size={24} color='rgb(224,224,224)' />
                </View>

                {
                    this.state.results.length === 0 && this.state.buscando === true ?
                        <Text style={styles.aviso}> Ningún mail coincide con tu búsqueda</Text>
                        :
                        <FlatList
                            data={this.state.results}
                            keyExtractor={UnUsuario => UnUsuario.id.toString()}
                            renderItem={({ item }) =>
                                <Text onPress={() => this.irAPerfil(item)} style={styles.resultados}>{item.data.owner}</Text>
                            }
                        />
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(224,224,224)',

    },
   
    form: {
        backgroundColor: 'rgb(255,61,61)',
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    campo: {
        backgroundColor: 'rgb(224,224,224)',
        width: 300,
        fontFamily: 'arial',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'center',
        color: 'rgb(115, 115, 115)',
        padding: 5
    },
   
    aviso: {
        fontFamily: 'arial',
        fontSize: 13,
        marginTop: 10,
    },
    resultados: {
        backgroundColor: 'rgb(255,61,61)',
        fontFamily: 'arial',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'left',
        padding: 8,
        color: 'white',
    }

})

export default Buscador;