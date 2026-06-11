updateTime();
let biggestIndex = 1;
let topBar = document.querySelector("#topbar");

initWindow("welcome")
initWindow("pocketwatch", true)

setInterval(updateTime, 1000);


function initWindow(name, useIcon = false) {
    let icon;
    if (useIcon) { icon = document.querySelector(`#${name}icon`) };
    let screen = document.querySelector(`#${name}`);
    if (useIcon) {
        document.querySelector(`#${name}close`).addEventListener("click", function () {
            closeWindow(screen);
            unselectIcon(icon);
        });
    } else {
        document.querySelector(`#${name}close`).addEventListener("click", function () {
            closeWindow(screen);
        });
    }

    if (useIcon) {
        icon.addEventListener("mousedown", () => {
            handleIconTap(icon, screen);
        });
    } else {
        document.querySelector(`#${name}open`).addEventListener("click", function () {
            openWindow(screen);
        });
    }

    addWindowTapHandling(screen);
    dragElement(document.querySelector(`#${name}`));
}


function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () => {
        handleWindowTap(element);
    });
}

function handleWindowTap(element) {
    biggestIndex++;  // Increment biggestIndex by 1
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
}

function selectIcon(element) {
    element.classList.add("selected");
}

function unselectIcon(element) {
    element.classList.remove("selected");
}

function handleIconTap(element, window) {
    if (element.classList.contains("selected")) {
        unselectIcon(element);
        closeWindow(window);
    } else {
        selectIcon(element);
        openWindow(window);
    }
}

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "block";
    handleWindowTap(element);
}

function dragElement(element) {
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;

    if (document.querySelector(`#${element.id}header`)) {
        document.querySelector(`#${element.id}header`).onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function updateTime() {
    // https://www.geeksforgeeks.org/javascript/how-to-create-analog-clock-using-html-css-and-javascript/
    let now = new Date()
    let currentTime = now.toLocaleString();
    let timeText = document.querySelector("#time");
    timeText.innerHTML = currentTime;

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondDeg = ((seconds / 60) * 360) + 90;
    const minuteDeg = ((minutes / 60) * 360) + 90;
    const hourDeg = ((hours / 12) * 360) + 90;

    document.querySelector("#second-hand").style.transform = `rotate(${secondDeg}deg)`;
    document.querySelector("#minute-hand").style.transform = `rotate(${minuteDeg}deg)`;
    document.querySelector("#hour-hand").style.transform = `rotate(${hourDeg}deg)`;
}
