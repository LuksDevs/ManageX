
import { loadTasks } from './ui.js'
import { getTaskList } from './taskManage.js'
import { bindEvents } from './events.js'

bindEvents()
loadTasks(getTaskList())
