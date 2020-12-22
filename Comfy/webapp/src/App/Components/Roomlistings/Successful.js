import React, { useState } from 'react';
import Modal from './Modal'


// Successful component is rendered as a Modal when 
// user creates a room successfully on clicking the CreateRoom button
class Successful extends React.Component{

//Once we click View thr room , handleConfirm gets invoked and re directs us to ViewRoom
    handleConfirm(){
        window.location.href="/ViewRoom/";
    }
    render(){
//MEssage to user to say that room has been posted successfully
        return(
           <div className="col">
               <h1>Hey Awesome!!</h1>
                 <div>
                      <p>Your posting has been Created Successfully</p>
                 </div>
                 {/* button to invoke the handleconfirm */}
                        <button className="btn btn-primary" onClick={() => {this.handleConfirm()}}>View it</button> 
           </div>  
           
        )
    }
}

export default Successful;




