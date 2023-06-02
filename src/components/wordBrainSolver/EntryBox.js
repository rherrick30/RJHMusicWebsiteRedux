import React from 'react';
import PropTypes from 'prop-types';



const EntryBox = props => {

    const {onChange, label, className, type, value} = props;

    return (
    <div className={`entryBox ${className}`}>
        <label className="labelText">{label}</label>
        <input type={type} onChange={onChange} value={value}></input>
    </div>
    )
}

EntryBox.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
};


export default EntryBox;