import { useContext, useState } from "react";
import { StyleSheet,View,Alert} from "react-native";
import  SearchBar  from "../components/SearchBar";
import  Fab  from "../components/Fab";
import NoteList  from "../components/NoteList";
import AddModal from "../components/addModal"
import filterItem from '../utils/filterItem'
import { longPressContext } from "../utils/provideContext";

export default function Home({navigation}){
    const [modalVisible,setModalVisible] = useState(false)
    const [searchString,setSearchString] = useState('')
    const [noteList,setNoteList] = useState([])

    function handleLongPress(id){
        Alert.alert(
            "Are you really want to delete this ?",
            "This would delete this note forever!",
            [
                {
                    text : 'Cancel',
                },
                {
                    text : 'Yes',
                    onPress : () => setNoteList(noteList.filter(item => item.id !== id)) 
                }
            ]
        )
    }

    function handleAdd(list){
        setNoteList([...noteList,list])
    }

    const filterNoteList = noteList.length > 0 ? noteList.filter(item => filterItem(item,searchString)) : null

    return (
        <longPressContext.Provider value={handleLongPress}>
            <View style={[styles.container,modalVisible == true ? {backgroundColor : 'rgba(0,0,0,0.5)'}: {}]}>
            {
            modalVisible == true && 
            <AddModal 
                handleClose = {() => setModalVisible(false)}
                handleAdd = {handleAdd}/>  
            }            
            <SearchBar 
                searchQuery = {searchString} 
                setSearchQuery = {setSearchString}
            />
            <NoteList  searchQuery = {searchString} filterNoteList = {filterNoteList ??  noteList}/>
            <Fab onPress = {() => setModalVisible(true)}/>
        </View>
        </longPressContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   
  });
  