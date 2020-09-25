# fromContentfulToSql

Example on how to use Nodejs and Express in order to connect to a PostgreSql server and GET, ADD, PUT, DELETE entries.

Structure of the project has been made with the following steps:

1. creation of public and src repositories
2. creation of main.js in order have the server on port 5000 of your localhost
3. Inside the public repository:
   - homepage.html to display our "homepage"
   - frontEndSender.js to send the path to reach the homepage.html to our routes
4. Inside the src repository:
   - db.js where the ElephantSql credentials are indicated
   - dcController.js where we manage our GET, ADD, PUT, DELETE and more...
   - routes folder:
     - routes.js where we define the routes and the middlewares apply to specifics paths of our web
