import { useEffect, useState } from "react";
import { useUser as useAuth0User } from "@auth0/nextjs-auth0/client";
import { db } from '@/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

interface CustomUser {
    isLoading: boolean;
    error: Error | undefined;
    user: {
        name: string | undefined;
        email: string | undefined;
        nickname: string | undefined;
        isMentor: boolean;  // Custom field indicating whether the user is a mentor
    } | null;
}

export const customUseUser = (): CustomUser => {
    const { user, isLoading, error } = useAuth0User();
    const [isMentor, setIsMentor] = useState(false);  // Custom state to store mentor status
    if(!user) return { isLoading, error, user: null };

    useEffect(() => {
        const checkIfMentor = async () => {
            if (user && user.nickname) {
                try {
                    const mentorDocRef = doc(db, "mentorDetails", user.nickname);
                    const mentorDoc = await getDoc(mentorDocRef);
                    
                    // Check if the mentor data exists in Firestore
                    if (mentorDoc.exists()) {
                        setIsMentor(true); // If mentor exists, set to true
                    } else {
                        setIsMentor(false); // If no mentor entry exists, set to false
                    }
                } catch (error) {
                    console.error("Error checking mentor status:", error);
                    setIsMentor(false);
                }
            }
        };

        checkIfMentor();
    }, [user]);

    return { 
        isLoading, 
        error, 
        user: { 
            name: user.name || undefined, 
            email: user.email || undefined, 
            nickname: user.nickname || undefined, 
            isMentor 
        } 
    };
};
