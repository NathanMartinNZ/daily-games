import { writable, get } from 'svelte/store'

interface GameState {
    letter_middle: string;
    letters_other: string[];
    input: string[];
    playing: boolean;
    incorrect_guess: boolean;
}

const gameState:GameState = {
    letter_middle: "N",
    letters_other: ["P", "O", "I", "D", "S", "T"],
    input: [],
    playing: true,
    incorrect_guess: false
}

export const game = writable(gameState)