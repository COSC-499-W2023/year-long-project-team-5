import React, { useState, useRef, useLayoutEffect } from "react";
import { Text, Flex } from "@aws-amplify/ui-react";
import { MdOutlineVisibilityOff } from "react-icons/md";

export const DynamicText = ({ variation, children, numLinesSpecified = 1, maxWidth = "100%", lineHeight = "1.2em", ...rest }) => {
    const [isExtended, setIsExtended] = useState(false);
    const [showToggle, setShowToggle] = useState(true);
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        const checkOverflow = () => {
            if (textRef.current && containerRef.current) {
                const lineHeightPx = parseFloat(lineHeight) * 24; // Adjust based on your actual font-size if it's not 16px
                const minContainerHeight = lineHeightPx * numLinesSpecified;
                containerRef.current.style.minHeight = `${minContainerHeight}px`;

                const fullHeight = textRef.current.scrollHeight;
                setShowToggle(fullHeight > minContainerHeight || isExtended);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [numLinesSpecified, children, maxWidth, isExtended, lineHeight]);

    const textStyle = {
        width: '100%',
        maxWidth,
        lineHeight, // Apply the line height to ensure consistent calculation
    };

    if (!isExtended) {
        Object.assign(textStyle, {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: numLinesSpecified.toString(),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        });
    }

    return (
        <div ref={containerRef} style={{ width: '100%', maxWidth }}>
            <Text ref={textRef} className="textContent" variation={variation} style={textStyle} {...rest}>
                {children}
            </Text>
            {showToggle && (
                <button onClick={() => setIsExtended(!isExtended)} style={{
                    cursor: 'pointer',
                    fontSize: '0.82em',
                    backgroundColor: 'transparent',
                    color: '#999999',
                    border: 'none',
                    padding: 0,
                    marginTop: '8px',
                }}>
                    {isExtended ? 
                    (<Flex alignItems='center' gap = '5px'><MdOutlineVisibilityOff/> Hide</Flex>) : 
                    (<Flex alignItems='center' gap='5px'>Show more</Flex>)}
                </button>
            )}
        </div>
    );
};
