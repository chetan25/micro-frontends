import React, { lazy, Suspense} from "react";
import ReactDOM from "react-dom";
import {
    Header, ErrorBoundary
} from 'ui-components/dist';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import { selctHostState } from './redux/root-selector';
import styled, { createGlobalStyle  } from 'styled-components';
import { Switch, Route, Redirect, Link, BrowserRouter } from 'react-router-dom';

// adding recoil 
import { useRecoilValue, RecoilRoot } from 'recoil' 
import { navbarTitle } from './recoil-atom';

// This is used to share the Store Object and inject and replace the reducer on the fly between host and micro FE.
// To make this work we need to add the script tag in the Html and the webpack config remote won't work for this 
const dynamicFederation = async (scope: string, module: string) => {
    // @ts-ignore
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    return container.get(module).then((factory: () => any) => {
      const Module = factory();
      return Module;
    });
  };
  
const UserApp = lazy(() => dynamicFederation('user', './UserApp'));
  
// a relevant d.ts file is created as type definition for the remote app root
const Todos = lazy(() => import("todos/Todos"));

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
  };
  font-family: sans-serif;
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SideBar = styled.div`
  width: 10rem;
  background: #d7232b75;
  min-height: 100vh;

  li {
    font-weight: bold;
    font-size: 23px;
    margin-bottom: 1rem;
    margin-right: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  column-gap: 2rem;
`;

const Content = styled.div`
  margin: 2rem;
  flex: 0 0 80%;
`;


const ShellWrapper = styled.div`
--card-width: auto;
`;

const Navigation = styled.div`
  margin-top: 3rem;
`;

const TilteWrapper = styled.div`
  text-decoration: underline;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const App = () => {
    const localUser = useSelector(selctHostState);
    // recoil state 
    const title = useRecoilValue(navbarTitle);
    console.log(title, 'title');
    return (
        <ErrorBoundary>
        <Suspense  fallback="Loading Todo">
            <GlobalStyle />
            <ShellWrapper>
                <Header userName={localUser.name}/>
                <Wrapper>
                    <SideBar>
                        <Navigation role="navigation">
                            <TilteWrapper>{title}</TilteWrapper>
                            <ul>
                                <li>
                                <Link to="/todos">Todos</Link>
                                </li>
                                <li>
                                <Link to="/user">User</Link>
                                </li>
                            </ul>
                        </Navigation>
                    </SideBar>
                    <Content>
                        <Switch>
                            <Route exact path='/'
                                render={({location}) =>
                                <Redirect
                                    to={{
                                    pathname: "/todos",
                                    state: { from: location }
                                    }}
                                />
                                }
                            />
                            <Route path='/todos'>
                                <Todos />
                            </Route>
                            <Route path='/user'>
                                <UserApp store={store}/>
                            </Route>
                        </Switch>
                    </Content>
                </Wrapper>
            </ShellWrapper>
        </Suspense>
    </ErrorBoundary>
    )
};

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <RecoilRoot><App /></RecoilRoot>
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
