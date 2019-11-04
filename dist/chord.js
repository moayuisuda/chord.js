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

/***/ "./src/func.js":
/*!*********************!*\
  !*** ./src/func.js ***!
  \*********************/
/*! exports provided: getChord */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChord", function() { return getChord; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");


function getChord(strOrOptions, range, signType) {
    let options = {
        root: '', // C,D,Cb...(must)
        type: '', // M,m,m7,M7,sus2...(must)
        add: '', // 2,3,4,[2,3].....
        omit: '', // 2,3,4,[2,3].....
        on: '' // if you want a chord like 'C/G', set the root 'C', and the on 'G'
    }

    if(Object.prototype.toString.call(strOrOptions) == '[object Object]') {
        return caculate(strOrOptions, range, signType);
    } else {
        options = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["strToOptions"])(strOrOptions);
        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["caculateChord"])(options, range);
    }
}



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _func__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./func */ "./src/func.js");




console.log(Object(_func__WEBPACK_IMPORTED_MODULE_1__["getChord"])('Cm7'));

/***/ }),

/***/ "./src/source.js":
/*!***********************!*\
  !*** ./src/source.js ***!
  \***********************/
/*! exports provided: typeMap, noteMap, intervalMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeMap", function() { return typeMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noteMap", function() { return noteMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intervalMap", function() { return intervalMap; });
let typeMap = {
    m7: [3, 7, 10],
    m9: [3, 7, 10, 14],
    m11: [3, 7, 10, 14, 18],
    M7: [4, 7, 11],
    M9: [4, 7, 10, 14],
    M11: [4, 7, 10, 14, 18],
    aug: [4, 8],
    dim: [3, 6],
    sus2: [2, 7],
    sus4: [5, 7],
    7: [3, 7, 11],
    9: [3, 7, 11, 14],
    11: [3, 7, 11, 14, 18],
    M: [4, 7],
    m: [3, 7],
}

let intervalMap = {
    0: ['C'],
    1: ['C#', 'Db'],
    2: ['D'],
    3: ['E'],
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




/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getRoot, getType, getAdd, caculateChord, strToOptions, reverseMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoot", function() { return getRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getType", function() { return getType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAdd", function() { return getAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "caculateChord", function() { return caculateChord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strToOptions", function() { return strToOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverseMap", function() { return reverseMap; });
/* harmony import */ var _source__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./source */ "./src/source.js");


function caculateChord(options, range, signType) {
    let signIndex = (signType == '#' || !signType) ? 0 : 1;

    let intervalArr = _source__WEBPACK_IMPORTED_MODULE_0__["typeMap"][options.type];
    let rootInterval = _source__WEBPACK_IMPORTED_MODULE_0__["noteMap"][options.root];

    let result = [options.root];

    debugger
    for (let interval of intervalArr) {
        let octave = range;
        if (interval >= 12) {
            interval = interval - 12;
            octave++;
        }

        noteKey = intervalMap[rootInterval + interval][signIndex];
        if (range) {
            result.push(noteKey + octave);
        } else {
            result.push(noteKey);
        }
    }

    return result;
}

function getRoot(str) {
    return str.slice(0, 1);
}

function getType(str) {
    let result = null;
    for (let i in _source__WEBPACK_IMPORTED_MODULE_0__["typeMap"]) {
        let reg = new RegExp(`^[A-G](#|b)?(${i}\\d{0,2})`);

        if (result = str.match(reg)) {
            return result[3];
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





/***/ })

/******/ });
});
//# sourceMappingURL=chord.js.map