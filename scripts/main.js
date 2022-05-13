import {addElementListeners} from './eventListeners/elementListeners.js';
import {receiveGuesses} from './chromeMsg/receive.js';
import {executeApiCallsFromGuesses, executeGuessSelectionReceiver} from './execution/executionScript.js';

executeApiCallsFromGuesses()
executeGuessSelectionReceiver()
addElementListeners();
receiveGuesses()
