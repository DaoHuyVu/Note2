import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from './screen/Home'
import EditNote from './screen/EditNotes'
import AddNote from './screen/AddNotes'
const Stack = createNativeStackNavigator()


export default function App(){
  
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' backgroundColor='purple'></StatusBar>
      
      <Stack.Navigator initialRouteName='Home' >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Edit" component={EditNote} />
        <Stack.Screen name="Add" component={AddNote} />
      </Stack.Navigator>

    </NavigationContainer>
  )
}


