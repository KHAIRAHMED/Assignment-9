import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import jsonData from '../../Components/Image/data/data.json'
const Destination = () => {
    const {id} = useParams();
    const [data ,setData] =useState();
    useEffect(()=>{
        setData(jsonData)
    },[])

    const [info,setInfo] = useState({});
    const inFo = (e)=>{
        e.preventDefault();
        const dataInfo = data.find(kk=>kk.id === id)
        setInfo(dataInfo)
    }
    console.log(info)
    

    return (
       <div>
            <form style={{textAlign:"center"}}>
                <input type="text" required placeholder="Destination" /> <br/> <br/>
                <input type="text"   required  placeholder="Current Place" /> <br/><br/>
                <input type="submit" style = {{color : "white"}}  value="Submit" onClick={inFo}/>        
        </form>
        {
            data?.map((dataInfo)=> <p><img src={dataInfo.ticket} width="60px" alt=""/> {dataInfo.ticketType1} {dataInfo.ticketPrice1}</p> )
        }
       </div>
    );
};

export default Destination;