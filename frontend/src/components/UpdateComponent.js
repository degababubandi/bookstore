import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEvent = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [publish, setPublish] = React.useState('');
    const [category, setCategory] = React.useState('');
   
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getEventDetails();
    }, [])
    const getEventDetails = async () => {
        console.warn(params);
        let result = await fetch(`http://localhost:5000/event/${params.id}`);
        result = await result.json();

        setName(result.name);
        setPrice(result.price);
        setAuthor(result.author);
        setPublish(result.publish);
        setCategory(result.category)
        
    }
    const updateEvent = async () => {
        console.warn(name, price, author, publish, category)
        let result = await fetch(`http://localhost:5000/event/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, author, publish, category}),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json()
        if (result) {
            alert("Book updated successfully");
            navigate('/')
        }
    }
    return (
        <div className="event">
            <h1>Update Book</h1>
            <input className="inputBox" type="text" placeholder="Enter Book Name"
                value={name} onChange={(e) => setName(e.target.value)} />

            <input className="inputBox" type="text" placeholder="Enter Book Price"
                value={price} onChange={(e) => setPrice(e.target.value)} />

            <input className="inputBox" type="text" placeholder="Enter Author Name"
                value={author} onChange={(e) => setAuthor(e.target.value)} />

            <input className="inputBox" type="text" placeholder="Enter Publish Date"
                value={publish} onChange={(e) => setPublish(e.target.value)} />

            <input className="inputBox" type="text" placeholder="Enter Book Category"
                value={category} onChange={(e) => setCategory(e.target.value)} />
            <button onClick={updateEvent} className="appbutton">Update Book</button>
        </div>
    )
}

export default UpdateEvent;