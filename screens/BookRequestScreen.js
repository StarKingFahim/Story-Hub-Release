import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Modal,
  SnapshotViewIOS,
  TouchableHighlight
} from 'react-native';
import MyHeader from '../Components.js/MyHeader'
import db from '../Config';
import firebase from 'firebase';
import {BookSearch} from 'react-native-google-books';

export default class BookRequestScreen extends Component{

  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      bookName:"",
      reasonToRequest:"",
      IsBookRequestActive:"",
      requestedBookName:"",
      bookStatus:"",
      requestId:"",
      userDocId:"",
      docId:'',
    }
  }

  getBookRequest=()=>{
    var BookRequest=db.collection('requested_books').where('user_Id','==',this.state.userId).get().then((snapshot)=>{
      snapshot.forEach((doc)=>{
        if(doc.data().book_status!=='recieved')
        {
          this.setState({
            requestId:doc.data().request_id,
            requestedBookName:doc.data().book_name,
            bookStatus:doc.data().book_status,
            docId:doc.id,
          })
        }
      })
    })
  }

  sendNotification=()=>{
    //to get the first name and last name
    db.collection('users').where('email_id','==',this.state.userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var name = doc.data().first_name
        var lastName = doc.data().last_name
  
        // to get the donor id and book nam
        db.collection('all_notifications').where('request_id','==',this.state.requestId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            var donorId  = doc.data().donor_id
            var bookName =  doc.data().book_name
  
            //targert user id is the donor id to send notification to the user
            db.collection('all_notifications').add({
              "targeted_user_id" : donorId,
              "message" : name +" " + lastName + " received the book " + bookName ,
              "notification_status" : "unread",
              "book_name" : bookName
            })
          })
        })
      })
    })
  }

  async getBooksFromApi(bookName){
    this.setState({bookName:bookName})
    if(bookName.length>2)
    {
      var books=await BookSearch.searchbook(bookName,'AIzaSyCMF52ADKhig6nAsgeJvw2Rw29CR2VQKVg')
      this.setState({
        dataSource:books.data,
        showFlatList:true,
      })
    }
  }

  renderItem=({item,i})=>{
    return(
    <TouchableHighlight style={{alignItems:'center',backgroundColor:'#343443',padding:10,width:"90%"}}
    activeOpacity={0.6}
    onPress={()=>{
      this.setState({
        showFlatList:false,
        bookName:item.volumeInfo.title
      })
    }}
    bottomDivider>
    <Text>{item.volumeInfo.title}</Text>
    </TouchableHighlight>
    );
  }

  componentDidMount(){
    this.getBookRequest()
    this.getIsBookRequestActive()
  
  }

  updateBookRequestStatus=()=>{
    //updating the book status after receiving the book
    db.collection('requested_books').doc(this.state.docId)
    .update({
      book_status : 'recieved'
    })
  
    //getting the  doc id to update the users doc
    db.collection('users').where('email_id','==',this.state.userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        //updating the doc
        db.collection('users').doc(doc.id).update({
          IsBookRequestActive: false
        })
      })
    })
  }

  getIsBookRequestActive(){
    db.collection('users').where('email_Id','==',this.state.userId).onSnapshot(querySnapshot=>{
    querySnapshot.forEach(doc=>{
      this.setState({
        IsBookRequestActive:doc.data().isBookRequestActive,
        userDocId:doc.id,
      })
    })
    })
  }

 


  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }


  addRequest =(bookName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_books').add({
        "user_id": userId,
        "book_name":bookName,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
    }) 

    this.setState({
        bookName :'',
        reasonToRequest : ''
    })


    
    return Alert.alert("Book Requested Successfully")
  }

    render()
    {if(this.state.IsBookRequestActive=== true)
      {
        return(

            <View style={{flex:1}}>
          <MyHeader title="Request Book"/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"Enter book name"}
                onChangeText={text=> this.getBooksFromApi(text)}
                onClear={text=> this.getBooksFromApi(" ")}
                value={this.state.bookName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need the book"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={{borderWidth:1 , borderColor:'#747843' ,backgroundColor:'#293882'
                , width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
                onPress={()=>{
                  this.sendNotification();
                  this.updateBookRequestStatus();
                  this.recievedBooks(this.state.RequestedBookName)}}
                >
                <Text>I Recieved The Book</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>

            <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
          onPress={()=>{
            this.sendNotification()
            this.updateBookRequestStatus();
            this.receivedBooks(this.state.requestedBookName)
          }}>
          <Text>I recieved the book </Text>
          </TouchableOpacity>

        </View>


        );
      }
      else
      {
    return(
      // Form screen
        <View style={{flex:1}}>
          <MyHeader title="Request Book" navigation ={this.props.navigation}/>

          <ScrollView>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter book name"}
                onChangeText={(text)=>{
                    this.setState({
                        bookName:text
                    })
                }}
                value={this.state.bookName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need the book"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{ this.addRequest(this.state.bookName,this.state.reasonToRequest);
                }}
                >
                <Text>Request</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
            </ScrollView>
        </View>
                )
              }
            }
          }

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)