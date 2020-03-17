import React, {Component, useState, useEffect} from 'react'
import {connect} from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {signInWithGoogle, signInWithEmailAndPassword} from '../../firebase/firebase.utils'

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

import {takeLatest, call, put} from 'redux-saga/effects'


import './sign-in.styles.scss'


const SignIn = ({dispatch}) => {
    const [userCredentails, setCredentails] = useState({email: '', password: ''})
    const {email, password} = userCredentails

    const handleChange = e => {
        const {name, value} = e.target

        setCredentails({
            ...userCredentails, 
            [name]: value, 
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(emailSignInStart([email, password]))
        setCredentails({email: '', password: ''})
    }

    return (
        <div className = 'sign-in'>
            <h2 className = 'title'>I already have an account</h2>
            <span>Sign in with your email and password</span>
            
            <form onSubmit = {handleSubmit}>
                <FormInput label = 'Email' name = 'email' type = 'email' value = {email} handleChange = {handleChange} required/>
                <FormInput label = 'Password' name = 'password' type = 'password' value = {password} handleChange = {handleChange} required/>

                <div className = 'buttons'>
                    <CustomButton type = 'submit'>Sign In</CustomButton>
                    <CustomButton type = 'button' isGoogleSignIn onClick = {() => dispatch(googleSignInStart())}>
                        {' '}
                        Sign In With Google{' '}
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

class _SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '', 
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        
        // const {email, password} = this.state
        
        // try {
        //     await signInWithEmailAndPassword(email, password)
        //     this.setState({email: '', password: ''})
        // } catch(error) {
        //     console.log(error)
        // }

        const {email, password} = this.state

        this.props.dispatch(emailSignInStart([email, password]))
        this.setState({email: '', password: ''})
    }

    handleChange = e => {
        const {name, value} = e.target

        this.setState({[name]: value})
    }

    render() {
        const {email, password} = this.state

        return (
            <div className = 'sign-in'>
                <h2 className = 'title'>I already have an account</h2>
                <span>Sign in with your email and password</span>
                
                <form onSubmit = {this.handleSubmit}>
                    <FormInput label = 'Email' name = 'email' type = 'email' value = {email} handleChange = {this.handleChange} required/>
                    <FormInput label = 'Password' name = 'password' type = 'password' value = {password} handleChange = {this.handleChange} required/>

                    <div className = 'buttons'>
                        <CustomButton type = 'submit'>Sign In</CustomButton>
                        <CustomButton type = 'button' isGoogleSignIn onClick = {() => this.props.dispatch(googleSignInStart())}>
                            {' '}
                            Sign In With Google{' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(SignIn)