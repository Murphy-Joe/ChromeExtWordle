import {addElementListeners} from './eventListeners/elementListeners.js';
import {receiveGuesses} from './chromeMsg/receive.js';
import {executeApiCallsFromGuesses, executeGuessSelectionReceiver} from './chromeMsg/send.js';

executeApiCallsFromGuesses()
executeGuessSelectionReceiver()
addElementListeners();
receiveGuesses()
