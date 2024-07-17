<script>
	let game = {
        rows: [
            [{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""}],
            [{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""}],
            [{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""}],
            [{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""}],
            [{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""}],
            [{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""},{letter:"", hint:""}]
        ],
        current_round: 0,
        playing: true,
        win: false,
        word: "REACT"
    }
    $: game = game

    function findInputIndex() {
        let idx = 0
        const row = game.rows[game.current_round]
        for(let i=0; i<row.length; i++) {
            if(row[i].letter === "") {
                idx = i
                break
            }
        }
        return idx
    }

    /**
	 * @param {{ keyCode: number; }} e
	 */
    function onKeyDown(e) {
        const letter = String.fromCharCode(e.keyCode)
        game.rows[game.current_round][findInputIndex()].letter = letter
        console.log(String.fromCharCode(e.keyCode))
        console.log(findInputIndex())
    }

    function setHints() {
        let row = game.rows[game.current_round - 1]
        console.log(row)
        row.forEach((cell, i) => {
            console.log(cell.letter, game.word[i])
            if(cell.letter === game.word[i]) {
                console.log("exact")
                cell.hint = "exact"
            } else if(game.word.includes(cell.letter)) {
                console.log("contains")
                cell.hint = "contains"
            }
        })
    }

    function onGuessSubmit() {
        if(game.rows[game.current_round].join("") === game.word) {
            console.log("WINNER")
        } else {
            game.current_round = game.current_round + 1
        }
        setHints()
    }
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />
<div>
    <h1>Wordle</h1>
    {#each game.rows as row}
        <div class="row">
            {#each row as cell}
                <span class={`cell ${cell.hint === "contains" ? "contains" : ""} ${cell.hint === "exact" ? "exact" : ""}`}>{cell.letter}</span>
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
</style>