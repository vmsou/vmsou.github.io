let i = 0;
const imgBox = document.querySelector(".imgBox");
const slides = imgBox.getElementsByTagName("img");


function nextSlide() {
    slides[i++].classList.remove("active");
    i %= slides.length;
    slides[i].classList.add("active");
}

function backSlide() {
    slides[i--].classList.remove("active");
    if (i < 0) i = slides.length - 1;
    slides[i].classList.add("active");
}
