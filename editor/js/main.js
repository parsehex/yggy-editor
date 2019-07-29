/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./editor/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./editor/src/index.ts":
/*!*****************************!*\
  !*** ./editor/src/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst state_1 = __webpack_require__(/*! ../../src/state */ \"./src/state.ts\");\nconst elements_1 = __webpack_require__(/*! ../../src/elements */ \"./src/elements.ts\");\nconst draw_scene_1 = __webpack_require__(/*! ../../src/draw-scene */ \"./src/draw-scene.ts\");\nwindow.addEventListener('load', () => {\n    state_1.default.currentDialogueIndex = 0;\n    // hook up the elements to the elements within the iframe\n    elements_1.default.doc = document.querySelector('iframe').contentDocument;\n    elements_1.initElements();\n    draw_scene_1.default();\n});\n\n\n//# sourceURL=webpack:///./editor/src/index.ts?");

/***/ }),

/***/ "./src/data/characters.ts":
/*!********************************!*\
  !*** ./src/data/characters.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst characters = [\n    { name: 'Green Man', imageFilename: 'green-man.png' },\n    { name: 'Red Man', imageFilename: 'red-man.png' },\n];\nexports.default = characters;\n\n\n//# sourceURL=webpack:///./src/data/characters.ts?");

/***/ }),

/***/ "./src/data/choices.ts":
/*!*****************************!*\
  !*** ./src/data/choices.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst choices = [\n    { text: \"Fine...\", targetDialogueIndex: 1 },\n    { text: \"I'm doing fantastic!\", targetDialogueIndex: 1 },\n    { text: \"I can't remember anything. I woke up today naked.\", targetDialogueIndex: 1 },\n    { text: \"I am ambivalent.\", targetDialogueIndex: 2 },\n    { text: \"I don't know.\", targetDialogueIndex: 0 },\n    { text: \"It means not having any strong feelings one way or another.\", targetDialogueIndex: 3 },\n];\nexports.default = choices;\n\n\n//# sourceURL=webpack:///./src/data/choices.ts?");

/***/ }),

/***/ "./src/data/dialogue.ts":
/*!******************************!*\
  !*** ./src/data/dialogue.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dialogue = [\n    {\n        character: 'Green Man',\n        image: 'room',\n        text: \"Hi, how are you?\",\n        choices: [\n            0,\n            1,\n            2,\n            3,\n        ],\n    },\n    {\n        character: 'Green Man',\n        text: \"I don't really have anything else to say to you.\",\n        choices: [],\n    },\n    {\n        character: 'Green Man',\n        text: \"What does \\\"ambivalent\\\" mean?\",\n        choices: [\n            4,\n            5,\n        ],\n    },\n    {\n        character: 'Green Man',\n        text: \"Huh.\",\n        choices: [],\n    },\n];\nexports.default = dialogue;\n\n\n//# sourceURL=webpack:///./src/data/dialogue.ts?");

/***/ }),

/***/ "./src/data/images.ts":
/*!****************************!*\
  !*** ./src/data/images.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst images = [\n    { name: 'room', filename: 'blank-room.png', bgColor: '#7b7b7b' },\n];\nexports.default = images;\n\n\n//# sourceURL=webpack:///./src/data/images.ts?");

/***/ }),

/***/ "./src/draw-scene.ts":
/*!***************************!*\
  !*** ./src/draw-scene.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dialogue_1 = __webpack_require__(/*! ./data/dialogue */ \"./src/data/dialogue.ts\");\nconst state_1 = __webpack_require__(/*! ./state */ \"./src/state.ts\");\nconst lookup_1 = __webpack_require__(/*! ./lookup */ \"./src/lookup.ts\");\nconst choices_1 = __webpack_require__(/*! ./data/choices */ \"./src/data/choices.ts\");\nconst elements_1 = __webpack_require__(/*! ./elements */ \"./src/elements.ts\");\n/** Draws the curent dialogue */\nfunction drawScene() {\n    const d = dialogue_1.default[state_1.default.currentDialogueIndex];\n    if (d.image) {\n        const img = lookup_1.lookupImage(d.image);\n        elements_1.default.bg.style.backgroundImage = `url(/assets/images/${img.filename})`;\n        elements_1.default.bg.style.backgroundColor = img.bgColor;\n    }\n    const char = lookup_1.lookupCharacter(d.character);\n    elements_1.default.charImg.style.backgroundImage = `url(/assets/images/${char.imageFilename})`;\n    elements_1.default.charName.textContent = d.character;\n    elements_1.default.dialogueText.textContent = d.text;\n    resetChoices();\n    for (let i = 0; i < d.choices.length; i++) {\n        const choiceIndex = d.choices[i];\n        const c = choices_1.default[choiceIndex];\n        addChoice(c.text, choiceIndex);\n    }\n}\nexports.default = drawScene;\nfunction resetChoices() {\n    elements_1.default.choicesDiv.innerHTML = '';\n}\nfunction addChoice(text, index) {\n    const btn = document.createElement('button');\n    btn.className = 'choice';\n    btn.type = 'button';\n    btn.textContent = text;\n    btn.dataset.index = index.toString();\n    elements_1.default.choicesDiv.append(btn);\n}\n\n\n//# sourceURL=webpack:///./src/draw-scene.ts?");

/***/ }),

/***/ "./src/elements.ts":
/*!*************************!*\
  !*** ./src/elements.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst elements = {\n    // this is to make it easier for the editor to hook in\n    doc: document,\n    bg: null,\n    charName: null,\n    charImg: null,\n    dialogueText: null,\n    choicesDiv: null,\n};\nexports.default = elements;\nfunction initElements() {\n    elements.bg = elements.doc.getElementById('background');\n    elements.charName = elements.doc.getElementById('character-name');\n    elements.charImg = elements.doc.getElementById('character');\n    elements.dialogueText = elements.doc.querySelector('#dialogue-box .text');\n    elements.choicesDiv = elements.doc.getElementById('choices');\n}\nexports.initElements = initElements;\n\n\n//# sourceURL=webpack:///./src/elements.ts?");

/***/ }),

/***/ "./src/lookup.ts":
/*!***********************!*\
  !*** ./src/lookup.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst characters_1 = __webpack_require__(/*! ./data/characters */ \"./src/data/characters.ts\");\nconst images_1 = __webpack_require__(/*! ./data/images */ \"./src/data/images.ts\");\nfunction lookupImage(imgName) {\n    for (const i of images_1.default) {\n        if (i.name === imgName)\n            return i;\n    }\n}\nexports.lookupImage = lookupImage;\nfunction lookupCharacter(char) {\n    for (const c of characters_1.default) {\n        if (c.name === char)\n            return c;\n    }\n}\nexports.lookupCharacter = lookupCharacter;\n\n\n//# sourceURL=webpack:///./src/lookup.ts?");

/***/ }),

/***/ "./src/state.ts":
/*!**********************!*\
  !*** ./src/state.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst state = {\n    currentDialogueIndex: null,\n};\nexports.default = state;\n\n\n//# sourceURL=webpack:///./src/state.ts?");

/***/ })

/******/ });