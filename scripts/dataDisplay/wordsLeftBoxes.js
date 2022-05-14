import { sendMsgToContentScriptFillInGuess } from '../msg/send.js';

let wordsContainer = document.getElementById("wordsLeft-page-container")

export function createWordsLeftPage(resp) {
    let uiFlipDelay = 0;
    resp.targets.forEach(word => {
        let wordBox = document.createElement("flex");
        wordBox.classList.add("word-box");
        wordBox.style.animationDelay = `${uiFlipDelay}s`;
        uiFlipDelay += 0.025;
        wordsContainer.appendChild(wordBox);
        wordBox.innerText = word.toUpperCase();
        wordBox.addEventListener("click", () => {
            sendMsgToContentScriptFillInGuess(word);
        })
    });
}

