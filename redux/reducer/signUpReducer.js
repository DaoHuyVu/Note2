export const initialState = {
    email : "",
    userName : "",
    password : "",
    reEnterPassword : "",
    isLoading : false,
    isSignedUpSuccessfully : false,
    isPasswordShown : false,
}
export const reducer = (state = initialState,action) => {
    switch(action.type){
        case 'email_change' : return {...state,email : action.email}
        case 'username_change' : return {...state,userName : action.userName}
        case 'password_change' : return {...state,password : action.password}
        case 're_enter_password_change' : return {...state,reEnterPassword : action.pw}
        case 'loading' : return {...state,isLoading : true}
        case 'success' : return {...state,isLoading : false,isSignedUpSuccessfully : true}
        case 'fail' : return {...state,isLoading : false}
        case 'toggle_password' : return {...state,isPasswordShown : !state.isPasswordShown }
        default : return state
    }
}