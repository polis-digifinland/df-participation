import Chevron from '../icons/Chevron';
import ReactMarkdown from 'react-markdown';

interface ConversationProps {
    topic: string;
    description: string;
}

export default function Conversation({ topic, description }: ConversationProps) {

    const slicecut = 160;

    const shouldSlice = description.length > slicecut;
    const slicedDescription = shouldSlice ? description.slice(0, description.lastIndexOf(' ', slicecut)) : description;
    const remainingDescription = shouldSlice ? description.slice(slicecut) : '';

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
                                <span className="hover:underline">Lue lisää</span>
                                <div className="details-icon"><Chevron /></div>
                            </summary>
                            <div className="font-secondary mt-2 transition-max-height duration-500 ease-in-out overflow-hidden">
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
