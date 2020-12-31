import { combineReducers, createStore, compose, Store } from 'redux';
import { BehaviorSubject } from "rxjs"
export interface User {
  name: string;
  id: number;
  location: string;
}
export interface CurrentUser {
  currentUser: User
}

export const initialState: CurrentUser = {
  currentUser: {
    name: 'Bond',
    id: 1,
    location: 'Earth'
  }
};

type RootAction = {
  type: string
  payload: any
}
type DispatchType = (args: RootAction) => RootAction

const hostReducer = (state = initialState, action: RootAction) => {
  switch (action.type) {
    case 'CHANGE_USER_LOCATION':
      const newData: User = {...state.currentUser, ...{location: action.payload}};
      // once the state is updated we need to send the updated state value to all subscriber that are listening
      currentUserSubscriber.next(newData);
      return {
          ...state,
          currentUser: newData
    }
    case 'CHANGE_USER_NAME':
      const newuserData: User = {...state.currentUser, ...{name: action.payload}};
      // once the state is updated we need to send the updated state value to all subscriber that are listening
      currentUserSubscriber.next(newuserData);
      return {
          ...state,
          currentUser: newuserData
    }
    default:
      return state;
  }
};

const staticReducers = {
  host: hostReducer,
};

/**
 * Cf. redux docs:
 * https://redux.js.org/recipes/code-splitting/#defining-an-injectreducer-function
 */
export default function configureStore() {
  const composeEnhancers =
    // @ts-ignore
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    // @ts-ignore
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers();
  const store: Store<any, any> & {
    dispatch: DispatchType, asyncReducers: Record<string, unknown>,  injectReducer: () => void
  } = createStore(createReducer(), enhancer);

  store.asyncReducers = {};

  // @ts-ignore
  store.injectReducer = (key, asyncReducer) => {
    // Here are are injecting the key value pair for the store and the corresponding reducer.
    store.asyncReducers[key] = asyncReducer;
    // @ts-ignore 
    // now we are replacing the old reducer with the new ones,
    // this is done to make sure any new App that calls the injectReducer, gets its reducer registered
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  // store returned here is an object with key value pair like { 'host': State Object for Host, 'otherAppKey: State Object}
  return store;
}

// combines the host reducer with any reducer registered by other micro fe app
function createReducer(asyncReducers?: any) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

export const store = configureStore();

// Observalbe to hold a specific part of Global state that is shared
export const currentUserSubscriber: {
  next: (user: User) => void;
  subscribe: (cb: (v: User) => void) => void;
} = new BehaviorSubject(initialState?.currentUser);
