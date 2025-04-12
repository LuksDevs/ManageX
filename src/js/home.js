const carousel = document.querySelector('.carousel')
const items = document.querySelectorAll('.carousel-item')
const prevBtn = document.querySelector('.carousel-btn.prev')
const nextBtn = document.querySelector('.carousel-btn.next')
let index = 0

function updateCarousel() {
    const width = items[0].clientWidth
    carousel.style.transform = `translateX(-${index * width}px)`
}

nextBtn.addEventListener('click', () => {
    index = (index + 1) % items.length
    updateCarousel()
})

prevBtn.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length
    updateCarousel()
})

window.addEventListener('resize', updateCarousel)