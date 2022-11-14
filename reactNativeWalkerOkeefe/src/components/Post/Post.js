import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

// import {FontAwesome} from '@expo/vector-icons'

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            miPosteo: false
        }
    }

    componentDidMount(){
        if(this.props.data.owner === auth.currentUser.email){
            this.setState({
                miPosteo: true,
            })
        }}
    
        eliminarPost(){
            db.collection('posts')
            .doc(this.props.id) // con .doc identificamos el documento que vamos a modificar
            .delete()
            .then(()=> {this.props.navigation.navigate('Profile')})
            .catch(err=> console.log(err))
        }

   
  render() {
    return (
      <View style={styles.container}>
        
        <View >
        <Image style={styles.image} 
                source={{uri: this.props.data.foto}}
                resizeMode='contain'/>
          </View>
        <View>
            <Text style={styles.subtitle}>Descripcion:</Text>
            <Text>{this.props.data.description}</Text>
        </View>
        <View>
            { 
            this.state.miPosteo ?
            <TouchableOpacity onPress={()=> this.eliminarPost()}>
            <Text style={styles.agregar}>BORRAR POSTEO</Text>
            </TouchableOpacity> : ''
            }
        </View>
        
      </View>
    )
  }
}




const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        padding: 40,
        justifyContent:'space-between',
        alignItems:'center',
        margin: 50,
        marginBottom: 10,
        backgroundColor: 'white',
        marginTop: 20,
        flex: 1,
        borderWidth: 3,
        borderRadius: 10,

    
    },
    
    container1:{
        justifyContent: 'left',
        backgroundColor: 'white',
        color: 'black',
        marginBottom: 30,
        width: '100%',
    },

    container2:{
        flex:3,
        margintop: 50,
        
    },

    // foto:{
    //     marginTop:50,
    //     height:200,
    //     width:200
    // },

    subtitle:{
        fontWeight:700,
        color: 'black',

    },
    image:{
        height: 265,
        width: 100000,
        border: 'black',

        
    },

    agregar:{
        color: 'black',
    },

    descripcion:{
        color: 'black',
    },
    

})

export default Post