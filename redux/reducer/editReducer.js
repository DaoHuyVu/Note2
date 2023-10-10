export const initialState = {
    name : '',
    description : '',
}
export const editReducer = (state = initialState,action) => {
    switch(action.type){
        case 'nameChange' : {
            return {...state,name : action.name}
        } 
        case 'descriptionChange' : {
            return {...state,description : action.description}
        }
        case 'load' : {
            return action.state
        }
        default : return state
    }
}