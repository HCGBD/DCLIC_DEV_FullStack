const typingText  = document.getElementById("typing-txt")
const textInput  = document.getElementById("txtInput")
const startBtn = document.getElementById("start")
const endBtn = document.getElementById("stop")

let typingInterval
let currentText = ""
let charIndex = 0;
function start() {
    if(!textInput.value.trim()) {
        alert("Veuillez saisir un text")
        return null ;
    }

    currentText = textInput.value;
    charIndex = 0;
    typingText.innerHTML  = "";
    startBtn.disabled = true;
    endBtn.disabled = false;

    typingInterval = setInterval(() => {
        if (charIndex <= currentText.length) {
            typingText.innerHTML  = currentText.substring(0, charIndex) + '<span class="cursor" ></span>';
            charIndex++;

        }
        else {
            clearInterval(typingInterval);
            startBtn.disabled = false;
            endBtn.disabled = true;
        }
    },100)
}

function end() {
    clearInterval(typingInterval);
    typingText.innerHTML = '<span class="cursor" ></span>' ;
    startBtn.disabled = false;
    endBtn.disabled = true;
}

startBtn.addEventListener("click", start);
endBtn.addEventListener("click", end);
