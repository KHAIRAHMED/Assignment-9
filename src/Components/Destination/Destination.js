import React from 'react';
const Destination = () => {
    
    return (
        <form style={{textAlign:"center"}}>
                <input type="text" required placeholder="Destination" /> <br/> <br/>
                <input type="text"   required  placeholder="Current Place" /> <br/><br/>
                <input type="submit" style = {{color : "white"}} variant="danger" value="Submit"/>
        </form>
    );
};

export default Destination;