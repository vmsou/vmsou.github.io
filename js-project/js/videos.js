let videos_links = [
    "https://www.youtube.com/embed/3WsyBosVTlk",
    "https://www.youtube.com/embed/ASzOzrB-a9E",
    "https://www.youtube.com/embed/qt-zQTiu8cA",
    "https://www.youtube.com/embed/wDZ-9B6hX5A"
]

function addVideos() {
    let container = document.getElementById("videos-container");
    for (let i = 0; i < videos_links.length; i++) {
        let e = document.createElement("iframe");
        e.className = "video";
        e.src = videos_links[i];
        e.allowfullscreen = true;
        container.append(e);
    }
}

window.onload = () => {
    addVideos();
}