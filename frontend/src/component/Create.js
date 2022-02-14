import '../styles/crud.css'
import React, {useState,useEffect,Fragment} from 'react';
const axios = require('axios');
const Create = () => {
    const [name,setName] = useState(null);
    const [year,setYear] = useState(null);
    const [rank,setRank] = useState(null);
    const [create,setCreate] = useState(false);

    const createMovie = async () => {
        try{
            const createMovieData = await axios({
                url: "http://localhost:3001/createNew",
                method: "post",
                data: {name,year,rank}
            })
        }
        catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
        if(create){
            createMovie();
        }
    },[create])
    return (
        <Fragment>
            <button type="button" id="createbutton" class="btnproper" data-toggle="modal" data-target={`#create`}>Create a Transaction</button>
            <div id='create' class="modal fade" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">Create</h4>
                    </div>
                    <div class="modal-body">
                        <a>Name</a>
                        <input type="text" className="form-control" onChange={(e)=>{
                            setName(e.target.value)
                        }}/>
                        <a>Year</a>
                        <input type="number" className="form-control" onChange={(e)=>{
                            setYear(e.target.value)
                        }}/>
                        <a>Rank</a>
                        <input type="number" className="form-control" onChange={(e)=>{
                            setRank(e.target.value)
                        }}/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btnproper" data-dismiss="modal" onClick={()=>setCreate(true)}>Create</button>
                        <button type="button" class="btncancel" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Create;