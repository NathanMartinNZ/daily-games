<script>
	import { onMount } from 'svelte';
    import { game } from './store';

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
        if(action === "enter" && !$game.correct_answers.includes(word) && $game.input.length > 0) {
            // Enter & word not already in correct_answers array & input not empty
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
            }
        } else if(action === "back") {
            // Back
            const input = [...$game.input]
            input.pop()
            $game.input = input
        }
    }
</script>

<div>
	<h1 class="text-xl text-center font-bold my-2">Spelling challenge</h1>
    <a href="/" class="absolute top-0 right-0 mr-2 mt-1">🔙</a>
    <div class="flex gap-2">
        {#each $game.correct_answers as answer}
            <span>{answer}</span>
        {/each}
    </div>
    <div>
        <span class="test">{$game.input.join("")}</span>
    </div>
    <div class="spelling-container mx-auto">
        <button class="hex font-bold center-item" on:click={() => onKeyDown($game.letter_middle)}>{$game.letter_middle}</button>
        {#each $game.letters_other as letter_other}
            <button class="hex outer-item" on:click={() => onKeyDown(letter_other)}>{letter_other}</button>
        {/each}
    </div>
    <div class="container flex gap-2 mx-auto max-w-sm mt-2">
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
  background-color: #f7da21;
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
</style>