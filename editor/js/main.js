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

/***/ "./editor/src/buttons.ts":
/*!*******************************!*\
  !*** ./editor/src/buttons.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst objects_1 = __webpack_require__(/*! ./objects */ \"./editor/src/objects.ts\");\nconst state_1 = __webpack_require__(/*! ./state */ \"./editor/src/state.ts\");\ndocument.getElementById('dialogue').addEventListener('click', () => {\n    const d = {\n        text: 'Dialogue text',\n        node: null,\n        choices: [],\n    };\n    objects_1.addDialogue(d);\n    state_1.default.dialogue.push(d);\n});\ndocument.getElementById('choice').addEventListener('click', () => {\n    const c = {\n        text: 'Choice text',\n        node: null,\n        nextDialogue: null,\n    };\n    objects_1.addChoice(c);\n    state_1.default.choices.push(c);\n});\n\n\n//# sourceURL=webpack:///./editor/src/buttons.ts?");

/***/ }),

/***/ "./editor/src/index.ts":
/*!*****************************!*\
  !*** ./editor/src/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! ./buttons */ \"./editor/src/buttons.ts\");\nconst state_1 = __webpack_require__(/*! ./state */ \"./editor/src/state.ts\");\nconst objects_1 = __webpack_require__(/*! ./objects */ \"./editor/src/objects.ts\");\nconst paper = new joint.dia.Paper({\n    // @ts-ignore\n    el: document.getElementById('paper'),\n    width: 850,\n    height: 600,\n    model: state_1.default.graph,\n    gridSize: 1,\n    snapLinks: true,\n    linkPinning: false,\n    embeddingMode: true,\n    clickThreshold: 5,\n    defaultConnectionPoint: { name: 'boundary' },\n    validateConnection: function (sourceView, sourceMagnet, targetView, targetMagnet) {\n        return sourceMagnet != targetMagnet;\n    }\n});\npaper.on('cell:pointerdown', console.log);\nconsole.log(state_1.default.graph);\nconst d = state_1.default.dialogue;\nfor (const dia of d) {\n    objects_1.addDialogue(dia);\n}\nconst c = state_1.default.choices;\nfor (const ch of c) {\n    objects_1.addChoice(ch);\n}\nvar l1 = new joint.shapes.standard.Link({\n    // source: { id: a.id },\n    // target: { id: b.id },\n    attrs: {\n        line: {\n            strokeWidth: 2,\n        },\n    },\n    labels: [{\n            position: {\n                distance: 0.5,\n                offset: ('test'.indexOf('\\n') > -1 || 'test'.length === 1) ? 0 : 10,\n                args: {\n                    keepGradient: true,\n                    ensureLegibility: true\n                },\n            },\n            attrs: {\n                text: { text: 'test' },\n            },\n        }],\n    vertices: [],\n});\n// state.graph.addCells([a, b, c, l1, l2]);\n\n\n//# sourceURL=webpack:///./editor/src/index.ts?");

/***/ }),

/***/ "./editor/src/objects.ts":
/*!*******************************!*\
  !*** ./editor/src/objects.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst state_1 = __webpack_require__(/*! ./state */ \"./editor/src/state.ts\");\nfunction lowestObjectY() {\n    let lowestY = null;\n    for (const o of state_1.default.objects) {\n        // if (lowestY === null) lowestY = o.position.x;\n    }\n}\nfunction addDialogue(d) {\n    for (const o of state_1.default.objects) {\n        // \n    }\n    const a = new joint.shapes.devs.Atomic({\n        position: { x: 50, y: 50 },\n        size: { width: 100, height: 40 },\n        inPorts: ['in'],\n        outPorts: ['out'],\n        attrs: { \".label\": { text: d.text } },\n    });\n    d.node = a;\n    state_1.default.graph.addCells([a]);\n    state_1.default.objects.push(a);\n}\nexports.addDialogue = addDialogue;\nfunction addChoice(c) {\n    const a = new joint.shapes.devs.Atomic({\n        position: { x: 250, y: 50 },\n        size: { width: 100, height: 40 },\n        inPorts: ['in'],\n        outPorts: ['out'],\n        attrs: { \".label\": { text: c.text } },\n    });\n    c.node = a;\n    state_1.default.graph.addCells([a]);\n    state_1.default.objects.push(a);\n}\nexports.addChoice = addChoice;\n\n\n//# sourceURL=webpack:///./editor/src/objects.ts?");

/***/ }),

/***/ "./editor/src/state.ts":
/*!*****************************!*\
  !*** ./editor/src/state.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dialogue = [\n    {\n        text: 'Hi',\n        choices: [0],\n        node: null,\n    },\n];\nconst choices = [\n    {\n        text: 'no',\n        nextDialogue: null,\n        node: null,\n    },\n    {\n        text: 'yes',\n        nextDialogue: null,\n        node: null,\n    },\n];\nconst graph = new joint.dia.Graph();\nconst objects = [];\nexports.default = {\n    dialogue,\n    choices,\n    graph,\n    objects,\n    adding: false,\n    addingType: null,\n};\n\n\n//# sourceURL=webpack:///./editor/src/state.ts?");

/***/ })

/******/ });