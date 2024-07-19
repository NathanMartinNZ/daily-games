<script>
    import { game, keyboardRow1, keyboardRow2, keyboardRow3 } from '../store';
    import { WORD_LIST } from '../word_list';

    function findInputIndex() {
        const row = $game.rows[$game.current_round];
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
	 * @param {string} letter
	 */
    function onKeyDown(letter) {
        console.log(letter)
        const letterKeyCode = letter.charCodeAt(0)
        console.log(letterKeyCode)
        const guess_ready_to_submit = $game.rows[$game.current_round].filter(letter => letter.letter === "").length
        if(letterKeyCode >= 65 && letterKeyCode <= 90 && guess_ready_to_submit) {
            // Input: A-Z
            $game.rows[$game.current_round][findInputIndex()].letter = letter;
            console.log($game.rows[$game.current_round])
        } else if(letterKeyCode === 98) {
            // Input: back
            let idx = findInputIndex()
            console.log(idx)
            if(idx > 0) {
                $game.rows[$game.current_round][idx - 1].letter = "";
            }
        } else if(letterKeyCode === 101) {
            // Input: enter
            onGuessSubmit()
        }
	}  
    
	function setHints() {
		let row = $game.rows[$game.current_round];
		console.log('row:', row);
		row.forEach((cell, i) => {
			console.log(cell.letter, $game.word[i]);
			if (cell.letter === $game.word[i]) {
				console.log('exact');
				cell.hint = 'exact';
			} else if ($game.word.includes(cell.letter)) {
				console.log('contains');
				cell.hint = 'contains';
			} else {
				cell.hint = 'incorrect';
			}
		});
	}

    function markKeyboardLettersIncorrect() {
        const guessArr = $game.rows[$game.current_round].map((letter) => letter.letter)
        guessArr.forEach(letter => {
            // If word doesn't include the letter at all, mark as incorrect for styling
            if(!$game.word.split("").includes(letter)) {
                let letterInObj1 = $keyboardRow1.find(letterObj => letterObj.letter === letter)
                if(letterInObj1) {
                    letterInObj1.incorrect = true
                }
                let letterInObj2 = $keyboardRow2.find(letterObj => letterObj.letter === letter)
                if(letterInObj2) {
                    letterInObj2.incorrect = true
                }
                let letterInObj3 = $keyboardRow3.find(letterObj => letterObj.letter === letter)
                if(letterInObj3) {
                    letterInObj3.incorrect = true
                }
                // Reassign store objects to force rerender component
                $keyboardRow1 = $keyboardRow1
                $keyboardRow2 = $keyboardRow2
                $keyboardRow3 = $keyboardRow3
            }
        })
    }
    
	function onGuessSubmit() {
		const guess = $game.rows[$game.current_round].map((letter) => letter.letter).join('');
		console.log(guess, $game.word);
		const valid_guess = WORD_LIST.includes(guess.toLowerCase());
		if (valid_guess) {
			if (guess === $game.word) {
				setHints();
				console.log('WINNER');
				$game.playing = false;
				$game.win = true;
			} else {
				setHints();
                markKeyboardLettersIncorrect();
				console.log('INCREMENT ROUND NUMBER');
                if($game.current_round < 5) {
                    // Increment round number if not lost
                    $game.current_round = $game.current_round + 1;
                } else {
                    // Game lost. Show correct word and give option to reset
                    console.log("GAME LOST")
                }
			}
		} else {
            console.log("INVALID GUESS")
        }
	}    
</script>

<div class="mt-2">
    <div class="flex flex-wrap mx-auto">
        <div class="row flex m-auto">
            {#each $keyboardRow1 as key}
                <div class={`cell font-sans text-center items-center m-auto ${key.incorrect ? "incorrect" : ""}`}>
                    <button class="pt-1 text-md" on:click={() => onKeyDown(key.letter)}>{key.letter}</button>
                </div>
            {/each}
        </div>
    </div>
    <div class="container flex mx-auto">
        <div class="row flex m-auto">
            {#each $keyboardRow2 as key}
                <div class={`cell font-sans text-center items-center m-auto ${key.incorrect ? "incorrect" : ""}`}>
                    <button class="pt-1 text-md" on:click={() => onKeyDown(key.letter)}>{key.letter}</button>
                </div>
            {/each}
        </div>
    </div>
    <div class="flex flex-wrap">
        <div class="row flex m-auto">
            {#each $keyboardRow3 as key}
                <div class={`cell font-sans text-center items-center m-auto ${key.incorrect ? "incorrect" : ""} ${key.letter === "enter" ? "special" : ""} ${key.letter === "back" ? "special" : ""}`}>
                    <button class="pt-1 text-md" on:click={() => onKeyDown(key.letter)}>{key.letter}</button>
                </div>
            {/each}
        </div>
    </div>        
</div>

<style>
	.row {
		display: flex;
	}
	.cell {
		height: 40px;
		width: 25px;
		margin: 3px;
		border: 1px black solid;
        border-radius: 2px;
	}
    .cell.special {
        width: 44px!important;
    }
    .cell.incorrect {
        background-color: grey;
    }
</style>