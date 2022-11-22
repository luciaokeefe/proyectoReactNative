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
            misPosteos: [],
            datos: {},
            id: '',
        }
    }


    componentDidMount() {
        console.log(auth.currentUser.email)
        db.collection('users')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    console.log(doc)
                    this.setState({
                        id: doc.id,
                        datos: doc.data()
                    })
                    
            
                })
            })
            
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
            let PosteosAct = []
            docs.forEach(doc => {
                PosteosAct.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            this.setState({
                misPosteos: PosteosAct,
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

                <View style={styles.profile}>
                    <ProfileComp cantidadPosts={this.state.misPosteos.length} mail={auth.currentUser.email} user={this.state.datos} />

                </View>

                <View
                    style={styles.container}
                >
                    <FlatList style={styles.flatList}
                        data={this.state.misPosteos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}

                    />

                </View>

                <View style={styles.logout}>
                        <TouchableOpacity onPress={() => this.logOut()} style={styles.button}>
                            <Text style={styles.logout}> Cerrar Sesion </Text>
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

    profile: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: "white",
        height: 80,
        marginTop: 20,
        justifyContent: 'center',
        fontWeight: 'bold'
    },

    logout: {
        color: "rgb(255,61,61)",
        textAlign: 'right',
        fontSize: 17,
    }
})

export default Profile