import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Text } from "@aws-amplify/ui-react";
import { debounce } from "lodash";

export const DynamicText = ({ variation, children, ...rest }) => {
    const [toTruncate, setToTruncate] = useState(true);
    const textRef = useRef(null);
    const contentRef = useRef(null);

    // A function to check and update truncation state
    const checkTruncation = () => {
        if (textRef.current && contentRef.current) {
            const containerWidth = textRef.current.offsetWidth;
            const contentWidth = contentRef.current.scrollWidth;
            setToTruncate(contentWidth > containerWidth);
        }
    };

    const debouncedCheckTruncation = debounce(checkTruncation, 300)

    useLayoutEffect(() => {
        debouncedCheckTruncation();
    }, [debouncedCheckTruncation]);

    // Respond to window resize events
    useEffect(() => {
        window.addEventListener('resize', debouncedCheckTruncation);

        return () => {
            window.removeEventListener('resize', debouncedCheckTruncation);
        };
    }, [debouncedCheckTruncation]); 

    const extendText = () => {
        if (toTruncate) {
            setToTruncate(false);
        }
    };

    return (
        <div>
            <Text ref={textRef} className="textContent" variation={variation} isTruncated={toTruncate} width={toTruncate ? "95%" : "auto"} style={{ overflowWrap: toTruncate ? "normal" : "break-word" }}  {...rest}>
                <span ref={contentRef}>{children}</span>
            </Text>
            {toTruncate === true && (
                <Text className="textPopupOption" variation="tertiary" onClick={extendText} style={{cursor: 'pointer'}} fontSize="0.8em">
                    See more
                </Text>
            )}
        </div>
    );
};
