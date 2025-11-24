import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Telainicial from './src/telas/Telainicial.js';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <stack.Navigator initialRouteName='Home'>
        <stack.Screen name="Home" component={Telainicial} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
