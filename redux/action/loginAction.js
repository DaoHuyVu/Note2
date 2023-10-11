
export const actionCreators = {
    loading : () => {
        return {type : 'loading'}
    },
    userNameChange : (un) => {
        return {type : 'username_change',userName : un}
    },
    passwordChange : (pw) => {
        return {type : 'password_change',password : pw}
    },
    success : (res) => {
        return {type : 'success',token : res.data.userName}
    },
    fail : (message) => {
        return {type : 'fail',errorMessage : message}
    }
}