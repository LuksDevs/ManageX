const carousel = document.querySelector('.carousel')
const items = document.querySelectorAll('.carousel-item')
const prevBtn = document.querySelector('.carousel-btn.prev')
const nextBtn = document.querySelector('.carousel-btn.next')
const indicators = document.querySelectorAll('.indicator')

let index = 0

function updateCarousel() {
    const itemWidth = items[0].clientWidth
    carousel.style.transform = `translateX(-${index * itemWidth}px)`

    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === index)
    })
}

nextBtn.addEventListener('click', () => {
    index = (index + 1) % items.length
    updateCarousel()
})

prevBtn.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length
    updateCarousel()
})

indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
        index = i
        updateCarousel()
    })
})
