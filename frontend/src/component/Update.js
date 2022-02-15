import '../styles/crud.css'
import React, {useState,useEffect,Fragment} from 'react';
const axios = require('axios');
const Update = (props) => {
    const [name,setName] = useState(props.name);
    const [year,setYear] = useState(props.year);
    const [rank,setRank] = useState(props.rank);
    const [update,setUpdate] = useState(false);
    console.log(props)
    const updateMovie = async()=>{
        try{
            let id = props.id;
            let oldYear = props.year
            const updateMovieData = await axios({
                url: `${process.env.REACT_APP_HOSTNAME}/update`,
                method: "patch",
                data: {id,name,year,rank,oldYear}
            })
        }
        catch (e){
            console.log(e)
        }
    }
    useEffect(()=>{
        if(update){
            updateMovie();
        }
    },[update])
    return (
        <Fragment>
            <button type="button" class="btnproper" data-toggle="modal" data-target={`#update-${props.id}`}>Update</button>
            <div id={`update-${props.id}`} class="modal fade" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">Update</h4>
                    </div>
                    <div class="modal-body">
                        <a>Name</a>
                        <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <a>Year</a>
                        <input type="number" className="form-control" value={year} onChange={(e)=>setYear(e.target.value)}/>
                        <a>Rank</a>
                        <input type="number" className="form-control" value={rank} onChange={(e)=>setRank(e.target.value)}/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btnproper" data-dismiss="modal" onClick={()=>setUpdate(true)}>Update</button>
                        <button type="button" class="btncancel" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Update;