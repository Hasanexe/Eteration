import React, { useState,Component } from 'react';
import { StyleSheet, Text, View,Dimensions,Alert,ActivityIndicator,FlatList,Image,SafeAreaView,TouchableOpacity } from 'react-native';
import { render } from "react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/Home'
import DetailsScreen from './Screens/Details'
import AddCharacter from './Screens/Add Character'

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            title: 'Home Page',
          headerStyle: {
            headerTitleAlign: 'center'
          },
        }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Add New Character" component={AddCharacter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack