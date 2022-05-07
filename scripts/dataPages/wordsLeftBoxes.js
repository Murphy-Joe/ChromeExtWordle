export async function createWordsLeftPage(resp) {
    let uiFlipDelay = 0;
    resp.targets.forEach(word => {
        let wordBox = document.createElement("flex");
        wordBox.classList.add("word-box");
        wordBox.style.animationDelay = `${uiFlipDelay}s`;
        uiFlipDelay += 0.025;
        wordsContainer.appendChild(wordBox);
        wordBox.innerText = word.toUpperCase();
        // wordBtn.addEventListener("click", () => {})
        // send msg to content script to fill in each letter
    });
}

export async function createHardCodedWordsLeftPage(resp) {
    let uiFlipDelay = 0;
    numTargetsSpan.innerText = hardcodedWords.length;
    hardcodedWords.forEach(word => {
        let wordBox = document.createElement("flex");
        wordBox.classList.add("word-box");
        wordBox.style.animationDelay = `${uiFlipDelay}s`;
        uiFlipDelay += 0.025;
        wordsContainer.appendChild(wordBox);
        wordBox.innerText = word.toUpperCase();
        // wordBtn.addEventListener("click", () => {})
        // send msg to content script to fill in each letter
    });
}