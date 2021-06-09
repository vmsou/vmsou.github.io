let N_CARDS = 6 * 3;
let cards = [];
let cardsNames = ["front1", "front2"]
let lastClicked = null;

class Card {
    constructor(x, front) {
        this.faceUp = false;
        this.match = false;
        this.front = front;
        this.back = "../images/cards-back/default.png";
        this.cardElement = null;
        this.buildElement();
    }
    buildElement() {
        let card = document.createElement("img");
        card.className = "card";
        card.src = this.back;
        this.eventCard(card);
        this.cardElement = card;

        return card;
    }

    showCard() {
        this.faceUp = true;
        this.cardElement.classList.add("active");
        this.cardElement.src = this.front;
    }

    hideCard() {
        this.faceUp = false;
        this.cardElement.classList.remove("active");
        this.cardElement.src = this.back;
    }

    eventCard(card) {
        card.addEventListener("click", () => {
            if (!this.faceUp && !this.match) {
                this.showCard();
                if (lastClicked instanceof Card) {
                    if (lastClicked.front === this.front) {
                        lastClicked = null;
                    } else {
                        setTimeout(() => {
                            this.hideCard();
                            lastClicked.hideCard();
                            lastClicked = null;
                        }, 500)
                    }
                } else lastClicked = this;
            }
        })
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

    randShuffle(cards);
    for (let i = 0; i < N_CARDS; i++) {
        let card = cards[i];
        container.append(card.cardElement);
    }
}



