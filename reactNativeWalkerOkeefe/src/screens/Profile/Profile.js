import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'


class Profile extends Component {

    constructor(props){
        super(props)
        this.state={
            comments:[],
            loading:true
        }
    }


//onSanpshot() entrega un array de documentos desde la base de datos y despues data() entrega info de cada documento 
// el forEach() recorre el array de documentos y pusheamos en el array de resultados un objeto literal con el id de cada documento que se obtiene con el metdod data()
    componentDidMount(){
        db.collection('comments').onSnapshot(
            docs => {
                let allComments = []
                docs.forEach(doc => {
                    allComments.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })

                this.setState({
                    comments: allComments,
                    loading:false
                }, ()=> console.log(this.state.comments))


            }
        )
    }

    signOut(){
        auth.signOut()
        .then(()=> {this.props.navigation.navigate('Login')})
        .catch(err=> console.log(err))
    }

    render() {
        return (
        <> 
        <View >
            <Text>Profile</Text>

            


            <TouchableOpacity onPress={()=> this.signOut()}>
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