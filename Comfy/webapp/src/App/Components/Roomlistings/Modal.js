import React from "react";
import Successful from './Successful'

const Modal = ({ handleClose, show , children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button  class = "close" onClick={handleClose}>x</button>
        </section>
      </div>
    );
  };

  export default Modal