import React from 'react'

import './form-input.styles.scss'

const FormInput = ({label, handleChange, ...props}) => (
    <div className = 'group'>
        <input className = 'form-input' onChange = {handleChange} {...props}/>
        {!label ? null : <label className = {`${props.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>}
    </div>
)

export default FormInput