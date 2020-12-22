import React, { useState } from 'react';
import Modal from './Modal'
class UpdateSuccessful extends React.Component{


    handleConfirm(){
        window.location.href=`/MyListings/${this.props.user.id}/`;
    }
    render(){
        //Modal for successful updating the room listing
        return(
           <div>
               <h1>Posting has been Updated Successfully</h1>
           <button onClick={() => {this.handleConfirm()}}>Ok</button>
           </div>  
           

        )
    }
}


export default UpdateSuccessful;