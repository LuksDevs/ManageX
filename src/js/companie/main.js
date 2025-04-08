import { loadCompanie } from '../ui.js'
import { getCompanieList } from './companieManage.js'
import { bindEvents } from './events.js'

bindEvents()
loadCompanie(getCompanieList())



