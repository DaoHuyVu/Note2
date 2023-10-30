
export const validateEmail = (email) => {
    const regex = /^[\w\\-\\.]+@([\w\\-]+\\.)+[\w\\-]{2,4}$/i
    if(email.match(regex))
    return true
    return false
}
export const validateUserName = (userName) => {
    if(userName.match("^[a-zA-Z0-9]{8,25}$"))
    return true
    return false
}
export const validatePassword = (password) => {
    if(password.match("^[a-z]{8,25}$"))
    return true
    return false
}
export const AllFieldValid = (em,un,pw,rpw) => {
    return validateEmail(em) && validatePassword(pw) && validateUserName(un) && pw === rpw
}
