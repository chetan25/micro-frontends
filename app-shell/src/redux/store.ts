import { combineReducers, createStore, compose, Store } from 'redux';
import { BehaviorSubject } from "rxjs"
export interface User {
  name: string;
  id: number;
}
export interface CurrentUser {
  currentUser: User
}

export const initialState: CurrentUser = {
  currentUser: {
    name: 'Bond',
    id: 1
  }
};

type RootAction = {
  type: string
  payload: User
}
type DispatchType = (args: RootAction) => RootAction

const hostReducer = (state = initialState, action: RootAction) => {
  switch (action.type) {
    case 'CHANGE_USER':
      console.log('wewe');
      // once the state is updated we need to send the updated state value to all subscriber that are listening
      currentUserSubscriber.next(action.payload);
      return {
          ...state,
          currentUser: action.payload
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
    store.asyncReducers[key] = asyncReducer;
    // @ts-ignore 
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  return store;
}

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
