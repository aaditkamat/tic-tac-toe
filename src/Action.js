import React from 'react';

const Action = (props) => {
   const renderFontChange = () => {
        const style = props.textisBold === true ? {fontWeight: 'bold'}: {};
        return (
            <button onClick={props.handleClick} style={style}> 
                {`Go to ${props.moveLabel}`}
            </button>
        );
   }
    return (
        <li>
            {
                renderFontChange()
            }
        </li>
    );
}

export default Action;