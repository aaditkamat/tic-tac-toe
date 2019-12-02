import React, { CSSProperties } from "react";

const Action = (props: Action.Props) => {
   const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
       event.preventDefault();
       return props.handleClick();
   };
   const renderFontChange = () => {
        const style: CSSProperties = props.textisBold === true ? {fontWeight: "bold"} : {};
        return (
            <button onClick={handleClick} style={style} >
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
