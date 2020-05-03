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

run backend with docker compose
```bat
git clone https://github.com/timmymorr/movie-app-docker-compose.git
cd movie-app-docker-compose
docker-compose up (use -d to run detached)
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
I implemented unit testing on the user schema. This testing was reasonable basic, just covering the validation of required fields. I wrote some basic integration tests to test all routes and one test to check route validation. I implemented istanbul test coverage also.

![][image1]

![][image2]

## Integrating with React App

I used the axios HTTP client in the react app as it is very lightweight and provides a lot of features. One very useful feature was that it provides responses in JSON format so no need to add the extra step that is required with fetch. I added an abstraction layer to create a wrapper around axios and this way it only needed to be imported in one file and this could be called from my other API services.

Axios wrapper:

~~~Javascript
import axios from 'axios';

const makeRequest = (method, url, data = {}, headers) => {
  return axios({
    method,
    url,
    data,
    headers
  });
};

export default makeRequest;

~~~

Making a request:

~~~Javascript
import makeRequest from './APIService';
import {Method, Service, Endpoint} from './constants';

const baseUrl = 'http://localhost';

const register = async (data) => {
  const url = `${baseUrl}${Service.AUTH}${Endpoint.REGISTER}`;
  const response = await makeRequest(Method.POST, url, data);
  return response.data; 
};
~~~

## Extra features

I provided functionality to register users and to login users with a token being returned. This token is required to call other endpoints to retrieve users and delete users. These extra endpoints are not used in the app but were created to allow an admin to call them.

## Independent learning.

I had to do some research into docker as the backend services were deployed in docker containers.
I needed to learn how to set up a reverse proxy in nginx so I could run an nginx container to proxy requests to the correct containers.
I used github actions to run tests and build and push the docker images, one issue I had was getting the integration tests to run in a github action. I tried to run a mongodb docker container and run the tests against it but it failed so I disabled the integration tests on the github action.

[image1]: readmeImages/unit.png
[image2]: readmeImages/coverage.png
