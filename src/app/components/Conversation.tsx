'use client';

import { useState, useRef, useEffect } from 'react';
import Chevron from '../icons/Chevron';
import ReactMarkdown from 'react-markdown';

interface ConversationProps {
    topic: string;
    description: string;
}

export default function Conversation({ topic, description }: ConversationProps) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const slicecut = 320; // 160 was originally

    const shouldSlice = description.length > slicecut;
    const sliceAtEndOfSentence = (text: string, limit: number) => {
        const regex = /[.?!]\s/g;
        let match;
        let lastIndex = -1;
        while ((match = regex.exec(text)) !== null) {
            if (match.index > limit) break;
            lastIndex = match.index + 1;
        }
        return lastIndex === -1 ? text.slice(0, limit) : text.slice(0, lastIndex);
    };

    const slicedDescription = shouldSlice
        ? sliceAtEndOfSentence(description, slicecut)
        : description;
    const remainingDescription = shouldSlice
        ? description.slice(slicedDescription.length)
        : '';

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
            } else {
                contentRef.current.style.height = '0px';
            }
        }
    }, [isOpen]);

    return (
        <>
            <div id="Conversation" className="text-primary select-none mt-md">
                <h1 className="font-primary text-3xl font-bold">{topic}</h1>
                {shouldSlice ? (
                    <>
                        <div className="font-secondary mt-sm">
                            <ReactMarkdown>{slicedDescription}</ReactMarkdown>
                        </div>
                        <div className="accordion">
                            <div
                                ref={contentRef}
                                className="accordion-content font-secondary mt-2 overflow-hidden transition-height duration-300 ease-in-out"
                                style={{ height: '0px' }}
                            >
                                <ReactMarkdown>{remainingDescription}</ReactMarkdown>
                            </div>
                            <button
                                className="accordion-summary font-secondary mt-xxs flex items-center cursor-pointer rounded-md"
                                onClick={toggleAccordion}
                            >
                                <span className="hover:underline mr-xxxs">
                                    {isOpen ? 'Lue vähemmän' : 'Lue lisää'}
                                </span>
                                <div className={`details-icon ${isOpen ? 'rotate-90' : ''}`}>
                                    <Chevron />
                                </div>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="font-secondary mt-sm">
                        <ReactMarkdown>{description}</ReactMarkdown>
                    </div>
                )}
            </div>
        </>
    );
}
