import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Text } from "@aws-amplify/ui-react";
import { debounce } from "lodash";

export const DynamicText = ({ variation, children, ...rest }) => {
    const [toTruncate, setToTruncate] = useState(true);
    const [isExtended, setIsExtended] = useState(false);
    const textRef = useRef(null);
    const contentRef = useRef(null);

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

    useEffect(() => {
        window.addEventListener('resize', debouncedCheckTruncation);

        return () => {
            window.removeEventListener('resize', debouncedCheckTruncation);
        };
    }, [debouncedCheckTruncation]); 

    const extendText = () => {
        setIsExtended(!isExtended);
        setToTruncate(!toTruncate);
    };

    return (
        <div>
            <Text ref={textRef} className="textContent" variation={variation} isTruncated={toTruncate} width={toTruncate ? "95%" : "auto"} style={{ overflowWrap: toTruncate ? "normal" : "break-word" }}  {...rest}>
                <span ref={contentRef}>{children}</span>
            </Text>
            {(toTruncate || isExtended)  && (
                <Text className="textDynamicOption" variation="tertiary" onClick={extendText} style={{cursor: 'pointer'}} fontSize="0.8em">
                    {isExtended && !toTruncate ? "Hide" : "See more"}
                </Text>
            )}
        </div>
    );
};
