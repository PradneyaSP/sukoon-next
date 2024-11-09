import { Timestamp } from 'firebase/firestore';

type Message = {
  displayName: string;
  text: string;
  timestamp: Timestamp;
  uid: string;
};
