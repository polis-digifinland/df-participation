'use client';

import { useState, useRef, useEffect } from 'react';
import Chevron from '../icons/Chevron';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

interface ConversationProps {
    topic: string;
    description: string;
}

export default function Conversation({ topic, description }: ConversationProps) {
    const { t } = useTranslation();

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
                contentRef.current.hidden = false;
                contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
            } else {
                contentRef.current.style.height = '0px';
                setTimeout(() => {
                    if (contentRef.current) {
                        contentRef.current.hidden = true;
                    }
                }, 320);
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
                        <button
                                className="font-secondary mt-xxs flex items-center cursor-pointer rounded-md"
                                onClick={toggleAccordion}
                                aria-expanded={isOpen}
                                aria-controls="accordion-content"
                            >
                                <span className="hover:underline mr-xxxs">
                                    {isOpen ? t('readLess') :  t('readMore')}
                                </span>
                                <div className={`details-icon ${isOpen ? 'rotate-90' : ''}`}>
                                    <Chevron />
                                </div>
                            </button>
                            <div
                                id='accordion-content'
                                ref={contentRef}
                                className="font-secondary mt-2 overflow-hidden transition-height duration-300 ease-in-out"
                                style={{ height: '0px' }}
                                tabIndex={-1}
                                aria-disabled={isOpen ? "false" : "true"}
                            >
                                <ReactMarkdown>{remainingDescription}</ReactMarkdown>
                            </div>
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
