import { useCallback, useEffect, useReducer  } from "react";
import { StyleSheet,View,Alert,Text, ActivityIndicator, ToastAndroid,Pressable} from "react-native";
import  SearchBar  from "../components/SearchBar";
import  Fab  from "../components/Fab";
import NoteList  from "../components/NoteList";
import AddModal from "../components/addModal"
import filterItem from '../utils/filterItem'
import { longPressContext,pressContext} from "../utils/provideContext";
import { reducer,initialState} from "../redux/reducer/homeReducer";
import { actionCreators } from "../redux/action/homeAction";
import noteRepository from "../repository/noteRepository";
import * as SecureStore from 'expo-secure-store'
import { useFocusEffect } from "@react-navigation/native";
import {api} from "../api/noteApi" 
    export default function Home({navigation}){
        const [state,dispatch] = useReducer(reducer,initialState)
        const {searchQuery,modalVisible,noteList,message,isLoading} = state

        const handleLogout = async () => {
            const accessToken = await SecureStore.getItemAsync("accessToken");
            const refreshToken = await SecureStore.getItemAsync("refreshToken");
            const result = await api.logout(accessToken,refreshToken)
            if(result.status == 200){
                await SecureStore.deleteItemAsync("accessToken")
                await SecureStore.deleteItemAsync("refreshToken")
                navigation.replace('Login')
            }
            else{
                console.log(result);
            }
        }
        const handleClose = () => {
            dispatch(actionCreators.changeModalVisible(false))
        }
        const handleAdd = async (note) => {
            try{
                dispatch(actionCreators.loading())
                const data = await noteRepository.addNote(note)
                dispatch(actionCreators.addNote(data))
            }catch(error){
                dispatch(actionCreators.addFail(error.message))
            }                 
        }
    useEffect(() => {
        const initButton = () => {
            navigation.setOptions({
                headerRight : () => (
                    <Pressable onPress={handleLogout}>
                        <Text>Logout</Text>
                    </Pressable>
                )
            })
        }
        initButton()
    },[])

    useFocusEffect(useCallback(()=>{
        const getNotes = async () => {
            try{
                dispatch(actionCreators.loading())
                const data = await noteRepository.getNotes()
                dispatch(actionCreators.getNotes(data))
            }
            catch(error){
                dispatch(actionCreators.fail(error.message))
            }
        }
        getNotes()
    },[]))

    useEffect(() => {
        if(message !== null){
            ToastAndroid.showWithGravity(message,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
            dispatch(actionCreators.messageShown())
        }
    },[message])

    // item press handler
    function handlePress(id){
        navigation.navigate('Edit',{id})
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
                    onPress : async () => {
                        try{
                            dispatch(actionCreators.loading())
                            const data = await noteRepository.deleteNote(id)
                            dispatch(actionCreators.deleteNote(data))

                        }catch(error){
                            dispatch(actionCreators.deleteFail())
                        }
                    }
                }
            ]
        )
    }

    const filterNoteList = noteList.length > 0 ? noteList.filter(item => filterItem(item,searchQuery)) : null
    return (
        <pressContext.Provider value={handlePress}>
        <longPressContext.Provider value={handleLongPress}>
            <View style={[styles.container,modalVisible == true ? {backgroundColor : 'rgba(0,0,0,0.5)'}: {}]}>
                <ActivityIndicator style={styles.progressBar} size="large" animating = {isLoading}/>

            {
                modalVisible && 
                <AddModal 
                modalVisible = {modalVisible}
                handleClose = {handleClose}
                handleAdd = {handleAdd}/> 
            }

            <SearchBar 
                searchQuery = {searchQuery} 
                setSearchQuery = {text => dispatch(actionCreators.handleQueryChange(text))}
            />
            <NoteList  filterNoteList = {filterNoteList ??  noteList} numColumns={2}/>
            <Fab onPress = {() =>  {dispatch(actionCreators.changeModalVisible(true))}} extraStyle = {{right : '5%',bottom : '5%'}}/>
            
        </View>
        </longPressContext.Provider>
        </pressContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position : 'relative',
      
    },
    progressBar : {
        position : 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'  
    }
  });
  