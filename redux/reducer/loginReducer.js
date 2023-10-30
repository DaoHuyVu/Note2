export const initialState = {
    userName : '',
    password : '',
    isLoading : false,
    token : null,
    credentialInvalid : null,
    credentialError : null
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
            return {...state,token : action.token,isLoading : false}
        }
        case 'credential_fail' : {
            return {...state,isLoading : false,}
        }
        case 'fail' : {
            return {...state,errorMessage : action.errorMessage,isLoading : false}
        }
        default : return state
    }
}