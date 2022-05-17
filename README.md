# Warehouse Inventory Tracker

This project was developed for Shopify's Fall 2022 Internship backend coding challenge.
Technologies used in this project includes Python, Flask, SQLalchemy, PostgreSQL, and React/Redux to showcase the web application.

## Project Features
### basic features
* User is able to create new inventory items.
* User is able to Edit inventory items.
* User is able to Delete inventory items.
* User is able to view list of inventory items.

### additional feature
* Ability to create warehouses/locations and assign inventory to specific locations

## Set-up instructions on local environment
1. Clone this repository `git clone git@github.com:Breadsandwich/inventory_app.git`
2. In the root directory, install dependencies `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
3. In the root directory, create an `.env` file based off the `.env.example`.
4. Set up postgreSQL user and database so it matches your `.env` file.
    * `create user <your_username_here> with password '<your_password_here>' createdb`
    * `create database <your_database_name_here> with owner <your_username_here>`
5. Get into pipenv, migrate the database, seed the database, and run the flask app using the following commands:
   * `pipenv shell`
   * `flask db upgrade`
   * `flask seed all`
   * `flask run`
6. cd into react-app and run `npm install` then `npm start`

## Testing endpoints
1. First we need a warehouse location, lets make one.
```
// Input
POST /api/warehouses/new
{
    "location": "New York"
}

// Output
{
    "id": 1,
    "location": "New York",
    "warehouse_inventory": []
}
```
2. Now that we have a warehouse, or a few. Lets take a look at the list.
```
// Output
GET /api/warehouses/all
{
    "all_warehouses": [
        {
            "id": 1,
            "location": "New York",
            "warehouse_inventory": [{...Inventory list populates here}]
        }
}

GET /api/warehouses/1
{
    "id": 1,
    "location": "New York",
    "warehouse_inventory": [
        {
            "description": "example description!",
            "id": 9,
            "item_name": "example item",
            "price": "9.00",
            "quantity": "12",
            "warehouse_id": 1
        },

    ]
}
```
