import React from 'react';
import { StyleSheet } from 'react-native';

import Chat from './components/Chat';
import Start from './components/Start';
import CustomActions from './components/CustomActions';

// import react native gesture handler
import 'react-native-gesture-handler';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//Create the navigator
const Stack = createStackNavigator();

export default class App extends React.Component {

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});