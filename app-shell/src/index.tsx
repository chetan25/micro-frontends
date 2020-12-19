import React from "react";
import ReactDOM from "react-dom";
import {
    Header, Spinner, ErrorBoundary
} from 'ui-components/dist/index';

const App = () => (
    <ErrorBoundary>
        <Spinner/>
        <Header />
    </ErrorBoundary>
);

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
