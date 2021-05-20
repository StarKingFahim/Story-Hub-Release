import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailid: '',
      password: '',
    };
  }

  login = async (email, password) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    if (response) {
      this.props.navigation.navigate('BottomNavigator');
    } else {
      Alert.alert('Enter Email And Password');
    }
  };

  signUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        return Alert.alert('User Added Successfully');
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  showModal = ()=>(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
          <Text
            style={{justifyContent:'center', alignSelf:'center', fontSize:30,color:'#ff5722',margin:50}}
            >Registration</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"First Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Last Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                lastName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Mobile Number"}
            maxLength ={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                mobileNumber: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Username"}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                username: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confrim Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.username, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isVisible":false})}
            >
            <Text style={{color:'#ff5722'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/StoryHub.png')}
          style={{ width: 350, height: 150 }}
        />
        <View>
          <TextInput
            style={styles.inputBox}
            placeholder="abc@example.com"
            onChangeText={(text) => {
              this.setState({
                emailid: text,
              });
            }}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
            secureTextEntry={true}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              height: 30,
              width: 100,
              marginLeft: 100,
              borderWidth: 1,
              marginTop: 20,
              paddingTop: 5,
              borderRadius: 10,
              backgroundColor: '#FBC02D',
            }}
            onPress={() => {
              this.login(this.state.emailid, this.state.password);
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
              }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 30,
              width: 100,
              marginLeft: 100,
              borderWidth: 1,
              marginTop: 20,
              paddingTop: 5,
              borderRadius: 10,
              backgroundColor: '#FBC02D',
            }}
            onPress={() => {
              this.signUp(this.state.emailid, this.state.password);
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
              }}>
              Sign-Up
            </Text>
          </TouchableOpacity>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          {
            this.showModal()
          }
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe0b2',
  },
  inputBox: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    margin: 10,
    paddingLeft: 10,
    fontSize: 20,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: '300',
    // fontFamily:'AvenirNext-Heavy',
    color: '#ff9800',
  },
  loginBox: {
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor: '#ffab91',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 5,
  },
  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ffff',
    elevation: 10,
  },
  buttonContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: '#ff5722',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
