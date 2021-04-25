# Calls-test

* PHP version ">=7.0.0"
* Verify that node is installed (Version 14.*). If not run `sudo n 14.15.4`
* Verify angular cli is installed. If not run `npm install -g @angular/cli` 
* Verify Laravel version 5.* (App is written in 5.5) 
* Create a DB schema called `calls_db`
* Adjust `.env` file in backend directory to correct DB credentials
* Run `composer install` in backend directory
* Run `php artisan migrate` in backend directory
* Run `php artisan serve`
* While backend serve is running go to frontend directory
* Run `npm i`
* Run `ng serve`
* When the app is built open browser on `localhost:4200` and you can import your file :)
* Process may take a while because the ipstack API results are not cached and retrieved upon request.

