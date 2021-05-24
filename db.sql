
-- List all databases -     \l
-- Connect to database -    \c
-- List all tables -        \d

--Create Table Products
CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL,
    name VARCHAR(64) NOT NULL,
    location VARCHAR(64) NOT NULL,
    price_range INT NOT NULL
);

-- INSERT
INSERT INTO restaurants (name,location,price_range)
values ('Pizza Hut', 'Las Vegas', 2);

CREATE TABLE reviews(
    id  BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating>=1 and rating<=5)    
);

INSERT INTO reviews (restaurant_id, name, review, rating) values (5000,'Joan', 'bad restaurant', 3);

-- TO get rating
select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;