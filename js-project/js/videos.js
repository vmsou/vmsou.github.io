let videos_links = [], videos_names = [];

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
            videos_links.push(data[i]["videoLink"]);
            videos_names.push(data[i]["trailerName"]);
        }

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
}

window.onload = function() {
    addVideos();
}