let user = document.getElementById("user");
let password = document.getElementById("password");
let elementsArr = [user, password];

function createAlert(alertName, alertMessage, alertType="error") {
    if (!document.getElementById("alertList")) {
        let alertList = document.createElement("ul");
        alertList.id = "alertList";
        alertList.className = "drag-sort-enable";
    }

    let alert = document.createElement("li");
    let closeBtn = document.createElement("span");
    let boldAlert = document.createElement("strong");
    let boldNode = document.createTextNode(alertName + " ");
    let textNode = document.createTextNode(alertMessage);

    alert.className = "alert " + alertType;
    closeBtn.className = "closebtn";
    closeBtn.innerHTML = "&times;";
    closeBtn.onclick = function() {
        closeBtn.parentElement.style.display = 'none';
    }

    boldAlert.appendChild(boldNode);
    alert.appendChild(boldAlert);
    alert.appendChild(textNode);
    alert.appendChild(closeBtn);

    enableDragItem(alert);

    document.getElementById("alertList").appendChild(alert)

}

function removeByClassName(className) {
    let parent, e;
    if (document.getElementsByClassName(className)) {
        for (e; e = document.getElementsByClassName(className)[0];) {
            parent = e.parentElement;
            parent.removeChild(e);
        }
    }

}


function saveFormInfo() {
    removeByClassName("alert")

    let e;
    let valid = true;
    let empty = false;

    for (let i = 0; i < elementsArr.length; i++) {
        e = elementsArr[i];
        e.required = e.value === '';
        if (e.required === true) {
            valid = false;
            empty = true;
        }
    }

    if (empty) createAlert("Alerta!", "Alguns campos precisam ser preenchidos.");

    if (valid) {
        comunicarServer();
    }
    elementsArr[0].focus();

}

function handleDrag(item) {
    const selectedItem = item.target, x = item.clientX, y = item.clientY;

    selectedItem.classList.add('drag-sort-active');
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

    if (selectedItem.parentNode === swapItem.parentNode) {
        swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
        selectedItem.parentNode.insertBefore(selectedItem, swapItem);
    }
}

function handleDrop(item) {
    item.target.classList.remove('drag-sort-active');
}

function enableDragItem(item) {
    item.setAttribute('draggable', true);
    item.ondrag = handleDrag;
    item.ondragend = handleDrop;
}

function enableEnter(element, buttonID) {
    if (element.className === 'login' || e.className === "password") {
        element.addEventListener("keyup", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById(buttonID).click();
            }
        })
    }
}

function comunicarServer() {
    let md5_pass = $.MD5(password.value);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../php/loginSave.php",
        data: {
            ch_user: user.value,
            ch_pass: md5_pass,
        }
    })
    createAlert('Sucesso!', 'Dados enviados com sucesso.', 'success');
}




elementsArr.forEach(e => enableEnter(e, "saveForm"));

