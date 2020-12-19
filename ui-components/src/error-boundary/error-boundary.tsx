import React, { Component } from "react";
import { ErrorImageContainer, ErrorImageOverlay, ErrorImagetext } from './error-boundary.style';

class ErrorBoundary extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    //catches any error thrown in children
    static getDerivedStateFromError(error: Error) {
        //returns a new state
        return { hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        //log or perform side effect
        console.log(error);
    }

    render() {
        if(this.state.hasError) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer>
                        Test Image
                    </ErrorImageContainer>
                    <ErrorImagetext>
                        Something went wrong
                    </ErrorImagetext>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
