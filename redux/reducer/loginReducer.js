export const initialState = {
    userName : '',
    password : '',
    isLoading : false,
}
export const reducer = (state = initialState,action) => {
    switch(action.type){
        case 'username_change' : {
            return {...state,userName : action.userName}
        }
        case 'password_change' : {
            return {...state,password : action.password}
        }
        case 'loading' : {
            return {...state,isLoading : true}
        }
        case 'success' : {
            return {...state,isLoading : false}
        }
        case 'fail' : {
            return {...state,isLoading : false}
        }
        default : return state
    }
}