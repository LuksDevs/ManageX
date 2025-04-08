import { getUsers, saveUser } from './storage.js'
import { showModal } from '../modal.js'
import { closeFormModal, loadUsers, clearFormFieldsUser, fillFormForEditUser, openFormModal } from '../ui.js'

const users = getUsers()

const iconError = '<i class="fa-solid fa-triangle-exclamation"></i>'
const iconSuccess = '<i class="fa-solid fa-thumbs-up"></i>'
const iconAlert = '<i class="fa-regular fa-bell"></i>'

export function addUser(event) {
    event.preventDefault()

    let d = new Date()

    const nameUser = document.querySelector('#name_user').value
    const emailUser = document.querySelector('#email_user').value
    const telUser = document.querySelector('#tel_user').value
    const positionUser = document.querySelector('#position_user').value

    const date = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()

    if(!nameUser || !emailUser || !telUser || !positionUser) {
        showModal('#8C031C', iconError, 'Todos os campos obrigatórios devem ser preenchidos!')
        return
    }
    
    const user = {
        name: nameUser,
        email: emailUser,
        telephone: telUser,
        position: positionUser,
        status: 'ativo',
        date: `${date}/${month}/${year}`
    }

    users.push(user)
    saveUser(users)

    showModal('#115923', iconSuccess, 'Usuário adicionado com sucesso!')
    loadUsers(users)
    closeFormModal()
}

export function editUser(index) {
    const user = users[index]
    fillFormForEditUser(user)
    let btnEdit = document.querySelector('#btn_edit_user')
    let btnAdd = document.querySelector('#btn_add_user')

    btnEdit.style.display = 'block'
    btnAdd.style.display = 'none'
    openFormModal()

    const newBtn = btnEdit.cloneNode(true)
    btnEdit.replaceWith(newBtn)

    newBtn.addEventListener('click', (event) => {
        event.preventDefault()

        const nameUser = document.querySelector('#name_user').value
        const emailUser = document.querySelector('#email_user').value
        const telUser = document.querySelector('#tel_user').value
        const positionUser = document.querySelector('#position_user').value

        if(!nameUser || !emailUser || !telUser || !positionUser) {
            showModal('#8C031C', iconError, 'Todos os campos obrigatórios devem ser preenchidos!')
            return
        }

        user.name = nameUser
        user.email = emailUser
        user.telephone = telUser
        user.position = positionUser

        saveUser(users)
        showModal('#115923', iconSuccess, 'Usuário editado com sucesso!')
        loadUsers(users)
        clearFormFieldsUser()
        closeFormModal()
    })
}

export function deleteUser(index) {
    users.splice(index, 1)
    saveUser(users)
    showModal('#0554F2', iconAlert, 'Usuário deletado com sucesso!')
    loadUsers(users)
}

export function filterUser() {
    const search = document.querySelector('#search_user').value.toLowerCase()
    const filteredUser = users.filter(t =>
        t.name.toLowerCase().includes(search) ||
        t.email.toLowerCase().includes(search) ||
        t.position.toLowerCase().includes(search) ||
        t.status.toLowerCase().includes(search)
    )
    loadUsers(filteredUser)
}

export function getUserList() {
    return users
}
