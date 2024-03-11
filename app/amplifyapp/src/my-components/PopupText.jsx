import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Text } from "@aws-amplify/ui-react";
import { debounce } from "lodash";

export const PopupText = ({ variation, children, ...rest }) => {
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
    }, []);

    // Respond to window resize events
    useEffect(() => {
        window.addEventListener('resize', debouncedCheckTruncation);

        return () => {
            window.removeEventListener('resize', debouncedCheckTruncation);
        };
    }, []); // Empty dependency array means this effect runs only on mount and unmount

    const showPopup = () => {
        if (toTruncate) {
            alert(children);
        }
    };

    return (
        <div>
            <Text ref={textRef} className="textContent" variation={variation} isTruncated={toTruncate} width={toTruncate ? "95%" : "auto"} {...rest}>
                <span ref={contentRef}>{children}</span>
            </Text>
            {toTruncate === true && (
                <Text className="textPopupOption" variation="tertiary" onClick={showPopup} style={{cursor: 'pointer'}} fontSize="0.8em">
                    Click to see full text
                </Text>
            )}
        </div>
    );
};
