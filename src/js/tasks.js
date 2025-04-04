import { showModal } from './modal.js';

// Config icons Modal
let iconError = '<i class="fa-solid fa-triangle-exclamation"></i>'
let iconSuccess = '<i class="fa-solid fa-thumbs-up"></i>'
let iconAlert = '<i class="fa-regular fa-bell"></i>'

const taskBD = JSON.parse(localStorage.getItem('task')) || []

function addTask(event) {
    event.preventDefault()
    let title = document.querySelector('#title_task').value
    let description = document.querySelector('#description_task').value
    let priority = document.querySelector('input[name="priority"]:checked').value
    let dateCreate = document.querySelector('#date_create').value
    let elementDateDue = document.querySelector('#date_due')
    if(title === '' || description === '' || dateCreate === '') {
        showModal('#8C031C', iconError, 'Todos os campos obrigatórios devem ser preenchidos!')
        return
    }
    
    let dateDue = elementDateDue ? elementDateDue.value : ''
    if(!dateDue) {
        dateDue = 'Não definido'
    }
    
    const task = {
        title: title,
        description: description,
        priority: priority,
        create: dateCreate,
        validity: dateDue,
        status: ''
    }
    taskBD.push(task)
    localStorage.setItem('task', JSON.stringify(taskBD))

    showModal('#115923', iconSuccess, 'Tafefa criada com sucesso!')
    updateTasks()
    document.querySelector('.modal-section').style.display = 'none'
}

function updateTasks() {
    let listTask = document.querySelector('#list_task')
    
    listTask.innerHTML = ''
    taskBD.forEach((task, index) => {
        let orderID = index <= 9 ? `0${index}` : index
        
        listTask.innerHTML += `
            <tr>
                <td>${orderID}</td>
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.priority}</td>
                <td>
                    <select class="select-style" id="status_task_${index}">
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
        
        document.querySelector('#title_task').value = ''
        document.querySelector('#description_task').value = ''
        document.querySelector('#date_create').value = ''
        document.querySelector('#date_due').value = ''
    })

    taskBD.forEach((task, index) => {
        let select = document.getElementById(`status_task_${index}`)
        select.value === 'pendente' ? select.style.backgroundColor = '#E6C809' : select.style.backgroundColor = '#47B300'
        select.addEventListener("change", (event) => {
            taskBD[index].status = event.target.value
            localStorage.setItem('task', JSON.stringify(taskBD))
            window.location.reload()
        }); 
    })
}

function editTask(i) {
    let title = document.querySelector('#title_task')
    let description = document.querySelector('#description_task')
    let dateCreate = document.querySelector('#date_create')
    let elementDateDue = document.querySelector('#date_due')
    let btnEditTask = document.querySelector('#btn_edit_task')

    btnEditTask.style.display = 'block'
    document.querySelector('.modal-section').style.display = 'flex'
    document.querySelector('#btn_create_task').style.display = 'none'

    let task = taskBD[i]

    title.value = task.title
    description.value = task.description
    dateCreate.value = task.create
    elementDateDue.value = task.validity === 'Não definido' ? '' : task.validity

    document.querySelectorAll('input[name="priority"]').forEach(radio => {
        radio.checked = radio.value === task.priority
    })

    let newBtn = btnEditTask.cloneNode(true)
    btnEditTask.replaceWith(newBtn)
    btnEditTask = newBtn

    btnEditTask.addEventListener('click', (event) => {
        event.preventDefault()

        let priority = document.querySelector('input[name="priority"]:checked')
        if (!priority) {
            showModal('#8C031C', iconError, 'Selecione uma prioridade!')
            return
        }

        task.title = title.value
        task.description = description.value
        task.priority = priority.value
        task.create = dateCreate.value
        task.validity = elementDateDue.value === '' ? 'Não definido' : elementDateDue.value

        localStorage.setItem('task', JSON.stringify(taskBD))

        showModal('#115923', iconSuccess, 'Tarefa Editada com sucesso!')
        updateTasks()

        btnEditTask.style.display = 'none'
        document.querySelector('.modal-section').style.display = 'none'
        document.querySelector('#btn_create_task').style.display = 'block'

        title.value = ''
        description.value = ''
        dateCreate.value = ''
        elementDateDue.value = ''
    });
}

function deleteTask(index) {
    taskBD.splice(index, 1)
    localStorage.setItem('task', JSON.stringify(taskBD))
    showModal('#0554F2', iconAlert, `Tarefa deletada com sucesso!`)
    updateTasks()
}

function filterTask() {
    let search = document.querySelector('#search_task').value.toLowerCase();

    let filteredTasks = taskBD.filter((task) =>
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search) ||
        task.priority.toLowerCase().includes(search)
    );
    updateFilter(filteredTasks);
}

function updateFilter(filteredList = taskBD) {
    let listTask = document.querySelector('#list_task');
    listTask.innerHTML = '';

    filteredList.forEach((task, index) => {
        let orderID = index <= 9 ? `0${index}` : index;

        listTask.innerHTML += `
            <tr>
                <td>${orderID}</td>
                <td>${task.title}</td>
                <td>${task.description}</td>
                <td>${task.priority}</td>
                <td>
                    <select class="select-style" id="status_task">
                        <option value="pendente">Pendente</option>
                        <option value="concluido">Concluído</option>
                    </select>
                </td>
                <td>${task.create}</td>
                <td>${task.validity}</td>
                <td class="box-btn-table">
                    <button class="btn-edit" onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn-delete" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

document.querySelector('#btn_search').addEventListener('click', filterTask)

window.editTask = editTask
window.deleteTask = deleteTask

document.querySelector('#btn_create_task').addEventListener('click', addTask)
document.querySelector('#btn_add_task').addEventListener('click', () => {
    document.querySelector('.modal-section').style.display = 'flex'
})
document.querySelector('#btn_close_modal').addEventListener('click', () => {
    document.querySelector('.modal-section').style.display = 'none'
})

updateTasks()