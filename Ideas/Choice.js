import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import db from '../Config';


const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
      
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};

export default class ChoiceScreen extends React.Component {

  constructor() {
    super();
    this.state = {
    text:'',
    link:'',
    }
  }

linksetter = (sections={SECTIONS},) => {
  this.setState({
    link:sections.data.link,
  })
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.bar}
              placeholder="Book Name"
              onChangeText={(text) => {
                this.setState({ search: text });
              }}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                this.searchTransactions(this.state.search);
              }}>
              <Text>Search</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('PussInBoots');}}>
        <SectionList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS}
            renderSectionHeader={({ section }) => (
              <>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                {section.horizontal ? (
                  
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({ item }) => <ListItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                  />
                  
                ) : null}
              </>
            )}
            renderItem={({ item, section }) => {
              if (section.horizontal) {
                return null;
              }
              return <ListItem item={item} />;
            }}
          />
          </TouchableOpacity>
          
        </SafeAreaView>
      </View>
    );
  }
}

const SECTIONS = [
  {
    title: 'Made for you',
    horizontal: false,
    data: [
      {
        key: '',
        text: 'Puss in Boots',
        uri:
          'https://static.wikia.nocookie.net/transcripts/images/9/91/DreamWorks%27_Puss_in_Boots_-_iTunes_Movie_Poster.jpeg/revision/latest?cb=20170206041934',
        link:'PussInBoots',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 350,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
    searchBar: {
      flexDirection: 'row',
      height: 40,
      width: 'auto',
      borderWidth: 0.5,
      alignItems: 'center',
      backgroundColor: 'grey',
    },
    bar: {
      borderWidth: 2,
      height: 30,
      width: 300,
      paddingLeft: 10,
    },
    searchButton: {
      borderWidth: 1,
      height: 30,
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
    },
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    width: 'auto',
    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  bar: {
    borderWidth: 2,
    height: 30,
    width: 300,
    paddingLeft: 10,
    color: 'white',
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lime',
  },
});
