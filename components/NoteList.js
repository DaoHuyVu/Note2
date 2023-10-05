import { FlatList,View,StyleSheet } from "react-native"
import Item from "./Item"
export default function NoteList({filterNoteList}){
    return (
        <View style={styles.container}>
            <FlatList
            keyExtractor={item => item.id}
            numColumns={2}
            data={filterNoteList}
            renderItem={({item}) => <Item item = {item}/>}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        height : '80%',
        width : '100%',
    }
})