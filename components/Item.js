import { useContext, useState } from "react";
import { StyleSheet,Text, Dimensions, Pressable, View } from "react-native";
import { longPressContext, pressContext } from "../utils/provideContext";
import { Checkbox } from "react-native-paper";
const window = Dimensions.get('window')
const itemWidth = window.width/2 - 20
export default function Item({item}){
   const [done,setDone] = useState(item.done)
   const handleLongPress = useContext(longPressContext)
   const handlePress = useContext(pressContext)

    return (
        <Pressable
            style = {styles.itemContainer} 
            onLongPress = {() => handleLongPress(item.id)} 
            onPress={() => handlePress(item.id)}>
            <Text style={styles.noteCreatedAt}>{item.date}</Text>
            <View style={{flexDirection : 'row',alignItems : 'center'}}>
                <Checkbox
                    style={styles.checkBox}
                    status={done ? "checked" : "unchecked"}
                    onPress = {() => {setDone(!done)}}
                />
                
                <Text
                style = {[styles.itemName,{textDecorationLine : done ? 'line-through' : 'none'}]}>
                    {item.name}
            </Text>
            </View>
            <Text style={{margin : 10}}>{item.description}</Text>
            
        </Pressable>
    )
}
const styles = StyleSheet.create({
    itemContainer : {
        borderRadius : 10,
        margin : 10,   
        borderWidth : 1,
        padding : 10,
        width : itemWidth,
    },
    itemName : {
        fontSize : 16,
        fontWeight : 'bold',
    },
    noteCreatedAt : {
        alignSelf : 'flex-end',
    },
    
})