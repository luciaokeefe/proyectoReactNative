import { Text, View, FlatList, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import Post from '../../components/Post/Post'
import ProfileComp from '../../components/ProfileComp/ProfileComp'
import { TouchableOpacity } from 'react-native-web'



class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myPosts: [],
            datos: {},
            id: '',
        }
    }


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
            
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
            let misPosteos = []
            docs.forEach(doc => {
                misPosteos.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            this.setState({
                myPosts: misPosteos,
            })
        })
    
    }
    logOut() {
        auth.signOut()
            .then(() => { this.props.navigation.navigate('Login') })
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state)
        return (

            <>
                <View style={styles.header}>

                    
                    {/* <Image style={styles.imagehome}
             source={require('../../../assets/iconoWP.png')}
             resizeMode= 'contain'/> */}
                    <Text style={styles.textHeader}> The RestoApp </Text>
                </View>

                <View style={styles.perfil}>
                    <ProfileComp nPosts={this.state.myPosts.length} mail={auth.currentUser.email} user={this.state.datos} />

                </View>

                <View
                    style={styles.container}
                >
                    <FlatList style={styles.flatList}
                        data={this.state.myPosts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}

                    />

                </View>

                <View style={styles.cerrar}>
                        <TouchableOpacity onPress={() => this.logOut()} style={styles.button}>
                            <Text style={styles.cerrar}> Cerrar Sesion </Text>
                        </TouchableOpacity>
                    </View>
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
    textHeader:{
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

export default Profile