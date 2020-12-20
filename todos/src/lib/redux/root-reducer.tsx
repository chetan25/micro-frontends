// import { combineReducers } from "redux";
import todoReducer from './todo/todo-reducer';

import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos']
};

// const rootReducer = combineReducers({
//     todos: todoReducer
// });

export default persistReducer(persistConfig, todoReducer) ;
