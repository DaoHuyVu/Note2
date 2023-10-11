import { constants } from "../../Constants/Constants"
export const initialState = {
    searchQuery : '',
    modalVisible : false,
    noteList : [],
}
export const reducer = (state = initialState,action) => {
    switch(action.type){
        case constants.ADD_NOTE : {
            return {...state,noteList : [...state.noteList,action.payload.note]}
        }
        case constants.DELETE_NOTE : {
            return {...state,noteList : state.noteList.filter(note => note.id !== action.payload.id)}
        }
        case constants.MODAL_VISIBLE : {
            return {...state,modalVisible : action.modalVisible}
        }
        case constants.SEARCH_CHANGE : {
            return {...state,searchQuery : action.payload.text}
        }
        case constants.GET_NOTE : {
            return {...state,noteList : action.noteList}
        }
        default : return state
    }
}