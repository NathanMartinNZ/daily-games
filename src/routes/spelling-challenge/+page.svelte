<script>
	import { onMount } from 'svelte';
    import { game } from './store';

    onMount(() => {
		// Set initial letters

	});

    /**
	 * @param {string} letter
	 */
    function onKeyDown(letter) {
        $game.input = [...$game.input, letter]
    }

    /**
	 * @param {string} word
	 */
     async function checkIfValidWord(word) {
        const res = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        return res && res.ok ? true : false
    }

    /**
	 * @param {string} action
	 */
    async function onButtonClick(action) {
        const word = $game.input.join("").toLowerCase()
        const isNewWord = !$game.correct_answers.includes(word)
        const meetsMinCharCount = $game.input.length > 3
        const wordContainsMainLetter = $game.input.includes($game.letter_middle)

        if(action === "enter" && isNewWord && meetsMinCharCount && wordContainsMainLetter) {
            // Enter & word not already in correct_answers array & input is more than 3 characters & contains middle letter
            const validWord = await checkIfValidWord(word)

            if(validWord) {
                // Valid English word
                console.log("valid word")
                // Push answer to correct_answers array
                $game.correct_answers = [...$game.correct_answers, word.toUpperCase()]
                // Reset input array
                $game.input = []
            } else {
                console.log("invalid word")
                // Add animation
                $game.incorrect_guess = true
                // Remove animation
                setTimeout(() => {
                    $game.incorrect_guess = false
                }, 1500)
            }
        } else if(action === "back") {
            // Back
            const input = [...$game.input]
            input.pop()
            $game.input = input
        } else {
            // Add animation
            $game.incorrect_guess = true
            // Remove animation
            setTimeout(() => {
                $game.incorrect_guess = false
            }, 1500)
        }
    }
</script>

<div>
	<h1 class="text-xl text-center font-bold my-2">Spelling challenge</h1>
    <a href="/" class="absolute top-0 right-0 mr-2 mt-1">🔙</a>
    <div class="container flex w-11/12 gap-2 mx-auto min-h-8 mt-3 mb-2">
        {#each $game.correct_answers as answer}
            <span class="text-sm">{answer}</span>
        {/each}
    </div>
    <div class="container flex w-11/12 gap-2 mx-auto justify-center font-bold min-h-8 my-1">
        <span class="text-xl">{$game.input.join("")}</span>
    </div>
    <div class="spelling-container mx-auto" class:animation-incorrect={$game.incorrect_guess}>
        <button class="hex font-bold center-item" on:click={() => onKeyDown($game.letter_middle)}>{$game.letter_middle}</button>
        {#each $game.letters_other as letter_other}
            <button class="hex outer-item" on:click={() => onKeyDown(letter_other)}>{letter_other}</button>
        {/each}
    </div>
    <div class="container flex w-11/12 gap-2 mx-auto max-w-sm mt-2">
        <button on:click={() => onButtonClick("enter")} class="w-full bg-transparent font-semibold py-2 px-4 border rounded">enter</button>
        <button on:click={() => onButtonClick("back")} class="w-full bg-transparent font-semibold py-2 px-4 border rounded">back</button>
    </div>
</div>

<style>
.spelling-container {
  position: relative;
  width: 300px;
  height: 300px;
}

.hex {
  position: absolute;
  width: 90px;
  height: 100px;
  background-color: #f7da21;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}

.center-item {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #a8dadc;
}

.outer-item {
  background-color: #e6e6e6;
}

.outer-item:nth-child(2) { top: 7%; left: 34%; transform: translateX(-50%); }
.outer-item:nth-child(3) { top: 7%; left: 66%; transform: translateX(-50%); }
.outer-item:nth-child(4) { top: 33.5%; left: 82%; transform: translateX(-50%); }
.outer-item:nth-child(5) { top: 60%; left: 66%; transform: translateX(-50%); }
.outer-item:nth-child(6) { top: 60%; left: 34%; transform: translateX(-50%); }
.outer-item:nth-child(7) { top: 33.5%; left: 18%; transform: translateX(-50%); }

.typing-indicator {
    font-weight: normal;
}

.hide {
    opacity: 0;
}
</style>