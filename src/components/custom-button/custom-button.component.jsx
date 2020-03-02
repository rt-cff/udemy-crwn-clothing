import React from 'react'

import './custom-button.styles.scss'

const CustomButton = ({children, isGoogleSignIn, ...props}) => (
    <button className = {`custom-button ${isGoogleSignIn ? 'google-sign-in' : ''}`} {...props}>{children}</button>
)

export default CustomButton