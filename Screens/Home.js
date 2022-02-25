import React, { Component } from 'react';
import { StyleSheet,AsyncStorage, Text, View,ActivityIndicator,FlatList,Image,SafeAreaView,TouchableOpacity } from 'react-native';
import _ from 'lodash';



export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      dataSource: null,
      localDataSource:null
    }
  }

    async componentDidMount() {
    this.fetchAllData();
  }


  fetchAllData=()=>{
      this.setState({localDataSource:null, dataSource:null});
    fetch('https://5fc9346b2af77700165ae514.mockapi.io/simpsons')
    .then((response) => response.json())
    .then(async (responseJson) => {
        let finalList=[...responseJson];
        let localDBItems = await AsyncStorage.getItem('db');
        if(localDBItems){
            localDBItems = JSON.parse(localDBItems);
        }else{
            localDBItems = [];
        }
    
      this.setState({
        dataSource: finalList,
        localDataSource:localDBItems
      })
    })
  }

  listFooter = () => {    //Eğer ekleme butonunu listenin en sonunda görmek istersek bunu kullanırız
      return (
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Add New Character") }
        >
          <Image
          style={styles.itemAdd}
          source={require('./add.png')}
        />
        </TouchableOpacity>
      )
  }

  deleteItem=async (itemID)=>{
    let data = [...this.state.localDataSource];
    const indexToDelete = _.findIndex(this.state.localDataSource,{id:itemID});
    if(indexToDelete>-1){
    data.splice(indexToDelete,1);
    await AsyncStorage.setItem('db',JSON.stringify(data));
    this.fetchAllData();
    }else{
        alert("You can't delete server data");
    }
  }

  _renderItem = ({item,index}) => {
    return (
        
    <TouchableOpacity
    onPress={() => this.props.navigation.navigate('Details',{dtName: item.name, dtJob: item.job, dtAvatar: item.avatar,  dtAbout: item.about}) }
    >
        
    <View key={index} style={styles.itemContainer}> 

      
        <Image
          style={styles.itemImage}
          source={{uri: item.avatar}}
        />
      
          <Text style={styles.itemName}>{item.name}</Text>
        <TouchableOpacity
        onPress={this.deleteItem.bind(this,item?.id)}
        >
          <Image
          style={styles.itemDel}
          source={require('./Delete.png')}
        />
        </TouchableOpacity>    
    </View>
    </TouchableOpacity>
    )
  }

  

render(){
  let {dataSource, localDataSource} = this.state
  if (dataSource ==null || localDataSource ==null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating/>
      </View>
    )
  } else {
    return (
      
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.itemTitle}>Simpsons</Text>
        </View>
        <FlatList
          data={[...dataSource,...localDataSource]}
          renderItem={this._renderItem}
          keyExtractor={(item,index) => index.toString()}
          //ListFooterComponent={this.listFooter}         
        />
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Add New Character") }
        >
          <Image
          style={styles.itemAdd}
          source={require('./add.png')}
        />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  itemTitle: {
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 5
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between'
  },
  itemImage: {
    width: 50,
    height: 50
  },
  itemDel: {
    width: 30,
    height: 30
  },
  itemAdd: {
    width: 70,
    height: 70,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center'
  },
  itemName: {
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 'auto'
  }
})