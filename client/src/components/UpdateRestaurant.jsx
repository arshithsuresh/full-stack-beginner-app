import React,{useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantFinder from '../api/RestaurantFinder';

const UpdateRestaurant = (props) => {
    const { id } = useParams();
    const [name,setName] = useState("");
    const [location,setLocation] = useState("");
    const [priceRange,setPriceRange] = useState("");    
    const history = useHistory();
    useEffect(() => {
        
        const fetchData = async()=>{

            const response = await RestaurantFinder.get(`/${id}`)            
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);        
        }

        fetchData();
        return () => {            
        }
    }, [])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {

            const updatedRestaurant = await RestaurantFinder.put(`/${id}`,{
                name,
                location,
                price_range:priceRange
            })    
            console.log(updatedRestaurant);
            
        } catch (error) {
            
        }
        
    }

    return (
        <div>            
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(e)=> setName(e.target.value)} id="name" className="form-control" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={(e)=> setLocation(e.target.value)} id="location" className="form-control" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <select value={priceRange} onChange={(e)=> setPriceRange(e.target.value)} id="price_range" className="form-control" type="text">                        
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>                        
                    </select>
                </div>              

                <button onClick={handleSubmit} className="btn btn-primary my-4">Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant
