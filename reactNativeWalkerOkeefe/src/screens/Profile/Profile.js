
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import ProfileComp from '../../components/ProfileComp/ProfileComp'
import Post from "../../components/Post/Post"


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            datos: [],
            posts: [],
            loading: true,
            mail: "",
            id: '',

        }
    }


    //onSanpshot() entrega un array de documentos desde la base de datos y despues data() entrega info de cada documento 
    // el forEach() recorre el array de documentos y pusheamos en el array de resultados un objeto literal con el id de cada documento que se obtiene con el metdod data()
    componentDidMount() {
        db.collection('users')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    this.setState({
                        id: doc.id,
                        datos: doc.data()
                    })
                })
            })



        db.collection('posts')
            .where('owner', '==', auth.currentUser.email)
            .orderBy('createdAt', 'desc')
            .limit(50)
            .onSnapshot(docs => {
                let misPosteos = []
                docs.forEach(doc => {
                    misPosteos.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                this.setState({
                    posts: misPosteos,
                })
            })
        console.log(this.state.posts)
        console.log(this.state.datos)


    }



    signOut() {
        auth.signOut()
            .then(() => { this.props.navigation.navigate('Login') })
            .catch(err => console.log(err))

    }

    render() {

        return (
            <>
            
                <View  style = {styles.container}>
                    <Text style={styles.subtitle}>Profile</Text>
                </View>
                <View style={styles.own}>
                    <Text >{this.state.mail}</Text>
                </View>

                <View  style = {styles.container}>
                    <ProfileComp posts={this.state.posts.length} mail={auth.currentUser.email} user={this.state.datos} />

                </View>

                <View style={styles.pub}>
                    <Text style={styles.subtitle}> Mis posteos</Text>
                    <FlatList style={styles.flatList}
                        data={this.state.posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Post {...this.props} id={item.id} data={item.data}
                        />} />

                </View>

                <View>
                    <TouchableOpacity onPress={() => this.signOut()}>
                        <Text>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}



const styles = StyleSheet.create({

    container: {
        backgroundColor: 'rgb(255,61,61)'
    },

    subtitle: {
        fontWeight: 700,
        color: 'black',

    },

    button: {
        flex: 1,
        justifyContent: 'center',
    },

    headerhome: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        height: '110',
        padding: 14,
    },

    texthome: {
        color: "rgb(148, 5, 245)",
        textAlign: 'center',
        fontSize: '30px',
    },

    imagehome: {
        height: 60,
        width: 200,
    },

    perfil: {
        justifyContent: 'space-between',
        borderWidth: 5,
        borderColor: "rgb(148, 5, 245)",


    },

    cerrar: {
        color: "rgb(148, 5, 245)",
        alignItems: 'right',
        textDecorationLine: 'underline',



    }
})

export default Profile