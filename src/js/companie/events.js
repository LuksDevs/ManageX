
import { openFormModal, closeFormModal, clearFormFieldsCompanie } from '../ui.js'
import { addCompanie, editCompanie, deleteCompanie, filterCompanie } from '../companie/companieManage.js'

export function bindEvents() {
    document.querySelector('#btn_open_companie').addEventListener('click', openFormModal)
    document.querySelector('#btn_close_modal').addEventListener('click', () =>{
        closeFormModal()
        clearFormFieldsCompanie()
    })
    document.querySelector('#btn_add_companie').addEventListener('click', addCompanie)
    document.querySelector('#btn_search_companies').addEventListener('click', filterCompanie)
}

window.editCompanie = editCompanie
window.deleteCompanie = deleteCompanie

