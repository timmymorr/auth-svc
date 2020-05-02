# Assignment 2 - Auth API.

Name: Timmy Morrissey

## Overview

This Auth API is used to handle user authentication. It provides endpoints for user creation, and login and authenticated routes for getting a single user, getting all users and deleting a user. When the login endpoint is successfully called it returns a JWT which can be provided in the header to allow access to the authenticated routes. The API is fully documented in Swagger and can be viewed by navigating to `localhost:serverport/api-docs` when the server is running. Eslint is configured on the app to ensure consistent code. The express middleware uses a 3rd party authentication module which I developed myself and is imported into the project. The app has unit testing and integration testing with reporting and istanbul is used for code coverage. A github action is used to run the tests and build a docker container of the app and deploy to dockerhub. The app is then deployed on a cloud server.

## Installation Requirements

Requirements are Node v10 or above and MongoDB running locally on it's default port 27017.


Clone the repo

```bat
git clone https://github.com/timmymorr/auth-svc
```

followed by installation of node modules

```bat
npm install
```

## API Configuration
You will need the following `.env` contents when running the app. You will also need MongoDB running locally on it's default port 27017;

```bat
JWT_SECRET=timmysdevelopmentjwtsecret
MONGO_LOCAL_CONN_URL=mongodb://127.0.0.1:27017/auth
MONGO_PROD_CONN_URL=mongodb://mongo:27017/auth
MONGO_DB_NAME=movie-app
```

## Startup

run the API in dev
```bat
npm run dev
```

run unit tests
```bat
npm run unit
```

run integration tests
```bat
npm run integration
```

run all tests 
```bat
npm run test
```

run code coverage
```bat
npm run coverage
```

run code for production
```bat
npm run start
```

## API Design

[Live hosted Swagger Doc](http://35.223.232.250/auth/api-docs/)


## Security and Authentication
JWT authentication is used to protect certain routes. A valid JWT can be retrieved by calling the login endpoint successfuly.

Unprotected routes:
`POST api/v1/user`
`POST api/v1/users`

Protected routes:
`GET api/v1/user/:id`
`DELETE api/v1/user/:id`
`GET api/v1/users`

## Testing
I implemented unit testing on the user schema. This testing was reasonable basic, just covering the validation of required fields.

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  )
    .then(res => res.json())
    .then(json => {return json.results;});
};

~~~

## Extra features

. . Briefly explain any non-standard features, functional or non-functional (e.g. user registration, authentication) developed for the app  

## Independent learning.

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  


[image1]: ./testing.png
