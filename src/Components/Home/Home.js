import React, { useEffect, useState } from 'react';
import './Home.css';
import Data from '../../Components/Image/data/data.json'
import { Button ,Card } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Home = () => {
    const [data , setData] = useState();
    useEffect(()=>{
        setData(Data)
    },[Data])
    const history = useHistory()
    const handleDestination = ()=>{
        history.push('/destination')
        // console.log('onClick')
    }
    return (
        <div className ="row">
            {
                data?.map((ticket)=>
        <div className = 'col-md-4'>
            <Card style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Img src={ticket.background} />
            <Card.Body>
                <Card.Title>{ticket.ticketName}</Card.Title>
                <Button variant="success" onClick = {handleDestination} >Buy Now</Button>
                <h1>${ticket.ticketPrice}</h1>
                
            </Card.Body>
            </Card>
        </div>)
            }
    </div>
    );
};

export default Home;