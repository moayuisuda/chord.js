let intervalMap = {
    0: ['C'],
    1: ['C#', 'Db'],
    2: ['D'],
    3: ['D#', 'Eb'],
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
    '#2': 3,
    'b3': 3,
    '#4': 6,
    'b5': 6,
    '#4': 8,
    'b6': 8,
    '#6': 10,
    'b7': 10,
    '#8': 13,
    'b9': 13,
    '#9': 13,
    'b10': 13,
    '#11': 18,
    'b12': 18,
    '#12': 20,
    'b13': 20,
    '#13': 22,
    'b14': 22,
    '2': 2,
    '3': 4,
    '4': 5,
    '5': 7,
    '6': 9,
    '7': 11,
    '8': 12, //1
    '9': 14, //2
    '10': 16, //3
    '11': 17, //4
    '12': 19, //5
    '13': 21, //6
    '14': 23, //7
    '15': 24 //1
}

let typeMap = new Map([
    ['m7', [3, 7, 10]],
    ['m9', [3, 7, 10, 14]],
    ['m11', [3, 7, 10, 14, 17]],
    ['M7', [4, 7, 11]],
    ['M9', [4, 7, 11, 14]],
    ['M11', [4, 7, 11, 14, 17]],
    ['aug', [4, 8]],
    ['dim', [3, 6]],
    ['sus2', [2, 7]],
    ['sus4', [5, 7]],
    ['7', [4, 7, 10]],
    ['9', [4, 7, 10, 14]],
    ['11', [3, 7, 11, 14, 17]],
    ['m', [3, 7]],
    ['', [4, 7]]
])

let scaleMap = {
    'ionian': [2,2,1,2,2,2,1],
    'major': [2,2,1,2,2,2,1],    
    'dorian': [2,1,2,2,2,1,2],
    'phrygian': [1,2,2,2,1,2,2],
    'lydian': [2,2,2,1,2,2,1],
    'mixolydian': [2,2,1,2,2,1,2],
    'aeolian': [2,1,2,2,1,2,2],
    'minor': [2,1,2,2,1,2,2],
    'locrian': [1,2,2,1,2,2,2]
}

export {typeMap, noteMap, intervalMap, degreeMap, scaleMap}