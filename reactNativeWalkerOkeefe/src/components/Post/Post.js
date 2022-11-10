import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

// import {FontAwesome} from '@expo/vector-icons'

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            // isMyLike: false,
            // likesCount: props.data.likes.length 
        }
    }

    // componentDidMount(){
    //     // let myLike = this.props.data.likes.includes(auth.currentUser.email)
    //     // if(myLike){
    //     //     this.setState({
    //     //         isMyLike:true
    //     //     })
    //     }
    

    // like(){
    //     db
    //     .collection('posts')
    //     .doc(this.props.id)
    //     .update({
    //         likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    //     })
    //     .then(resp => {
    //         this.setState({
    //             isMyLike:true,
    //             likesCount: this.state.likesCount + 1
    //         })
    //     })
    //     .catch(err=> console.log(err))
    // }

    // unlike(){
    //     db.collection('posts')
    //     .doc(this.props.id)
    //     .update({
    //         likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    //     })
    //     .then(resp => {
    //         this.setState({
    //             isMyLike:false,
    //             likesCount: this.state.likesCount - 1
    //         })
    //     })
    //     .catch(err => console.log(err))
    // }

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
        {/* <View>
            <Text>{this.state.likesCount}</Text>
        {
            this.state.isMyLike ?
                <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='heart' color='red' size={32} />
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='red' size={32} />
                </TouchableOpacity>
        }
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Comments')}>
            <Text>Agregar comentario</Text>
        </TouchableOpacity>
        </View> */}
        
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