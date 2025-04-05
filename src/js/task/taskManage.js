import { getTasks, saveTasks } from './storage.js'
import { showModal } from '../modal.js'
import { openFormModal, closeFormModal, clearFormFields, loadTasks, fillFormForEdit } from './ui.js'

let tasks = getTasks()

const iconError = '<i class="fa-solid fa-triangle-exclamation"></i>'
const iconSuccess = '<i class="fa-solid fa-thumbs-up"></i>'
const iconAlert = '<i class="fa-regular fa-bell"></i>'

export function addTask(event) {
    event.preventDefault()

    const title = document.querySelector('#title_task').value
    const description = document.querySelector('#description_task').value
    const priority = document.querySelector('input[name="priority"]:checked')?.value
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
        validity: dateDue,
        status: 'pendente'
    }

    tasks.push(task)
    saveTasks(tasks)

    showModal('#115923', iconSuccess, 'Tarefa criada com sucesso!')
    loadTasks(tasks)
    clearFormFields()
    closeFormModal()
}

export function editTask(index) {
    const task = tasks[index]
    fillFormForEdit(task)

    const btnEdit = document.querySelector('#btn_edit_task')
    const btnCreate = document.querySelector('#btn_create_task')

    btnEdit.style.display = 'block'
    btnCreate.style.display = 'none'
    openFormModal()

    const newBtn = btnEdit.cloneNode(true)
    btnEdit.replaceWith(newBtn)

    newBtn.addEventListener('click', (event) => {
        event.preventDefault()

        const priority = document.querySelector('input[name="priority"]:checked')?.value
        if (!priority) {
            showModal('#8C031C', iconError, 'Selecione uma prioridade!')
            return
        }

        task.title = document.querySelector('#title_task').value
        task.description = document.querySelector('#description_task').value
        task.priority = priority
        task.create = document.querySelector('#date_create').value
        task.validity = document.querySelector('#date_due').value || 'Não definido'

        saveTasks(tasks)
        showModal('#115923', iconSuccess, 'Tarefa editada com sucesso!')
        loadTasks(tasks)
        clearFormFields()
        closeFormModal()

        newBtn.style.display = 'none'
        btnCreate.style.display = 'block'
    })
}

export function deleteTask(index) {
    tasks.splice(index, 1)
    saveTasks(tasks)
    showModal('#0554F2', iconAlert, 'Tarefa deletada com sucesso!')
    loadTasks(tasks)
}

export function filterTask() {
    const search = document.querySelector('#search_task').value.toLowerCase()
    const filteredTasks = tasks.filter(t =>
        t.title.toLowerCase().includes(search) ||
        t.description.toLowerCase().includes(search) ||
        t.priority.toLowerCase().includes(search) ||
        t.status.toLowerCase().includes(search)
    )
    loadTasks(filteredTasks)
}

export function getTaskList() {
    return tasks
}