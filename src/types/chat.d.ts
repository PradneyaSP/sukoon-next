import { Timestamp } from 'firebase/firestore';

interface MessageType {
  id : string
  displayName: string;
  text: string;
  timestamp: Timestamp;
  uid: string;
};
