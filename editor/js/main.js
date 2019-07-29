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
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst state_1 = __webpack_require__(/*! ../../src/state */ \"./src/state.ts\");\nconst elements_1 = __webpack_require__(/*! ../../src/elements */ \"./src/elements.ts\");\nconst draw_scene_1 = __webpack_require__(/*! ../../src/draw-scene */ \"./src/draw-scene.ts\");\nconst data_1 = __webpack_require__(/*! ../../src/data */ \"./src/data/index.ts\");\nwindow.addEventListener('load', () => __awaiter(this, void 0, void 0, function* () {\n    // the game tries to load the normal js and 404s so clear that\n    console.clear();\n    yield data_1.loadData();\n    state_1.default.currentDialogueIndex = 0;\n    // hook up the elements to the elements within the iframe\n    elements_1.default.doc = document.querySelector('iframe').contentDocument;\n    elements_1.initElements();\n    draw_scene_1.default();\n}));\n\n\n//# sourceURL=webpack:///./editor/src/index.ts?");

/***/ }),

/***/ "./src/data/index.ts":
/*!***************************!*\
  !*** ./src/data/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst data = {\n    dialogue: null,\n    images: null,\n    choices: null,\n    characters: null,\n};\nexports.default = data;\nfunction loadData() {\n    return __awaiter(this, void 0, void 0, function* () {\n        console.log('Loading data...');\n        const keys = Object.keys(data);\n        const requests = [];\n        for (const k of keys) {\n            const p = fetch(`/assets/data/${k}.json`);\n            requests.push(p);\n        }\n        const responses = yield Promise.all(requests);\n        for (const res of responses) {\n            const name = res.url.match(/data\\/(.+)\\.json/)[1];\n            const d = yield res.json();\n            data[name] = d;\n        }\n        console.log('Data loaded.');\n    });\n}\nexports.loadData = loadData;\n\n\n//# sourceURL=webpack:///./src/data/index.ts?");

/***/ }),

/***/ "./src/draw-scene.ts":
/*!***************************!*\
  !*** ./src/draw-scene.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst state_1 = __webpack_require__(/*! ./state */ \"./src/state.ts\");\nconst lookup_1 = __webpack_require__(/*! ./lookup */ \"./src/lookup.ts\");\nconst elements_1 = __webpack_require__(/*! ./elements */ \"./src/elements.ts\");\nconst data_1 = __webpack_require__(/*! ./data */ \"./src/data/index.ts\");\n/** Draws the curent dialogue */\nfunction drawScene() {\n    const d = data_1.default.dialogue[state_1.default.currentDialogueIndex];\n    if (d.image) {\n        const img = lookup_1.lookupImage(d.image);\n        elements_1.default.bg.style.backgroundImage = `url(/assets/images/${img.filename})`;\n        elements_1.default.bg.style.backgroundColor = img.bgColor;\n    }\n    const char = lookup_1.lookupCharacter(d.character);\n    elements_1.default.charImg.style.backgroundImage = `url(/assets/images/${char.imageFilename})`;\n    elements_1.default.charName.textContent = d.character;\n    elements_1.default.dialogueText.textContent = d.text;\n    resetChoices();\n    for (let i = 0; i < d.choices.length; i++) {\n        const choiceIndex = d.choices[i];\n        const c = data_1.default.choices[choiceIndex];\n        addChoice(c.text, choiceIndex);\n    }\n}\nexports.default = drawScene;\nfunction resetChoices() {\n    elements_1.default.choicesDiv.innerHTML = '';\n}\nfunction addChoice(text, index) {\n    const btn = document.createElement('button');\n    btn.className = 'choice';\n    btn.type = 'button';\n    btn.textContent = text;\n    btn.dataset.index = index.toString();\n    elements_1.default.choicesDiv.append(btn);\n}\n\n\n//# sourceURL=webpack:///./src/draw-scene.ts?");

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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst data_1 = __webpack_require__(/*! ./data */ \"./src/data/index.ts\");\nfunction lookupImage(imgName) {\n    for (const i of data_1.default.images) {\n        if (i.name === imgName)\n            return i;\n    }\n}\nexports.lookupImage = lookupImage;\nfunction lookupCharacter(char) {\n    for (const c of data_1.default.characters) {\n        if (c.name === char)\n            return c;\n    }\n}\nexports.lookupCharacter = lookupCharacter;\n\n\n//# sourceURL=webpack:///./src/lookup.ts?");

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