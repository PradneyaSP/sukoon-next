"use client"
import React, { useEffect, useState } from 'react';
import ChatService from '@/lib/chat-service';
import Message from '@/components/chat/message';
import { MessageType } from '@/types/chat';
import ChatInput from '@/components/chat/chat-input';
import { useSearchParams } from 'next/navigation';

export default function ChatRoomPage({ params }: { params: { room: string } }) {
    const [messages, setMessages] = useState<MessageType[]>([]);
    
    
    const searchParams = useSearchParams()
    const nickname = searchParams.get('nickname');
    const uid = searchParams.get('uid');
    const room = params.room;
    
    useEffect(() => {
        if (room) {
            const unsubscribe = ChatService.subscribeToMessages(room, setMessages);
            return () => unsubscribe();
        }
    }, [room]);
    
    if(!nickname || !uid) {
        return <div>Missing nickname or uid</div>
    }


    const sendMessage = (text: string) => {
        ChatService.sendMessage(room, { text, uid, displayName: nickname });
    };
    return (
        <div className="container mx-auto p-4">
            <h5 className="text-xl font-bold mb-4">{`Chat Room: ${room}`}</h5>
            <div className="border rounded-lg p-4 mb-4">
                <ul className="space-y-2">
                    {messages.map(message => (
                        <Message key={message.id} message={message} userId={uid} />
                    ))}
                </ul>
            </div>
            <ChatInput onSend={sendMessage} />
        </div>
    );
}

