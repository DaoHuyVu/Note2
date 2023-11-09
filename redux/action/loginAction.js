
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
    success : () => {
        return {type : 'success'}
    },
    fail : () => {
        return {type : 'fail'}
    }
}