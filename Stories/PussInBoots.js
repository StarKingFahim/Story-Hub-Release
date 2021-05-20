import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import db from '../Config'

export default class App extends React.Component {

  state = {
    scrollY: new Animated.Value(0),
  };
  
  render() {

    let translateY = this.state.scrollY.interpolate({
      inputRange: [0, 130],
      outputRange: [0, -90],
      extrapolate: 'clamp',
    });

    let scale = this.state.scrollY.interpolate({
      inputRange: [0, 130],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    let textTranslateY = this.state.scrollY.interpolate({
      inputRange: [0, 130],
      outputRange: [0, 20],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.allText}>
        <TouchableOpacity style={styles.header}>
           <Appbar.Header style={styles.header}>
          <Appbar.Content
            style={{ display: 'flex', alignItems: 'center' }}
            title="Story Extravaganza"
          />
      
        </Appbar.Header>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Choice');
          }}>
          <Image
            style={styles.back}
            source={'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/23bbc01ba6f741caef84939f75bee05f'}
          />
        </TouchableOpacity>
            
        <Text style={styles.displayText}></Text>

<Animated.ScrollView
          scrollEventThrottle={10}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}
          contentContainerStyle={{ marginTop: 10 }}
          style={{ flex: 1 }}>

     

          <Text style={styles.displayText}><p>A miller died and left his three sons all he had: he left his mill to his eldest son, an ass to the middle son, and to the youngest son, he left his cat.</p>

<p>The youngest son thought he’d drawn the short straw with the cat, but the cat promised that if the son got him some boots made, he would prove to be a worthy and helpful pet. Once the cat had some boots and a little bag he could wear, he went off and hunted for rabbits. Having caught a rabbit, Puss in Boots took it to the King, telling him that it was a gift from the Lord Marquis of Carabas, the cat’s master.</p>


<p>Shortly after this, Puss in Boots caught some partridges, and once again he took them to the King and announced that they were a gift from the Lord Marquis of Carabas. This happened for several months.</p>

<p>Then, one day, Puss in Boots hatched his big plan: he commanded his master to wash at a certain point in the river, and waited until the King’s coach came riding by, with the Princess accompanying the King in the coach. Then, having concealed his master’s clothes under a rock, Puss in Boots jumped out in front of the coach and asked for help, claiming that his master, the Lord Marquis of Carabas, had been robbed, and all of his clothes had been taken.</p>

<p>The King, recognising the cat that had brought him so many gifts of fine food in the past, commanded the coach to stop and sent his servants to fetch some clothes for the cat’s master. The Princess, seeing the handsome ‘Lord Marquis of Carabas’ dressed in one of her father’s finest suits of clothes, was instantly smitten by him, and the King asked the Lord Marquis of Carabas to ride with them.</p>


<p>Puss in Boots had told the local farmers and mowers that if anybody asked them, they should reply that the land they work on belonged to the Lord Marquis of Carabas, otherwise they would be chopped up like herbs. As the King rode through the land in his coach, he stopped and spoke to some of the people working the land, and they all told him that the land belonged to the Lord Marquis of Carabas. Puss in Boots’ plan had worked.</p>

<p>The King’s coach approached a large castle, and Puss in Boots told him that the owner of the castle was the same person who owned all of the land they had travelled through. Travelling on ahead of the castle, Puss in Boots managed to get inside and spoke to the owner of the castle, who was an ogre. The ogre, it was said, could transform himself into many different animals, and to prove his point, promptly turned himself into a lion.</p>

<p>Puss in Boots was impressed (and slightly scared) by this, but as soon as the ogre had returned to his normal shape, he decided to outwit him. ‘I hear that you can also change yourself into a very small creature, such as a mouse,’ he said to the ogre. ‘But I don’t believe this is possible.</p>


<p>Offended by this statement, and determined to show off his skills, the ogre transformed into a little mouse, and Puss in Boots, seizing his chance, promptly jumped on the mouse and ate him up.</p>

<p>When the King’s coach arrived at the castle, Puss in Boots announced that the King and all his retinue were welcome to the Castle of the Lord Marquis of Carabas. The King was impressed to learn that the cat’s master owned this vast castle as well as all of the local estates, and they went in and feasted, and the Princess, clearly in love with the cat’s master, was betrothed to the Lord Marquis of Carabas, and they were married the same day.</p>

<p>Puss in Boots became a lord, and they all lived happily ever after, apart from the ogre, who was dead.</p></Text>
        </Animated.ScrollView>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 75,
            backgroundColor: '#FF8C00',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 10,
            transform: [{ translateY }],
          }}>
          <Animated.Text
            style={{ color: '#fff', fontSize: 30, transform: [{ scale }, {translateY: textTranslateY }] }}>
            Puss In Boots
          </Animated.Text>
        </Animated.View>


      </View>
    );
  }
 
}
const styles = StyleSheet.create({
  allText: {
    backgroundColor: 'cyan',
    flex: 1,
    fontFamily: 'arial',
  },
  header: {
    
    backgroundColor: '#ffffff',
  },
  displayText: {
    fontFamily: 'britannic',
    fontSize: 20,
    padding: 15,
  },
   back: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
});
