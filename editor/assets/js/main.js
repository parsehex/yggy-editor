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

/***/ "./editor/src/data/remove.ts":
/*!***********************************!*\
  !*** ./editor/src/data/remove.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst lookup_1 = __webpack_require__(/*! game/lookup */ \"./game/src/lookup.ts\");\nconst data_1 = __webpack_require__(/*! game/data */ \"./game/src/data.ts\");\nfunction choice(id) {\n    const c = lookup_1.default.choice(id);\n    data_1.default.choices.splice(data_1.default.choices.indexOf(c), 1);\n    // remove id from all choices lists\n    for (const d of data_1.default.dialogue) {\n        if (d.choices.indexOf(id) > -1) {\n            d.choices.splice(d.choices.indexOf(id), 1);\n        }\n    }\n}\nexports.default = { choice };\n\n\n//# sourceURL=webpack:///./editor/src/data/remove.ts?");

/***/ }),

/***/ "./editor/src/delegate.ts":
/*!********************************!*\
  !*** ./editor/src/delegate.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst listeners = [];\nlet setup = false;\nfunction _editorDelegate(selector, eventNames, handler) {\n    if (!setup)\n        init();\n    if (!Array.isArray(eventNames))\n        eventNames = [eventNames];\n    for (const eventName of eventNames) {\n        listeners.push({ selector, eventName, handler });\n    }\n}\nexports.default = _editorDelegate;\nfunction init() {\n    document.body.addEventListener('click', eventHandler.bind(null, 'click'));\n    document.body.addEventListener('input', eventHandler.bind(null, 'input'));\n    document.body.addEventListener('change', eventHandler.bind(null, 'change'));\n    document.body.addEventListener('contextmenu', eventHandler.bind(null, 'contextmenu'));\n    document.body.addEventListener('keyup', eventHandler.bind(null, 'keyup'));\n    document.body.addEventListener('focusout', eventHandler.bind(null, 'focusout'));\n    document.body.addEventListener('mouseover', eventHandler.bind(null, 'mouseover'));\n    document.body.addEventListener('mousemove', eventHandler.bind(null, 'mousemove'));\n    document.body.addEventListener('mouseout', eventHandler.bind(null, 'mouseout'));\n}\nfunction eventHandler(type, e) {\n    const target = e.target;\n    for (const listener of listeners) {\n        if (listener.eventName !== type)\n            continue;\n        if (!target.matches(listener.selector))\n            continue;\n        listener.handler(e, target);\n    }\n    e.stopImmediatePropagation();\n}\n\n\n//# sourceURL=webpack:///./editor/src/delegate.ts?");

/***/ }),

/***/ "./editor/src/dom-util.ts":
/*!********************************!*\
  !*** ./editor/src/dom-util.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/** Set state of `.disabled` */\nfunction disabled(el, state) {\n    if (!Array.isArray(el))\n        el = [el];\n    for (const e of el) {\n        e.disabled = state;\n    }\n}\nexports.disabled = disabled;\n\n\n//# sourceURL=webpack:///./editor/src/dom-util.ts?");

/***/ }),

/***/ "./editor/src/draw.ts":
/*!****************************!*\
  !*** ./editor/src/draw.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst update_1 = __webpack_require__(/*! ./update */ \"./editor/src/update.ts\");\nconst draw_1 = __webpack_require__(/*! game/draw */ \"./game/src/draw.ts\");\nfunction draw() {\n    draw_1.default();\n    update_1.default();\n}\nexports.default = draw;\n\n\n//# sourceURL=webpack:///./editor/src/draw.ts?");

/***/ }),

/***/ "./editor/src/event-hooks.ts":
/*!***********************************!*\
  !*** ./editor/src/event-hooks.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst delegate_1 = __webpack_require__(/*! game/delegate */ \"./game/src/delegate.ts\");\nconst state_1 = __webpack_require__(/*! game/state */ \"./game/src/state.ts\");\nconst update_1 = __webpack_require__(/*! ./update */ \"./editor/src/update.ts\");\nconst navigation_1 = __webpack_require__(/*! ./navigation */ \"./editor/src/navigation.ts\");\nfunction initEventHooks() {\n    /*\n        These event handlers have to be triggered before the game events since the\n        game may have removed the firing elements by the time these events are handled,\n        which will prevent these events from being delegated correctly.\n        So do 2 things:\n        1. Setup these handlers first so that they run before the game's handlers.\n        2. Use setTimeout to wait for the game to do whatever it needs to do before\n        running these handlers.\n    */\n    const delegate = function (sel, type, cb) {\n        delegate_1.default(sel, type, (e, t) => {\n            setTimeout(() => {\n                cb(e, t);\n            }, 0);\n        });\n    };\n    // update editor stuff on choice click\n    delegate('div#choices button.choice', 'click', (e) => {\n        // drawScene() already called\n        navigation_1.push(state_1.default.currentDialogueID);\n        update_1.default();\n    });\n}\nexports.initEventHooks = initEventHooks;\n\n\n//# sourceURL=webpack:///./editor/src/event-hooks.ts?");

/***/ }),

/***/ "./editor/src/events.ts":
/*!******************************!*\
  !*** ./editor/src/events.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst data_1 = __webpack_require__(/*! game/data */ \"./game/src/data.ts\");\nconst state_1 = __webpack_require__(/*! game/state */ \"./game/src/state.ts\");\nconst lookup_1 = __webpack_require__(/*! game/lookup */ \"./game/src/lookup.ts\");\nconst delegate_1 = __webpack_require__(/*! ./delegate */ \"./editor/src/delegate.ts\");\nconst draw_1 = __webpack_require__(/*! ./draw */ \"./editor/src/draw.ts\");\nconst navigation_1 = __webpack_require__(/*! ./navigation */ \"./editor/src/navigation.ts\");\nconst remove_1 = __webpack_require__(/*! ./data/remove */ \"./editor/src/data/remove.ts\");\nconst id_service_1 = __webpack_require__(/*! ./id-service */ \"./editor/src/id-service.ts\");\nfunction initEditorEvents() {\n    // update dialogue\n    delegate_1.default('textarea#dialogue', 'change', (e, t) => {\n        const d = lookup_1.default.dialogue(state_1.default.currentDialogueID);\n        d.text = t.value;\n        draw_1.default();\n    });\n    // update choice\n    delegate_1.default('div#choices .choice', 'change', (e, t) => {\n        const id = +t.dataset.id;\n        const c = lookup_1.default.choice(id);\n        c.text = t.value;\n        draw_1.default();\n    });\n    delegate_1.default('button#nav-back', 'click', () => {\n        navigation_1.goToPrev();\n        draw_1.default();\n    });\n    delegate_1.default('button#nav-next', 'click', () => {\n        navigation_1.goToNext();\n        draw_1.default();\n    });\n    // add choice (to current dialogue)\n    delegate_1.default('#choices button.add', 'click', () => {\n        const id = id_service_1.getFreeID('choices');\n        data_1.default.choices.push({\n            id,\n            text: 'Choice text',\n            targetDialogueID: null,\n        });\n        const d = lookup_1.default.dialogue(state_1.default.currentDialogueID);\n        d.choices.push(id);\n        draw_1.default();\n    });\n    // delete choice\n    delegate_1.default('#choices button.delete', 'click', (e, t) => {\n        const id = +t.dataset.id;\n        remove_1.default.choice(id);\n        draw_1.default();\n    });\n    // resize the game to take the whole screen\n    delegate_1.default('button#game-size', 'click', (e, t) => {\n        const iframe = document.querySelector('iframe');\n        const editorDiv = document.getElementById('editor');\n        const isHidden = editorDiv.classList.contains('hidden');\n        if (isHidden) {\n            iframe.style.width = '';\n            editorDiv.classList.remove('hidden');\n            t.innerHTML = '&gt;';\n        }\n        else {\n            iframe.style.width = '100%';\n            editorDiv.classList.add('hidden');\n            t.innerHTML = '&lt;';\n        }\n    });\n}\nexports.initEditorEvents = initEditorEvents;\n\n\n//# sourceURL=webpack:///./editor/src/events.ts?");

/***/ }),

/***/ "./editor/src/id-service.ts":
/*!**********************************!*\
  !*** ./editor/src/id-service.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst data_1 = __webpack_require__(/*! game/data */ \"./game/src/data.ts\");\nconst ids = { dialogue: [], choices: [], characters: [], images: [] };\nfunction getFreeID(type) {\n    let id = Math.floor(Math.random() * 9999999999);\n    if (ids[type].indexOf(id) > -1)\n        id = getFreeID(type);\n    ids[type].push(id);\n    return id;\n}\nexports.getFreeID = getFreeID;\n/** Frees up an ID. Probably not very necessary. */\nfunction removeID(type, id) {\n    const i = ids[type].indexOf(id);\n    ids[type].splice(i, 1);\n}\nexports.removeID = removeID;\nfunction initIDService() {\n    const keys = Object.keys(ids);\n    for (const k of keys) {\n        for (const d of data_1.default[k]) {\n            ids[k].push(d.id);\n        }\n    }\n}\nexports.initIDService = initIDService;\n\n\n//# sourceURL=webpack:///./editor/src/id-service.ts?");

/***/ }),

/***/ "./editor/src/index.ts":
/*!*****************************!*\
  !*** ./editor/src/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst state_1 = __webpack_require__(/*! game/state */ \"./game/src/state.ts\");\nconst elements_1 = __webpack_require__(/*! game/elements */ \"./game/src/elements.ts\");\nconst data_1 = __webpack_require__(/*! game/data */ \"./game/src/data.ts\");\nconst events_1 = __webpack_require__(/*! game/events */ \"./game/src/events.ts\");\nconst event_hooks_1 = __webpack_require__(/*! ./event-hooks */ \"./editor/src/event-hooks.ts\");\nconst draw_1 = __webpack_require__(/*! ./draw */ \"./editor/src/draw.ts\");\nconst events_2 = __webpack_require__(/*! ./events */ \"./editor/src/events.ts\");\nconst state_2 = __webpack_require__(/*! ./state */ \"./editor/src/state.ts\");\nconst id_service_1 = __webpack_require__(/*! ./id-service */ \"./editor/src/id-service.ts\");\nwindow.addEventListener('load', () => __awaiter(this, void 0, void 0, function* () {\n    if (window !== window.top) {\n        // the game in the iframe is trying to run; do nothing\n        return;\n    }\n    yield data_1.loadData();\n    id_service_1.initIDService();\n    state_1.default.currentDialogueID = 0;\n    state_2.default.history.push(0);\n    state_2.default.currentHistoryIndex = 0;\n    elements_1.initElements();\n    event_hooks_1.initEventHooks();\n    events_1.initEvents();\n    events_2.initEditorEvents();\n    draw_1.default();\n}));\n\n\n//# sourceURL=webpack:///./editor/src/index.ts?");

/***/ }),

/***/ "./editor/src/navigation.ts":
/*!**********************************!*\
  !*** ./editor/src/navigation.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst state_1 = __webpack_require__(/*! game/state */ \"./game/src/state.ts\");\nconst state_2 = __webpack_require__(/*! ./state */ \"./editor/src/state.ts\");\n/** Call `draw()` afterwards */\nfunction goToNext() {\n    const nextHistoryIndex = state_2.default.currentHistoryIndex + 1;\n    if (nextHistoryIndex >= state_2.default.history.length)\n        return;\n    state_1.default.currentDialogueID = state_2.default.history[nextHistoryIndex];\n    state_2.default.currentHistoryIndex++;\n}\nexports.goToNext = goToNext;\n/** Call `draw()` afterwards */\nfunction goToPrev() {\n    const prevHistoryIndex = state_2.default.currentHistoryIndex - 1;\n    if (prevHistoryIndex < 0)\n        return;\n    state_1.default.currentDialogueID = state_2.default.history[prevHistoryIndex];\n    state_2.default.currentHistoryIndex--;\n}\nexports.goToPrev = goToPrev;\n/**\n * Add a dialogue to the history.\n *\n * If not at the end of history then all forward history is cleared.\n *\n * You should `draw()` afterwards.\n */\nfunction push(dialogueID) {\n    if (state_2.default.currentHistoryIndex < state_2.default.history.length - 1) {\n        state_2.default.history.length = state_2.default.currentHistoryIndex + 1;\n    }\n    state_1.default.currentDialogueID = dialogueID;\n    state_2.default.history.push(dialogueID);\n    state_2.default.currentHistoryIndex++;\n}\nexports.push = push;\n\n\n//# sourceURL=webpack:///./editor/src/navigation.ts?");

/***/ }),

/***/ "./editor/src/state.ts":
/*!*****************************!*\
  !*** ./editor/src/state.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst editorState = {\n    history: [],\n    currentHistoryIndex: -1,\n};\nexports.default = editorState;\n\n\n//# sourceURL=webpack:///./editor/src/state.ts?");

/***/ }),

/***/ "./editor/src/update.ts":
/*!******************************!*\
  !*** ./editor/src/update.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst state_1 = __webpack_require__(/*! game/state */ \"./game/src/state.ts\");\nconst lookup_1 = __webpack_require__(/*! game/lookup */ \"./game/src/lookup.ts\");\nconst dom_util_1 = __webpack_require__(/*! ./dom-util */ \"./editor/src/dom-util.ts\");\nconst state_2 = __webpack_require__(/*! ./state */ \"./editor/src/state.ts\");\nconst btnBack = document.getElementById('nav-back');\nconst btnNext = document.getElementById('nav-next');\nconst dialogue = document.getElementById('dialogue');\nconst choices = document.getElementById('choices');\nfunction update() {\n    const d = lookup_1.default.dialogue(state_1.default.currentDialogueID);\n    dialogue.value = d.text;\n    updateChoices(d.choices);\n    // update history buttons\n    dom_util_1.disabled(btnBack, state_2.default.currentHistoryIndex === 0);\n    dom_util_1.disabled(btnNext, state_2.default.currentHistoryIndex === state_2.default.history.length - 1);\n}\nexports.default = update;\nfunction updateChoices(c) {\n    choices.innerHTML = '';\n    for (const id of c) {\n        const choice = lookup_1.default.choice(id);\n        const div = document.createElement('div');\n        const textarea = document.createElement('textarea');\n        textarea.className = 'choice';\n        textarea.cols = 30;\n        textarea.placeholder = 'Choice text';\n        textarea.value = choice.text;\n        textarea.dataset.id = choice.id.toString();\n        div.append(textarea);\n        const btnDelete = document.createElement('button');\n        btnDelete.className = 'delete';\n        btnDelete.type = 'button';\n        btnDelete.textContent = 'X';\n        btnDelete.dataset.id = choice.id.toString();\n        btnDelete.title = 'Delete choice';\n        div.append(btnDelete);\n        choices.append(div);\n    }\n    const divAdd = document.createElement('div');\n    const btnAdd = document.createElement('button');\n    btnAdd.className = 'add';\n    btnAdd.type = 'button';\n    btnAdd.textContent = '+';\n    btnAdd.title = 'Add choice';\n    divAdd.append(btnAdd);\n    choices.append(divAdd);\n}\n\n\n//# sourceURL=webpack:///./editor/src/update.ts?");

/***/ }),

/***/ "./game/src/data.ts":
/*!**************************!*\
  !*** ./game/src/data.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst data = {\n    dialogue: null,\n    images: null,\n    choices: null,\n    characters: null,\n};\nexports.default = data;\nfunction loadData() {\n    return __awaiter(this, void 0, void 0, function* () {\n        console.log('Loading data...');\n        const keys = Object.keys(data);\n        const requests = [];\n        for (const k of keys) {\n            const p = fetch(`/assets/data/${k}.json`);\n            requests.push(p);\n        }\n        const responses = yield Promise.all(requests);\n        for (const res of responses) {\n            const name = res.url.match(/data\\/(.+)\\.json/)[1];\n            const d = yield res.json();\n            data[name] = d;\n        }\n        console.log('Data loaded.');\n    });\n}\nexports.loadData = loadData;\n\n\n//# sourceURL=webpack:///./game/src/data.ts?");

/***/ }),

/***/ "./game/src/delegate.ts":
/*!******************************!*\
  !*** ./game/src/delegate.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst elements_1 = __webpack_require__(/*! ./elements */ \"./game/src/elements.ts\");\nconst listeners = [];\nlet setup = false;\nfunction delegate(selector, eventNames, handler) {\n    if (!setup)\n        init();\n    if (!Array.isArray(eventNames))\n        eventNames = [eventNames];\n    for (const eventName of eventNames) {\n        listeners.push({ selector, eventName, handler });\n    }\n}\nexports.default = delegate;\nfunction init() {\n    elements_1.default.doc.body.addEventListener('click', eventHandler.bind(null, 'click'));\n    elements_1.default.doc.body.addEventListener('input', eventHandler.bind(null, 'input'));\n    elements_1.default.doc.body.addEventListener('change', eventHandler.bind(null, 'change'));\n    elements_1.default.doc.body.addEventListener('contextmenu', eventHandler.bind(null, 'contextmenu'));\n    elements_1.default.doc.body.addEventListener('keyup', eventHandler.bind(null, 'keyup'));\n    elements_1.default.doc.body.addEventListener('focusout', eventHandler.bind(null, 'focusout'));\n    elements_1.default.doc.body.addEventListener('mouseover', eventHandler.bind(null, 'mouseover'));\n    elements_1.default.doc.body.addEventListener('mousemove', eventHandler.bind(null, 'mousemove'));\n    elements_1.default.doc.body.addEventListener('mouseout', eventHandler.bind(null, 'mouseout'));\n}\nfunction eventHandler(type, e) {\n    const target = e.target;\n    for (const listener of listeners) {\n        if (listener.eventName !== type)\n            continue;\n        if (!target.matches(listener.selector))\n            continue;\n        listener.handler(e, target);\n    }\n}\n\n\n//# sourceURL=webpack:///./game/src/delegate.ts?");

/***/ }),

/***/ "./game/src/draw.ts":
/*!**************************!*\
  !*** ./game/src/draw.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst state_1 = __webpack_require__(/*! ./state */ \"./game/src/state.ts\");\nconst lookup_1 = __webpack_require__(/*! ./lookup */ \"./game/src/lookup.ts\");\nconst elements_1 = __webpack_require__(/*! ./elements */ \"./game/src/elements.ts\");\n/** Draws whatever the current state is */\nfunction drawScene() {\n    const dia = lookup_1.default.dialogue(state_1.default.currentDialogueID);\n    const char = lookup_1.default.character(dia.characterID);\n    if (dia.imageID !== undefined) {\n        const img = lookup_1.default.image(dia.imageID);\n        elements_1.default.bg.style.backgroundImage = `url(/assets/images/${img.filename})`;\n        elements_1.default.bg.style.backgroundColor = img.bgColor;\n    }\n    elements_1.default.charImg.style.backgroundImage = `url(/assets/images/${char.imageFilename})`;\n    elements_1.default.charName.textContent = char.name;\n    elements_1.default.dialogueText.textContent = dia.text;\n    resetChoices();\n    for (let i = 0; i < dia.choices.length; i++) {\n        const choiceID = dia.choices[i];\n        const c = lookup_1.default.choice(choiceID);\n        addChoice(c.text, choiceID);\n    }\n}\nexports.default = drawScene;\nfunction resetChoices() {\n    elements_1.default.choicesDiv.innerHTML = '';\n}\nfunction addChoice(text, id) {\n    const btn = document.createElement('button');\n    btn.className = 'choice';\n    btn.type = 'button';\n    btn.textContent = text;\n    btn.dataset.id = id.toString();\n    elements_1.default.choicesDiv.append(btn);\n}\n\n\n//# sourceURL=webpack:///./game/src/draw.ts?");

/***/ }),

/***/ "./game/src/elements.ts":
/*!******************************!*\
  !*** ./game/src/elements.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst elements = {\n    doc: null,\n    bg: null,\n    charName: null,\n    charImg: null,\n    dialogueText: null,\n    choicesDiv: null,\n};\nexports.default = elements;\nfunction initElements() {\n    // if there is an iframe on the page then this must be the editor\n    // this is to make it easier for the editor to hook in\n    const iframe = document.querySelector('iframe');\n    elements.doc = iframe ? iframe.contentDocument : document;\n    elements.bg = elements.doc.getElementById('background');\n    elements.charName = elements.doc.getElementById('character-name');\n    elements.charImg = elements.doc.getElementById('character');\n    elements.dialogueText = elements.doc.querySelector('#dialogue-box .text');\n    elements.choicesDiv = elements.doc.getElementById('choices');\n}\nexports.initElements = initElements;\n\n\n//# sourceURL=webpack:///./game/src/elements.ts?");

/***/ }),

/***/ "./game/src/events.ts":
/*!****************************!*\
  !*** ./game/src/events.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst delegate_1 = __webpack_require__(/*! ./delegate */ \"./game/src/delegate.ts\");\nconst state_1 = __webpack_require__(/*! ./state */ \"./game/src/state.ts\");\nconst draw_1 = __webpack_require__(/*! ./draw */ \"./game/src/draw.ts\");\nconst lookup_1 = __webpack_require__(/*! ./lookup */ \"./game/src/lookup.ts\");\nfunction initEvents() {\n    delegate_1.default('div#choices button.choice', 'click', (e) => {\n        const target = e.target;\n        const choiceID = +target.dataset.id;\n        const choice = lookup_1.default.choice(choiceID);\n        state_1.default.currentDialogueID = choice.targetDialogueID;\n        draw_1.default();\n    });\n}\nexports.initEvents = initEvents;\n\n\n//# sourceURL=webpack:///./game/src/events.ts?");

/***/ }),

/***/ "./game/src/lookup.ts":
/*!****************************!*\
  !*** ./game/src/lookup.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst data_1 = __webpack_require__(/*! ./data */ \"./game/src/data.ts\");\nfunction dialogue(id) {\n    for (const d of data_1.default.dialogue) {\n        if (d.id === id)\n            return d;\n    }\n}\nfunction choice(id) {\n    for (const c of data_1.default.choices) {\n        if (c.id === id)\n            return c;\n    }\n}\nfunction image(id) {\n    for (const i of data_1.default.images) {\n        if (i.id === id)\n            return i;\n    }\n}\nfunction character(id) {\n    for (const c of data_1.default.characters) {\n        if (c.id === id)\n            return c;\n    }\n}\nexports.default = { dialogue, choice, image, character };\n\n\n//# sourceURL=webpack:///./game/src/lookup.ts?");

/***/ }),

/***/ "./game/src/state.ts":
/*!***************************!*\
  !*** ./game/src/state.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst state = {\n    currentDialogueID: null,\n};\nexports.default = state;\n\n\n//# sourceURL=webpack:///./game/src/state.ts?");

/***/ })

/******/ });