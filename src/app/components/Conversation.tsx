import Chevron from '../icons/Chevron';
import ReactMarkdown from 'react-markdown';

interface ConversationProps {
    topic: string;
    description: string;
}

export default function Conversation({ topic, description }: ConversationProps) {

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

    const slicedDescription = shouldSlice ? sliceAtEndOfSentence(description, slicecut) : description;
    const remainingDescription = shouldSlice ? description.slice(slicedDescription.length) : '';

    return (
        <>
            <div id="Conversation" className="text-primary select-none mt-md">
                <h1 className="font-primary text-3xl font-bold">
                    {topic}
                </h1>
                {shouldSlice ? (
                    <>
                        <div className="font-secondary mt-sm">
                            <ReactMarkdown>{slicedDescription}</ReactMarkdown>
                        </div>
                        <details>
                            <summary className="font-secondary mt-xxs flex items-center">
                                <span className="hover:underline mr-xxxs">Lue lisää</span>
                                <div className="details-icon"><Chevron /></div>
                            </summary>
                            <div className="font-secondary mt-2">
                                <ReactMarkdown>{remainingDescription}</ReactMarkdown>
                            </div>
                        </details>
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
