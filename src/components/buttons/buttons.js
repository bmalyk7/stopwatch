import React from 'react';
import '../buttons/buttons.css'

const Button = ({type, action}) => {

    return(
        <button className='btn' onClick={action}>{type}</button>
    )
}

export default Button