import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { TextInput } from 'react-native-web'
import { auth, db } from '../../firebase/config'
import UnComment from '../../components/UnComment/UnComment'
import firebase from 'firebase'

class Comments extends Component {

  constructor(props) {
    super(props)
    this.state = {
      logueado: false,
      allComments: [],
      comentario: '',
      error: '',



    }
  }

  componentDidMount() {
    console.log(this.props)
    db.collection('posts')
      .doc(this.props.route.params.id)
      .onSnapshot(doc => {

        let data = doc.data().comments

        this.setState({
          allComments: data
        })

      });

  }

  enviarComentarios() {

    if (this.state.comentario != '') {
      db
        .collection('posts')
        .doc(this.props.route.params.id)
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            comment: this.state.comentario
          })
        })
        .then(
          this.setState({
            comentario: this.state.comentario
          })
        )
        .catch(err => console.log(err))
    }
    else {
      this.setState(
        {
          error: ""
        }
      )
    }

  }


  render() {
    return (
      <View>
        <Text>Comments</Text>
        <TextInput styles={styles.field}
          keyboardType='default'
          placeholder="inserte su comentario"
          onChangeText={text => this.setState({ comentario: text })}
          value={this.state.comentario}
        />

        <TouchableOpacity onPress={() => this.enviarComentarios()}>
          <Text> Comentar</Text>
        </TouchableOpacity>




        {
          this.state.allComments !== null ?
            <FlatList style={styles.flatList}
              data={this.state.allComments}
              keyExtractor={(item) => item.createdAt.toString()}
              renderItem={({ item }) => <UnComment {...this.props} comment={item.comment} owner={item.owner} />}
            /> :

            <Text>Aún no hay comentarios</Text>

        }



      </View>
    )
  }
}

const styles = StyleSheet.create({
  field: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    borderWidth: 1,
  },
  flatList: {
    backgroundColor: 'rgba(130,40,98,0.23)'
  }
})

export default Comments