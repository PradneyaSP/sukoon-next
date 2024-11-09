"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChatService from '@/lib/chat-service';
import { Message } from '@/types/chat';

export default function ChatRoomPage({ params }: { params: { room: string } }) {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);

    const nickname = router.query.nickname as string;
    const uid = router.query.uid as string;

    useEffect(() => {
        if (room) {
            const unsubscribe = ChatService.subscribeToMessages(room, setMessages);
            return () => unsubscribe();
        }
    }, [room]);

    return <div>My Post: {params.room}</div>
}

