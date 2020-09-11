
import React from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from 'native-base';
const Stack = createStackNavigator()

import Login from './views/Login'
import CreateAccount from './views/CreateAccount'
import Projects from './views/Projects'

const App = () => {
  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: "Log in",
                headerShown: false
              }}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{
                title: "Create account",
                headerStyle: {
                  backgroundColor: '#28303B'
                },
                headerTintColor: 'white',
                headertitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />
            <Stack.Screen
              name="Projects"
              component={Projects}
              options={{
                title: "Projects",
                headerStyle: {
                  backgroundColor: '#28303B'
                },
                headerTintColor: 'white',
                headertitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
