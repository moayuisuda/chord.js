interface notesArr {
    [index: number]: string
}

interface intervalsArr {
    [index: number]: number
}

interface options {
    root: string,
    type: string,
    add: [string, notesArr],
    omit: [string, notesArr],
    on: string
}

function chord(options: options, range?: string, signType?: string): notesArr

function scale(root: string, type: string): notesArr

function scaleChords(root: string, type: string): notesArr[]