import {createWordsLeftPage} from '../dataDisplay/wordsLeftBoxes.js';
import {wordsLeftApiResp} from '../api/apiCalls.js';

let body = document.querySelector('body');

let wordsLeft = document.getElementById("wordsLeft")

let bestLetters = document.getElementById("bestLetters")

let bestGuess = document.getElementById("bestGuess")

let landingPage = document.getElementById("landingPage")

let bestLettersPage = document.getElementById("lettersPage")

let wordsLeftPage = document.getElementById("wordsLeftPage")

let bestGuessPage = document.getElementById("bestGuessPage")

let backButtons = document.querySelectorAll(".back")

const normalModeLink = document.getElementById("normal-mode-link");

let githubLink = document.getElementById("code")

// let refresh = document.getElementById("refresh")


export function addElementListeners() {
    wordsLeft.addEventListener("click", () => {
        body.classList.add("secondary-page-size")
        document.querySelectorAll('.word-box').forEach((elem) => elem.remove());
        wordsLeftPage.classList.remove("hidden")
        landingPage.classList.add("hidden")
        createWordsLeftPage(wordsLeftApiResp);
    })

    bestLetters.addEventListener("click", () => {
        body.classList.add("secondary-page-size")
        bestLettersPage.classList.remove("hidden")
        landingPage.classList.add("hidden")
    })

    bestGuess.addEventListener("click", () => {
        body.classList.add("secondary-page-size")
        bestGuessPage.classList.remove("hidden")
        landingPage.classList.add("hidden")
        normalModeLink.focus();
    })

    backButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            body.classList.remove("secondary-page-size")
            landingPage.classList.remove("hidden")
            btn.parentElement.parentElement.classList.add("hidden")
        })
    })

    githubLink.addEventListener("click", () => {
        window.open("https://github.com/Murphy-Joe/ReWordle/blob/master/README.md", "_blank")
    })

}