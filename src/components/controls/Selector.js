import React from 'react';
import Select from 'react-select'
import PropTypes from 'prop-types';

const Selector = ({customStyle, onChange, ...props}) => {
    const defaultSelectorStyle = {
        control:(defaults)=>({
            ...defaults,
            width:350,
            'margin-left':10,
            'margin-right':10,
        })
    }

    return (<Select 
        styles={ Object.assign({}, {...defaultSelectorStyle}, {...customStyle})}
        onChange={onChange}
        setValue={v=>onChange(v)}
        {...props}
    />)
}

Selector.propTypes = {
    customStyle: PropTypes.object,
    onChange: PropTypes.func
};

export default Selector;