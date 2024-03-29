import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native"
import Home from './screens/home';
import Updates from './screens/updates';
import Meteors from './screens/meteors';
import ISSlocation from './screens/ISSLocation';
import StackNavigator from './navigation/stackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}


