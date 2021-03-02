import React from 'react';
import { NavigationContainer  ,DarkTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, TransitionSpecs } from '@react-navigation/stack';

import Home from './screens/Home';
import Detail from './screens/Detail';

const Stack = createStackNavigator();

const App=()=>{
  return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator initialRouteName="Home" header={null}>
               <Stack.Screen 
                  name="Home" 
                  component={Home}  
                  options={{
                    title:'Movies',
                    transitionSpec:{
                      open :TransitionSpecs.FadeInFromBottomAndroidSpec,
                      close :TransitionSpecs.FadeInFromBottomAndroidSpec
                    }
                  }}
                  />
                <Stack.Screen 
                  name="Detail" 
                  component={Detail}  
                  options={{
                   ...TransitionPresets.RevealFromBottomAndroid
                  }}
                  />
            </Stack.Navigator>
        </NavigationContainer>
  )
}



export default App;