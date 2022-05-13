import {addElementListeners} from './eventListeners/elementListeners.js';
import {receiveGuesses} from './chromeMsg/receive.js';
import {setupContentScript} from './chromeMsg/send.js';

setupContentScript()
addElementListeners();
receiveGuesses()
