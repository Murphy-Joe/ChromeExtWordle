import {addElementListeners} from './eventListeners/elementListeners.js';
import {receiveGuesses, receiveGuessSelection} from './chromeMsg/receive.js';
import {executeContentScriptGetAndSendGuesses} from './chromeMsg/send.js';

executeContentScriptGetAndSendGuesses()
addElementListeners();
receiveGuesses()
receiveGuessSelection()
