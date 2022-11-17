import { View, Text, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth} from "../../firebase/config"
import firebase from 'firebase'
import Comments from '../../screens/Comments/Comments'

class UnComment extends Component {
    constructor(props) {
    super (props)
    this.state = {  
        commentI: []
    }}

    render () {
  return (
    <View style= {styles.comento}>
        <Text style= {styles.owner}>
            {this.props.owner}
        </Text>

        <Text style= {styles.comentario}>
            {this.props.comment}
        </Text>
        
    </View>
  )
}
}
const styles = StyleSheet.create({
    comento: {
        flexDirection: 'row',
        marginTop: 10,
      
      
         
    },
    owner:{
    fontWeight: 'bold',
    marginRight: 5,
    
    },
    comentario: {
    
    },
    
})
 
export default UnComment