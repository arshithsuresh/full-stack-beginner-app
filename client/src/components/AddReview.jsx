import React, { useState, useContext } from 'react'
import RestaurantFinder from '../api/RestaurantFinder'
import { useParams } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext';

const AddReview = () => {
    const { id } = useParams();
    const { setSelectedRestaurant } = useContext(RestaurantContext)
    const [name, setName] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState(5)
    const star = '\u2605';

    const handleSubmitReview = async (e) => {

        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating
            })
            setSelectedRestaurant((preVal) => {
                return {
                    restaurant: preVal.restaurant,
                    reviews: [...preVal.reviews, response.data.data.review]
                }
            });

        } catch (error) {

        }
    }
    return (
        <div className="mb-2 justify-content-center">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="form-control" />
                    </div>
                    <div className="form-group col-8 my-4">
                        <label htmlFor="name">Your Rating</label>
                        <select value={rating} onChange={(e) => setRating(e.target.value)} type="text" placeholder="Name" className="form-control">
                            
                            <option value="1">{[star]}</option>
                            <option value="2">{[star,star]}</option>
                            <option value="3">{[star,star,star]}</option>
                            <option value="4">{[star,star,star,star]}</option>
                            <option value="5">{[star,star,star,star,star]}</option>

                        </select>
                    </div>
                </div>
                <div className="form-group col-8 my-4">
                    <label htmlFor="Review">Review </label>
                    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} id="Review" className="form-control"></textarea>
                </div>
                <button onClick={handleSubmitReview} className="my-2 btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddReview
