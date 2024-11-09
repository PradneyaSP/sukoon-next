import React from 'react';

interface MessageProps {
    message: {
        uid: string;
        displayName: string;
        text: string;
    };
    userId: string;
}

const Message: React.FC<MessageProps> = ({ message, userId }) => {
    const isUser = message.uid === userId;
    return (
        <div className={`my-4 ${isUser ? 'text-right' : 'text-left'}`}>
            <div className="font-bold text-gray-500">{message.displayName}</div>
            <div
                className={`inline-block p-2 rounded-lg ${isUser ? 'bg-blue-100' : 'bg-gray-200'}`}
            >
                {message.text}
            </div>
        </div>
    );
};

export default Message;
