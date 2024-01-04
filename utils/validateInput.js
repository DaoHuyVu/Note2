
export const validateEmail = (email) => {
    if(email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/))
    return true
    return false
}
export const validateUserName = (userName) => {
    if(userName.match(/^[\p{L}0-9\s]{8,}$/u))
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
