import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import Post from "../../components/Post/Post"
import { ActivityIndicator } from 'react-native-web'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            allPosts: [],
            loading: true
        }
    }

    //where recibe 3 parametros 1)que propiedad del documento tiene que buscar 2)el criterio de comparacion 3) el texto que tiene que buscar
    //OnSnapshot() entregará un array de documentos que deberemos recorrer para extraer los datos de cada documento con el método data(). 


    componentDidMount() {
        db.collection('posts')
            .orderBy('createdAt', 'desc').limit(50).onSnapshot(docs => {
                let posteos = []
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                this.setState({
                    allPosts: posteos,
                    loading: false
                })
            })

            

    }

    render() {
        return (
<> {
    this.state.loading? <ActivityIndicator size= "large" color="green"/> :
            
             <View
                style={styles.container}
            >
                <View style={styles.header}>
    
                    <Text style={styles.textHeader}> The RestoApp</Text>
                </View>

               
                <FlatList style={styles.flatList}
                    data={this.state.allPosts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Post {...this.props} id={item.id} data={item.data} />}
                />
            
             </View>
            }
             </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    },

    flatList: {
        backgroundColor: 'rgb(224,224,224)'
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

})

export default Home