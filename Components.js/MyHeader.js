import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../Config'

export default class MyHeader extends Component{  
  constructor(props){
    super(props);
    this.state={
      value:"",
    }
  }
 
 getNumberOfUnreadNotifications()
{
  db.Collection('All_Notifications').where("Noticifation_Status","==","Unread").onSnapshot((snapshot)=>{
    var unreadNotifications=snapshot.docs.map((doc)=>doc.data())
    this.setState({
      value:unreadNotifications.length
    })
  })
}


componentDidMount(){
  this.getNumberOfUnreadNotifications()
}

  BellIconWithBadge=()=>{
    return(
    <View>

     <Icon name="bell" type="font-awesome" color="violet" size="20" onPress={()=>this.props.navigation.navigate('Notification')}/>
    <Badge
    value={this.state.value}
    containerStyle={{position:"absolute", top:-4 , right:-4}}/>
    
    </View>);
  }
  render(){
  return (
    <Header
      leftComponent={<Icon name="bars" type="font-awesome" color="lime" onPress={()=>this.props.navigation.toggleDrawer()}/>}
      rightComponent={<this.BellIconWithBadge{...this.props}/>}
      centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      backgroundColor = "#eaf8fe"
    />
  );
  }
}