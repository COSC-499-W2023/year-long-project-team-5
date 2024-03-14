import React, { useLayoutEffect, useRef, useState } from "react";
import { Text, Flex } from "@aws-amplify/ui-react";
import { debounce } from "lodash";

export const DynamicText = ({ variation, children, testWidths, ...rest }) => {
    const [toTruncate, setToTruncate] = useState(false);
    const [isExtended, setIsExtended] = useState(false);
    const containerRef = useRef(null);
    const textRef = useRef(null);

    const checkTruncation = () => {
        console.log('inside checkTruncation')
        if (process.env.NODE_ENV === 'test' || testWidths) {
            // Use mocked widths
            const { containerWidth, contentWidth } = testWidths;
            const needsToTruncate = contentWidth > containerWidth;
            setToTruncate(needsToTruncate);
        } else {
            if (containerRef.current && textRef.current) {
                // Ensure layout conducive to measurement before deciding to truncate
                containerRef.current.style.whiteSpace = 'nowrap';
                const containerWidth = containerRef.current.offsetWidth;
                const contentWidth = textRef.current.scrollWidth;
                const needsToTruncate = contentWidth > containerWidth;
                console.log(needsToTruncate, containerWidth, contentWidth)
                setToTruncate(needsToTruncate);
            }
        }
    };

    // Effect for initial check and resize event
    useLayoutEffect(() => {
        checkTruncation();
        const debouncedCheck = debounce(checkTruncation, 200);
        window.addEventListener('resize', debouncedCheck);
        return () => window.removeEventListener('resize', debouncedCheck);
    }, []);

    const extendText = () => {
        setIsExtended(!isExtended);
        setToTruncate(!toTruncate);
    };

    return (
        <div ref={containerRef} >
            <Text className="textContent" variation={variation} width={"95%"} isTruncated={toTruncate} style={{
                ...(isExtended ? { whiteSpace: 'normal' } : {})
            }}{...rest}>
                <span ref={textRef}>{children}</span>
            </Text>
            {(toTruncate || isExtended) &&
                <Text className="textDynamicOption" variation="tertiary" onClick={extendText} style={{
                    cursor: 'pointer', 
                    fontSize: '0.8em', 
                    ...(isExtended ? { overflowWrap: 'break-word' } : {})
                }}>
                    {isExtended ? 'Hide' : 'Show more'}
                </Text>
            }
        </div>
    );
};
