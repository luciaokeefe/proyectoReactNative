import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            loading: true,
            info: []
        }
    }


    //onSanpshot() entrega un array de documentos desde la base de datos y despues data() entrega info de cada documento 
    // el forEach() recorre el array de documentos y pusheamos en el array de resultados un objeto literal con el id de cada documento que se obtiene con el metdod data()
    componentDidMount() {
        db.collection('comments').onSnapshot(
            docs => {
                let allComments = []
                docs.forEach(doc => {
                    allComments.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                this.setState({
                    comments: allComments,
                    loading: false
                }, () => console.log(this.state.comments))


            }
        )

        // db.collection('users').onSnapshot(docs => {
        //     let info = []
        //     docs.forEach(doc => {
        //         info.push({
        //             id: doc.id,
        //             data: doc.data()
        //         })
        //     })

        //     this.setState({
        //         infoCompleta: info
        //     })
        // })
    }

    signOut() {
        auth.signOut()
            .then(() => { this.props.navigation.navigate('Login') })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <View >
                    <Text>Profile</Text>
                </View>
                <View style={styles.perfil}>

                    <View style={styles.own}>
                        <Text >{this.props.mail}</Text>
                    </View>

                    <View style={styles.pub}>
                        <Text>{this.props.posts}</Text>
                        <Text style={styles.subtitle}> Publicaciones </Text>
                    </View>

                    



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