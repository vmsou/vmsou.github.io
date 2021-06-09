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
    let header = document.createElement(tagName);
    document.body.append(header);
    $(tagName).load(loc, null, function () {
        $("#homeLogo").click(function () {
            window.location = "/js-project/";
        })
        activeElement();
    });
    let container = document.getElementsByTagName("script");
    for (let i = 0; i < container.length; i++) {
        let strVal = "loadTemplate(\"" + loc + "\");"
        if (container[i].innerHTML === strVal) {
            container[i].parentElement.removeChild(container[i]);
        }
    }
}
