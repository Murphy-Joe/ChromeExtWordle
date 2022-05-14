import {addElementListeners} from './eventListeners/elementListeners.js';
import {receiveGuessesAndCallApis} from './msg/receive.js';
import { executeContentScript, getGuessesAndSendBackToExtension, receiveGuessSelectionAndPopulateTiles } from './content/contentScript.js';

executeContentScript(getGuessesAndSendBackToExtension)
executeContentScript(receiveGuessSelectionAndPopulateTiles)
addElementListeners();
receiveGuessesAndCallApis()
