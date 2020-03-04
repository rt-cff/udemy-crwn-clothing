import React, {Component} from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {auth, createUserWithEmailAndPassword, createUserProfileDocument} from '../../firebase/firebase.utils'

import './sign-up.styles.scss'

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName: '',
            email: '', 
            password: '', 
            confirmPassword: '',
        }
    }

    handleSubmit = async e => {
        e.preventDefault()

        const {displayName, email, password, confirmPassword} = this.state

        if(password !== confirmPassword) {
            alert('password don\'t match')
        }

        try {
            const {user} = await createUserWithEmailAndPassword(email, password)

            //createUserWithEmailAndPassword will automatically Sign up after successfull account creation
            //Hence createUserProfileDocument will also get called in onAuthStateChanged
            //which creates a race condition
            // await (async () => new Promise((resolve) => {
            //         setTimeout(() => {
            //             console.log('timeout')
            //             resolve()
            //         }, 2000)
            //     })
            // )();

            await createUserProfileDocument(user, {displayName})

            this.setState({
                displayName: '',
                email: '', 
                password: '', 
                confirmPassword: '',
            })
        }catch(error) {
            console.log(error)
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target

        this.setState({[name]: value})
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state

        return (
            <div className = 'sign-up'>
                <h2 className = 'title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                
                <form onSubmit = {this.handleSubmit}>
                    <FormInput label = 'Display Name' name = 'displayName' type = 'text' value = {displayName} handleChange = {this.handleChange} required/>
                    <FormInput label = 'Email' name = 'email' type = 'email' value = {email} handleChange = {this.handleChange} required/>
                    <FormInput label = 'Password' name = 'password' type = 'password' value = {password} handleChange = {this.handleChange} required/>
                    <FormInput label = 'Confirm Password' name = 'confirmPassword' type = 'password' value = {confirmPassword} handleChange = {this.handleChange} required/>

                    <div className = 'buttons'>
                        <CustomButton type = 'submit'>Sign Up</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp