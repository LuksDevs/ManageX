import { openFormModal, closeFormModal } from '../ui.js'
import { addUser, editUser, deleteUser, filterUser } from './userManage.js'

export function bindEvents() {
    document.querySelector('#btn_open_modal').addEventListener('click', openFormModal)
    document.querySelector('#btn_close_modal').addEventListener('click', closeFormModal)
    document.querySelector('#btn_add_user').addEventListener('click', addUser)
    document.querySelector('#btn_search_user').addEventListener('click', filterUser)
}

window.editUser = editUser
window.deleteUser = deleteUser