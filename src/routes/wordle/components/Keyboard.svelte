<script>
    let keyboard_row1 = [
        {letter: "q", incorrect: false},
        {letter: "w", incorrect: false},
        {letter: "e", incorrect: false},
        {letter: "r", incorrect: false},
        {letter: "t", incorrect: false},
        {letter: "y", incorrect: false},
        {letter: "u", incorrect: false},
        {letter: "i", incorrect: false},
        {letter: "o", incorrect: false},
        {letter: "p", incorrect: false}
    ]
    let keyboard_row2 = [
        {letter: "a", incorrect: false},
        {letter: "s", incorrect: false},
        {letter: "d", incorrect: false},
        {letter: "f", incorrect: false},
        {letter: "g", incorrect: false},
        {letter: "h", incorrect: false},
        {letter: "j", incorrect: false},
        {letter: "k", incorrect: false},
        {letter: "l", incorrect: false}
    ]
    let keyboard_row3 = [
        {letter: "enter", incorrect: null},
        {letter: "z", incorrect: false},
        {letter: "x", incorrect: false},
        {letter: "c", incorrect: false},
        {letter: "v", incorrect: false},
        {letter: "b", incorrect: false},
        {letter: "n", incorrect: false},
        {letter: "m", incorrect: false},
        {letter: "back", incorrect: null}
    ]
</script>

<div>
    Keyboard
    <div class="flex flex-wrap mx-auto">
        <div class="row flex m-auto">
            {#each keyboard_row1 as key}
                <div class="cell font-sans text-center items-center m-auto">
                    <p class="pt-1 text-md">{key.letter}</p>
                </div>
            {/each}
        </div>
    </div>
    <div class="container flex mx-auto">
        <div class="row flex m-auto">
            {#each keyboard_row2 as key}
                <div class="cell font-sans text-center items-center m-auto">
                    <p class="pt-1 text-md">{key.letter}</p>
                </div>
            {/each}
        </div>
    </div>
    <div class="flex flex-wrap">
        <div class="row flex m-auto">
            {#each keyboard_row3 as key}
                <div class={`cell font-sans text-center items-center m-auto ${key.letter === "enter" ? "special" : ""} ${key.letter === "back" ? "special" : ""}`}>
                    <p class="pt-1 text-md">{key.letter}</p>
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
</style>