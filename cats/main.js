const app = document.querySelector('.app')

const createArena = () => {
    const arenaBox = document.createElement('div')

    arenaBox.classList.add('app__cards')
    app.appendChild(arenaBox)

    const arena = document.createElement('div')

    arena.classList.add('cards-arena')
    arenaBox.appendChild(arena)

    return arena
}

let scoreNumber = 0
const createScoreBox = () => {
    const scoreBox = document.createElement('div')

    scoreBox.classList.add('app__score')
    app.appendChild(scoreBox)

    const score = document.createElement('div')

    score.classList.add('score')
    scoreBox.appendChild(score)

    const scoreSpan = document.createElement('span')

    scoreSpan.classList.add('score__span')
    score.appendChild(scoreSpan)
    scoreSpan.innerHTML = 'score: '

    const scoreValue = document.createElement('span')

    scoreValue.classList.add('score__value')
    score.appendChild(scoreValue)
    scoreValue.innerHTML = scoreNumber

    return scoreValue
}

const click = event => {
    if (clickLimit > 0) {
        event.target.classList.add('hide')
        clickLimit--
        event.target.nextElementSibling.classList.add('show')
        clickedList = clickedList.concat(event.target.nextElementSibling.src)
        clickedIndex = clickedIndex.concat(event.target)
    }

    const [firstCard, secondCard] = clickedList

    if (clickLimit === 0 && firstCard === secondCard) {
        setTimeout(() => {
            event.target.removeEventListener('click', click)

            const points = document.querySelector('.score__value')

            scoreNumber += 1
            points.innerHTML = scoreNumber
            clickLimit = 2
            clickedList = []
            clickedIndex = []

            if (scoreNumber === 10) {
                alert(`You win, your score: ${scoreNumber} points`)
                window.location.reload()
            }

        }, 1000)
    }

    if (clickLimit === 0 && firstCard !== secondCard) {
        setTimeout(() => {
            clickedIndex[0].classList.remove('hide')
            event.target.classList.remove('hide')
            clickLimit = 2
            clickedList = []
            clickedIndex = []
        }, 1000)
    }
}

const createCards = () => {
    const newCard = document.createElement('div')

    newCard.classList.add('card')
    arena.appendChild(newCard)

    const cardBack = document.createElement('div')

    cardBack.classList.add('card__back')
    newCard.appendChild(cardBack)

    cardBack.addEventListener('click', click)

    return cardBack
}

const arena = createArena()
const scoreBox = createScoreBox()
const imagesLocation = './cats/'
let imagesArray = Array.from(new Array(10)).map((object, index) => index)
let clickedList = []
let clickLimit = 2
let clickedIndex = []
let sortedArrayOfImages = []

const addHiddenImages = () => {
    sortedArrayOfImages = imagesArray.concat(imagesArray)
    sortedArrayOfImages.sort((a, b) => 0.5 - Math.random())

    return sortedArrayOfImages
}

addHiddenImages()

sortedArrayOfImages.forEach((object, index) => {
    createCards()

    const newCard = document.querySelectorAll('.card')
    const image = document.createElement('img')

    image.src = `${imagesLocation}cat${object + 1}.jpg`
    image.classList.add('card__front')
    newCard[index].appendChild(image)
})
