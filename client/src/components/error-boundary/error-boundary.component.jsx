import React, {Component} from 'react'

import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText} from './error-boundary.styles'

class ErrorBoundary extends Component {
    static getDerivedStateFromError(error) {
        // process the error

        return {
            hasError: true
        }        
    }

    componentDidCatch(error, info) {
        console.log(error, info)
    }

    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    render() {
        if(this.state.hasError)
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl = 'https://i.imgur.com/oCkEbrA.png'/>
                    <ErrorImageText>Sorry this page is broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        
        return this.props.children
    }
}

export default ErrorBoundary