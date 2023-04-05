# Laravel with ReactJS: Practice Project

### Laravel Module + Authentication + Simple & Complex CRUD + ReactJS App

This is a practice project with a goal to achieve a Full-Stack Web Application having
- Study backend modular architecture
- Practice better query/database manipulation strategy
- Study diverse code architecture as well as design pattern implementation 
- REST-API development practice
- Database ERD and API documentation development practice
- Practice React application development with Laravel as backend
- Practice ReactJS project structure
- Study project scalability, optimization 

## System Requirements
  - **Laravel**
    - PHP v8.1 or above
    - MySQL 5.7 or above
  - **React**
    - (not finished)

## Project Setup Guide

Clone the repository in the desired directory

**Laravel Server**

- Go to `--project--/laravel-server` directory
- Rename environment file `.env.example` to `.env` 
- Update `.env` file with proper configuration parameters e.g Database, App url etc.
- Run follwing commands
```#!/bin/sh

# install laravel project with composer
composer install

# generate application key
php artisan key:generate

# create the symbolic link for storage access
php artisan storage:link

# run database migration with seeders
php artisan migrate --seed
php artisan module:seed

# run server locally
php artisan serve

```

- The server should run at `http://localhost:8000/`. The API url base path will be: `http://localhost:8000/api`

**React-NextJS Application**

- Move to `--project-root--/next-js-app/` directory
- Create/Update `.env.local` file to set `NEXT_PUBLIC_SERVER_URL`
- Run following commands
```#!/bin/sh

# install next-js app with npm
npm install

# run development server
npm run dev

```



