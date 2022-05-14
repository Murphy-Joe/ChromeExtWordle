import {addElementListeners} from './eventListeners/elementListeners.js';
import {receiveGuesses} from './chromeMsg/receive.js';
import { executeContentScript, getGuessesAndSendBackToExtension, receiveGuessSelectionAndPopulateTiles } from './content/contentScript.js';

executeContentScript(getGuessesAndSendBackToExtension)
executeContentScript(receiveGuessSelectionAndPopulateTiles)
addElementListeners();
receiveGuesses()
