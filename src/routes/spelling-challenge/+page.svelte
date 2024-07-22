<script>
	import { onMount } from 'svelte';
    import { game } from './store';

    /**
	 * @param {any} e
	 */
    function onKeyDown(e) {
        const charCode = String.fromCharCode(e.keyCode)
        console.log(charCode, e.keyCode)
        $game.input = [...$game.input, charCode]
    }
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
<div>
	<h1 class="text-xl text-center font-bold my-2">Spelling challenge</h1>
    <a href="/" class="absolute top-0 right-0 mr-2 mt-1">🔙</a>
    <div>
        <span>{$game.input.join("")}</span>
    </div>
    <div class="container flex flex-col mx-auto">
        {#each $game.letters_other as letter_other}
            <button>{letter_other}</button>
        {/each}
        <button class="font-bold">{$game.letter_middle}</button>
    </div>
</div>