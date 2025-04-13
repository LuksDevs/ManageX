
import { getCompanies, saveCompanie } from './storage.js'
import { showModal } from '../modal.js'
import { loadCompanie, openFormModal, closeFormModal, clearFormFieldsCompanie, fillFormForEditCompanie, currentDate } from '../ui.js'

const companies = getCompanies()

const iconError = '<i class="fa-solid fa-triangle-exclamation"></i>'
const iconSuccess = '<i class="fa-solid fa-thumbs-up"></i>'
const iconAlert = '<i class="fa-regular fa-bell"></i>'

export function addCompanie() {
    const nameCompanie = document.querySelector('#name_companie').value
    const cnpjCompanie = document.querySelector('#cnpj_companie').value
    const addressCompanie = document.querySelector('#address_companie').value
    const telCompanie = document.querySelector('#tel_companie').value
    const emailCompanie = document.querySelector('#email_companie').value
    const setorCompanie = document.querySelector('#setor').value

    if(!nameCompanie || !cnpjCompanie || !addressCompanie || !telCompanie || !emailCompanie || !setorCompanie) {
        showModal('#8C031C', iconError, 'Todos os campos obrigatórios devem ser preenchidos!')
        return
    }
    const companie = {
        companie: nameCompanie,
        cnpj: cnpjCompanie,
        address: addressCompanie,
        telephone: telCompanie,
        email: emailCompanie,
        setor: setorCompanie,
        date: currentDate()
    }
    companies.push(companie)
    saveCompanie(companies)

    showModal('#115923', iconSuccess, 'Empresa adicionada com sucesso!')
    loadCompanie(companies)
    clearFormFieldsCompanie()
    closeFormModal()
}
export function editCompanie(index) {
    const companie = companies[index]
    fillFormForEditCompanie(companie)

    let btnEdit = document.querySelector('#btn_edit_companie')
    let btnAdd = document.querySelector('#btn_add_companie')
    openFormModal()

    let newBtn = btnEdit.cloneNode(true)
    btnEdit.replaceWith(newBtn)

    newBtn.addEventListener('click', (event) => {
        event.preventDefault()

        const nameCompanie = document.querySelector('#name_companie').value
        const cnpjCompanie = document.querySelector('#cnpj_companie').value
        const addressCompanie = document.querySelector('#address_companie').value
        const telCompanie = document.querySelector('#tel_companie').value
        const emailCompanie = document.querySelector('#email_companie').value
        const setorCompanie = document.querySelector('#setor').value

        if(!nameCompanie || !cnpjCompanie || !addressCompanie || !telCompanie || !emailCompanie || !setorCompanie) {
            showModal('#8C031C', iconError, 'Todos os campos obrigatórios devem ser preenchidos!')
            return
        }

        companie.companie = nameCompanie
        companie.cnpj = cnpjCompanie
        companie.address = addressCompanie
        companie.telephone = telCompanie
        companie.email = emailCompanie
        companie.setor = setorCompanie

        saveCompanie(companies)
        showModal('#115923', iconSuccess, 'Empresa editada com sucesso!')
        loadCompanie(companies)
        clearFormFieldsCompanie()
        closeFormModal()
    })
}

export function deleteCompanie(index) {
    companies.splice(index, 1)
    saveCompanie(companies)
    showModal('#0554F2', iconAlert, 'Empresa deletada com sucesso!')
    loadCompanie(companies)
}

export function filterCompanie() {
    const search = document.querySelector('#search_companies').value.toLowerCase()
    const filteredCompanie = companies.filter(t =>
        t.companie.toLowerCase().includes(search) ||
        t.cnpj.toLowerCase().includes(search) ||
        t.telephone.toLowerCase().includes(search) ||
        t.setor.toLowerCase().includes(search) ||
        t.email.toLowerCase().includes(search)
    )
    loadCompanie(filteredCompanie)
}

export function getCompanieList() {
    return companies
}