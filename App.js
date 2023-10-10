import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import Home from './screen/Home'
import EditNote from './screen/EditNote'

const Stack = createNativeStackNavigator()


export default function App(){
  
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' backgroundColor='purple'></StatusBar>
      
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Edit" component={EditNote} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}


