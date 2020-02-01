import React, {Component} from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import './sign-in.styles.scss'

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '', 
        }
    }

    handleSubmit = e => {
        e.preventDefault()
    }

    handleChange = e => {
        const {name, value} = e.target
console.log(name, value, e)
        this.setState({[name]: value})
    }

    render() {
        const {email, password} = this.state

        return (
            <div className = 'sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                
                <form onSubmit = {this.handleSubmit}>
                    <FormInput label = 'Email' name = 'email' type = 'email' value = {email} handleChange = {this.handleChange} required/>
                    <FormInput label = 'Password' name = 'password' type = 'password' value = {password} handleChange = {this.handleChange} required/>

                    <CustomButton type = 'Submit'>Sign In</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignIn