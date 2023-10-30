import { ActivityIndicator, Pressable, StyleSheet ,Text,TextInput,View} from "react-native"
import { validateEmail, validatePassword, validateUserName,AllFieldValid} from "../utils/validateInput"
import { useReducer } from "react"
import {reducer,initialState} from '../redux/reducer/signUpReducer'
import actionCreators from "../redux/action/signUpAction"
import { Dimensions } from "react-native"
import {api} from '../api/noteApi'
const window = Dimensions.get('screen')
const modalHeightSize = Math.floor(window.height*0.7)
const modalWidthSize = Math.floor(window.width*0.8)

const SignUp = ({navigation}) => {
    const [state,dispatch] = useReducer(reducer,initialState)
    const {email,userName,password,reEnterPassword,isLoading,errorMessage,token} = state
    {token && navigation.replace('Home')}
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
    const handleSignUp = () => {
        dispatch(actionCreators.loading())
        setTimeout(async ()=>{
            let res
            try{
                const res = await api.signUp(em,un,pw)
                dispatch(actionCreators.success(un))
            }catch(e){
                dispatch(actionCreators.fail(res.response.data))
            }
        },2000)
    }
    return (
        <View style={styles.container}>
            <View style={styles.input_container}>
                <TextInput 
                    style={styles.input_field}
                    placeholder="Email..."
                    value = {email}
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
                <Text style={styles.invalid}>*Username's length must be in range of 8 to 25</Text>} 

                <TextInput 
                    value={password}
                    style={styles.input_field}
                    placeholder="Password..."
                    secureTextEntry = 'true'
                    onChangeText={handlePasswordChange}
                />
                {!validatePassword(password) 
                    && 
                <Text style={styles.invalid}>*Password's length must be in range of 8 to 32</Text>} 

                <TextInput 
                    value={reEnterPassword}
                    style={styles.input_field}
                    placeholder="Re-enter password..."
                    secureTextEntry = 'true'
                    onChangeText={handleReEnterPasswordChange}
                />
                {password !== reEnterPassword
                    && 
                <Text style={styles.invalid}>*Does not match password field</Text>} 
                <Pressable 
                style={styles.button} 
                onPress = {handleSignUp} disabled={isLoading || AllFieldValid(email,userName,password,reEnterPassword)}>
                    <Text>Sign up</Text>
                </Pressable>
            </View>
            {isLoading && <ActivityIndicator size={'large'} style={styles.progressBar}/>}
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
    },
    invalid : {
        color : 'red'
    }
})
export default SignUp