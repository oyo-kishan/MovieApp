import React from 'react';
import {View,Text} from 'react-native';
import { NavigationContainer  ,DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';

const Stack = createStackNavigator();

const App=()=>{
  return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator initialRouteName="Home" header={null}>
               <Stack.Screen 
                  name="Home" 
                  component={Home}  
                  options={{ title: 'Movies' }}
                  />
            </Stack.Navigator>
        </NavigationContainer>
  )
}



export default App;