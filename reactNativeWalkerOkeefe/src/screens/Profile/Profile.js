import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import ProfileComp from '../../components/ProfileComp/ProfileComp'
import Post from '../../components/Post/Post'


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
           /*  likes: [], */
            loading: true,
            datos: [],
            id: ''
        }
    }


    //onSanpshot() entrega un array de documentos desde la base de datos y despues data() entrega info de cada documento 
    // el forEach() recorre el array de documentos y pusheamos en el array de resultados un objeto literal con el id de cada documento que se obtiene con el metdod data()
    componentDidMount() {
        db.collection('users')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                docs.forEach(doc => {
                    console.log(doc.data())
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
                posts: misPosteos,
            })
        })
       /*  db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
            let misLikes = []
            docs.forEach(doc => {
                misLikes.push({
                    id: doc.id,
                    data: doc.data().likes,
                })
            })
            this.setState({
                likes: misLikes,
            })
        }) */
    }

    signOut() {
        auth.signOut()
            .then(() => { this.props.navigation.navigate('Login') })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <View>
                    <Text>Profile</Text>
                </View>


                <View style={styles.perfil}>
                    <ProfileComp posts={this.state.posts.length} mail={auth.currentUser.email} user={this.state.datos} />

                </View>

                <View
                    style={styles.container}
                >
                   {/*  <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Post navigation={this.props.navigation} id={item.id} data={item.datos} />}

                    /> */}


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
        backgroundColor: 'rgba(130,40,98,0.23)'
    }

})
export default Profile