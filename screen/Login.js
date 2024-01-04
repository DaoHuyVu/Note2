import { StyleSheet, TextInput, View ,Text,Pressable, ActivityIndicator, Platform,ToastAndroid} from "react-native"
import {  useCallback, useContext, useEffect, useReducer } from "react"
import { initialState, reducer } from "../redux/reducer/loginReducer"
import { Dimensions } from "react-native"
import { actionCreators } from "../redux/action/loginAction"
import {api} from "../api/noteApi"
import * as SecureStore from 'expo-secure-store'
import { MaterialCommunityIcons } from "@expo/vector-icons"

const window = Dimensions.get('screen')
const modalHeightSize = Math.floor(window.height*0.5)
const modalWidthSize = Math.floor(window.width*0.8)

const Login = ({navigation}) =>  {
    const [state,dispatch] = useReducer(reducer,initialState)
    const {userName,password,isLoading,isLoggedIn,isPasswordShown,message} = state

    useEffect(() => {
        if(isLoggedIn){
            navigation.replace('Home')
        }
    },[isLoggedIn])
    useEffect(()=>{
        message !== null &&  ToastAndroid.showWithGravity(message,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    },[message])
    const handleSignUp = () =>{
        navigation.navigate('SignUp')
    }
    
    const handleLogin = async () => {
        if(userName.length == 0){
           ToastAndroid.showWithGravity("Username must not be empty",ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        }
        else{
            if(password.length == 0){
                ToastAndroid.showWithGravity("Password must not be empty",ToastAndroid.SHORT,ToastAndroid.BOTTOM)
            }
            else{
                dispatch(actionCreators.loading())
                    try{
                        const res = await api.login(userName,password)
                        await SecureStore.setItemAsync("accessToken",res.data.accessToken)
                        await SecureStore.setItemAsync("refreshToken",res.data.refreshToken)
                        dispatch(actionCreators.success())
                    }catch(error){
                        dispatch(actionCreators.fail())
                    }
                   
            }
        }
    }
    const handleUsernameChange = (un) => {
        dispatch(actionCreators.userNameChange(un))
    } 
    const handlePasswordChange = (pw) => {
        dispatch(actionCreators.passwordChange(pw))
    }
    return (
        
        <View style={styles.container}>
            <View style={styles.input_container}>
                <TextInput 
                placeholder="Username or email"
                style={styles.input_field}
                value = {userName}
                autoCapitalize="none"
                onChangeText={handleUsernameChange}
                />
                <View style={styles.password_container}>
                    <TextInput 
                        style={{...styles.input_field,flex : 1}}
                        value = {password}
                        placeholder="Password"
                        secureTextEntry = {!isPasswordShown}
                        autoCapitalize="none"
                        onChangeText={handlePasswordChange}
                    />
                    <MaterialCommunityIcons 
                        style={styles.icon}
                        name={isPasswordShown ? 'eye' : 'eye-off'}
                        size={24}
                        onPress={() => dispatch(actionCreators.togglePassword())}
                    />  
                </View>
                 
                <Pressable style={styles.button} onPress={handleLogin} disabled = {isLoading} >
                    <Text style = {{color : 'white'}}>Login</Text>
                </Pressable>
                <Text>Don't have an account?
                    <Pressable onPress={handleSignUp}>
                        <Text style={{fontWeight:'bold'}}> Sign Up</Text>
                    </Pressable>
                </Text>
            </View>
            
           {isLoading && <ActivityIndicator size={'large'} style={styles.progressBar} /> }
        </View>
    )
} 
const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',  
    },
    input_container : {
        height : modalHeightSize,
        width : modalWidthSize,
        justifyContent : 'space-evenly',
        alignItems : 'center',
        position : 'relative',
        borderWidth : 1,
        borderRadius : 10,
    },
    input_field : {
        width : '70%',
        height : 50,
        padding : 10,
        borderWidth : 1,
        borderRadius : 10,
    },
    button : {
        borderWidth : 1,
        borderRadius : 10,
        minWidth : 100,
        padding : 10,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#87ceeb',
    },
    progressBar : {
        position : 'absolute',
    },
    icon : {
        right : 10,   
        position : 'absolute'
    },
    password_container: { 
        width : '70%',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#f3f3f3', 
        borderRadius: 8, 
     
    }, 
})
export default Login