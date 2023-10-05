import { Modal,View,Pressable,StyleSheet,Text ,Dimensions, TextInput} from "react-native"
import Icon from '@expo/vector-icons/FontAwesome'
import { useState } from "react"
const window = Dimensions.get('window')
const modalHeightSize = Math.floor(window.height*0.5)
const modalWidthSize = Math.floor(window.width*0.8)
let nextId = 0
export default function AddModal({handleClose,modalVisible,handleAdd}){
    const [noteName,setNoteName] = useState('')
    const [noteDescription,setNoteDescription] = useState('')
    function add(){
        const today = new Date(Date.now()).toLocaleString()
        handleAdd({id : nextId++,name : noteName,description : noteDescription,date : today})
        handleClose()
    }
    return (
        <Modal
                transparent = {true}
                animationType="slide"
                visible={modalVisible}>
                <View style={styles.centerView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <Text style={{fontWeight : 'bold', fontSize : 32}}>Add note</Text>
                            <Pressable onPress={handleClose}>
                                <Icon name="close" size={32} color = 'black'/>
                            </Pressable>
                        </View>
                        <View style={styles.modalBody}>
                            <TextInput 
                                placeholder="Name..."
                                onChangeText={setNoteName}
                                style={styles.textInput}
                            />
                            <TextInput 
                                placeholder="Description..."
                                onChangeText={setNoteDescription}
                                style={styles.textInput}
                            />
                        </View>
                        <View style = {styles.buttonGroup}> 
                            <Pressable 
                                style={[styles.button,{backgroundColor : 'orange'}]} 
                                onPress={() => add()}
                                >
                                <Text>Add</Text>
                            </Pressable>
                            <Pressable 
                                style={[styles.button,{backgroundColor : 'gray'}]} 
                                onPress={handleClose}>
                                <Text>Close</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>
    )
}
const styles = StyleSheet.create({
    centerView : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',  
      },
      modalView : {
        width : modalWidthSize,
        height : modalHeightSize,
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 1,
        backgroundColor : 'white',
        borderRadius : 10,
        padding : 10,
      },
      buttonGroup : {
          width : '100%',
          height : '20%',
          flexDirection : 'row',
          justifyContent : 'space-evenly',
          padding : 10,
    },
      button : {
          borderWidth : 1,
          borderRadius : 10,
          minWidth : 100,
          padding : 10,
          justifyContent : 'center',
          alignItems : 'center',
          color : 'white'
      },
      modalHeader : {
          width : '100%',
          flexDirection : 'row',
          height : '20%',
          padding : 10,
          justifyContent : 'space-between'
      },
      modalBody : {
          height : '60%',
          width : '100%',
          justifyContent : 'space-evenly',
          alignItems : 'center'
      },
      textInput : {
        width : '70%',
        height : 50,
        borderRadius : 10,
        borderWidth : 1,
        padding : 10,
      }
})