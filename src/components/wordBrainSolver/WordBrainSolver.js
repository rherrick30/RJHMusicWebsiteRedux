import React, {useState} from 'react';


const WordBrainSolver = () => {

    const [board, setBoard] = useState("")

    const setBoardChange = (sender) => {
        const searchText = sender.target.value.toLowerCase();
        setBoard(searchText);
    }

    const individualLetters = board.split("")
    const sideLen = (individualLetters.length>0)  ? Math.ceil(Math.sqrt(individualLetters.length)) : 0
    console.log(`len is ${individualLetters.length} with a rowsize of ${sideLen}`)


    const executeSearch = () => {

    }

    return(<div>
        <h1>Solver</h1>
        <h3>Set Board</h3>
        <input type="text" onChange={setBoardChange}/>
        <input type="button" onClick={executeSearch} value="search"/>
    </div>)
}

export default WordBrainSolver