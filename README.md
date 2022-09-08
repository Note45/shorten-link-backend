# Shorten Link(Backend)
Repository to store the backend files to Shorten Link project. A URL shortener.

## Description
The idea of the project is to send a URL to the backend, short the URL, and send the response with the URL shortener. Also, the backend can receive a shortener URL and response with the original URL. 

## How the project is currently
In development...

## To run the project using Docker
1. Make sure you have `docker` and `docker-compose` installed;
1. Create the `.env` file using as a base the `.env.example` file;
2. Run in the terminal inside the project root folder the command below: 
  ```
    docker-compose up -d
  ```
> PS: The project will be running at the port you define in the .env file. 

## Technologies
1. NodeJS
2. GraphQL 
3. Typescript 
4. Apollo Server
5. Postgress
6. Docker
7. ESLint
8. Prettier
9. Husk
10. Jest 
11. Supertest

## Initial Requirements:
1. [X] - The user can send a link to be shortened.
2. [X] - The user can send a shortened link to get the original link.

## Future Requirements
1. [X] - The user can send a custom name to create the shortened link.
2. [X] - Automated tests in the project.
