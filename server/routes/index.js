const routes = require('express').Router();

const db = require("../db");

routes.get("/api/v1/restaurants", async (req, res, next) => {

    try {

        const results = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*) as rating_count, TRUNC(AVG(rating),1) as avg_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");
        
        res.status(200).json(
            {
                status: "success",
                results: results.rows.length,
                data: {
                    restaurants: results.rows
                }
            });

    } catch (error) {
        console.log(error);
    }
});

// Get A Restaurant

routes.get("/api/v1/restaurants/:id", async (req, res,next) => {
    try {

        const _id = req.params.id;
        const results = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*) as rating_count, TRUNC(AVG(rating),1) as avg_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1", [_id]);
        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1 ORDER BY id DESC LIMIT 3 ", [_id]);
        
        res.status(200).json(
            {
                status: "success",            
                data: {
                    restaurant: results.rows[0],
                    reviews: reviews.rows
                }

            });

    } catch (error) {
        next(error);
    }

});

// Create a Restaurant
routes.post("/api/v1/restaurants", async (req, res,next) => {

    const jsonData = req.body;
    try {
        const results = await db.query("INSERT INTO restaurants (name,location,price_range) values($1,$2,$3) returning *;",
            [jsonData.name, jsonData.location, jsonData.price_range]);

        res.status(201).json(
            {
                status: "success",
                data: {
                    restaurant: results.rows[0]
                }
            });
    } catch (error) {
        next(error);
    }


});

// Update Restaurant
routes.put("/api/v1/restaurants/:id", async (req, res,next) => {

    const id = req.params.id;
    const jsonData = req.body;
    try {
        const results = await db.query("UPDATE restaurants SET name= $1, location= $2, price_range=$3 where id=$4 returning *;",
            [jsonData.name, jsonData.location, jsonData.price_range, id]);

        res.status(200).json(
            {
                status: "success",
                data: {
                    restaurant: results.rows[0]
                }
            });

    } catch (error) {
        next(error);
    }

});

// Delete a Restaurant
routes.delete("/api/v1/restaurants/:id", async (req, res,next) => {

    try {

        const _id = req.params.id;
        const result = db.query("DELETE FROM restaurants where id = $1", [_id]);

        res.status(204).json(
            {
                status: "success"
            });

    } catch (error) {
        next(error);
    }

});

routes.post("/api/v1/restaurants/:id/addReview", async (req, res,next) => {

    try {
        const id = req.params.id;
        const newReview = await db.query("INSERT INTO reviews (restaurant_id,name,review,rating) values($1,$2,$3,$4) returning *;",
            [id, req.body.name, req.body.review, req.body.rating])        
        res.status(201).json(
            {
                status:"success",
                data:{
                    review: newReview.rows[0]
                }
            }
        )
    } catch (error) {
        next(error);
        console.log(Error);
    }

})

routes.all("/api/v1/restaurants/*", (req, res) => {

    res.status(404).json({
        status: "fail",
        data: {
            message: "No Page Found!"
        }
    })
})

module.exports = routes;