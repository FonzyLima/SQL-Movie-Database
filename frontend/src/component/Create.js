import '../styles/crud.css'
import React, {useState,useEffect,Fragment} from 'react';
const axios = require('axios');
const Create = () => {
    return (
        <Fragment>
            <button type="button" id="createbutton" class="btnproper" data-toggle="modal" data-target={`#create`}>Create</button>
            <div id='create' class="modal fade" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">Create</h4>
                    </div>
                    <div class="modal-body">
                        <a>Name</a>
                        <input type="text" className="form-control"/>
                        <a>Year</a>
                        <input type="text" className="form-control"/>
                        <a>Rank</a>
                        <input type="text" className="form-control"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Create</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Create;