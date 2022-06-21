let deckId;
let computerScore = 0;
let myScore = 0;

const deck = document.getElementById('new')
const draw = document.getElementById('draw')
const test = document.getElementById('test')
const cardSection = document.getElementById("cards")
const header = document.getElementById("header")
const computerBoard = document.getElementById('comp-Score')
const myBoard = document.getElementById('myScore')
const remaining = document.getElementById("remaining")

function handleClick(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            remaining.textContent = `Remaining Card: ${data.remaining}`
        })
}
deck.addEventListener('click',handleClick)

draw.addEventListener('click', ()=>{
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remaining.textContent = `Remaining Card: ${data.remaining}`
            cardSection.children[0].innerHTML = `
            <img src=${data.cards[0].image} class='cards'>
            `
            cardSection.children[1].innerHTML = `
            <img src=${data.cards[1].image} class='cards'>
            `
            const winnerText = determineWinner(data.cards[0],data.cards[1])
            header.textContent = winnerText
            
            if(data.remaining === 0){
                draw.disabled = true

                if(computerScore > myScore){
                    header.textContent = 'computer won the game'
                } else if(computerScore < myScore){
                    header.textContent = 'you won the game'
                } else {
                    header.textContent = 'Tie'
                }
            }
            
        })

    
})


function determineWinner(card1,card2){
    const valueOption = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const card1Value = valueOption.indexOf(card1.value)
    const card2Value = valueOption.indexOf(card2.value)

    if(card1Value > card2Value){
        computerScore++
        computerBoard.textContent = `Computer Score: ${computerScore}`
        return 'Computer Won'
    } else if (card1Value < card2Value) {
        myScore++
        myBoard.textContent = `My Score: ${myScore}`
        return 'You Won'
    } else {
        return 'war'
    }
}





