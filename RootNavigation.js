import { createNavigationContainerRef } from "@react-navigation/native"
import { CommonActions } from "@react-navigation/native"
import { Alert } from "react-native"
export const navigationRef = createNavigationContainerRef()
export function logout(){
    Alert.alert(
        "Session expired",
        "The current session has expired. " + 
        "\nPlease sign in again",
        [{
            text : "OK",
            onPress : navigate
        }],
        {cancelable : false}
    )
}
const navigate = () => {
    if(navigationRef.isReady()){
        navigationRef.dispatch(
            CommonActions.reset({
                index : 0,
                routes : [{name : 'Login'}]
            })
        )
    }
    else{
        console.log("Not ready")
    }
} 