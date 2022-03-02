import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal } from "bootstrap/dist/css/bootstrap.css";

class MyMask extends Component {
    state = {}
    render() {
        return (
            <div className="col-3" >
                <button id='MyMask' type="button" className='hrefColor btn btn-outline-secondary' data-toggle="modal"
                    data-target=".MyMask">Mask
                </button>
                <div className="modal fade MyMask" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="" >Title</h5>

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>

                            </div>

                            <div className="modal-body d-flex-row" >
                                <div className="container-fluid">
                                    <div className="row d-flex">


                                        <div className="row mainArticle" >
                                            <div className="col-12-lg">
                                                Body
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer mr-auto" >
                            <button type="button" className="btn btn-primary" data-dismiss="modal" >Back</button>
                            </div>
                        </div>
                    </div>
                </div>              
            </div>
        );
    }
}

export default MyMask;