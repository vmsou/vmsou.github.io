let i = 0;
const imgBox = document.querySelector(".imgBox");
const contentBox = document.querySelector(".contentBox");
const boxes = contentBox.getElementsByTagName("div");
const slides = imgBox.getElementsByTagName("img");


function clearSelection() {
    if (window.getSelection) window.getSelection().removeAllRanges();
}


function nextSlide() {
    slides[i].classList.remove("active");
    boxes[i].classList.remove("active");
    i = (i + 1) % slides.length;
    slides[i].classList.add("active");
    boxes[i].classList.add("active");
    clearSelection();

}

function backSlide() {
    slides[i].classList.remove("active");
    boxes[i].classList.remove("active");
    i = (i - 1 + slides.length) % slides.length;
    slides[i].classList.add("active");
    boxes[i].classList.add("active");
    clearSelection();
}
