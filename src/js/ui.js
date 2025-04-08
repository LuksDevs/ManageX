import { saveTasks } from './task/storage.js'
import { saveUser } from './users/storage.js'


// Tasks
export function loadTasks(taskList) {
    let tableList = document.querySelector('#tableList_tasks')
    tableList.innerHTML = ''

    taskList.forEach((task, index) => {
        let id = String(index + 1).padStart(2, '0')

        tableList.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.priority}</td>
                <td>
                    <select class="select-status">
                        <option value="pendente" ${task.status === 'pendente' ? 'selected' : ''}>Pendente</option>
                        <option value="concluido" ${task.status === 'concluido' ? 'selected' : ''}>Concluído</option>
                    </select>
                </td>
                <td>${task.create}</td>
                <td>${task.validity}</td>
                <td class="box-btn-table">
                    <button class="btn-edit" onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn-delete" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `
    })

    document.querySelectorAll('.select-status').forEach((select, index) => {
        select.style.backgroundColor = taskList[index].status === 'pendente' ? '#E6C809' : '#47B300'
        select.addEventListener('change', (event) => {
            taskList[index].status = event.target.value
            saveTasks(taskList)
            select.style.backgroundColor = event.target.value === 'pendente' ? '#E6C809' : '#47B300'
        })
    })
}

export function clearFormFieldsTask() {
    document.querySelector('#title_task').value = ''
    document.querySelector('#description_task').value = ''
    document.querySelector('#date_create').value = ''
    document.querySelector('#date_due').value = ''
}

export function fillFormForEditTask(task) {
    document.querySelector('#title_task').value = task.title
    document.querySelector('#description_task').value = task.description
    document.querySelector('#date_create').value = task.create
    document.querySelector('#date_due').value = task.validity === 'Não definido' ? '' : task.validity

    document.querySelectorAll('input[name="priority"]').forEach((p) => {
        p.checked = p.value === task.priority
    })
}

// users
export function loadUsers(usersList) {
    let tableList = document.querySelector('#tableList_users')
    tableList.innerHTML = ''

    usersList.forEach((user, index) => {
        let id = String(index + 1).padStart(2, '0')

        tableList.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.telephone}</td>
                <td>${user.position}</td>
                <td>
                    <select class="select-status">
                        <option value="ativo" ${user.status === 'ativo' ? 'selected' : ''}>Ativo</option>
                        <option value="inativo" ${user.status === 'inativo' ? 'selected' : ''}>Inativo</option>
                    </select>
                </td>
                <td>${user.date}</td>
                <td class="box-btn-table">
                    <button class="btn-edit" onclick="editUser(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn-delete" onclick="deleteUser(${index})"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        ` 
    })
    document.querySelectorAll('.select-status').forEach((select, index) => {
        select.style.backgroundColor = usersList[index].status === 'ativo' ? '#47B300' : '#2961F0'
        select.style.color = '#fff'
        select.addEventListener('change', (event) => {
            usersList[index].status = event.target.value
            saveUser(usersList)
            select.style.backgroundColor = usersList[index].status === 'ativo' ? '#47B300' : '#2961F0'
        })
    })
}
export function fillFormForEditUser(user) {
    document.querySelector('#name_user').value = user.name
    document.querySelector('#email_user').value = user.email
    document.querySelector('#tel_user').value = user.telephone
    document.querySelector('#position_user').value = user.position
}

export function clearFormFieldsUser() {
    document.querySelector('#name_user').value = ''
    document.querySelector('#email_user').value = ''
    document.querySelector('#tel_user').value = ''
    document.querySelector('#position_user').value = ''
}
// Open/Close Form Modal
export function openFormModal() {
    document.querySelector('.modal-section').style.display = 'block'
}
export function closeFormModal() {
    document.querySelector('.modal-section').style.display = 'none'
}