//import Chevron from '../icons/Chevron';

/* 
<Chevron rotate={270} />
*/

interface ConversationProps {
    topic: string;
    description: string;
}

export default function Conversation({ topic, description }: ConversationProps) {

    const slicecut = 160;

    return (
        <>
            <div id="Conversation" className="text-primary select-none mt-10">
                <h1 className="font-primary text-3xl font-bold">
                    {topic}
                </h1>
                {description.length > slicecut ? (
                    <>
                        <p className="font-secondary mt-5">
                            {description.slice(0, slicecut)}...
                        </p>
                        <details>
                            <summary className="font-secondary mt-5">Lue lisää</summary>
                            <p className="font-secondary mt-2">{description.slice(slicecut)}</p>
                        </details>
                    </>
                ) : (
                    <p className="font-secondary mt-5">
                        {description}
                    </p>
                    )}
            </div>
        </>
    );
}
