import { useEffect, useState } from "react";
import { createSelector } from 'reselect';
import { initialState, CurrentUser, store, User, currentUserSubscriber } from './store';

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
    useEffect(() => {
        currentUserSubscriber.subscribe((v: User) => {
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
        type: 'CHANGE_USER_NAME',
        payload: newUserName
    });

}

export const changeUserLocation = (location: string) => {
    return { type: 'CHANGE_USER_LOCATION', payload: location };
}
