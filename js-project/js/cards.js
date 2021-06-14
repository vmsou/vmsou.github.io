let N_CARDS = 6 * 3;
let cards = [];
let cardFolder = "yugioh"
let yugiohNames = ["front1", "front2", "front3", "carta1", "carta2", "carta3", "carta4",
    "17573739", "35877582", "56804361", "58066722", "65172015", "65301952", "67748760", "9464441", "98787535",
    "10000000", "10000010", "10000020", "23995346", "33396948", "40908371", "55144522", "64631466", "70781052", "98502113", "99267150"];

let pokemonNames = ["dark_charizard", "BWP_EN_BW03", "BWP_EN_BW04", "BWP_EN_BW05", "BWP_EN_BW07", "BWP_EN_BW09",
    "BWP_EN_BW10", "BWP_EN_BW12", "BWP_EN_BW20", "BWP_EN_BW33", "BWP_EN_BW34", "BWP_EN_BW35", "BWP_EN_BW37",
    "BWP_EN_BW41", "BWP_EN_BW45", "BWP_EN_BW47", "BWP_EN_BW54", "BWP_EN_BW57", "BWP_EN_BW61", "BWP_EN_BW62",
    "BWP_EN_BW63", "BWP_EN_BW66", "BWP_EN_BW71", "BWP_EN_BW74", "BWP_EN_BW75", "BWP_EN_BW80", "BWP_EN_BW81",
    "BWP_EN_BW82", "BWP_EN_BW83", "BWP_EN_BW85", "BWP_EN_BW94", "BWP_EN_BW98", "EX1_EN_42", "EX2_EN_17",
    "HSP_EN_HGSS04", "HSP_EN_HGSS08", "HSP_EN_HGSS10", "HSP_EN_HGSS11", "HSP_EN_HGSS14", "HSP_EN_HGSS19",
    "HSP_EN_HGSS20", "SM1_EN_27", "SM1_EN_94", "SM2_EN_92", "SM3_EN_93", "SM3_EN_94", "SMA_EN_SV46", "SMA_EN_SV71",
    "SMA_EN_SV75", "SMA_EN_SV76", "SMA_EN_SV78", "SMP_EN_SM05", "SMP_EN_SM102", "SMP_EN_SM118", "SMP_EN_SM125",
    "SMP_EN_SM126", "SMP_EN_SM127", "SMP_EN_SM128", "SMP_EN_SM129", "SMP_EN_SM139", "SMP_EN_SM143", "SMP_EN_SM144",
    "SMP_EN_SM156", "SMP_EN_SM16", "SMP_EN_SM166", "SMP_EN_SM167", "SMP_EN_SM17", "SMP_EN_SM178", "SMP_EN_SM180",
    "SMP_EN_SM182", "SMP_EN_SM188", "SMP_EN_SM189", "SMP_EN_SM210", "SMP_EN_SM212", "SMP_EN_SM22", "SMP_EN_SM229",
    "SMP_EN_SM241", "SMP_EN_SM32", "SMP_EN_SM33", "SMP_EN_SM35", "SMP_EN_SM36", "SMP_EN_SM43", "SMP_EN_SM58", "SMP_EN_SM62",
    "SMP_EN_SM67", "SMP_EN_SM69", "SMP_EN_SM74", "Snivy", "SWSH1_EN_24", "SWSHP_EN_SWSH014", "SWSHP_EN_SWSH053", "SWSHP_EN_SWSH057",
    "SWSHP_EN_SWSH076", "SWSHP_EN_SWSH077", "SWSHP_EN_SWSH109", "XY0_EN_22", "XY1_EN_80", "XY2_EN_66", "XY3_EN_70", "XYA_EN_24a",
    "XYA_EN_28a", "XYA_EN_54a", "XYA_EN_55a", "XYP_EN_XY07", "XYP_EN_XY08", "XYP_EN_XY153", "XYP_EN_XY34", "XYP_EN_XY77"]

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
        flip.className = "card";

        let inner = document.createElement("div");
        inner.className = "card-wrapper";
        flip.append(inner);

        let front = document.createElement("div");
        front.className = "card-front";

        if (Math.random() < 0.1) {
            front.classList.add("holo");
        }
        inner.append(front);

        let back = document.createElement("div");
        back.className = "card-back";
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
    let play = document.getElementById("startGame");
    for (let i = 0; i < container.length; i++) {
        let b = container[i];
        b.classList.remove("active");

    }
    play.classList.remove(play.classList[1]);
    play.classList.add(e.classList[1]);
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
