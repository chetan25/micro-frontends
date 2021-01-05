import React, { Suspense, useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Store } from 'redux';

import reducer, { changeUserEmail } from './redux/reducer';
import { SelectUser, UpdateUser, changeUserLocation } from "Shell/SharedStateService";
import { selectEmail } from './redux/userSelector';

// recoil
import { useRecoilState  } from "recoil";
import { navbarTitle } from "Shell/Atoms"

 const UserApp = () => {
    const dispatch = useDispatch();
    const email = useSelector(selectEmail);
    const user = SelectUser();
    const state = useSelector((state) => state);

    // recoil state 
    const [title, setRecoilTitle] = useRecoilState(navbarTitle);

    // @ts-ignore
    // since at this point the state is an Onject with key value pair,
    // and to access the root state we use the host key
    const location = state?.host?.currentUser.location;
    // to access the local state we can just use the key 
    // const localName = state!.user?.userName;
    const [formName, setFormName] = useState(user.name);
    const [formEmail, setFormEmail] = useState(email);
    const [formlocation, setFormLocation] = useState(location);
    const [formNavTitle, setFormNavTitle] = useState<string>(title as string);


    useEffect(() => {
      setFormName(user.name);
      setFormLocation(location);
      setFormNavTitle(title as string);
    }, [user, location, title]);

    const updateUser = () => {
      UpdateUser(formName);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormName(e?.target?.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormEmail(e?.target?.value);
    };

    const updateEmail = () => {
      dispatch(changeUserEmail(formEmail));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormLocation(e?.target?.value);
    }

    const handleNavTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormNavTitle(e?.target?.value);
    }

    const updateUserLocation = () => {
      dispatch(changeUserLocation(formlocation))
    };

    return (
      <>
        <h2>{user.name} Dashboard</h2>
        <div style={{display: 'flex', columnGap: '3rem', marginBottom: '1rem'}}>
            <label style={{width: '5rem'}}>User Name</label>
            <input type="text" id="username" value={formName} onChange={handleNameChange}/>
            <button onClick={updateUser}>Update</button>
            (Updates Global shared State using Observable)
        </div>
        <div style={{display: 'flex', columnGap: '3rem', marginBottom: '1rem'}}>
            <label style={{width: '5rem'}}>Location</label>
            <input type="text" id="location" value={formlocation} onChange={handleLocationChange}/>
            <button onClick={updateUserLocation}>Update</button>
            (Updates Global shared State using Reducer)
        </div>
        <div style={{display: 'flex', columnGap: '3rem'}}>
            <label style={{width: '5rem'}}>Nav Title</label>
            <input type="text" id="email" value={formNavTitle} onChange={handleNavTitleChange}/>
            <button onClick={() => setRecoilTitle(formNavTitle)}>Update</button>
            (Updates Shared Recoil State)
        </div>
        <div style={{display: 'flex', columnGap: '3rem'}}>
            <label style={{width: '5rem'}}>Email</label>
            <input type="text" id="email" value={formEmail} onChange={handleEmailChange}/>
            <button onClick={updateEmail}>Update</button>
            (Updates Local State)
        </div>
      </>
    );
};

type StoreCustom = Store & {
    injectReducer: (key: string, reducer: any) => Record<string, unknown>;
}

// We pass a custom store to the App, so that we can inject the reducer of conusmer App
// and append the local state to the global state object and share a single instance of state Object
const RemoteAppWrapper = (props: {store: StoreCustom}) => {
    const { store } = props;

    useEffect(() => {
      store ? store.injectReducer('user', reducer) : null;
    }, [store]);
  
    return (
        <Provider store={store}>
          <Suspense fallback="Loading...">
            <UserApp />
          </Suspense>
      </Provider>
    );
};

export default RemoteAppWrapper;
  