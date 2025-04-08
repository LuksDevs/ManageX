import { loadUsers } from '../ui.js'
import { getUserList } from './userManage.js'
import { bindEvents } from './events.js'

bindEvents()
loadUsers(getUserList())