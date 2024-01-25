import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import Updates from '../screens/updates';
import Meteors from '../screens/meteors';
import ISSlocation from '../screens/ISSLocation';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Meteors" component={Meteors} />
      <Stack.Screen name="ISSLocation" component={ISSlocation} />
      <Stack.Screen name="Updates" component={Updates} />
    </Stack.Navigator>
  );
}