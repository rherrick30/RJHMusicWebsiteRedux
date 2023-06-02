import { postFunction } from "./apiExecutor";
const baseUrl = process.env.WB_URL;


export const getWordBrainSolutions = (sizes, gameBoard, presolvedWords, hint) => {
console.log(`calling ${baseUrl + 'wordBrain'}`)    
    return postFunction(baseUrl + 'wordBrain',{
        sizes, gameBoard, presolvedWords, hint})
}


