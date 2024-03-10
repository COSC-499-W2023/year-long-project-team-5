import React, { useLayoutEffect, useRef, useState } from "react";
import { Text } from "@aws-amplify/ui-react";

export const PopupText = ({ content, variation, children, ...rest }) => {
    const [toTruncate, setToTruncate] = useState(false);
    const textRef = useRef(null); // Ref for the text container div
    const contentRef = useRef(null); // Ref for the span to measure content

    useLayoutEffect(() => {
        if (textRef.current && contentRef.current) {
            // Compare the width of the content with the width of the parent container
            const containerWidth = textRef.current.offsetWidth;
            const contentWidth = contentRef.current.scrollWidth;
            // Set toTruncate true if contentWidth exceeds containerWidth
            setToTruncate(contentWidth > containerWidth);
        }
    }, []);

    const showPopup = () => {
        if(toTruncate) {
            alert(children);
        }
    };

    return (
        <div ref={textRef} style={{ width: '100%' }}>
            {/* Use a span inside Text to measure, since Text might not expose scrollWidth directly */}
            <Text variation={variation} isTruncated={toTruncate} {...rest}>
                <span ref={contentRef}>{children}</span>
            </Text>
            {toTruncate && <Text variation="tertiary" onClick={showPopup} style={{cursor: 'pointer'}} fontSize="0.8em">Click to see full text</Text>}
        </div>
    );
};
