import { useState } from "react";
import { StyleSheet,View,Text, Modal, Dimensions, Pressable } from "react-native";
import  SearchBar  from "../components/SearchBar";
import  Fab  from "../components/Fab";
import NoteList  from "../components/NoteList";
import AddModal from "../components/addModal"


export default function Home({navigation}){
    const [modalVisible,setModalVisible] = useState(false)
    const [searchString,setSearchString] = useState('')
    const [noteList,setNoteList] = useState([])
    function handleAdd(list){
        setNoteList([...noteList,list])
    }
    const filterNoteList = noteList.length > 0 ? noteList.filter(item => filterItem(item,searchString)) : null
    return (
        <View style={styles.container}>
            <AddModal 
                modalVisible = {modalVisible} 
                handleClose = {() => setModalVisible(!modalVisible)}
                handleAdd = {handleAdd}/>
            <SearchBar 
                searchQuery = {searchString} 
                setSearchQuery = {setSearchString}
            />
            <NoteList  searchQuery = {searchString} filterNoteList = {filterNoteList ??  noteList}/>
            <Fab onPress = {() => setModalVisible(!modalVisible)}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   
  });
  