import React from "react";
import Login from '../Login/login'

const Modal = ({ handleClose, show , children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" onClick={handleClose} data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          
          </div>
          <div class="modal-body modal-dialog-scrollable">
            {children}
          </div>
        </div>
        {/* <section className="modal-main">
          {children}
          <button  className = "close" onClick={handleClose}>x</button>
        </section> */}
      </div>
    );
  };

  export default Modal