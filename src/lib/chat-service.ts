// src/chatRoom/ChatService.js
import { MessageType } from '@/types/chat';
import { db } from '../firebaseConfig';
import { collection, doc, query, orderBy, onSnapshot, addDoc, serverTimestamp, setDoc } from 'firebase/firestore';

class ChatService {
  static async sendMessage(roomId: string, { text, uid, displayName }: { text: string; uid: string; displayName?: string }) {
    const roomRef = doc(db, 'chatRooms', roomId);
    const messagesRef = collection(roomRef, 'messages');

    // Create room document if it doesn’t exist
    await setDoc(roomRef, { id: roomId }, { merge: true });

    // Add message to the room's messages subcollection
    await addDoc(messagesRef, {
      text,
      uid,
      displayName: displayName || 'Anonymous',
      timestamp: serverTimestamp(),
    });
  }

  static subscribeToMessages(roomId: string, callback: React.Dispatch<React.SetStateAction<MessageType[]>>
  ) {
    const messagesRef = collection(db, 'chatRooms', roomId, 'messages');
    const messagesQuery = query(messagesRef, orderBy('timestamp'));

    // Subscribe to messages and call the callback with real-time updates
    return onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as MessageType[];
      callback(messages);
    });
  }
}

export default ChatService;
