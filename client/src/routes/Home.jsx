import React from 'react'
import Header from '../components/Header'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantList from '../components/RestaurantList'

const Home = () => {
    return (
        <div className="container justify-content-center">
            <Header />
            <div className="container">
                <AddRestaurant />
                <RestaurantList />
            </div>
        </div>
    )
}

export default Home

