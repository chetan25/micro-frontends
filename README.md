# Micro FrontEnd
This is a simple implementation of Micro FE, where we have a Shell App that renders different UIs.

## What's in this Mono Repo
This mono repo includes -
- App Shell - This handles the loading and rendering of different UIs and the root level routing.
- Todo UI - This is a simple implementation of Todo Application, which serves as a single Micro FE developed and deployed separately.
- UI Components - A component library that holds the reusable components.
- Api - This contains the Express API that exposes the Graphql gateway.

### App Shell
*Note - Work still in progress for this App shell.
This is the App Container build with Webpack and will in render other micro FE UIs.

> To run - `npm start` 

### UI Components
This is a collection of reusable components build with Rollup.

> To build  - `npm run build`

### Todo UI
This is simple Todo app implementation, that uses Graphql endpoint and is build using Webpack.

> To run `npm start`

### Api
This is serves as a BE server to serve the Graphql endpoint. To save time for the database implementation
we are using `json-server` that provides us with a rest endpoint to access the db.We just need to configure
the `db.json` file that holds the data structure. We are running an Express server to expose the endpoint, since we can configure it for CORS.

> To run the Json Server - `json-server --watch ./db.json`
> To run the API - `node ./src/main.js` 
