import { loadUsers } from '../ui.js'
import { getUserList } from './userManage.js'
import { bindEvents } from './event.js'

bindEvents()
loadUsers(getUserList())