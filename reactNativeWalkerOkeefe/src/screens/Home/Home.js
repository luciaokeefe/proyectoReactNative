import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Post from "../../components/Post/Post"

class Home extends Component {
    constructor(){
        super()
        this.state={
            allPosts:[]
        }
    }

    //where recibe 3 parametros 1)que propiedad del documento tiene que buscar 2)el criterio de comparacion 3) el texto que tiene que buscar
    //OnSnapshot() entregará un array de documentos que deberemos recorrer para extraer los datos de cada documento con el método data(). 
    componentDidMount(){
        db.collection('posts').where('owner', '==', auth.currentUser.email).limit(5).onSnapshot(docs => {
            let posteos = []
            docs.forEach(doc => {
                posteos.push({
                    id: doc.id,
                    data:doc.data()
                })
            })

            this.setState({
                allPosts: posteos
            })
        })
    }
  
    render() {
        return (
        <View 
        style={styles.container}
        >
            <Text>HOME</Text>
            <FlatList
                data={this.state.allPosts}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Post  id={item.id} data={item.data} />}
            />
        </View>
        )
    }
}

//navigation={this.props.navigation}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default Home