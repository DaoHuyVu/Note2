
export const validateEmail = (email) => {
    if(email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/))
    return true
    return false
}
export const validateUserName = (userName) => {
    if(userName.match("^[a-zA-Z0-9]{8,25}$"))
    return true
    return false
}
export const validatePassword = (password) => {
    if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    return true
    return false
}
export const AllFieldValid = (em,un,pw,rpw) => {
    return validateEmail(em) && validatePassword(pw) && validateUserName(un) && pw === rpw
}
