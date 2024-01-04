import { api } from "../../api/noteApi"

export const actionCreators = {
    nameChange : (name) => {
        return {type : 'nameChange',name : name}
    },
    descriptionChange : (des) => {
        return {type : 'descriptionChange',description : des}
    },
    init : (note) => {
        return {type : 'init',name : note.name,description : note.description}
    },
    loading : () => {
        return {type : 'loading'}
    },
    fail : (message) => {
        return {type : 'failed',message : message}
    },
    success : () => {
        return {type : 'success'}
    },
    messageShown : () => {
        return {type:'message_shown'}
    }
}