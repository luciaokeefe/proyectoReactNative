import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { TextInput } from 'react-native-web'
import {auth, db} from '../../firebase/config'

class Comments extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comment: '', 
            logueado: false,
            allComments: []

    
        }
    }

    componentDidMount(){ 
      db.collection('comments')
      .where('comment', '==', auth.currentUser.email).limit(50).onSnapshot(docs => {
          let comments = []
          docs.forEach(doc => {
              comments.push({
                  id: doc.id,
                  data:doc.data()
              })
          }) 
          
          this.setState({
              allComments: comments
          })
      })

  }

    onSubmit(){
        db.collection("comments").add({
            owner: auth.currentUser.email,
            comment: this.state.comment
        })
        .then(() => this.props.navigation.navigate('Home'))
        .catch(err => this.setState({ error: err.message }))
    }


  render() {
    return (
      <View>
        <Text>Comments</Text>
       
        
{/*         <View 
        style={styles.container}
        >
            <FlatList style={styles.flatList}
                data={this.state.allComments}
                keyExtractor={(item)=> item.id.toString()}
                renderItem={({item}) => <Text>{item.comment}</Text>} 
            />
        </View> */}
       
        <TextInput styles={styles.field} 
        keyboardType = 'default'
        placeholder = "inserte su comentario"
        onChangeText = {text => this.setState({comment:text})}
        value = {this.state.comment}
        />

        <TouchableOpacity onPress = {() => this.onSubmit()}> 
        <Text> Comentar</Text>
        </TouchableOpacity>
    
      </View>
    )
  }
}

const styles = StyleSheet.create({
    field:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:32,
        borderWidth:1,
    }
})

export default  Comments