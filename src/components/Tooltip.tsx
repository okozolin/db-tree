import React, {useState} from "react";
import {TooltipProps} from "../types";
import styled from "styled-components";
import {platformColors} from "../constants/colors";

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`
const TooltipWrapper = styled.div`
  position: relative;
  z-index: 1
`
const TooltipStyle = styled.div`
  position: absolute;
  top: -5px;
  left: 10px;
  background: transparent;
  color: ${platformColors.mint};
  font-size: 10px;
  padding: 16px 8px 16px 16px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  width: 200px;
  pointer-events: none; // prevent flickering
  z-index: 1
`

const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <TooltipContainer>
            <TooltipWrapper
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </TooltipWrapper>
            {showTooltip && (
                <TooltipStyle>
                    {title}
                </TooltipStyle>
            )}
        </TooltipContainer>
    );
};

export default Tooltip;
