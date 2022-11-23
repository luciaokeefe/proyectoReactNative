import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'


class Perfiles extends Component {

    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    componentDidMount(){
    }


render() {
    return (
        <View style={styles.profile}>

        <View style={styles.bio}>
        <Text >{this.props.mail}</Text>
        </View>

        <View style={styles.bio}>
        <Text style={styles.subtitle}> Publicaciones: {this.props.cantidadPosts} </Text>
        </View>

        <View style={styles.bio}>
        <Text style={styles.subtitle}> Tipo Comida: {this.props.comida} </Text>
        </View>

        <View style={styles.bio}>
        <Text style={styles.subtitle}> Restaurant: {this.props.restaurant} </Text>
        </View>
        </View>

        
    )
}
}

const styles = StyleSheet.create({
    profile:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        border: 100,
    },

    
    bio:{
        alignItems: 'center'
    }

    }
    )

export default Perfiles