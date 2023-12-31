import { Pressable,Text,StyleSheet, Dimensions } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome'

export default function Fab({onPress,extraStyle}){
    return (
        <Pressable style = {{...styles.fab,...extraStyle}} onPress={onPress}>
            <Icon name="plus" size={20} style={{color : 'black'} }/>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    fab : {
        borderRadius : 50,
        position : 'absolute',
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
        width : 48,
        height : 48,
        backgroundColor : 'white'
    }
})