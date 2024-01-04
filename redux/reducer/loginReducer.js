export const initialState = {
    userName : '',
    password : '',
    isLoading : false,
    isLoggedIn : false,
    isPasswordShown : false,
    message : null
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
            return {...state,isLoading : false,isLoggedIn : true}
        }
        case 'fail' : {
            return {...state,isLoading : false,message : 'Username or password is wrong'}
        }
        case 'toggle_password' : {
            return {...state,isPasswordShown : !state.isPasswordShown}
        }
        default : return state
    }
}