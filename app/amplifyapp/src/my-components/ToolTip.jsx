import React from 'react';
import './Tooltip.css';
import { useTheme } from "@aws-amplify/ui-react";


export const ToolTip = (props) => {
  const { text, children } = props;
  return (
    <div className="tooltip" >
      {children}
      <span className="tooltiptext">{text}</span>
    </div>
  );
}

