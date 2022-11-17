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
        db.collection('posts')
        .orderBy('createdAt', 'desc').limit(50).onSnapshot(docs => {
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
            <FlatList style={styles.flatList}
                data={this.state.allPosts}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Post {...this.props} id={item.id} data={item.data} />} //Spread operator para pasarle las props de navegacion y poder navegar hacia comentarios desde post.
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
        
    },

    flatList: { 
        backgroundColor: 'rgba(130,40,98,0.23)'
    }
})

export default Home