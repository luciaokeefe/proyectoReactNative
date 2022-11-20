import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import firebase from 'firebase'
import { FontAwesome } from '@expo/vector-icons'

class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            miPosteo: false,
            miLike: false,
            contadorLikes: props.data.likes.length,


        }
    }

    componentDidMount() {
        let miLike = this.props.data.likes.includes(auth.currentUser.email)
        if (miLike) {
            this.setState({
                miLike: true
            })
        }
        if (this.props.data.owner === auth.currentUser.email) {
            this.setState({
                miPosteo: true,
            })
        }
    }

    like() {
        db.collection('posts').doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(resp => {
                this.setState({
                    miLike: true,
                    contadorLikes: this.state.contadorLikes + 1
                })
            })
            .catch(err => console.log(err))
    }

    dislike() {
        db.collection('posts').doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(resp => {
                this.setState({
                    miLike: false,
                    contadorLikes: this.state.contadorLikes - 1
                })
            })
            .catch(err => console.log(err))
    }

    eliminarPost() {
        db.collection('posts')
            .doc(this.props.id) // con .doc identificamos el documento que vamos a modificar
            .delete()
            .then(() => { this.props.navigation.navigate('Home') })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <View style={styles.container}>

                <View >
                    <Image style={styles.image}
                        source={{ uri: this.props.data.foto }}
                        resizeMode='contain' />
                </View>

                <View style={styles.container1}>
                    {this.props.data.description !== '' ?
                        <View>
                            <Text style={styles.subtitle}>Descripcion: {this.props.data.description}</Text>
                        </View>:
                        <Text> No hay descripcion</Text>
                    }

                </View>



                <View style={styles.like}>
                    <Text>{this.state.contadorLikes}</Text>
                    {
                        this.state.miLike ?
                            <TouchableOpacity onPress={() => this.dislike()}>
                                <FontAwesome name='heart' color='red' size={32} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.like()}>
                                <FontAwesome name='heart-o' color='red' size={32} />
                            </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', { id: this.props.id })}>
                        <FontAwesome name="comments" size={24} color="black" />
                    </TouchableOpacity>

                </View>


                <View>
                    {
                        this.state.miPosteo ?
                            <TouchableOpacity onPress={() => this.eliminarPost()}>
                                <Text style={styles.borrar}>BORRAR POSTEO</Text>
                            </TouchableOpacity> : ''
                    }
                </View>

            </View>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 50,
        marginBottom: 10,
        backgroundColor: 'white',
        marginTop: 20,
        flex: 1,
        borderRadius: 10,


    },

    subtitle: {
        fontWeight: 700,
        color: 'black',

    },

    image: {
        height: 265,
        width: 273,
        border: 'black',
        marginBottom: 30,

    },

    borrar: {
        color: 'white',
        fontFamily: 'arial',
        fontSize: 14,
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'rrgb(255,61,61)',
        textAlign: 'center',
        padding: 5
        
    },

    descripcion: {
        color: 'black',
    },

    like: {
        justifyContent: 'left',


    },



})

export default Post