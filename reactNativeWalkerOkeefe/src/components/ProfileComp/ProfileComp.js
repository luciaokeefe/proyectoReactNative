import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'

class ProfileComp extends Component {

    constructor(props){
        super(props)
        this.state = {
            fotoSubida: "", 
        }
    }
    componentDidMount(){
    }


render() {
    console.log(this.props.user)
    return (
        <View style={styles.perfil}>
            
            <View style={styles.parte}>

        <Image style={styles.image} 
                source={{uri: this.props.user.foto}}
                resizeMode='cover'/>
                
        <View style={styles.own}>
        <Text >{this.props.mail}</Text>
        </View>

        </View>

        <View style={styles.pub}>
        <Text>{this.props.nPosts}</Text>
        <Text style={styles.subtitle}> Publicaciones </Text>
        </View>

        <View style={styles.own}>
        <Text >{this.props.user.bio}</Text>
        </View>

        </View>

        
    )
}
}

const styles = StyleSheet.create({
    perfil:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        border: 100,
    },
    own:{
        margin: 10,

    },
    pub:{
        alignItems: 'center',
    },
    lik:{
        alignItems: 'center'
    },

    image:{
        height: 50,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },


      parte:{
         alignItems: 'center',
      },

 
    }
    )

export default ProfileComp