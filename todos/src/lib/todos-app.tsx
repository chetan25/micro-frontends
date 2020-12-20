import React from 'react';
// import ReactDOM from 'react-dom';
import Home from './pages/home/home';
// import { BrowserRouter } from 'react-router-dom';
//store
import { Provider } from 'react-redux';
import { todoStore, persistor } from './redux/store';
import { PersistGate} from "redux-persist/integration/react";

// import { QueryCache, ReactQueryCacheProvider } from 'react-query'
// const queryCache = new QueryCache();

export const Todos = () => {
  return (
    <Provider store={todoStore}>
      <PersistGate persistor={persistor}>
          <Home />
      </PersistGate>
    </Provider>
  );
}

export default Todos;
