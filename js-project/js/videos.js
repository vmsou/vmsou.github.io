function addVideos() {
    let container = document.getElementById("videos-container");
    let requestURL = "../json/trailerData.json";
    let request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

    request.onload = function() {
        let data = request.response;

        for (let i = 0; i < data.length; i++) {
            let e = document.createElement("div");
            let img = document.createElement("img");
            let modal = document.getElementById("showcase");
            let video_modal = document.getElementById("showcase-video");
            let caption = document.getElementById("caption");

            e.className = "box";

            img.src = "https://i3.ytimg.com/vi/" + data[i]["videoLink"] + "/maxresdefault.jpg";
            img.className = "box-image";
            img.alt = data[i]["videoName"];
            img.onclick = function() {
                modal.style.display = "block";
                video_modal.src = "https://www.youtube.com/embed/" + data[i]["videoLink"];
                caption.innerHTML = data[i]["videoName"];
                e.classList.add("visited");
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
}

window.onload = function() {
    addVideos();
}