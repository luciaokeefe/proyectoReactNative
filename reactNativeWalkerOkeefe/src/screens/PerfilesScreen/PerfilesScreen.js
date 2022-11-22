import { Text, View, FlatList, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import Post from '../../components/Post/Post'
import Perfiles from '../../components/Perfiles/Perfiles'

class PerfilesScreen extends Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            usuario: {},
            susPosts: [],
            userId: props.route.params.id,
            loading: true
        }
    }

    componentDidMount() {
        db.collection('users').where('owner', '==', this.props.route.params.email)
            //ya tengo claro que voy a recibir solo uno por eso despues no hago foreach
            .onSnapshot(docs => { //solo tra un doc de regreso
                docs.forEach(doc => {


                    this.setState({ usuario: doc.data() })
                })
            })

        db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            this.setState({
                susPosts: posts,
                loading: false
            })
        })
    }

    render() {

        return (
            <>
                <View style={styles.header}>

                    {/* <Image style={styles.imagehome}
            source={require('../../../assets/iconoWP.png')}
            resizeMode= 'contain'/> */}
                    <Text style={styles.textHeader}> The RestoApp </Text>
                </View>
                {
                    this.state.loading ? <Text>Cargando...</Text> : <>
                        <View style={styles.perfil}>
                            <Perfiles mail={this.state.usuario.owner} comida={this.state.usuario.estiloComida} restaurant={this.state.usuario.restaurant} nPosts={this.state.susPosts.length} />

                        </View>

                        <View
                            style={styles.container}
                        >

                            {this.state.susPosts > 0 ?
                                <FlatList
                                    data={this.state.susPosts}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
                                /> :
                                <Text> No hay posteos</Text>
                            }

                        </View>
                    </>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    flatList: {
        backgroundColor: 'rgb(224,224,224)'
    },

    subtitle: {
        fontWeight: 700,
        color: 'black',

    },

    button: {
        flex: 1,
        justifyContent: 'center',
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

    imagehome: {
        height: 60,
        justifyContent: 'center',

    },

    perfil: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: "white",
        height: 80,
        marginTop: 20,
        justifyContent: 'center',
        fontWeight: 'bold',



    },

    cerrar: {
        color: "rgb(148, 5, 245)",
        textAlign: 'right',
        fontSize: 17,



    }
})

export default PerfilesScreen
