<script>
	import { onMount } from 'svelte';
    import { game } from './store';
	import { WORD_LIST } from './word_list';
    import Keyboard from './components/Keyboard.svelte';


	function setWord() {
		$game.word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toUpperCase();
	}

	onMount(() => {
		// Set initial word to guess
		setWord();
	});
</script>

<div>
	<h1 class="text-lg text-center font-bold mt-1">What's the word?</h1>
    <div class="container flex flex-col mx-auto">
        {#each $game.rows as row}
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
		border: 1px #b1a7a6 solid;
        border-radius: 2px;
	}
	.cell.exact {
		background-color: #7cb518;
	}
	.cell.contains {
		background-color: #fbb02d;
	}
	.cell.incorrect {
		background-color: #b1a7a6;
	}
</style>