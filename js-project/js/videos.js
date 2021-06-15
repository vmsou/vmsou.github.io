let videos_links = [
    "3WsyBosVTlk",
    "ASzOzrB-a9E",
    "Wr9Add371is",
    "wDZ-9B6hX5A",
    "asqWq8MIAWA",
]

let videos_names = [
    "RIO: Raised in Oblivion",
    "Battlefield 2042",
    "Avatar: Frontiers of Pandora",
    "Halo Infinite",
    "Elden Ring",
]

function addVideos() {
    let container = document.getElementById("videos-container");
    for (let i = 0; i < videos_links.length; i++) {
        let e = document.createElement("div");
        let img = document.createElement("img");
        let modal = document.getElementById("showcase");
        let video_modal = document.getElementById("showcase-video");
        let caption = document.getElementById("caption");

        e.className = "box";

        img.src = "https://i3.ytimg.com/vi/" + videos_links[i] + "/maxresdefault.jpg";
        img.className = "box-image";
        img.alt = videos_names[i];
        img.onclick = function() {
            modal.style.display = "block";
            video_modal.src = "https://www.youtube.com/embed/" + videos_links[i];
            caption.innerHTML = videos_names[i];
        }

        modal.onclick = function() {
            modal.style.display = "none";
            video_modal.src = "";
            caption.innerHTML = "";

        }

        e.append(img);
        container.append(e);
    }
}

window.onload = function() {
    addVideos();
}