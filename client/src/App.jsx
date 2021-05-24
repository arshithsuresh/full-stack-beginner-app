import React from 'react';
import { RestaurantContextProvider } from './context/RestaurantContext';

import Routes from './routes'
const App = () => {

    

    return (
        <RestaurantContextProvider>
            <div>                
               <Routes/>
            </div>
        </RestaurantContextProvider>
    )
}

export default App;
