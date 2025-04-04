import { getTasks, saveTasks } from './storage.js'
import { showModal } from '../modal.js'

let tasks = getTasks()

const iconError = '<i class="fa-solid fa-triangle-exclamation"></i>'
const iconSuccess = '<i class="fa-solid fa-thumbs-up"></i>'
const iconAlert = '<i class="fa-regular fa-bell"></i>'

export function addTask(event) {
    event.preventDefault()

    const title = document.querySelector('#title_task').value
    const description = document.querySelector('#description_task').value
    const priority = document.querySelector('input[name="priority"]:checked').value
    const dateCreate = document.querySelector('#date_create').value
    const dateDue = document.querySelector('#date_due').value || 'Não definido'

    if(!title || !description || !dateCreate) {
        showModal('#8C031C', iconError, 'Todos os campos obrigatórios devem ser preenchidos!')
        return
    }

    const task = {
        title,
        description,
        priority,
        create: dateCreate,
        dateDue,
        status: ''
    }

    tasks.push(task)
    saveTasks(tasks)
}   