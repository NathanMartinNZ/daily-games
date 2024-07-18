<script>
	import { onMount } from 'svelte';
	import { WORD_LIST } from './word_list';

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
		let idx = 0;
		const row = game.rows[game.current_round];
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
		game.rows[game.current_round][findInputIndex()].letter = letter;
		console.log(String.fromCharCode(e.keyCode));
		console.log(findInputIndex());
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
				game.current_round = game.current_round + 1;
			}
		} else {
            console.log("INVALID GUESS")
        }
	}
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
<div>
	<h1>Wordle</h1>
	{#each game.rows as row}
		<div class="row">
			{#each row as cell}
				<span
					class={`cell ${cell.hint === 'contains' ? 'contains' : ''} ${cell.hint === 'exact' ? 'exact' : ''} ${cell.hint === 'incorrect' ? 'incorrect' : ''}`}
					>{cell.letter}</span
				>
			{/each}
		</div>
	{/each}
	<button on:click={onGuessSubmit}>ENTER</button>
</div>

<style>
	.row {
		display: flex;
	}
	.cell {
		height: 40px;
		width: 40px;
		margin: 2px;
		border: 1px black solid;
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
