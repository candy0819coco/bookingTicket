import React, { Component } from 'react';
import { Modal } from "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.css';
class Mask extends Component {
    state = {}
    render() {
        return (
        <div><button className="solidButton btn Mask" data-toggle="modal" data-target="#Mask"> Health and safety rules. Review</button>
        <div className="modal Mask fade" id="Mask" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        </div>);
    }
}

export default Mask;