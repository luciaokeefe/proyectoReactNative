import { Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'
import {storage} from '../../firebase/config'


class miPerfil extends Component {

    constructor(props){
        super(props)
        this.state = {
            fotoPerfil: "", 
            
        }
    }
    componentDidMount(){
        
    }


    fotoPerfil(){
        ImagePicker.launchImageLibraryAsync()
        .then(resp => {
            fetch(resp.uri)
            .then(data => data.blob())
            .then(img => {
                console.log(storage)
                const ref = storage.ref(`fotos/${Date.now()}.jpg`)
                ref.put(img)
                .then(()=> {
                    ref.getDownloadURL()
                    .then(url => {
                            this.setState({fotoPerfil:url})
                        }
                    )
                })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}


render() {
    return (
        <>
        </>

        
    )
}
}

const styles = StyleSheet.create({
    perfil:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
    },
    own:{
        marginTop: 10,
    },
    pub:{
        alignItems: 'center',
    },
    lik:{
        alignItems: 'center'
    },

   

    }
    )

export default miPerfil