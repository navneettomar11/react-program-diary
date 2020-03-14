import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';

export class Modal extends React.Component {
    render() {
        const opened = this.props.show ? 'inline' : 'none';
        return (
            <React.Fragment>
                <div className="modal modal-xl" style={{display: opened}}>
                    <div className="modal-dialog" role="dialog" aria-hidden={this.props.show.toString()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button aria-label="Close" className="close" type="button" onClick={(e)=> this.props.onClose && this.props.onClose(e)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <h3 className="modal-title"><strong>{this.props.title}</strong></h3>
                            </div>    
                            <div className="modal-body">
                                {this.props.children}
                            </div>    
                        </div>
                    </div>
                </div>
                <div style={{display: opened}} className="modal-backdrop" aria-hidden={this.props.show.toString()}></div>
            </React.Fragment>
        );
    }
    
} 