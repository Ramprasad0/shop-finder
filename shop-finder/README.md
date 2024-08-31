
# Shop Finder

Shop Finder is a web application that allows users to search for shops near them by location or shop name. Users can view detailed information about each shop, including its location, contact details, and services. The application also includes an admin panel that can only be accessed by registered administrators. Admins have the ability to manage shops within the database by adding, deleting, or updating shop details


## Tech Stack

**Client:** HTML, CSS, JavaScript

**Server:** Node, Express


## Installation

Clone the repository

```bash
  git clone <repository-url>
  cd shop-finder
```
    
Install the dependencies
```bash
  npm install
```

Set up the database:

Use the SQL files in the schema/ directory (shops.sql and users.sql) to create the necessary tables in your database.

Configure the application:

Update the configuration settings in config/config.js as needed for your environment.
## Usage/Examples

Start the server:

```bash
npm start
```

Access the application:

Open your browser and go to http://localhost:3000.
## Features

- User Search: Users can search for shops by location or name.
- Shop Details: Users can view detailed information about each shop.
- Admin Panel: Registered admins can add, delete, and update shop information.



## Project Structure

```graphql
shop-finder/
├── config/
│   └── config.js           # Configuration settings
├── controllers/
│   └── shopscontroller.js  # Shop-related logic
├── middleware/
│   └── authenticateJWT.js  # JWT authentication middleware
├── models/
│   └── shops.js            # Shop model
├── public/
│   ├── admin.html          # Admin panel HTML
│   ├── index.html          # User search page HTML
│   ├── login.html          # Login page for admins
│   ├── register.html       # Admin registration page
│   ├── shop-details.html   # Shop details page HTML
│   ├── js/                 # Frontend JavaScript files
│   └── style/              # CSS styles
├── routes/
│   └── shoproutes.js       # Routes for shop-related requests
├── schema/
│   ├── shops.sql           # SQL schema for shops table
│   └── users.sql           # SQL schema for users table
├── package.json            # Node.js project metadata and scripts
├── package-lock.json       # Dependency lock file
└── server.js               # Main server file

```
## Configuration

The configuration file config/config.js contains settings that may need to be adjusted based on your environment, such as database connection details.
## Database Schema

- Shops Table: Defined in schema/shops.sql, this table stores information about each shop.

- Users Table: Defined in schema/users.sql, this table stores admin user data.
## Dependencies

The project depends on several Node.js packages, as listed in package.json. Key dependencies include:

- Express: For handling HTTP requests.
- JWT: For authentication and authorization.
- MySQL: For database interaction.

To install all dependencies, run:


```bash
npm install
```
## Screenshots

![Home Page](https://github.com/Ramprasad0/shop-finder/blob/52b3650aadd5fcf7cca45a8c0e6fbb50e27e0808/shop-finder/Screenshot%202024-08-31%20202853.png)

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

