let loadedNames = [];

function preload(imgName) {
    if (document.images && !loadedNames.includes(imgName)) {
        let img = new Image();
        img.src = imgName
        loadedNames.push(imgName);
    }
}

function activeElement() {
    let activeHref = window.location.href;
    let container = document.getElementsByClassName("navLink");
    let e;
    for (let i = 0; i < container.length; i++) {
        e = container[i];
        if (e.href === activeHref) {
            e.classList.add("active");
            return;
        }
    }
}


function loadTemplate(loc, tagName="header") {
    let element = document.createElement(tagName);

    document.body.append(element);
    $(tagName).load(loc, null, function () {
        if (tagName === "header") {
            $("#homeLogo").click(function () {
                window.location = "/js-project/";
            })
        }

        activeElement();
    });
    let container = document.getElementsByTagName("script");
    for (let i = 0; i < container.length; i++) {
        let strVal = "loadTemplate(\"" + loc + "\");"
        if (container[i].innerHTML === strVal) {
            container[i].parentElement.removeChild(container[i]);
        }
    }
    preload("/js-project/images/logo_puc2.svg");
}

