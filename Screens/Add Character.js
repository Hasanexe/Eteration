import React, { useState,Component } from 'react';
import { StyleSheet,AsyncStorage, Text,TextInput , View,Dimensions,Alert,ActivityIndicator,FlatList,Image,SafeAreaView,TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AddCharacter =({ navigation })=>{
    const [formData, setFromData] = React.useState({name:'', job:'', about:'', avatar:''});

    const displayData = async ()=>{  
        console.log('SUBMITTED Value: ', formData);
        try{  
            let db = await AsyncStorage.getItem('db');
            if(db){
            db = JSON.parse(db);
            }else{
                db=[];
            }
            formData.id = new Date().getTime()
            console.log('Fom After: ', formData);
            db = [...db,formData];
            db = JSON.stringify(db);
          await AsyncStorage.setItem('db',db);  
          alert('User has been added successfully');  
          navigation.reset({index:0,routes:[{name:'Home'}]});
        }  
        catch(error){  
          alert(error)  
        }  
      } 
      
      const onFormChange=(fieldName, value)=>{
            switch(fieldName){
                case 'surename':
                    setFromData({...formData,name:value});
                    break;
                case 'jobTitle':
                    setFromData({...formData,job:value});
                    break;
                case 'about':
                    setFromData({...formData,about:value});
                    break;
                case 'imgLink':
                    setFromData({...formData,avatar:value});
                    break;
            }
      }

      console.log('------->', formData);
    
      return (
        <SafeAreaView>
        <ScrollView>
            <Text  style={styles.text}>Name Surname:</Text>
            <TextInput style={styles.input} onChangeText={onFormChange.bind(this,'surename')}/>

            <Text  style={styles.text}>Job Title:</Text>
            <TextInput style={styles.input} onChangeText={onFormChange.bind(this,'jobTitle')}/>

            <Text  style={styles.text}>About Him/Her:</Text>
            <TextInput multiline={true}style={styles.longInput}onChangeText={onFormChange.bind(this,'about')} />

            <Text  style={styles.text}>Image Link:</Text>
            <TextInput style={styles.input}onChangeText={onFormChange.bind(this,'imgLink')} />
            
            <TouchableOpacity style = {styles.submitButton}
                onPress ={displayData}>
               <Text style = {styles.buttonText}> Add Character </Text>
            </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
    )
}



export default AddCharacter


const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 5,
    borderRadius: 8
  },
  longInput: {
    height: 120,
    margin: 12,
    borderWidth: 2,
    padding: 5,
    textAlignVertical: 'top',
    borderRadius: 8
  },
  submitButton: {
    backgroundColor: '#5A71DB',
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 8
 },
  buttonText:{
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    fontSize: 17,
 }
})