# Jokes database handler
## How to
First install the dependencies for both client and server, running `npm i` inside /client and /server

To run the server:

`npm start` inside the /server folder, or `npm run nodemon`

To run the client: 

`npm start` inside the /client folder

Checking linting on the server module:
`npm run lint`

## Server Console output
The server uses the debug library, to see all console output from the node application use the following env variable:

`export DEBUG=*` (bash) or `set DEBUG=*` (Windows)

If you only want to see lines relevant to the project, use:

`export DEBUG=jokes*` (bash) or `set DEBUG=jokes*` (Windows)