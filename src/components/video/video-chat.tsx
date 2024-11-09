// components/VideoChat.tsx
"use client"
import React, { useEffect, useRef, useState } from 'react';
import SimplePeer, { Instance, SignalData } from 'simple-peer';
import { db } from '@/firebaseConfig';
import { doc, setDoc, onSnapshot, updateDoc, deleteDoc, DocumentReference, DocumentData, getDoc } from 'firebase/firestore';
import { useUser } from '@auth0/nextjs-auth0/client';
import { v4 as uuidv4 } from 'uuid';

const VideoChat: React.FC = () => {
    const { user } = useUser();
    const [callId, setCallId] = useState<string>('');
    const [isCalling, setIsCalling] = useState<boolean>(false);
    const [peer, setPeer] = useState<Instance | null>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const connectionRef = useRef<DocumentReference<DocumentData> | null>(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            })
            .catch(err => console.error('Error accessing media devices.', err));
    }, []);

    const initiateCall = async () => {
        if (!callId || !user) return;
        setIsCalling(true);

        const callDoc = doc(db, 'calls', callId);
        await setDoc(callDoc, { initiator: user.sub, createdAt: new Date() });

        const newPeer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream: localVideoRef.current?.srcObject as MediaStream,
        });

        newPeer.on('signal', async (signal: SignalData) => {
            await updateDoc(callDoc, { offer: JSON.stringify(signal) });
        });

        onSnapshot(callDoc, async (snapshot) => {
            const data = snapshot.data();
            if (data?.answer && !newPeer.destroyed) {
                newPeer.signal(JSON.parse(data.answer));
            }
            if (data?.candidate) {
                newPeer.signal(JSON.parse(data.candidate));
            }
        });

        newPeer.on('stream', (stream: MediaStream) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
            }
        });

        setPeer(newPeer);
        connectionRef.current = callDoc;
    };

    const answerCall = async () => {
        if (!callId || !user) return;

        const callDoc = doc(db, 'calls', callId);
        const callData = (await getDoc(callDoc)).data();
        if (!callData) {
            alert('Call not found');
            return;
        }

        const newPeer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream: localVideoRef.current?.srcObject as MediaStream,
        });

        newPeer.on('signal', async (signal: SignalData) => {
            await updateDoc(callDoc, { answer: JSON.stringify(signal) });
        });

        onSnapshot(callDoc, async (snapshot) => {
            const data = snapshot.data();
            if (data?.offer && !newPeer.destroyed) {
                newPeer.signal(JSON.parse(data.offer));
            }
            if (data?.candidate) {
                newPeer.signal(JSON.parse(data.candidate));
            }
        });

        newPeer.on('stream', (stream: MediaStream) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
            }
        });

        setPeer(newPeer);
        connectionRef.current = callDoc;
    };

    const endCall = async () => {
        if (peer) {
            peer.destroy();
        }
        if (connectionRef.current) {
            await deleteDoc(connectionRef.current);
        }
        setIsCalling(false);
        setPeer(null);
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }
    };

    const startNewCall = () => {
        const newCallId = uuidv4(); // Generate a unique call ID
        setCallId(newCallId);
        initiateCall();
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">1v1 Video Chat</h1>
            <div className="flex space-x-4 mb-6">
                <video ref={localVideoRef} autoPlay muted className="w-64 h-48 border rounded-md shadow-lg" />
                <video ref={remoteVideoRef} autoPlay className="w-64 h-48 border rounded-md shadow-lg" />
            </div>
            <div className="flex flex-col items-center space-y-4">
                <input
                    type="text"
                    placeholder="Call ID"
                    value={callId}
                    onChange={(e) => setCallId(e.target.value)}
                    className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                    <button
                        onClick={startNewCall}
                        disabled={isCalling}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                    >
                        Start New Call
                    </button>
                    <button
                        onClick={answerCall}
                        disabled={isCalling}
                        className={`px-4 py-2 rounded-md font-semibold text-white ${isCalling ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
                            }`}
                    >
                        Answer Call
                    </button>
                    <button
                        onClick={endCall}
                        disabled={!isCalling}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md"
                    >
                        End Call
                    </button>
                </div>

            </div>
        </div>
    );
};

export default VideoChat;
