<script>
	import { onMount } from 'svelte';
	import { WORD_LIST } from './word_list';
    import Keyboard from './components/Keyboard.svelte';

	let game = {
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
	$: game = game;

	function setWord() {
		game.word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase();
	}

	onMount(() => {
		// Set initial word to guess
		setWord();
	});

	function findInputIndex() {
        const row = game.rows[game.current_round];
		let idx = row.length;
		for (let i = 0; i < row.length; i++) {
			if (row[i].letter === '') {
				idx = i;
				break;
			}
		}
		return idx;
	}

	/**
	 * @param {{ keyCode: number; }} e
	 */
	function onKeyDown(e) {
		const letter = String.fromCharCode(e.keyCode);
        const guess_ready_to_submit = game.rows[game.current_round].filter(letter => letter.letter === "").length
        if(e.keyCode >= 65 && e.keyCode <= 90 && guess_ready_to_submit) {
            // Input: A-Z
            game.rows[game.current_round][findInputIndex()].letter = letter;
        } else if(e.keyCode === 8 || e.keyCode === 46) {
            // Input: backspace or delete
            let idx = findInputIndex()
            console.log(idx)
            if(idx > 0) {
                game.rows[game.current_round][idx - 1].letter = "";
            }
        }
	}

	function setHints() {
		let row = game.rows[game.current_round];
		console.log('row:', row);
		row.forEach((cell, i) => {
			console.log(cell.letter, game.word[i]);
			if (cell.letter === game.word[i]) {
				console.log('exact');
				cell.hint = 'exact';
			} else if (game.word.includes(cell.letter)) {
				console.log('contains');
				cell.hint = 'contains';
			} else {
				cell.hint = 'incorrect';
			}
		});
	}

	function onGuessSubmit() {
		const guess = game.rows[game.current_round].map((letter) => letter.letter).join('');
		console.log(guess, game.word);
		const valid_guess = WORD_LIST.includes(guess.toLowerCase());
		if (valid_guess) {
			if (guess === game.word) {
				setHints();
				console.log('WINNER');
				game.playing = false;
				game.win = true;
			} else {
				setHints();
				console.log('INCREMENT ROUND NUMBER');
                if(game.current_round < 5) {
                    // Increment round number if not lost
                    game.current_round = game.current_round + 1;
                } else {
                    // Game lost. Show correct word and give option to reset

                }
			}
		} else {
            console.log("INVALID GUESS")
        }
	}
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
<div>
	<h1 class="text-lg text-center font-bold mt-1">Wordle</h1>
    <div class="container flex m-auto my-1">
        <button on:click={onGuessSubmit} class="m-auto w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">ENTER</button>
    </div>
    <div class="container flex flex-col mx-auto">
        {#each game.rows as row}
            <div class="row flex m-auto">
                {#each row as cell}
                    <div
                        class={`cell font-sans text-center items-center m-auto ${cell.hint === 'contains' ? 'contains' : ''} ${cell.hint === 'exact' ? 'exact' : ''} ${cell.hint === 'incorrect' ? 'incorrect' : ''}`}
                    >
                        <p class="pt-1 text-lg font-bold">{cell.letter}</p>   
                    </div>
                {/each}
            </div>
        {/each}
    </div>
    <Keyboard />
</div>

<style>
	.cell {
		height: 40px;
		width: 40px;
		margin: 3px;
		border: 1px black solid;
        border-radius: 2px;
	}
	.cell.exact {
		background-color: green;
	}
	.cell.contains {
		background-color: orange;
	}
	.cell.incorrect {
		background-color: grey;
	}
</style>