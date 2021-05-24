import React, { useState, useContext } from 'react'
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

function AddRestaurant() {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const {addRestaurant} = useContext(RestaurantContext);

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/",{
                name: name,
                location: location,
                price_range: priceRange
            })            
            addRestaurant(response.data.data.restaurant);
        } catch (error) {
            
        }
    }

    return (
        <div className="mb-4">
            <form action="" method="get">
                <div className="row">
                    <div className="col">
                        <input value={name}
                            onChange={e => setName(e.target.value)}
                            type="text" className="form-control" placeholder="Name" />
                    </div>
                    <div className="col">
                        <input value={location} onChange={e=>setLocation(e.target.value)}
                        type="text" className="form-control" placeholder="Location" />
                    </div>
                    <div className="col">
                        <select value={priceRange} onChange={e=>setPriceRange(e.target.value)} className="form-control  mr-sm-2">
                            <option disabled>Price Range</option>
                            <option value="1"> $</option>
                            <option value="2"> $$</option>
                            <option value="3"> $$$</option>
                            <option value="4"> $$$$</option>
                            <option value="5"> $$$$$</option>
                        </select>
                    </div>
                    <div className="col">
                        <button type="submit" onClick={handleSubmit} className="col btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
