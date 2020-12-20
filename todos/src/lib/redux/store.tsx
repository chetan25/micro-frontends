import { createStore, applyMiddleware, Store } from "redux";
import logger from 'redux-logger';
import rootReducer from "./root-reducer";
import { persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';
import { Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga  from './root-saga';
import {ITodo, ITodosState } from '../interfaces/user';

// const middlewares = [thunk];
const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];
if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

type TodoAction = {
  type: string
  payload?: ITodo
}
type DispatchType = (args: TodoAction) => TodoAction

export const todoStore: Store<ITodosState, TodoAction> & {
  dispatch: DispatchType
} = createStore(rootReducer,  applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(todoStore);

export default {
    todoStore: todoStore,
    persistor: persistor
};
