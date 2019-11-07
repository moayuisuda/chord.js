interface notesArr {
    [index: number]: string
}

interface intervalsArr {
    [index: number]: number
}

interface options {
    root: string,
    type: string,
    add?: [string, notesArr],
    omit?: [string, notesArr],
    on?: string
}


function chord(options: options, initOctave?: string, signType?: string): notesArr

function scale(options: options, initOctave?: string, signType?: string): notesArr

function scaleChords(options: options, initOctave?: string, signType?: string): notesArr[]