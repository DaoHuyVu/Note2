import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar,View,ActivityIndicator, Pressable,Text} from 'react-native';
import {NavigationContainer,useNavigation} from '@react-navigation/native'
import Home from './screen/Home'
import Edit from './screen/EditNote'
import Login  from './screen/Login';
import SignUp from './screen/SignUp'
import {navigationRef} from "./RootNavigation.js"
import { useState,useEffect} from 'react';
import * as SecureStore from 'expo-secure-store'
const Stack = createNativeStackNavigator()
export default function App(){
  const [loading, setLoading] = useState(true);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      setShouldNavigate(!!accessToken);
      setLoading(false);
    };

    checkAccessToken();
  }, []); 

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle='light-content' backgroundColor='purple'></StatusBar>
      <Stack.Navigator initialRouteName= {shouldNavigate ? 'Home' : 'Login'}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Edit' component={Edit} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='SignUp' component={SignUp}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  )
}


