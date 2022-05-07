let wordsLeft = document.getElementById("wordsLeft")

let bestLetters = document.getElementById("bestLetters")

let bestGuess = document.getElementById("bestGuess")

let landingPage = document.getElementById("landingPage")

let bestLettersPage = document.getElementById("lettersPage");

let wordsLeftPage = document.getElementById("wordsLeftPage")

let bestGuessPage = document.getElementById("bestGuessPage")

let backButtons = document.querySelectorAll(".back")

let wordsLeftApiResp;

export function addEventListeners() {
    wordsLeft.addEventListener("click", () => {
        document.querySelectorAll('.word-box').forEach((elem) => elem.remove());
        wordsLeftPage.classList.remove("hidden")
        landingPage.classList.add("hidden")
        createWordsLeftPage(wordsLeftApiResp);
    })

    bestLetters.addEventListener("click", () => {
        bestLettersPage.classList.remove("hidden")
        landingPage.classList.add("hidden")
    })

    bestGuess.addEventListener("click", () => {
        // populateBestGuessesChart(HardCodedBestGuesses)
        bestGuessPage.classList.remove("hidden")
        landingPage.classList.add("hidden")
    })

    backButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            landingPage.classList.remove("hidden")
            btn.parentElement.parentElement.classList.add("hidden")
        })
    })
}