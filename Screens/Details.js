import React, { useState,Component } from 'react';
import { StyleSheet, Text, View,Dimensions,Alert,ActivityIndicator,FlatList,Image,SafeAreaView,TouchableOpacity, ScrollView } from 'react-native';

const Details =({route})=>{
    const { dtName , dtJob , dtAvatar, dtAbout } = route.params;//

    return (
        <SafeAreaView>
        <ScrollView>
        <Image
            style={styles.itemAvatar}
            source={{uri: dtAvatar}}
        />
            <Text  style={styles.itemName}>{dtName}</Text>
            <Text  style={styles.itemJob}>{dtJob}</Text>
            <Text  style={styles.itemDetails}>{dtAbout}</Text>
        </ScrollView>
        </SafeAreaView>
    )
}



export default Details


const styles = StyleSheet.create({
  itemName: {
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 4,
    fontSize: 35,
    alignSelf: 'center'
  },
  itemJob: {
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center'
  },
  itemDetails: {
    fontWeight: 'bold',
    flexDirection: 'row',
    fontSize: 12,
    padding: 10
  },
  itemAvatar: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 5
  }
})