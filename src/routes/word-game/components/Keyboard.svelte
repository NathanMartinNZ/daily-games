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
        const letterKeyCode = letter.charCodeAt(0)
        const guess_ready_to_submit = $game.rows[$game.current_round].filter(letter => letter.letter === "").length
        if(letterKeyCode >= 65 && letterKeyCode <= 90 && guess_ready_to_submit) {
            // Input: A-Z
            $game.rows[$game.current_round][findInputIndex()].letter = letter;
        } else if(letterKeyCode === 98) {
            // Input: back
            let idx = findInputIndex()
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
		row.forEach((cell, i) => {
			if (cell.letter === $game.word[i]) {
				cell.hint = 'exact';
			} else if ($game.word.includes(cell.letter)) {
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
		const valid_guess = WORD_LIST.includes(guess.toLowerCase());
		if (valid_guess) {
			if (guess === $game.word) {
                // State: Winner
				setHints();
				$game.playing = false;
				$game.win = true;
			} else {
                // State: Next round / Game lost
				setHints();
                markKeyboardLettersIncorrect();
                if($game.current_round < 5) {
                    // State: Increment round number if not lost
                    $game.current_round = $game.current_round + 1;
                } else {
                    // State: Game lost. Show correct word and give option to reset
                }
			}
		} else {
            // State: Invalid guess
            // Add animation
            $game.incorrect_guess = true
            // Remove animation
            setTimeout(() => {
                $game.incorrect_guess = false
            }, 1500)
        }
	}
</script>

<div class="mt-2" class:animation-incorrect={$game.incorrect_guess}>
    <div class="flex flex-wrap mx-auto">
        <div class="row flex m-auto">
            {#each $keyboardRow1 as key}
                <button on:click={() => onKeyDown(key.letter)} class={`cell font-sans text-center items-center m-auto ${key.incorrect ? "incorrect" : ""}`}>
                    <span class="pt-1 text-md">{key.letter}</span>
                </button>
            {/each}
        </div>
    </div>
    <div class="container flex mx-auto">
        <div class="row flex m-auto">
            {#each $keyboardRow2 as key}
                <button on:click={() => onKeyDown(key.letter)} class={`cell font-sans text-center items-center m-auto ${key.incorrect ? "incorrect" : ""}`}>
                    <span class="pt-1 text-md">{key.letter}</span>
                </button>
            {/each}
        </div>
    </div>
    <div class="flex flex-wrap">
        <div class="row flex m-auto">
            {#each $keyboardRow3 as key}
                <button on:click={() => onKeyDown(key.letter)} class={`cell font-sans text-center items-center m-auto ${key.incorrect ? "incorrect" : ""} ${key.letter === "enter" ? "special" : ""} ${key.letter === "back" ? "special" : ""}`}>
                    <span class="pt-1 text-md">{key.letter}</span>
                </button>
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
		border: 1px #b1a7a6 solid;
        border-radius: 2px;
	}
    .cell.special {
        width: 44px!important;
    }
    .cell.incorrect {
        background-color: #b1a7a6;
    }
    .animation-incorrect {
        animation: shake 0.2s;
        animation-iteration-count: infinite;
    }

    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
</style>