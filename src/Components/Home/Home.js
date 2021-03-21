import React, { useEffect, useState } from 'react';
import './Home.css';
import datas from '../../Components/Image/data/data.json'
import { Button ,Card } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Home = () => {
    const [data , setData] = useState();
    useEffect(()=>{
        setData(datas)
    },[])
    const history = useHistory()
    const handleDestination = id =>{
        history.push(`destination/${id}`);
    }
    return (
        <div className ="row">
            {
                data?.map((ticket)=>
        <div className = 'col-md-3'>
            <Card  style={{backgroundImage:`url(${ticket.background})`,backgroundRepeat : "no-repeat",backgroundSize:"200px",width:"300px",height:"300px",border:"none"}}>
            <Card.Body >
                <Card.Title style={{marginTop:"25px"}}>{ticket.ticketName}</Card.Title>
                <Button style={{marginTop:"25px"}} variant="success" onClick = {()=>handleDestination(ticket.id)} >Buy Now</Button>
                <h1 style={{marginTop:"52px"}}>${ticket.ticketPrice}</h1>
                
            </Card.Body>
            </Card>
        </div>)
            }
    </div>
    );
};

export default Home;