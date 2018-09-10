import React, {PropTypes} from 'react';


const PlaylistDetailItem = (props) => {
    const _onClick = (event) => {
        props.removeFunction(event.target.value);
    };
    const item = props.item;
    return (
        <div>
            <a key={item.key + ":btn"} href="#" className="commandLink" onClick={_onClick}><i className="fas fa-times-circle" value={item}></i></a>
            ({item.type}) {item.title}
        </div>
    );
};

PlaylistDetailItem.propTypes = {
    item: PropTypes.object.isRequired,
    removeFunction : PropTypes.func.isRequired
};

export default PlaylistDetailItem;