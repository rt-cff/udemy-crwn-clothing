import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 1000
    const publishableKey = 'pk_test_yMq9WCGGYtOCl9AWTViUX5qx'
    const onToken = token => {
        axios({
            url: 'payment', 
            method: 'post', 
            data: {
                amount: priceForStripe, 
                token, 
            }
        }).then(res => {
            alert('Payment Successfull')
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error))
            alert('There was an issue with your Payment. Please make sure you use the provided credentials to test')
        })
    }

    return (
        <StripeCheckout 
            label = 'Pay Now'
            name = 'CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image = 'https/svgshare.com/i/CUz.svg'
            description = {`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton