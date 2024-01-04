import { ActivityIndicator, Pressable, StyleSheet ,Text,TextInput,View,ToastAndroid,ScrollView} from "react-native"
import { validateEmail, validatePassword, validateUserName,AllFieldValid} from "../utils/validateInput"
import { StackActions} from '@react-navigation/native'
import { useEffect, useReducer } from "react"
import {reducer,initialState} from '../redux/reducer/signUpReducer'
import actionCreators from "../redux/action/signUpAction"
import { Dimensions } from "react-native"
import {api} from '../api/noteApi'
import { MaterialCommunityIcons } from "@expo/vector-icons"
const window = Dimensions.get('screen')
const modalHeightSize = Math.floor(window.height*0.7)
const modalWidthSize = Math.floor(window.width)

const SignUp = ({navigation}) => {
    const [state,dispatch] = useReducer(reducer,initialState)
    const {email,userName,password,reEnterPassword,isLoading,isSignedUpSuccessfully,isPasswordShown} = state

    const handleUserNameChange = (userName)=>{
        dispatch(actionCreators.userNameChange(userName))
    }
    const handleEmailChange = (email)=>{
        dispatch(actionCreators.emailChange(email))
    }
    const handlePasswordChange = (password)=>{
        dispatch(actionCreators.passwordChange(password))
    }
    const handleReEnterPasswordChange = (reEnterPassword)=>{
        dispatch(actionCreators.reEnterPasswordChange(reEnterPassword))
    }
    const handleTogglePassword = () => {
        dispatch(actionCreators.togglePassword())
    }
    const handleSignUp = async () => {
        dispatch(actionCreators.loading())
            try{
                const res = await api.signUp(email,userName,password)
                ToastAndroid.showWithGravity(res.data.message,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
                dispatch(actionCreators.success())
            }catch(e){
                dispatch(actionCreators.fail())
                ToastAndroid.showWithGravity(e.response.data.message,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
            }
    }
        useEffect(() => {
            isSignedUpSuccessfully && navigation.goBack()
        },[isSignedUpSuccessfully])

    return (
        <View style ={styles.container}>
            <ScrollView  contentContainerStyle={styles.input_container}>
                <TextInput 
                    style={styles.input_field}
                    placeholder="Email..."
                    value = {email}
                    autoCapitalize="none"
                    onChangeText={handleEmailChange}/>
                {!validateEmail(email) 
                    && 
                <Text style={styles.invalid}>*Email is invalid</Text>} 
                   
                <TextInput 
                    value={userName}
                    style={styles.input_field}
                    placeholder="UserName..."
                    onChangeText={handleUserNameChange}/>
                {!validateUserName(userName) 
                    && 
                <Text style={styles.invalid} >*Username's length must be longer than 8 </Text>} 

                <View style={styles.password_container}>
                    <TextInput 
                        value={password}
                        style={styles.input_field}
                        placeholder="Password..."
                        autoCapitalize="none"
                        secureTextEntry = {!isPasswordShown}
                        onChangeText={handlePasswordChange}
                    />
                    <MaterialCommunityIcons
                            style={styles.icon}
                            name={isPasswordShown ? 'eye' : 'eye-off'}
                            size={24}
                            onPress={handleTogglePassword}
                        />
                </View>
                {!validatePassword(password) 
                    && 
                <Text style={styles.invalid} >*Password's length must be greater than or equal 8 </Text>} 

                <View style={styles.password_container}>
                    <TextInput 
                        value={reEnterPassword}
                        style={styles.input_field}
                        placeholder="Re-enter password..."
                        autoCapitalize="none"
                        secureTextEntry = {!isPasswordShown}
                        onChangeText={handleReEnterPasswordChange}
                    />
                    <MaterialCommunityIcons
                        style={styles.icon}
                        name={isPasswordShown ? 'eye' : 'eye-off'}
                        size={24}
                        onPress={handleTogglePassword}
                    />
                </View>
                {password !== reEnterPassword
                    && 
                <Text style={styles.invalid}>*Does not match password field</Text>} 
                <Pressable 
                style={styles.button} 
                disabled={isLoading || !AllFieldValid(email,userName,password,reEnterPassword)}
                onPress = {handleSignUp} >
                    <Text>Sign up</Text>
                </Pressable>
            </ScrollView>
            {isLoading && <ActivityIndicator size={'large'} style={styles.progressBar}/>}
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        justifyContent : 'center',
        alignItems : 'center',  
    },
    input_container : {
        height : modalHeightSize,
        width : modalWidthSize,
        justifyContent : 'space-evenly',
        alignItems : 'center',
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
    invalid : {
        color : 'red'
    },
    icon : {
        position : 'absolute',
        right : 10
    },
    password_container : {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
    }
})
export default SignUp
