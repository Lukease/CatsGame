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

    if (clickLimit === 0 && clickedList[0] === clickedList[1]) {
        setTimeout(()=>{
            event.target.removeEventListener('click', click)

            let points = document.querySelector('.score__value')

            scoreNumber += 1
            points.innerHTML = scoreNumber
            clickLimit = 2
            clickedList = []
            clickedIndex = []
        }, 1000)
    }

    if (clickLimit === 0 && clickedList[0] !== clickedList[1]) {
        setTimeout(() => {
            clickedIndex[0].classList.remove('hide')
            event.target.classList.remove('hide')
            clickLimit = 2
            clickedList = []
            clickedIndex = []
        }, 1000)
    }

    if (scoreNumber === 10 ){
        alert(`You win, your score: ${scoreNumber} points`)
        window.location.reload()
    }
}

const createCards = () =>{
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

let cardsArray = Array.from(new Array(20)).map(() => '')
const imagesLocation = './cats/'
let imagesArray = Array.from(new Array(10))
let clickedList = []
let clickLimit = 2
let clickedIndex = []

cardsArray.forEach((object) => {
    createCards()
})

const newCard = document.querySelectorAll('.card')

imagesArray.forEach((object, index) => {
    const image = document.createElement('img')

    image.src = `${imagesLocation}cat${index + 1}.jpg`
    image.classList.add('card__front')

    const filtered = cardsArray
        .map((field, index) => field ? null : index)
        .filter(item => item !== null)
    const randomNumber = Math.floor(Math.random() * filtered.length)
    let randomNumberValue = filtered[randomNumber]

    cardsArray[randomNumberValue] = 'cat'
    newCard[randomNumberValue].appendChild(image)

    const imageSecond = document.createElement('img')

    imageSecond.src = `${imagesLocation}cat${index + 1}.jpg`
    imageSecond.classList.add('card__front')

    const filteredSecond = cardsArray
        .map((field, index) => field ? null : index)
        .filter(item => item !== null)
    const secondRandomNumber = Math.floor(Math.random() * filteredSecond.length)

    randomNumberValue = filteredSecond[secondRandomNumber]
    cardsArray[randomNumberValue] = 'cat'
    newCard[randomNumberValue].appendChild(imageSecond)

    return image
})