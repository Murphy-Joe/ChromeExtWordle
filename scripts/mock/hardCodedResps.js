let numTargetsSpan = document.getElementById("numTargets");

export const HardCodedLetters = {
  "L": 100,
  "R": 100,
  "A": 100,
  "V": 50,
  "I": 33,
  "U": 33,
  "AA": 17,
  "M": 17,
  "Y": 17,
  "LL": 17,
  "RR": 17
}

export const hardcodedWords = [
  "trawl",
  "trash",
  "trait",
  "bravo",
  "braid",
  "drawl",
  "brass",
  "tramp",
  "draft",
  "gravy",
  "brash",
  "grass",
  "fraud",
  "graph",
  "drama",
  "frail",
  "brawl",
  "wrath",
  "trail",
  "grasp",
  "graft",
  "grail"
]

export const HardCodedBestGuesses =
  [
    [
      "harry",
      1.4285714285714286
    ],
    [
      "hairy",
      1.4285714285714286
    ],
    [
      "dairy",
      2
    ],
    [
      "parry",
      2
    ],
    [
      "fairy",
      2
    ],
    [
      "marry",
      2
    ],
    [
      "feign",
      2.142857142857143
    ],
    [
      "helix",
      2.142857142857143
    ],
    [
      "pride",
      2.142857142857143
    ],
    [
      "pound",
      2.7142857142857144
    ],
    [
      "unfed",
      2.7142857142857144
    ],
    [
      "stink",
      2.7142857142857144
    ],
    [
      "spike",
      2.7142857142857144
    ],
    [
      "cigar",
      2.7142857142857144
    ],
    [
      "bench",
      3
    ],
    [
      "whelp",
      3
    ],
    [
      "flesh",
      3
    ],
    [
      "death",
      3
    ],
    [
      "fresh",
      3
    ],
    [
      "quiet",
      3.5714285714285716
    ],
    [
      "serve",
      3.5714285714285716
    ],
    [
      "sissy",
      3.5714285714285716
    ],
    [
      "dwarf",
      3.857142857142857
    ],
    [
      "adobe",
      3.857142857142857
    ],
    [
      "unmet",
      3.857142857142857
    ],
    [
      "grade",
      3.857142857142857
    ],
    [
      "major",
      3.857142857142857
    ],
    [
      "model",
      3.857142857142857
    ],
    [
      "blush",
      4.142857142857143
    ],
    [
      "angry",
      5.142857142857143
    ],
    [
      "focal",
      5.285714285714286
    ],
    [
      "colon",
      5.285714285714286
    ],
    [
      "floss",
      5.285714285714286
    ],
    [
      "repay",
      5.285714285714286
    ],
    [
      "outdo",
      5.285714285714286
    ],
    [
      "evade",
      5.285714285714286
    ],
    [
      "batty",
      5.285714285714286
    ],
    [
      "crust",
      7
    ],
    [
      "cluck",
      7
    ],
    [
      "croak",
      7
    ],
    [
      "trawl",
      7
    ],
    [
      "crazy",
      7
    ],
    [
      "stool",
      7
    ],
    [
      "crate",
      7
    ],
    [
      "sower",
      7
    ],
    [
      "rebut",
      7
    ],
    [
      "react",
      7
    ]
  ]

export async function createHardCodedWordsLeftPage() {
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
