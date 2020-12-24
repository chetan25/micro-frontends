import React, { lazy, Suspense} from "react";
import ReactDOM from "react-dom";
import {
    Header, ErrorBoundary
} from 'ui-components/dist';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';

import styled, { createGlobalStyle  } from 'styled-components';
import { Switch, Route, Redirect, Link, BrowserRouter } from 'react-router-dom';

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
  
  const RemoteApp = React.lazy(() => dynamicFederation('app2', './RemoteApp'));
  
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

const App = () => {
    const state = useSelector((state) => state);
    console.log(state, 'from shell');
    return (
        <ErrorBoundary>
        <Suspense  fallback="Loading Todo">
            <GlobalStyle />
            <ShellWrapper>
                <Header />
                <Wrapper>
                    <SideBar>
                        <Navigation role="navigation">
                            <ul>
                                <li>
                                <Link to="/todos">Todos</Link>
                                </li>
                                <li>
                                <Link to="/page-2">Page 2</Link>
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
                            <Route path='/page-2'>
                                <h2>Page2</h2>
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
    <BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>,
    document.getElementById("root")
);
