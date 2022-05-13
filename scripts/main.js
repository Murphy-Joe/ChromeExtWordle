import {addElementListeners} from './eventListeners/elementListeners.js';
import {receiveGuesses} from './chromeMsg/receive.js';
import {executeContentScriptGetAndSendGuesses} from './chromeMsg/send.js';

executeContentScriptGetAndSendGuesses()
addElementListeners();
receiveGuesses()
