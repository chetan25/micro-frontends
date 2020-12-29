import { useEffect, useState } from "react";
import { createSelector } from 'reselect';
// import { BehaviorSubject } from "rxjs"
import { initialState, CurrentUser, store, User, currentUserSubscriber } from './store';

// // Observalbe to hold a specific part of Global state that is shared
// export const currentUserSubscriber: {
//     next: (user: User) => void;
//     subscribe: (cb: (v: User) => void) => void;
// } = new BehaviorSubject(initialState?.currentUser);
// window.currentUserSubscriber = currentUserSubscriber;


const selectCurrentUserSelector = (state: {host: {currentUser: CurrentUser}}) => state?.host?.currentUser;

export const selectCurrentUser = createSelector(
    selectCurrentUserSelector,
    (currentUser) => currentUser
);

/** Custom Hook that subscribes to the Observable and
 * returns the currentUser value from global store at any given time
 * to any  container app that needs it
*/
export const SelectUser = () => {
    const [user, setUser] = useState(initialState.currentUser);
    console.log(initialState, 'initialState')
    useEffect(() => {
        currentUserSubscriber.subscribe((v: User) => {
            console.log(v, 'v');
            setUser(v);
        });
    }, [setUser]);

    return user;
}

/**
 * Function exported to update the Global/Shell state from container App
 */
export const UpdateUser = (newUserName: string) => {
    // this uses the instance of the Store created
    return store.dispatch({
        type: 'CHANGE_USER',
        payload: {
            name: newUserName,
            id: 1
        }
    });

}
