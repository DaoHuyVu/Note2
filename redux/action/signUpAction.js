const actionCreators = {
    emailChange : (email) => ({type : 'email_change',email : email}),
    userNameChange : (userName) => ({type : 'username_change',userName : userName}),
    passwordChange : (password) => ({type : 'password_change',password : password}),
    reEnterPasswordChange : (pw) => ({type : 're_enter_password_change',pw : pw}),
    loading : () => ({type : 'loading'}),
    success : (token) => ({type : 'success',token : token}),
    fail : (message) => ({type : 'fail',message : message})
}
export default actionCreators