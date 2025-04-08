import { addTask, editTask, deleteTask, filterTask } from './taskManage.js'
import { openFormModal, closeFormModal } from '../ui.js'

export function bindEvents() {
    // tasks
    document.querySelector('#btn_add_task').addEventListener('click', openFormModal)
    document.querySelector('#btn_create_task').addEventListener('click', addTask)
    document.querySelector('#btn_close_modal').addEventListener('click', closeFormModal)
    document.querySelector('#btn_search_task').addEventListener('click', filterTask)
}

window.editTask = editTask
window.deleteTask = deleteTask