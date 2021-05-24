import React from 'react'
import { StartRating } from './startRating'

const Reviews = ({ reviews }) => {
    return (
        <div className="row row-cols-3 mb-2">
            {reviews.map((review) => {
                return (
                    <div className="pa-2" key={review.id}>
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-header d-flex justify-content-between">
                                <span>{review.name}</span>
                                <span><StartRating rating={review.rating} /></span>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{review.review}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            {
                (reviews.length <= 0) && (
                    <>
                        <h1 className="text-center"> No Reviews Yet!</h1>
                    </>
                )
            }
        </div>
    )
}

export default Reviews
