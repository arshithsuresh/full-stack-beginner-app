import React, { useEffect, useContext } from 'react'
import RestaurantFinder from '../api/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';
import { useHistory } from 'react-router-dom';
import { StartRating } from './startRating';

const RestaurantList = (props) => {

    const { restaurants, setRestaurants } = useContext(RestaurantContext)
    let history = useHistory();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants);
                console.log(response)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();

    }, []);

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`);
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`)
    }

    const handleDelete = async (e, id) => {

        e.stopPropagation()

        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            if (response.status == 204)
                setRestaurants(restaurants.filter(restaurant => {
                    return restaurant.id !== id
                }));

        } catch (error) {

        }
    }

    const RenderRating = (restaurant) => {

        if(!restaurant.rating_count)
        {
            return <span className="text-warning">0 reviews</span>
        }

        return (
            <div className="d-flex">
                <StartRating rating={restaurant.avg_rating} />
                <p>({restaurant.rating_count})</p>
            </div>
        )
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th className="col">Restaurant</th>
                        <th className="col">Location</th>
                        <th className="col">Price</th>
                        <th className="col">Rating</th>
                        <th className="col">Edit</th>
                        <th className="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>
                                    {RenderRating(restaurant)}
                                </td>
                                <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Edit</button></td>
                                <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
