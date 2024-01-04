import { constants } from "../../Constants/Constants"
export const initialState = {
    searchQuery : '',
    modalVisible : false,
    noteList : [],
    message : null,
    isLoading : false,
}
export const reducer = (state = initialState,action) => {
    switch(action.type){
        case constants.LOADING : {
            return {...state,isLoading : true}
        }
        case constants.ADD_NOTE : {
            return {...state,isLoading : false,message : action.message,noteList : action.noteList}
        }
        case constants.DELETE_NOTE : {
            return {...state,noteList : state.noteList.filter(note => note.id !== action.note.id),isLoading : false,message : action.message}
        }
        case constants.MODAL_VISIBLE : {
            return {...state,modalVisible : action.modalVisible}
        }
        case constants.SEARCH_CHANGE : {
            return {...state,searchQuery : action.payload}
        }
        case constants.GET_NOTE : {
            return {...state,noteList : action.noteList,isLoading : false}
        }
        case constants.ERROR : {
            return {...state,message : action.message,isLoading : false}
        }
        case constants.MESSAGE_SHOWN : {
            return {...state,message : null}
        }
        case constants.UPDATE_NOTE : {
            return {...state,noteList : state.noteList.map(note => {
                if(note.id === action.note.id) return action.note
                return note
            }),message : action.message}
        }
        default : return state
    }
}