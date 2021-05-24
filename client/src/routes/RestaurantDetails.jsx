import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantFinder from '../api/RestaurantFinder';
import { StartRating } from '../components/startRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantDetails = () => {

    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantContext)
    const [currentReviews, setCurrentReviews] = useState([]);
    useEffect(() => {

        try {
            const fetchData = async () => {
                const response = await RestaurantFinder.get(`/${id}`)
                setSelectedRestaurant(response.data.data)
            }

            fetchData();

        } catch (error) {
            console.log(error);
        }

        return () => {
        }

    }, [selectedRestaurant && selectedRestaurant.reviews.length])

    const RenderRating = (restaurant) => {
        if (!restaurant.rating_count) {
            return <p className="text-center text-warning">0 reviews</p>
        }

        return (
            <>
                <p className="text-center my-0"> {<StartRating rating={selectedRestaurant.restaurant.avg_rating} />}</p>
                <p className="text-center">Total Ratings: {selectedRestaurant.restaurant.rating_count}</p>
            </>
        )
    }

    return (
        <div className="container my-5">
            {selectedRestaurant && (
                <>
                    <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
                    {RenderRating(selectedRestaurant.restaurant)}
                    <div className="container my-5">
                        <Reviews reviews={selectedRestaurant.reviews} />
                    </div>
                    <AddReview addReview={setSelectedRestaurant} />
                </>
            )
            }

        </div>
    )
}

export default RestaurantDetails
