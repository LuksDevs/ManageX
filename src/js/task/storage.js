
const TASK_KEY = 'task'

export function getTasks() {
    return JSON.parse(localStorage.getItem(TASK_KEY))
}

export function saveTasks(tasks){
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks))   
}