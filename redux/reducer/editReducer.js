export const initialState = {
    name : '',
    description : '',
    message : null,
    isLoading : false,
    isSuccessful : false,
    isNameChange : false,
    isDescriptionChange : false,
}
export const editReducer = (state = initialState,action) => {
    switch(action.type){
        case 'nameChange' : {
            return {...state,isNameChange : state.name !== action.name ? true : false,name : action.name}
        } 
        case 'descriptionChange' : {
            return {...state,isDescriptionChange : state.description !== action.description ? true : false,description : action.description}
        }
        case 'init' : {
            return {...state,name : action.name,description : action.description,isLoading : false}
        }
        case 'loading' : {
            return {...state,isLoading : true}
        }
        case 'fail' : {
            return {...state,isLoading : false,message : action.message}
        }
        case 'success' : {
            return {...state,isLoading : false,isSuccessful : true,message : 'update successfully'}
        }
        case 'message_shown' : {
            return {...state,message : null}
        }
        default : return state
    }
}