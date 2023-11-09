import { StyleSheet, TextInput, View ,Text,Pressable, ActivityIndicator, Platform,ToastAndroid} from "react-native"
import {  useCallback, useContext, useEffect, useReducer } from "react"
import { initialState, reducer } from "../redux/reducer/loginReducer"
import { Dimensions } from "react-native"
import { actionCreators } from "../redux/action/loginAction"
import {api} from "../api/noteApi"
import * as SecureStore from 'expo-secure-store'
const window = Dimensions.get('screen')
const modalHeightSize = Math.floor(window.height*0.5)
const modalWidthSize = Math.floor(window.width*0.8)

let token

const Login = ({navigation}) =>  {
    const [state,dispatch] = useReducer(reducer,initialState)
    const {userName,password,isLoading} = state
    
    const getKey = async () => {
        token = await SecureStore.getItemAsync('userToken')
        if(token !== null) navigation.replace('Home')
    }
    useEffect(
        useCallback(()=>{
            getKey()
        })
        ,[token])

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
                        console.log(res.data)
                        dispatch(actionCreators.success(res.data))
                        await SecureStore.setItemAsync('userToken',res.data)
                        token = res.data
                        
                    }catch(e){
                        dispatch(actionCreators.fail())
                        console.log(e)
                        ToastAndroid.showWithGravity(e.response.data.message,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
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
                onChangeText={handleUsernameChange}
                />
                <TextInput 
                style={styles.input_field}
                value = {password}
                placeholder="Password"
                secureTextEntry = {true}
                onChangeText={handlePasswordChange}/>
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
    }
})
export default Login