(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["chords"] = factory();
	else
		root["chords"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/caculators.js":
/*!***************************!*\
  !*** ./src/caculators.js ***!
  \***************************/
/*! exports provided: caculateChord, caculateScaleChords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "caculateChord", function() { return caculateChord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "caculateScaleChords", function() { return caculateScaleChords; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maps */ "./src/maps.js");



function caculateChord({
    root,
    type,
    add,
    omit,
    on
}, initOctave, signType = '#') {
    let
        result = [],
        intervalArr = _utils__WEBPACK_IMPORTED_MODULE_0__["typeToInterval"](type),
        rootInterval = _maps__WEBPACK_IMPORTED_MODULE_1__["noteMap"][root];

    add.map(degree => {
        intervalArr.push(_maps__WEBPACK_IMPORTED_MODULE_1__["degreeMap"][degree]);
    })

    intervalArr.sort((a, b) => {
        return a - b;
    });

    for (let i = 0; i < omit.length; i++) {
        for (let j = 0; j < intervalArr.length; j++) {
            if (omit[i] == intervalArr[j]);
            intervalArr.splice(i, 1);
        }
    }

    let abInterval = _utils__WEBPACK_IMPORTED_MODULE_0__["absoluteIntervalArr"](rootInterval, intervalArr)
    if (initOctave) result = _utils__WEBPACK_IMPORTED_MODULE_0__["intervalArrToNotesO"](abInterval, initOctave, signType);
    else result = _utils__WEBPACK_IMPORTED_MODULE_0__["intervalArrToNotes"](abInterval, signType);

    if (on) _utils__WEBPACK_IMPORTED_MODULE_0__["replaceRoot"](result, on, initOctave);
    return result;
}

function caculateScaleChords({
    root,
    type
}, initOctave, signType = '#') {
    let
        chordsArr = [],
        extendIntervalArr = [],

        rootInterval = _maps__WEBPACK_IMPORTED_MODULE_1__["noteMap"][root],
        intervalArr = _utils__WEBPACK_IMPORTED_MODULE_0__["scaleToInterval"](_maps__WEBPACK_IMPORTED_MODULE_1__["scaleMap"][type]),
        abIntervalArr = _utils__WEBPACK_IMPORTED_MODULE_0__["absoluteIntervalArr"](rootInterval, intervalArr);

    // get the intervals with three more notes in a scale
    extendIntervalArr = extendIntervalArr.concat(abIntervalArr);
    for (let i = 1; i < 5; i++) {
        extendIntervalArr.push(abIntervalArr[i] + 12);
    }

    let notes = initOctave ?
        _utils__WEBPACK_IMPORTED_MODULE_0__["intervalArrToNotesO"](extendIntervalArr, initOctave, signType) :
        _utils__WEBPACK_IMPORTED_MODULE_0__["intervalArrToNotes"](extendIntervalArr, initOctave);

    for (let i = 0; i < abIntervalArr.length; i++) {
        chordsArr.push([notes[i], notes[i + 2], notes[i + 4]]);
    }

    return chordsArr;
}



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: chord, scaleChords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chord", function() { return chord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleChords", function() { return scaleChords; });
/* harmony import */ var _caculators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./caculators */ "./src/caculators.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");





function chord(strOrOptions, initOctave, signType) {

    // validateChord(arguments);

    return (Object.prototype.toString.call(strOrOptions) === '[object Object]')
    ? Object(_caculators__WEBPACK_IMPORTED_MODULE_0__["caculateChord"])(strOrOptions, initOctave, signType)
    : Object(_caculators__WEBPACK_IMPORTED_MODULE_0__["caculateChord"])(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["strToOptions"])(strOrOptions), initOctave, signType);
}


function scaleChords(options, initOctave, signType) {

    // validateScaleChords(arguments);

    return Object(_caculators__WEBPACK_IMPORTED_MODULE_0__["caculateScaleChords"])(options, initOctave, signType);
}



/***/ }),

/***/ "./src/maps.js":
/*!*********************!*\
  !*** ./src/maps.js ***!
  \*********************/
/*! exports provided: typeMap, noteMap, intervalMap, degreeMap, scaleMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeMap", function() { return typeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noteMap", function() { return noteMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intervalMap", function() { return intervalMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degreeMap", function() { return degreeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleMap", function() { return scaleMap; });
let intervalMap = {
    0: ['C'],
    1: ['C#', 'Db'],
    2: ['D'],
    3: ['D#', 'Bb'],
    4: ['E'],
    5: ['F'],
    6: ['F#', 'Gb'],
    7: ['G'],
    8: ['G#', 'Ab'],
    9: ['A'],
    10: ['A#', 'Bb'],
    11: ['B']
}

let noteMap = {
    'C': 0,
    'C#': 1,
    'Db': 1,
    'D': 2,
    'D#': 3,
    'Eb': 3,
    'E': 4,
    'Fb': 4,
    'E#': 5,
    'F': 5,
    'F#': 6,
    'Gb': 6,
    'G': 7,
    'G#': 8,
    'Ab': 8,
    'A': 9,
    'A#': 10,
    'Bb': 10,
    'B': 11,
}

let degreeMap = {
    2: 2,
    3: 4,
    4: 5,
    5: 7,
    6: 9,
    7: 11,
    8: 12, //1
    9: 14, //2
    10: 16, //3
    11: 17, //4
    12: 19, //5
    13: 21, //6
    14: 23, //7
    15: 24 //1
}

let typeMap = new Map([
    ['m7', [3, 7, 10]],
    ['m9', [3, 7, 10, 14]],
    ['m11', [3, 7, 10, 14, 17]],
    ['M7', [4, 7, 11]],
    ['M9', [4, 7, 10, 14]],
    ['M11', [4, 7, 10, 14, 17]],
    ['aug', [4, 8]],
    ['dim', [3, 6]],
    ['sus2', [2, 7]],
    ['sus4', [5, 7]],
    ['7', [3, 7, 11]],
    ['9', [3, 7, 11, 14]],
    ['11', [3, 7, 11, 14, 17]],
    ['m', [3, 7]],
    ['', [4, 7]]
])

let scaleMap = {
    'major': [2,2,1,2,2,2,1],
    'minor': [2,1,2,2,1,2,2]
}



/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getScale, getRoot, getType, getAdd, strToOptions, reverseMap, intervalArrToNotes, intervalArrToNotesO, typeToInterval, replaceRoot, absoluteIntervalArr, scaleToInterval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScale", function() { return getScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoot", function() { return getRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getType", function() { return getType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAdd", function() { return getAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strToOptions", function() { return strToOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverseMap", function() { return reverseMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intervalArrToNotes", function() { return intervalArrToNotes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intervalArrToNotesO", function() { return intervalArrToNotesO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeToInterval", function() { return typeToInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceRoot", function() { return replaceRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "absoluteIntervalArr", function() { return absoluteIntervalArr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleToInterval", function() { return scaleToInterval; });
/* harmony import */ var _maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maps */ "./src/maps.js");




function typeToInterval(type) {
    let result = _maps__WEBPACK_IMPORTED_MODULE_0__["typeMap"].get(type);
    if (!result) throw `can't find a chord type matched ${type}`;
    return result;
}


function replaceRoot(result, note, initOctave) {
    if (initOctave) {
        let root = result[0];
        let flagInterval = _maps__WEBPACK_IMPORTED_MODULE_0__["noteMap"][result[1]];
        let noteInterval = _maps__WEBPACK_IMPORTED_MODULE_0__["noteMap"][note];

        if (flagInterval = noteInterval) return;
        else if (flagInterval > noteInterval) {
            result.splice(0, 1, note + initOctave);
        } else {
            result.splice(0, 1, note + (initOctave - 1));
        }

        result.push(getRoot(root) + (getNumber(root) + 1));
    } else {
        result.unshift(note);
    }
}


// Get all the absolute intervals, the result array will convert to notes directly.
function absoluteIntervalArr(rootInterval, intervalArr) {
    let result = [rootInterval];
    let abInterval;

    for (let interval of intervalArr) {
        abInterval = rootInterval + interval;
        result.push(abInterval);
    }

    return result;
}


function intervalArrToNotesO(intervalArr, initOctave, signType) {

    let result = [],
        octave,
        note,
        noteKey,
        signIndex = getSignIndex(signType);

    for (let interval of intervalArr) {
        octave = initOctave;
        while (interval >= 12) {
            interval -= 12;
            octave++;
        }

        note = _maps__WEBPACK_IMPORTED_MODULE_0__["intervalMap"][interval];
        noteKey = note[signIndex] ? note[signIndex] : note[0];

        result.push(noteKey + octave);
    }

    return result;
}

function intervalArrToNotes(intervalArr, signType) {
    let result = [],
        note,
        noteKey,
        signIndex = getSignIndex(signType);

    for (let interval of intervalArr) {
        while (interval >= 12) {
            interval -= 12;
        }

        note = _maps__WEBPACK_IMPORTED_MODULE_0__["intervalMap"][interval];
        noteKey = note[signIndex] ? note[signIndex] : note[0];

        result.push(noteKey);

    }

    return result;
}


function getRoot(str) {
    return str.match(/[A-G](#|b)?/)[0];
}

function getNumber(str) {
    return Number(str.match(/\d/)[0]);
}

function getType(str) {

    let result = null;
    for (let [key] of _maps__WEBPACK_IMPORTED_MODULE_0__["typeMap"]) {
        let reg = new RegExp(`^[A-G](#|b)?(${key}\\d{0,2})`);

        if (result = str.match(reg)) {
            return result[2];
        }
    }
}

function getAdd(str) {
    let result = [];
    let reg = /add(\d{1,2})/g;

    let addItem;
    while (addItem = reg.exec(str)) {
        result.push(addItem[1]) // index从0开始
    }

    return result;
}

function getOmit(str) {
    let result = [];
    let reg = /omit(\d{1,2})/g;

    let addItem;
    while (addItem = reg.exec(str)) {
        result.push(addItem[1]) // index从0开始
    }

    return result;
}

function getOn(str) {
    let result = str.match(/\/([A-G](#|b)?)/);
    if (result) {
        return result[1];
    }
}

function getSignIndex(signType) {
    return (signType == '#') ? 0 : 1;
}


function strToOptions(str) {
    let options = {
        root: getRoot(str),
        type: getType(str),
        add: getAdd(str),
        omit: getOmit(str),
        on: getOn(str),
    }

    return options;
}


function reverseMap(map) {
    let newMap = Object.create(null);

    for (let i in map) {
        newMap[map[i]] = i;
    }

    return newMap;
}


function getScale({
    root,
    type,
}, initOctave, signType = '#') {
    let rootInterval = _maps__WEBPACK_IMPORTED_MODULE_0__["noteMap"][root],
        scale = _maps__WEBPACK_IMPORTED_MODULE_0__["scaleMap"][type],
        intervalArr = scaleToInterval(scale),
        abIntervalArr = absoluteIntervalArr(rootInterval, intervalArr);

    if (initOctave) return intervalArrToNotesO(abIntervalArr, initOctave, signType);
    else return intervalArrToNotes(abIntervalArr, signType);
}

function scaleToInterval(intervalArr) {
    let result = [];

    for (let i = 0; i < intervalArr.length; i++) {
        if (!i) result.push(intervalArr[i]);
        else {
            result.push(result[i - 1] + intervalArr[i]);
        }
    }

    return result;
}




/***/ })

/******/ });
});
//# sourceMappingURL=chords.js.map