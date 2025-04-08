const COMPANIE_KEY = 'companies'

export function getCompanies() {
    return JSON.parse(localStorage.getItem(COMPANIE_KEY)) || []
}

export function saveCompanie(companie) {
    localStorage.setItem(COMPANIE_KEY, JSON.stringify(companie))
}