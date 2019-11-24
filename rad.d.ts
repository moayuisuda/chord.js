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


declare function chord(options: options, initOctave?: string, signType?: string): notesArr

declare function scale(options: options, initOctave?: string, signType?: string): notesArr

declare function scaleChords(options: options, signType?: string): notesArr[]