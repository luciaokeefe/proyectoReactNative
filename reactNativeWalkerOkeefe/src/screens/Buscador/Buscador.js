import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import { Feather } from "@expo/vector-icons"
import firebase from 'firebase';


class Buscador extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            busqueda: '',
            loading: true

        }

    }

    //aca tengo que poner el array con todos los usuarios posibles
    componentDidMount() {
        db.collection('users').limit(5).onSnapshot(docs => {
            let misUsuarios = []
            docs.forEach(doc => {
                misUsuarios.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            this.setState({
                users: misUsuarios,
            })
        })

    }

    buscar(text) {

        let usersFilter = this.state.users.filter(elm =>
            elm.data.restaurant.toUpperCase().includes(text.toUpperCase()))

        this.setState({
            user: text,
            users: usersFilter,
            loading: false
        })
        console.log(usersFilter);
    }



    render() {
        return (
            <>
                <View style={styles.header}>
                    <Text style={styles.textHeader}> Search</Text>
                </View>

                <View style={styles.containertodo}>

                    <TextInput style={styles.buscador}
                        onChangeText={text => this.setState({ busqueda: text })}
                        placeholder='Ingrese su busqueda'
                        value={this.state.busqueda}>
                    </TextInput>

                    <Feather
                        name="search"
                        size={20}
                        style={{ marginLeft: 1 }}
                    />

                    <TouchableOpacity onPress={() => this.buscar(this.state.busqueda)}>
                        <Text style={styles.buscar}> Buscar</Text>
                    </TouchableOpacity>
                    
                </View>

                <View style={styles.resultados}>
                        {this.state.loading ? '' :
                            <FlatList
                                data={this.state.users}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) =>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate ('OtroPerfil',  {email:item.data.owner, restaurant:item.data.restaurant} )}>
                                        <Text style={styles.user}>{item.data.restaurant}</Text>
                                        {/* agregar que aparezca la imagen al lado del usuario */}
                                    </TouchableOpacity>}
                            />
                        }


                    </View>
            </>
        )
    }
}

const styles = StyleSheet.create({


    containertodo: {
        flex: 1,
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        width: "90%",
    },

    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        backgroundColor: "rgb(148, 5, 245)",
        width: "90%",

    },
    user: {
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        borderRadius: 5,
        backgroundColor: "#d9dbda"},


    buscador: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    header: {
        backgroundColor: 'rgb(255,61,61)',
        alignItems: 'center',
        justifyContent: 'center',
        height: '110',
        padding: 14,
    },

    textHeader: {
        color: "white",
        textAlign: 'center',
        fontSize: '30px',
    },
    textbusc:{
        color: "rgb(148, 5, 245)",
        textAlign: 'center', 
        fontSize: '30px',
    },
    resultados:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        backgroundColor: 'rgb(255,61,61)',
        borderWidth: 15,
        borderColor: 'rgb(255,61,61)'}, 

    imagebusc: {
        height: 60,
        width: 200,
    },
    aviso: {
        fontFamily: 'Courier',
        fontSize: 13,
        marginTop: 10,
    },

})

export default Buscador