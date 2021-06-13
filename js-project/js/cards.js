let N_CARDS = 6 * 3;
let cards = [];
let cardFolder = "yugioh"
let yugiohNames = ["front1", "front2", "front3", "carta1", "carta2", "carta3", "carta4",
    "17573739", "35877582", "56804361", "58066722", "65172015", "65301952", "67748760", "9464441", "98787535",
    "10000000", "10000010", "10000020", "23995346", "33396948", "40908371", "55144522", "64631466", "70781052", "98502113", "99267150"];
let pokemonNames = ["dark_charizard"]
let cardNames = [];
let lastClicked = null;

let cursor_enabled = false;
let nTries = 0;
let nMatches = 0;


class Card {
    constructor(x, front) {
        this.faceUp = false;
        this.match = false;
        this.front = front;
        this.back = "../images/" + cardFolder + "/cards-back/default.png";
        this.cardElement = null;
        this.buildElement();
    }
    buildElement() {
        let flip = document.createElement("div");
        flip.className = "flip-card";

        let inner = document.createElement("div");
        inner.className = "flip-card-inner";
        flip.append(inner);

        let front = document.createElement("div");
        front.className = "flip-card-front";

        if (Math.random() < 0.1) {
            front.classList.add("holo");
        }
        inner.append(front);

        let back = document.createElement("div");
        back.className = "flip-card-back";
        inner.append(back);

        let img_front = document.createElement("img");
        img_front.src = this.front;
        img_front.className = 'card-img';
        front.append(img_front);

        let img_back = document.createElement("img");
        img_back.src = this.back;
        img_back.className = 'card-img';
        back.append(img_back);

        this.eventCard(flip);
        this.cardElement = flip;
    }

    showCard() {
        this.faceUp = true;
        this.cardElement.classList.add("active");
    }

    hideCard() {
        this.faceUp = false;
        this.cardElement.classList.remove("active");
    }

    eventCard(card) {
        card.addEventListener("click", () => {
            if (cursor_enabled) {
                if (!this.faceUp && !this.match) {
                    ++nTries;
                    this.showCard();
                    if (lastClicked instanceof Card) {
                        if (lastClicked.front === this.front) {
                            ++nMatches;
                            lastClicked = null;

                            if (nMatches >= N_CARDS / 2) {
                                setTimeout(() => {
                                    alert(`Todas combinações encontradas em ${nTries} Tentativas.`)
                                }, 1000)
                            }
                        } else {
                            setTimeout(() => {
                                this.hideCard();
                                lastClicked.hideCard();
                                lastClicked = null;
                            }, 500)
                        }
                    } else lastClicked = this;
                }
            }
        })
    }
}

function buttonToggle(e) {
    let container = document.getElementsByClassName("btn");
    for (let i = 0; i < container.length; i++) {
        let b = container[i];
        b.classList.remove("active");

    }
    e.classList.add("active");
    cardFolder = e.id;
}


function randChoice(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function randShuffle(sampleList) {
    sampleList.sort(() => Math.random() -0.5);
}

function preload(imgName) {
    if (document.images && !loadedNames.includes(imgName)) {
        let img = new Image();
        img.src = imgName
        loadedNames.push(imgName);
    }
}

function start() {
    switch (cardFolder) {
        case "yugioh":
            cardNames = yugiohNames;
            break;
        case "pokemon":
            cardNames = pokemonNames;
            break;
        default:
            cardNames = yugiohNames;
    }

    cursor_enabled = false;
    preload("../images/" + cardFolder + "/cards-back/default.png");
    nTries = 0;
    nMatches = 0;
    lastClicked = null;
    let container = document.getElementById("cards-container");
    container.innerHTML = "";
    cards = [];
    for (let i = 0; i < N_CARDS / 2; i++) {
        let card_name = randChoice(cardNames);
        let card_link = "../images/" + cardFolder + "/cards-front/" + card_name + ".png"
        preload(card_link)
        let card1 = new Card(i, card_link);
        let card2 = new Card(i, card_link);
        cards.push(card1);
        cards.push(card2);
    }

    randShuffle(cards);
    for (let i = 0; i < N_CARDS; i++) {
        let card = cards[i];
        container.append(card.cardElement);
    }

    setTimeout(() => {
        for (let i = 0; i < N_CARDS; i++) {
            let card = cards[i];
            card.showCard();
            setTimeout(() => {
                card.hideCard();
            }, 2300);
        }
    }, 1500);

    setTimeout(() => {
        cursor_enabled = true;
    }, 2500);
}
