const app = $('.app')

const createArena = () => {
    const arenaBox = $('<div>').addClass('app__cards').appendTo(app)
    const arena = $('<div>').addClass('cards-arena').appendTo(arenaBox)

    return arena
}

let scoreNumber = 0
const createScoreBox = () => {
    const scoreBox = $('<div>').addClass('app__score').appendTo(app)
    const score = $('<div>').addClass('score').appendTo(scoreBox)
    const scoreSpan = $('<span>').addClass('score__span').appendTo(score).text(' score: ')
    const scoreValue = $('<span>').addClass('score__value').appendTo(score).text(scoreNumber)

    return scoreValue
}

const click = event => {
    if (clickLimit > 0) {
        $(event.target).addClass('hide')
        clickLimit--
        $(event.target).siblings().addClass('show')
        clickedList = clickedList.concat($(event.target).siblings().attr('src'))
        targetList = targetList.concat($(event.target))
        clickedIndex = clickedIndex.concat($(event.target))
    }

    const [firstCard, secondCard] = clickedList
    const [firstTarget, secondTarget] = targetList

    if (clickLimit === 0 && firstCard === secondCard) {
        setTimeout(() => {
            $(event.target).off('click', click)
            scoreNumber += 1

            const points = $('.score__value').text(scoreNumber)

            clickLimit = 2
            clickedList = []
            clickedIndex = []
            targetList = []

            if (scoreNumber === 10) {
                alert(`You win, your score: ${scoreNumber} points`)
                window.location.reload()
            }

        }, 1000)
    }

    if (clickLimit === 0 && firstCard !== secondCard) {
        setTimeout(() => {
            firstTarget.removeClass('hide')
            secondTarget.removeClass('hide')
            clickLimit = 2
            clickedList = []
            clickedIndex = []
            targetList = []
        }, 1000)
    }
}

const createCards = () => {
    const newCard = $('<div>').addClass('card').appendTo(arena)
    const cardBack = $('<div>').addClass('card__back').appendTo(newCard)

    cardBack.on('click',click)

    return cardBack
}

const arena = createArena()
const scoreBox = createScoreBox()
let imagesArray = Array.from(new Array(10)).map((object, index) => index)
let clickedList = []
let clickLimit = 2
let clickedIndex = []
let targetList = []
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

    $('<img>').addClass('card__front').appendTo(newCard).attr('src' ,`./cats/cat${object + 1}.jpg`)
})
