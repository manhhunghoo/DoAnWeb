
const removeUserInLocalStorage = () => {
    console.log('removeUserInLocalStorage')
    const a= localStorage.removeItem("userUITcourse")
}

const getUserInLocalStorage = () => {
    const userString = localStorage.getItem("userUITcourse")
    if (userString) return JSON.parse(userString)
    return null
}

const saveUserToLocalStorage = (user) => {
    localStorage.setItem("userUITcourse", JSON.stringify(user));
}

export {
removeUserInLocalStorage,
getUserInLocalStorage,
saveUserToLocalStorage,
}