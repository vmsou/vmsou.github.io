let i = 0;
const imgBox = document.querySelector(".imgBox");
const contentBox = document.querySelector(".contentBox");
const boxes = contentBox.getElementsByTagName("div");
const slides = imgBox.getElementsByTagName("img");
const subContents = document.querySelector(".subContents");
const subContent = subContents.getElementsByClassName("subContent");

const modals = document.querySelectorAll(".modal");


function activeModal(num) {
    modals[num].classList.add("active");
}

function keyboardTrigger() {
    const right = document.getElementById("btn-forward");
    const left = document.getElementById("btn-backwards");

    right.onclick = nextSlide;
    left.onclick = backSlide;

    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowRight" || e.key === "d") {
            nextSlide();
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowLeft" || e.key === "a") {
            backSlide();
        }
    })

}

function completeLoad() {
    const loader = document.getElementById("loader-1");
    const screen = loader.getElementsByClassName("hide-screen");
    const loading = loader.getElementsByClassName("loading");

    screen[0].classList.add("active");
    loading[0].classList.add("active");

    for (let i = 0; i < modals.length; i++) {
        modals[i].onclick = function() {
            modals[i].classList.remove("active");
        }
    }

    keyboardTrigger();
    setTimeout(() => {
        screen[0].classList.remove("active");
        loading[0].classList.remove("active");
        subContent[0].classList.add("active");
    }, 1500);
}


function clearSelection() {
    if (window.getSelection) window.getSelection().removeAllRanges();
}


function nextSlide() {
    if (i < subContent.length) subContent[i].classList.remove("active");
    slides[i].classList.remove("active");
    boxes[i].classList.remove("active");
    i = (i + 1) % slides.length;
    if (i < subContent.length) subContent[i].classList.add("active");
    slides[i].classList.add("active");
    boxes[i].classList.add("active");
    clearSelection();

}

function backSlide() {
    if (i < subContent.length) subContent[i].classList.remove("active");
    slides[i].classList.remove("active");
    boxes[i].classList.remove("active");
    i = (i - 1 + slides.length) % slides.length;
    if (i < subContent.length) subContent[i].classList.add("active");
    slides[i].classList.add("active");
    boxes[i].classList.add("active");
    clearSelection();
}

completeLoad();
