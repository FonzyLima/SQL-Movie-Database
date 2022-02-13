import '../styles/crud.css'
import React, {Fragment} from 'react';

const Update = () => {
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
                        <input type="text" className="form-control"/>
                        <a>Year</a>
                        <input type="text" className="form-control"/>
                        <a>Rank</a>
                        <input type="text" className="form-control"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Update</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Update;