import { useContext } from "react";
import { StyleSheet,Text, Dimensions, Pressable } from "react-native";
import { longPressContext, pressContext } from "../utils/provideContext";
const window = Dimensions.get('window')
const itemWidth = window.width/2 - 20
export default function Item({item}){

   const handleLongPress = useContext(longPressContext)
   const handlePress = useContext(pressContext)
    return (
        <Pressable
            style = {styles.itemContainer} 
            onLongPress = {() => handleLongPress(item.id)} 
            onPress={() => handlePress(item.id)}>

            <Text style={styles.noteCreatedAt}>{item.date}</Text>
            <Text style = {styles.itemName}>{item.name}</Text>
            <Text >{item.description}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    itemContainer : {
        borderRadius : 10,
        margin : 10,   
        borderWidth : 1,
        padding : 10,
        width : itemWidth
    },
    itemName : {
        fontSize : 16,
        fontWeight : 'bold',
    },
    noteCreatedAt : {
        position : 'relative',
        alignSelf : 'flex-end',
        
    }
})