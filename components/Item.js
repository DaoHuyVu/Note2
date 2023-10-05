import { useContext } from "react";
import { StyleSheet,Text,View, Dimensions } from "react-native";
const window = Dimensions.get('window')
const itemWidth = window.width/2 - 20
export default function Item({item}){
   
    return (
        <View style = {styles.itemContainer} >
            <Text style={styles.noteCreatedAt}>{item.date}</Text>
            <Text style = {styles.itemName}>{item.name}</Text>
            <Text >{item.description}</Text>
            
        </View>
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