import '../styles/crud.css'
import React, {useState,useEffect,Fragment} from 'react';
const axios =require('axios');
const Delete = (props) => {
    const [del,setDelete] = useState(false);
    console.log(props)
    const deleteMovie = async()=>{
        try {
            let id = props.id
            let year = props.year
            const deleteMovieData = await axios({
                url: `${process.env.REACT_APP_HOSTNAME}/delete`,
                method:"delete",
                data:{id}
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
            <button type="button" class="btnproper" data-toggle="modal" data-target={`#delete${props.id}`}>Delete</button>
            <div id={`delete${props.id}`} class="modal fade" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">Delete {props.id}?</h4>
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