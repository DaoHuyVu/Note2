import { useCallback, useReducer  } from "react";
import { StyleSheet,View,Alert} from "react-native";
import  SearchBar  from "../components/SearchBar";
import  Fab  from "../components/Fab";
import NoteList  from "../components/NoteList";
import AddModal from "../components/addModal"
import filterItem from '../utils/filterItem'
import {useFocusEffect} from '@react-navigation/native'
import { longPressContext,pressContext} from "../utils/provideContext";
import { reducer,initialState} from "../redux/reducer/homeReducer";
import { actionCreators } from "../redux/action/homeAction";
import { api } from "../api/noteApi";

    export default function Home({navigation}){
        const [state,dispatch] = useReducer(reducer,initialState)
        const {searchQuery,modalVisible,noteList} = state

    const fetchNotes = async () => {
        const noteList = await api.getNotes()
        dispatch(actionCreators.getNotes(noteList))
    }
    useFocusEffect(
        useCallback(()=>{
            fetchNotes()
        },[])
    )    

    function handlePress(id){
        navigation.navigate('Edit',{itemId : id})
    }
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
                    onPress : () => dispatch(actionCreators.deleteNote(id))
                }
            ]
        )
    }
    
    const filterNoteList = noteList.length > 0 ? noteList.filter(item => filterItem(item,searchQuery)) : null

    return (
        <pressContext.Provider value={handlePress}>
        <longPressContext.Provider value={handleLongPress}>
            <View style={[styles.container,modalVisible == true ? {backgroundColor : 'rgba(0,0,0,0.5)'}: {}]}>
            {
            modalVisible == true && 
            <AddModal 
                handleClose = {() => dispatch(actionCreators.changeModalVisible(false))}
                handleAdd = {note => dispatch(actionCreators.addNote(note))}/>  
            }            
            <SearchBar 
                searchQuery = {searchQuery} 
                setSearchQuery = {text => dispatch(actionCreators.handleQueryChange(text))}
            />
            <NoteList  filterNoteList = {filterNoteList ??  noteList} numColumns={2}/>
            <Fab onPress = {() =>  {dispatch(actionCreators.changeModalVisible(true))} }/>
        </View>
        </longPressContext.Provider>
        </pressContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   
  });
  