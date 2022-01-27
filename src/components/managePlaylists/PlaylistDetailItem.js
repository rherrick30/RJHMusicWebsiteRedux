import React from 'react';
import PropTypes from 'prop-types';


const PlaylistDetailItem = (props) => {
    const _onClick = () => {
        props.removeFunction(props.item);
    };
    const item = props.item;
    return (
        <div>
            <a key={item.key + ":btn"} href="#" className="commandLink defaultColor" onClick={_onClick}><i className="fas fa-times-circle" value={item}></i></a>
            ({item.type}) {item.title}
        </div>
    );
};

PlaylistDetailItem.propTypes = {
    item: PropTypes.object.isRequired,
    removeFunction : PropTypes.func.isRequired
};

export default PlaylistDetailItem;