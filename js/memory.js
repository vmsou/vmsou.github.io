let N_CARDS = 6 * 3;
let cards = [];
let cardsNames = ["front1", "front2"]
let currentClicked = null;
let lastClicked = null;

class Card {
    constructor(x, front) {
        this.found = false;
        this.front = front;
        this.back = "../images/cards-back/default.png";
        this.cardElement = null;
        this.buildElement();
    }
    buildElement() {
        let card = document.createElement("img");
        card.className = "card";
        card.src = this.back;
        card.addEventListener("click", e => {
            card.classList.add("active");
            card.src = this.front;
            lastClicked = currentClicked;
            currentClicked = this;


            if (currentClicked !== null && lastClicked !== null && currentClicked !== lastClicked) {
                if (currentClicked.front === lastClicked.front) {
                    currentClicked.found = true;
                    lastClicked.found = true;
                    currentClicked = null;
                    lastClicked = null;
                } else {
                    setTimeout(function() {
                        currentClicked.cardElement.classList.remove("active");
                        lastClicked.cardElement.classList.remove("active");
                        currentClicked.cardElement.src = currentClicked.back;
                        lastClicked.cardElement.src = lastClicked.back;
                        currentClicked = null;
                        lastClicked = null;
                    }, 500)
                }
            }

        })

        this.cardElement = card;

        return card;
    }

}

function randChoice(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function randShuffle(sampleList) {
    sampleList.sort(() => Math.random() -0.5);
}

function start() {
    let container = document.getElementById("cards-container");
    container.innerHTML = "";
    cards = [];
    for (let i = 0; i < N_CARDS / 2; i++) {
        let card_name = randChoice(cardsNames);
        let card1 = new Card(i, "../images/cards-front/" + card_name + ".png");
        let card2 = new Card(i, "../images/cards-front/" + card_name + ".png");
        cards.push(card1);
        cards.push(card2);
    }

    // shuffle cards
    randShuffle(cards);
    for (let i = 0; i < N_CARDS; i++) {
        let card = cards[i];
        container.append(card.cardElement);
    }
}



