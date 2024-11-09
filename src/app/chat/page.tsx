"use client"

// src/chatRoom/OpenRoomSelector.js
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const ChatPage = () => {
    const [selectedRoom, setSelectedRoom] = useState<string>();
    const [nickname, setNickname] = useState<string>();
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (!user || !user.name || !user.nickname) return null;

    const rooms = [
        { id: 'room1', name: 'Anxiety Disorder' },
        { id: 'room2', name: 'Bipolar Disorder' },
        { id: 'room3', name: 'Depression' },
        { id: 'room4', name: 'ADHD' }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <form
                className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(selectedRoom, nickname);
                    if (selectedRoom && nickname) {
                        router.push(`/chat/${selectedRoom}?nickname=${nickname}&uid=${user.nickname}`);
                    }
                }}
            >
                <Input
                    placeholder='Enter nickname'
                    name='nickname'
                    onChange={(e) => { setNickname(e.target.value) }}
                    value={nickname}
                    className="mb-4"
                />
                <Select onValueChange={(value) => setSelectedRoom(rooms.find(room => room.name === value)?.id)}>
                    <SelectTrigger className="w-full mb-4">
                        <SelectValue placeholder="Select a Room" />
                    </SelectTrigger>
                    <SelectContent>
                        {rooms.map((room) => (
                            <SelectItem key={room.id} value={room.name}>
                                {room.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button
                    variant="default"
                    color="primary"
                    type="submit"
                    className="w-full"
                    onClick={() => {
                        if (!selectedRoom) {
                            alert('Please select a room');
                        }
                    }}
                >
                    Select a Chat Room
                </Button>
            </form>
        </div>
    );
};

export default ChatPage;