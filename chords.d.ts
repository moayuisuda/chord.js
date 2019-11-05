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

function getChord(options: options, range?: string, signType?: string): notesArr