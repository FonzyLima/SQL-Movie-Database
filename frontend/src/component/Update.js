import '../styles/crud.css'
import React, {useState,useEffect,Fragment} from 'react';
const axios = require('axios');
const Update = (props) => {
    const [name,setName] = useState(null);
    const [year,setYear] = useState(null);
    const [rank,setRank] = useState(null);
    const [update,setUpdate] = useState(false);
    console.log(props)
    const updateMovie = async()=>{
        try{
            let id = props.id;
            const updateMovieData = await axios({
                url: "http://localhost:3001/update",
                method: "patch",
                data: {id,name,year,rank}
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
            <button type="button" class="btnproper" data-toggle="modal" data-target={`#update`}>Update</button>
            <div id='update' class="modal fade" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">Update</h4>
                    </div>
                    <div class="modal-body">
                        <a>Name</a>
                        <input type="text" className="form-control" placeholder={props.name} onChange={(e)=>setName(e)}/>
                        <a>Year</a>
                        <input type="text" className="form-control" placeholder={props.year} onChange={(e)=>setYear(e)}/>
                        <a>Rank</a>
                        <input type="text" className="form-control" placeholder={props.rank} onChange={(e)=>setRank(e)}/>
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