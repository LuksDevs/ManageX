
import { saveTasks } from './storage.js'

export function loadTasks(taskList) {
    const tableList = document.querySelector('#tableList_tasks')
    tableList.innerHTML = ''

    taskList.forEach((task, index) => {
        let id = index <= 9 ? `0${index}` : index

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

export function openFormModal() {
    document.querySelector('.modal-section').style.display = 'flex'
}

export function closeFormModal() {
    document.querySelector('.modal-section').style.display = 'none'
}

export function clearFormFields() {
    document.querySelector('#title_task').value = ''
    document.querySelector('#description_task').value = ''
    document.querySelector('#date_create').value = ''
    document.querySelector('#date_due').value = ''
}

export function fillFormForEdit(task) {
    document.querySelector('#title_task').value = task.title
    document.querySelector('#description_task').value = task.description
    document.querySelector('#date_create').value = task.create
    document.querySelector('#date_due').value = task.validity === 'Não definido' ? '' : task.validity

    document.querySelectorAll('input[name="priority"]').forEach((p) => {
        p.checked = p.value === task.priority
    })
}