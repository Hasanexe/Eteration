import React, { } from 'react';
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