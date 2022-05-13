import {addElementListeners} from './eventListeners/elementListeners.js';
import {receiveGuesses} from './chromeMsg/receive.js';
import {sendMsgToContentScriptGetAndSendGuesses} from './chromeMsg/send.js';

sendMsgToContentScriptGetAndSendGuesses()
addElementListeners();
receiveGuesses()
