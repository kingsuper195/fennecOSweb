setInterval(updateTime, 1000);
dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("pocketwatch"))

let biggestIndex = 1;
let selectedIcon = null;
let topBar = document.querySelector("#topbar")

let welcomeScreen = document.querySelector("#welcome");
document.querySelector("#welcomeclose").addEventListener("click", function () {
    closeWindow(welcomeScreen);
});

document.querySelector("#welcomeopen").addEventListener("click", function () {
    openWindow(welcomeScreen);
});
addWindowTapHandling(welcomeScreen);

let pocketWatchScreen = document.querySelector("#pocketwatch");
document.querySelector("#pocketwatchclose").addEventListener("click", function () {
    closeWindow(pocketWatchScreen);
    unselectIcon(pocketWatchIcon);
});

let pocketWatchIcon = document.querySelector("#pocketwatchicon")
pocketWatchIcon.addEventListener("mousedown", () => {
    handleIconTap(pocketWatchIcon, pocketWatchScreen)
});

addWindowTapHandling(pocketWatchScreen);

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}

function handleWindowTap(element) {
    biggestIndex++;  // Increment biggestIndex by 1
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
}

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function unselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = null;
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
    handleWindowTap(element)
}

function dragElement(element) {
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;

    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = startDragging;
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
    let currentTime = new Date().toLocaleString();
    let timeText = document.querySelector("#time");
    timeText.innerHTML = currentTime;
}
