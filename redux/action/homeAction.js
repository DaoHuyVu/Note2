import { constants } from "../../Constants/Constants";
import {api} from '../../api/noteApi'
export const actionCreators = {
    addNote : (note) => {
        api.add(note)
        return {type : constants.ADD_NOTE,payload : {note}}
    },
    deleteNote : (id) => {
        api.delete(id)
        return {type : constants.DELETE_NOTE,payload : {id}}
    },
    getNotes : (noteList) => {
        return {type : constants.GET_NOTE,noteList : noteList}
    },
    changeModalVisible : (visible) => {
        return {type : constants.MODAL_VISIBLE,modalVisible : visible}
    },
    handleQueryChange : (text) => {
        return {type : constants.SEARCH_CHANGE,payload : {text}}
    }
}