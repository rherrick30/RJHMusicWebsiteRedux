import React, {useState, useEffect} from 'react';
import apiHelper from '../../api/apiHelper';
import _ from 'lodash'


const SummaryPage = () => {
    const [queryResults, setQueryResults] = useState([]);
    const [queryDetail, setQueryDetail] = useState([]);
    const [category, setCategory] = useState("");
    const [item, setItem] = useState("")

    const categories = [
        {id:'nationality', name:'From'},
        {id:'dateOfInterest', name:'Fan Since'},
        {id:'downloaded',name:'Downloaded'},
        {id:'releaseYear',name:'Released'},
        {id:'aquisitionYear',name:'Bought'},
    ]

    useEffect(()=>{
        if(category!== ""){
          
            apiHelper.getSummary(category).then(
                result => { 
                    let sortedResults = (()=>{
                    switch(category){
                        case "nationality":
                        case "downloaded":
                                return _.orderBy(result, "artists.length", "desc")
                        case "dateOfInterest":
                        case "releaseYear":
                        case "aquisitionYear":
                            return _.orderBy(result, "key")
                        default:    
                        return result
                    }})()
                    setQueryResults(sortedResults); 
                },
            );
        }
    },[category])

    const clickHandler = (item) => {
        setItem(item.key)
        switch(category){
            case "nationality":
            case "dateOfInterest":
                    // show artists
                setQueryDetail( _.orderBy( item.artists.map(a=>{
                    return { _id: a._id, formatedEntry: a.artist}
                }), "formatedEntry"));
                break;
            default:
                setQueryDetail(_.orderBy(item.albums.map(a=>{
                    return { _id: a._id, formatedEntry: a.title}
                }), "formatedEntry"))                
        }
    }

    const categorySelected = categories.filter(c=> c.id == category).pop() || {name: ""}
    return (
        <div>
            <div className="queryButtons" >
            {categories.map(c=>{
                return (<input key={c.id} type="button" onClick={()=> setCategory(c.id)} value={c.name} />)
            })}
            </div>
            <div className="queryResults">
                    {queryResults.map(r=>{
                        return(<><a className="queryDetailItem defaultColor" href="#" key={r.key} onClick={()=>{clickHandler(r)}}>{`${r.key} (${r.artists.length} artists, ${r.albums.length} albums)`}</a><br/></>)
                    })}
            </div>
            <div className="queryDetail" >
                <div className="queryDetailHeader">{categorySelected.name} {item}</div>
                    {queryDetail.map(r=>{
                        return(<div key={r._id} className="queryDetailItem">{r.formatedEntry}<br/></div>)
                    })}
            </div>
        </div>
    )

}


export default SummaryPage