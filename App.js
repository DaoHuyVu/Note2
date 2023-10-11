import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import Home from './screen/Home'
import Edit from './screen/EditNote'
import { Login } from './screen/Login';
const Stack = createNativeStackNavigator()

export default function App(){
  
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' backgroundColor='purple'></StatusBar>
      <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Edit' component={Edit} />
          <Stack.Screen name='Login' component={Login} />
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}


