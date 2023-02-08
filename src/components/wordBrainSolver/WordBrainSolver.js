import React, {useState} from 'react';
import {getWordBrainSolutions} from '../../api/wordBrainApi'
import './wbs.css';


const WordBrainSolver = () => {

    const [board, setBoard] = useState("");
    const [presolved, setPresolved] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [hint, setHint] = useState("");
    const [queryDetail, setQueryDetail] = useState([]);
    const [goEnabled, setGoEnabled] = useState(true)
    const [errorText, setErrorText] = useState("");

    const setBoardChange = (sender) => {
        const searchText = sender.target.value.toLowerCase();
        setBoard(searchText);
    }

    const setPresolvedChange = sender => {
        const words = sender.target.value.toLowerCase();
        setPresolved(words.split(","));
    }
    
    const setSizeChange = sender => {
        setSizes([sender.target.valueAsNumber])
    }

    const setHintChange = sender => {
        const hint = sender.target.value.toLowerCase();
        setHint(hint);
    }

    const clearForm = () =>{
        setBoard("");
        setHint("");
        setPresolved([]);
        setQueryDetail([]);
        setErrorText("");
    }

    const individualLetters = board.split("")
    const sideLen = (individualLetters.length>0)  ? Math.ceil(Math.sqrt(individualLetters.length)) : 0
    console.log(`len is ${individualLetters.length} with a rowsize of ${sideLen}`)


    const executeSearch = async () => {
        setGoEnabled(false);
        setQueryDetail([]);
        setErrorText("");
        const answers = await getWordBrainSolutions(sizes,board,presolved,hint).catch(err=>{
            debugger
            setGoEnabled(true);
            console.log(`ERROR!:${JSON.stringify(err)}`)
            setErrorText(err.response?.data || err.message);
            return false;
        })

        setQueryDetail(answers?.results || [])
        setGoEnabled(true);
    }

    return(<div>
        <h1>Solver</h1>
        <div className='entry'>
            <h4>Length:</h4>
            <input type="number" className="length" onChange={setSizeChange}/>
        </div>
        <div className='entry'>
            <h4>Board:</h4>
            <input type="text" className="board" value={board }onChange={setBoardChange}/>
        </div>
        <div className='entry'>
            <h4>Words:</h4>
            <input type="text" className="presolvedWords" value={presolved.join(",")} onChange={setPresolvedChange} />
        </div>
        <div className='entry'>
            <h4>Hint:</h4>
            <input type="text" className="length" value={hint} onChange={setHintChange} />
        </div>
        <div className='buttons'>
            <input type="button" onClick={executeSearch} disabled={!goEnabled} value="search"/>    
            <input type="button" onClick={clearForm} value="clear"/>
            <text>{errorText}</text>
        </div>
        

        <div className="queryDetail" >
                <div className="queryDetailHeader">Results:</div>
                    {queryDetail.map((r, ndx)=>{
                        return(<div key={`results_${ndx}`} className="queryDetailItem">{r}<br/></div>)
                    })}
            </div>

    </div>)
}

export default WordBrainSolver