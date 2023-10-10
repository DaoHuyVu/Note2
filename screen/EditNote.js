import { useEffect, useReducer } from 'react'
import {View,StyleSheet, TextInput, Pressable, Text} from 'react-native'
import { editReducer, initialState } from '../redux/reducer/editReducer'
import { actionCreators } from '../redux/action/editAction'
import { api } from '../api/noteApi'
export default function EditNotes({route,navigation}){
    const [state,dispatch] = useReducer(editReducer,initialState)
    
    const fetchNote = async () => {
        const note = await api.getNote(route.params.itemId)
        dispatch(actionCreators.load(note))
    }
    useEffect(()=>{
        fetchNote()
    },[])
    
    const handleUpdate = () => {
        dispatch(actionCreators.update(route.params.itemId,state))
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <TextInput 
            placeholder='Name...'
            value = {state.name}
            style = {styles.input}
            onChangeText={text => dispatch(actionCreators.nameChange(text))}
            />
            <TextInput 
            style={styles.input}
            value = {state.description}
            placeholder='Description...'
            onChangeText={text => dispatch(actionCreators.descriptionChange(text))}/>
            <Pressable style={styles.button} onPress={handleUpdate}>
                <Text>Update</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        rowGap : 20,
    },
    input : {
        width : '70%',
        padding : 10,
        borderWidth : 1,
        borderRadius : 10,

    },
    button : {
        alignItems : 'center',
        minWidth : 100,
        borderWidth : 1,
        borderRadius : 10,
        padding : 10,
    }
})