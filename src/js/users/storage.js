
const USER_KEY = 'users'

export function getUsers() {
    return JSON.parse(localStorage.getItem(USER_KEY)) || []
}

export function saveUser(users) {
    localStorage.setItem(USER_KEY, JSON.stringify(users))
}