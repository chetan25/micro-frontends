import React, { lazy, Suspense} from "react";
import ReactDOM from "react-dom";
import {
    Header, ErrorBoundary
} from 'ui-components/dist';

// a relevant d.ts file is created as type definition for the remote app root
const Todos = lazy(() => import("todos/Todos"));

const App = () => (
    <ErrorBoundary>
        <Header />
        <Suspense  fallback="Loading Todo">
            <Todos />
        </Suspense>
    </ErrorBoundary>
);

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
