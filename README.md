# Warehouse Inventory Tracker

This project was developed for Shopify's Fall 2022 backend coding challenge.
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
