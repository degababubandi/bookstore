import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        let result = await fetch('http://localhost:5000/events');
        result = await result.json();
        setEvents(result);
    }

    const deleteEvent =async (id)=>{
         console.warn(id)
         let result =await fetch(`http://localhost:5000/event/${id}`,{
            method:"Delete"
         });
         result = await result.json();
         if(result){
            alert("Book deleted");
            getEvents()
         }
    }
    const searchHandle = async(event)=>{
        let key = event.target.value;
        if(key){
            let result =await fetch(`http://localhost:5000/search/${key}`);
            result= await result.json()
            if (result){
                setEvents(result)
            }
        }
        else{
            getEvents();
        }
        
    }
    return (
        <div className="event-list">
            <h3>Books List</h3>
            <input type="" className="search-event-box" placeholder="Search Book" onChange={searchHandle}/>
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Author</li>
                <li>publish</li>
                <li>Category</li>
               
                <li>Operation</li>
            </ul>
           {
           events.length>0 ? events.map((item,index)=>
            <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.author}</li>
                <li>{item.publish}</li>
                <li>{item.category}</li>
                
                <li><button onClick={()=>deleteEvent(item._id)}>Delete</button>
                <Link to={"/update/"+item._id}>Update</Link>
                </li>

            </ul>
            )
            :<h1>No Results Found</h1>
           }
        </div>
    )
}
export default EventList;