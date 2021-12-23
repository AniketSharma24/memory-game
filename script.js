// 'use strict'
const cards = document.querySelectorAll('.memory-cards');

let isFlipped = false;
let boardLocked = false;
let firstCard, secondCard;
function flipCard() {
    if (boardLocked) return;
    if (this === firstCard) return;
    this.classList.add('flip')
    if (!isFlipped) {
        firstCard = this;
        isFlipped = true;
        return;
    }
    secondCard = this;
    checkForMatch();

}
function checkForMatch() {
    let isMatch = firstCard.dataset.frameworks === secondCard.dataset.frameworks
    isMatch ? disableCards() : unFlipCards();
}
function unFlipCards() {
    boardLocked = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard()
    }, 1500)

}
function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard()
}
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    [isFlipped, boardLocked] = [false, false]
}
cards.forEach(card => {
    card.addEventListener('click', flipCard)
});

(() => {
    cards.forEach(card => {
        let order = Math.floor(Math.random() * 12);
        card.style.order = order;
    })
})()