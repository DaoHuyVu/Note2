import { useEffect, useReducer } from 'react'
import {View,StyleSheet, TextInput, Pressable, Text,ToastAndroid, ActivityIndicator} from 'react-native'
import { editReducer, initialState } from '../redux/reducer/editReducer'
import { actionCreators } from '../redux/action/editAction'
import noteRepository from '../repository/noteRepository'
export default function EditNote({route,navigation}){
    const {id} = route.params
    const [state,dispatch] = useReducer(editReducer,initialState)
    const {name,description,message,isLoading,isSuccessful,isNameChange,isDescriptionChange} = state
    useEffect(() => {
        dispatch(actionCreators.loading())
        const note = noteRepository.getNote(id)
        dispatch(actionCreators.init(note))
    },[])

    const handleUpdate = async () => {
        try{
            dispatch(actionCreators.loading())
            let obj = new Map()
            if(isNameChange) obj.set('name',name)
            if(isDescriptionChange) obj.set('description',description)
            const jsonObj = JSON.stringify(Object.fromEntries(obj))
            await noteRepository.updateNote(id,{changes : jsonObj})
            dispatch(actionCreators.success())
        }catch(error){
            dispatch(actionCreators.fail(error))
        }
    }
   
    useEffect(() => {
        if(isSuccessful === true) {
            navigation.goBack()
        }
    },[isSuccessful])

    useEffect(() => {
        message !== null && ToastAndroid.showWithGravity(message,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
        dispatch(actionCreators.messageShown())
    },[message])

    const isUpdateable = name.length > 0 && description.length > 0

    return (
        <View style={styles.container}>
            <TextInput 
            placeholder='Name...'
            value = {name}
            style = {styles.input}
            onChangeText={text => dispatch(actionCreators.nameChange(text))}
            />
             {name.length == 0 && 
                <Text style={{color : 'red',width : '70%'}}>
                    *Name is required
                </Text>}
            <TextInput 
            style={styles.input}
            value = {description}
            placeholder='Description...'
            onChangeText={text => dispatch(actionCreators.descriptionChange(text))}/>
            {description.length == 0 && 
                <Text style={{color : 'red',width : '70%'}}>
                    *Name is required
                </Text>}
            <Pressable 
            style={[styles.button,{backgroundColor : isUpdateable ? 'orange' : 'gray'}]} 
            onPress={handleUpdate}
            disabled = {!isUpdateable}>
                <Text>Update</Text>
            </Pressable>
            {
                isLoading && <ActivityIndicator size={'large'}/>
            }
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