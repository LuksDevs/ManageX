
export function showModal(rgb, icon, text) {

    let displayModal = document.getElementById('showmodal')
    if(displayModal) {
      displayModal.remove()
    }

    let modal = document.createElement('div')
        modal.innerHTML = `${icon} ${text}`
        modal.style.backgroundColor = rgb
        modal.style.color = '#fff'
        modal.style.padding = '10px'
        modal.style.fontSize = '16px'
        modal.style.borderRadius = '5px'
        modal.style.position = 'absolute'
        modal.style.top = '-30%'
        modal.style.opacity = '0'
        modal.style.left = '50%'
        modal.style.transform = 'translateX(-50%)'
        modal.style.transition = 'top .6s ease-in-out, opacity .6s ease-in-out'
        modal.style.zIndex = '1000'
        modal.id = 'showmodal'
        
    document.body.appendChild(modal)

    setTimeout(() => {
        modal.style.top = '10%'
        modal.style.opacity = '1'
    }, 10)

    setTimeout(()=> {
        modal.style.top = '-30%'
        modal.style.opacity = '0'
        setTimeout(()=> {
            if(document.body.contains(modal)){
                document.body.removeChild(modal)
            }
        }, 1000)
    }, 2000)
}