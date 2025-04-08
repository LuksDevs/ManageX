import { bindEvents } from './event.js'
import { getUserList } from './userManage.js'
import { loadUsers } from '../ui.js'

bindEvents()
loadUsers(getUserList())