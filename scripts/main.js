import {addElementListeners} from './eventListeners/elementListeners.js';
import {receiveGuesses} from './chromeMsg/receive.js';

import {getAndSendGuesses} from './contentScripts/contentScript.js';
import {sendMsgToContentScript} from './chromeMsg/send.js';

sendMsgToContentScript(getAndSendGuesses)
addElementListeners();
receiveGuesses()
