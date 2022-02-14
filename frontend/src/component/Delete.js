import '../styles/crud.css'
import React, {useState,useEffect,Fragment} from 'react';
const axios =require('axios');
const Delete = (props) => {
    const [del,setDelete] = useState(false)
    const deleteMovie = async()=>{
        try {
            const deleteMovieData = await axios({
                url: "http://localhost:3001/delete",
                method:"delete",
                data:props.id
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(del){
            deleteMovie();
        }
        
    },[del])
    return (
        <Fragment>
            <button type="button" class="btnproper" data-toggle="modal" data-target={`#delete`}>Delete</button>
            <div id='delete' class="modal fade" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">Delete?</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btnproper" data-dismiss="modal" onClick={()=>setDelete(true)}>Delete</button>
                        <button type="button" class="btncancel" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Delete;