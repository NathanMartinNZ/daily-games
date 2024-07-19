import { writable, get } from 'svelte/store'

const gameState = {
    rows: [
        [
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' }
        ],
        [
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' }
        ],
        [
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' }
        ],
        [
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' }
        ],
        [
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' }
        ],
        [
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' },
            { letter: '', hint: '' }
        ]
    ],
    current_round: 0,
    playing: true,
    win: false,
    word: ''
};

const keyboardRow1State = [
    {letter: "Q", incorrect: false},
    {letter: "W", incorrect: false},
    {letter: "E", incorrect: false},
    {letter: "R", incorrect: false},
    {letter: "T", incorrect: false},
    {letter: "Y", incorrect: false},
    {letter: "U", incorrect: false},
    {letter: "I", incorrect: false},
    {letter: "O", incorrect: false},
    {letter: "P", incorrect: false}
]

const keyboardRow2State = [
    {letter: "A", incorrect: false},
    {letter: "S", incorrect: false},
    {letter: "D", incorrect: false},
    {letter: "F", incorrect: false},
    {letter: "G", incorrect: false},
    {letter: "H", incorrect: false},
    {letter: "J", incorrect: false},
    {letter: "K", incorrect: false},
    {letter: "L", incorrect: false}
]

const keyboardRow3State = [
    {letter: "enter", incorrect: null},
    {letter: "Z", incorrect: false},
    {letter: "X", incorrect: false},
    {letter: "C", incorrect: false},
    {letter: "V", incorrect: false},
    {letter: "B", incorrect: false},
    {letter: "N", incorrect: false},
    {letter: "M", incorrect: false},
    {letter: "back", incorrect: null}
]

export const game = writable(gameState)
export const keyboardRow1 = writable(keyboardRow1State)
export const keyboardRow2 = writable(keyboardRow2State)
export const keyboardRow3 = writable(keyboardRow3State)