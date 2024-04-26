import React from "react";
import {useNavigate}  from "react-router-dom";

const AddEvent = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [publish, setPublish] = React.useState('');
    const [category, setCategory] = React.useState('');
    
    const [error,setError] = React.useState(false);
    const navigate = useNavigate()
    const addEvent = async()=>{

        if(!name || !price || !author || !publish || !category )
        {
            setError(true);
            return false
        }
        console.warn(name,price,author,publish,category);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.warn(userId);
        let result = await fetch("http://localhost:5000/add-event",{
            method:"post",
            body: JSON.stringify({name,price,author,publish,category,userId}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
      result =await result.json();
      console.warn(result);
      alert("your book added succesfully")
      navigate('/')
    }
    return (
        <div className="event">
            <h1>Add Book</h1>
            <input className="inputBox" type="text" placeholder="Enter book Name"
             value={name} onChange={(e)=>setName(e.target.value)}/>
             {error && !name && <span className="invalid-input">Enter a valid name</span>}
            <input className="inputBox" type="text" placeholder="Enter book Price"
            value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {error && !price && <span className="invalid-input">Enter a valid date</span>}
            <input className="inputBox" type="text" placeholder="Enter book Author"
            value={author} onChange={(e)=>setAuthor(e.target.value)}/>
            {error && !author && <span className="invalid-input">Enter a valid venue</span>}
            <input className="inputBox" type="text" placeholder="Enter book publish date"
            value={publish} onChange={(e)=>setPublish(e.target.value)}/>
            {error && !publish && <span className="invalid-input">Enter a valid time</span>}
            <input className="inputBox" type="text" placeholder="Enter book Category"
            value={category} onChange={(e)=>setCategory(e.target.value)}/>
            {error && !category && <span className="invalid-input">Enter a valid category</span>}
            
            <button onClick={addEvent} className="appbutton">Add Book</button>
        </div>
    )
}

export default AddEvent;