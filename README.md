# Micro FrontEnd
This is a simple implementation of Micro FE, where we have a Shell App that renders different UIs.

## What's in this Mono Repo
This mono repo includes -
- App Shell - This handles the loading and rendering of different UIs and the root level routing.
- Todo UI - This is a simple implementation of Todo Application, which serves as a single Micro FE developed and deployed separately.
- UI Components - A component library that holds the reusable components.
- Api - This contains the Express API that exposes the Graphql gateway.

>The Micro FE are loaded and rendered in the App Shell using two techniques
> 1. Module Federation - Currently App Shell and Todos implements Module Federation available in Webpack 5.
> Todos exposes the root of the entire app and App shell just uses it as remote.
> 2. Manual Method - This method will make use of Dynamic Import for ESM bundles and script tags for Common js bundles. This will be available via helper package. 

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
> To serve `npm run server`

### Api
This is serves as a BE server to serve the Graphql endpoint. To save time for the database implementation
we are using `json-server` that provides us with a rest endpoint to access the db.We just need to configure
the `db.json` file that holds the data structure. We are running an Express server to expose the endpoint, since we can configure it for CORS.

> To run the Json Server - `npm run server:api`
> To run the API - `npm run dev` 


## To run locally 
- Start the API server by running the following commands
   > `npm run server:api` and then `npm run dev`
- To build and serve the Todos App
   > `npm run build` and then `npm run server`
- To run the App Shell
   > `npm run start`
  
