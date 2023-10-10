import { api } from "../../api/noteApi"

export const actionCreators = {
    load : (note) => {
        return {type : 'load',state : note}
    },
    nameChange : (name) => {
        return {type : 'nameChange',name : name}
    },
    descriptionChange : (des) => {
        return {type : 'descriptionChange',description : des}
    },
    update : (id,tempNote) => {
        api.update(id,tempNote)
        return {type : 'update'}
    }
}