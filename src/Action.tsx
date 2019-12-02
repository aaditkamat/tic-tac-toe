import React, { CSSProperties } from "react";

const Action = (props: any) => {
   const renderFontChange = () => {
        const style: CSSProperties = props.textisBold === true ? {fontWeight: "bold"} : {};
        return (
            <button onClick={props.handleClick} style={style} >
                {`Go to ${props.moveLabel}`}
            </button>
        );
   };
   return (
        <li>
            {
                renderFontChange()
            }
        </li>
   );
};

export default Action;
