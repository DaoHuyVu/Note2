import { constants } from "../../Constants/Constants";
export const actionCreators = {
    addNote : (data) => {
        return {type : constants.ADD_NOTE,noteList : data,message : "Added successfully"}
    },
    deleteNote : (note) => {
        return {type : constants.DELETE_NOTE,note : note,message : "Deleted successfully"}
    },
    getNotes : (noteList) => {
        return {type : constants.GET_NOTE,noteList : noteList}
    },
    changeModalVisible : (visible) => {
        return {type : constants.MODAL_VISIBLE,modalVisible : visible}
    },
    handleQueryChange : (text) => {
        return {type : constants.SEARCH_CHANGE,payload : text}
    },
    addFail : (error) => {
        return {type : constants.ERROR,message :error}
    },
    deleteFail : () => {
        return {type : constants.ERROR,message : error}
    },
    updateFail : (error) => {
        return {type : constants.ERROR,message : error}
    },
    messageShown : () => {
        return {type : constants.MESSAGE_SHOWN}
    },
    loading : () => {
        return {type: constants.LOADING}
    },
    updateNote : (updatedNote) => {
        return {type : constants.UPDATE_NOTE,note : updatedNote,message : "Updated successfully"}
    },
    fail : (error) => {
        return {type : constants.ERROR,message : error}
    }
}