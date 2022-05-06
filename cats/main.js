const app = $('.app')

const createArena = () => {
    const arenaBox = $('<div></div>').addClass('app__cards').appendTo(app)
    const arena = $('<div></div>').addClass('cards-arena').appendTo(arenaBox)

    return arena
}

let scoreNumber = 0
const createScoreBox = () => {
    const scoreBox = $('<div></div>').addClass('app__score').appendTo(app)
    const score = $('<div></div>').addClass('score').appendTo(scoreBox)
    const scoreSpan = $('<span> score: </span>').addClass('score__span').appendTo(score)
    const scoreValue = $('<span></span>').addClass('score__value').appendTo(score).text(scoreNumber)

    return scoreValue
}

const click = event => {
    if (clickLimit > 0) {
        $(event.target).addClass('hide')
        clickLimit--
        $(event.target).siblings().addClass('show')
        clickedList = clickedList.concat($(event.target).siblings().attr('src'))
        clickedIndex = clickedIndex.concat($(event.target))
    }

    const [firstCard, secondCard] = clickedList

    if (clickLimit === 0 && firstCard === secondCard) {
        setTimeout(() => {
            $(event.target).off('click', click)
            scoreNumber += 1

            const points = $('.score__value').text(scoreNumber)

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
            clickedIndex[0].removeClass('hide')
            $(event.target).removeClass('hide')
            clickLimit = 2
            clickedList = []
            clickedIndex = []
        }, 1000)
    }
}

const createCards = () => {
    const newCard = $('<div></div>').addClass('card').appendTo(arena)
    const cardBack = $('<div></div>').addClass('card__back').appendTo(newCard)

    cardBack.on('click',click)

    return cardBack
}

const arena = createArena()
const scoreBox = createScoreBox()
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

    const newCard = $('.card').eq(index)
    const image = $('<img>').addClass('card__front').appendTo(newCard).attr('src' ,`./cats/cat${object + 1}.jpg`)
})
