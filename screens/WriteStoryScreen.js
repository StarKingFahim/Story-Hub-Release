import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Appbar } from 'react-native-paper';
import db from '../Config';
import MyHeader from '../Components.js/MyHeader';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      storyText: '',
    };
  }

  submitStory = () => {
    db.collection('Story').add({
      title: this.state.title,
      author: this.state.author,
      storyText: this.state.storyText,
    });
    this.setState({
      title: '',
      author: '',
      story: '',
    });
    //ToastAndroid.show("Your story has been submitted.");
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.allText} behavior="padding" enabled>
        <TouchableOpacity style={styles.header}>
           <Appbar.Header style={styles.header}>
          <Appbar.Content
            style={{ display: 'flex', alignItems: 'center' }}
            title="Story Extravaganza"
          />
      
        </Appbar.Header>
        
        </TouchableOpacity>

        <MyHeader title="Write Story" />

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={{
              padding: 10,
              width: 280,
              borderWidth: 1,
              borderRadius: 5,
              marginBottom: 10,
              backgroundColor:"#eeeeee",
            }}
            placeholder="Name Of The Story"
            value={this.state.title}
            onChangeText={(title) => this.setState({ title })}
          />
          <TextInput
            style={{
              padding: 10,
              width: 280,
              borderWidth: 1,
              borderRadius: 5,
              marginBottom: 10,
              backgroundColor:"#eeeeee",

            }}
            placeholder="Author"
            value={this.state.author}
            onChangeText={(author) => this.setState({ author })}
          />
          <TextInput
            style={{
              padding: 10,
              width: 280,
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor:"#eeeeee",
            }}
            placeholder="Write A Story"
            value={this.state.story}
            onChangeText={(story) => this.setState({ story })}
            multiline
          />

          <TouchableOpacity
            style={{
              margin: 10,
              padding: 10,
              backgroundColor:'#eeeeff',
              width: 275,
              textAlign: 'center',
            }}
            onPress={this.pressed}>
            <Text
              style={{
                color: '#856985',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  allText: {
    backgroundColor: '#989898',
    flex: 1,
  },
  header: {
    
    backgroundColor: '#ffffff',
  },
  titleBox: {
    width: '90%',
    height: 20,
    backgroundColor: 'white',
    fontFamily: 'Eras Bold ITC',
    border: 'solid',
    padding: 20,
    marginLeft: 20,
    marginTop: 10,
    color: 'black',
    fontSize: 20,
  },
  authorBox: {
    width: '90%',
    height: 30,
    backgroundColor: 'white',
    fontFamily: 'Eras Bold ITC',
    border: 'solid',
    padding: 20,
    marginLeft: 20,
    marginTop: 10,
    color: 'black',
    fontSize: 20,
    alignItems: 'center'
  },
  storyText: {
    height: 250,
    borderWidth: 2,
    margin: 10,
    backgroundColor: 'white',
    fontFamily: 'Eras Bold ITC',
    borderSquare: '',
    alignItems: 'center',
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: '#8a9bcd',
    width: '50%',
    height: 40,
    border: 'solid',
    marginTop: 10,
    padding: 5,
    marginLeft: 80,
  },
  buttonText: {
    fontFamily: 'britannic',
    textAlign: 'center',
    fontSize: 25,
  },
});
