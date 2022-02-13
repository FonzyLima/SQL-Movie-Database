import React, {Fragment} from 'react';

const Delete = () => {
    return (
        <Fragment>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#delete`}>Delete</button>
            <div id='delete' class="modal fade" role="dialog">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4 class="modal-title">Delete?</h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Delete</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Delete;