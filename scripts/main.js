import {addElementListeners} from './eventListeners/elementListeners.js';
import {callApis} from './api/apiCalls.js';
import {onStartupRunContentScriptToGetAndSendGuesses} from './chromeMsg/send.js';
import {receiveGuesses} from './chromeMsg/receive.js';

let lastGuessList = []

onStartupRunContentScriptToGetAndSendGuesses()
addElementListeners();
receiveGuesses()
