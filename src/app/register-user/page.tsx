"use client";
import { FormEvent, useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/navigation";

const RegisterMentor = () => {
    const { user, error, isLoading } = useUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [qualification, setQualification] = useState("");
    const [description, setDescription] = useState("");
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [showForm, setShowForm] = useState(false); // Initially hide the form
    const [isFinding, setIsFinding] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function checkUserExists() {
            if (!user) return;

            try {
                const mentorDocRef = doc(db, "mentorDetails", user.nickname || "defaultNickname");
                const userDocRef = doc(db, "userDetails", user.nickname || "defaultNickname");

                const mentorDoc = await getDoc(mentorDocRef);
                const userDoc = await getDoc(userDocRef);

                if (mentorDoc.exists()) {
                    document.cookie = "isMentor=true; path=/;";
                    setIsRedirecting(true);
                    router.push("/dashboard");
                }
                else if (userDoc.exists()) {
                    document.cookie = "isMentor=true; path=/;";
                    setIsRedirecting(true);
                    router.push("/dashboard");
                }
                else {
                    setIsFinding(true);
                }
            } catch (error) {
                console.error("Error checking user:", error);
            }
        }

        checkUserExists();
    }, [user,router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user) return;

        // Create entry in mentorDetails collection after form submission
        const mentorRef = doc(db, "mentorDetails", user.nickname || "defaultNickname");
        await setDoc(mentorRef, {
            name,
            email,
            phone,
            specialization,
            experience,
            qualification,
            description,
        });
        console.log("Mentor data added to Firestore");

        // Redirect to dashboard after submission
        router.push("/dashboard");
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (!user) return null;

    return (
        <div className="flex h-fit m-4 justify-center items-center mt-20">
            {!isFinding && !showForm && !isRedirecting && (<div>Loading...</div>)}
            {isFinding && (<div className="bg-secondary rounded-lg p-6 text-center max-w-md w-full border border-gray-300 text-secondary-foreground">
                {/* //card which asks if the user is a mentor or not */}
                <h2 className="text-2xl font-bold mb-4">Are you a Mentor?</h2>
                <Button variant={"default"} onClick={() => setShowForm(true)} className="mr-10">Yes, I am a Mentor</Button>
                {/* // give no button */}
                <Button variant={"default"} onClick={async () => {
                    const userRef = doc(db, "userDetails", user.nickname || "defaultNickname");
                    await setDoc(userRef, { ...user });
                    console.log("User data added to Firestore");
                    router.push("/dashboard");
                }
                }>No, I am a regular User</Button>
            </div>)}
            {showForm && (<div className="bg-white rounded-lg p-6 text-center max-w-md w-full border border-gray-300">
                <h2 className="text-2xl font-bold mb-4">Register as a Mentor</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input id="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <Input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input id="phone" type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <Input id="specialization" type="text" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
                    <Input id="experience" type="number" placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} required />
                    <Input id="qualification" type="text" placeholder="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} required />
                    <Textarea id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <Button type="submit" className="bg-green-400 hover:bg-green-500 text-foreground font-semibold">Submit</Button>
                    <Button onClick={() => { setShowForm(false) }}>Go Back</Button>
                </form>
            </div>
            )}
            {isRedirecting && (
                <div>Redirecting...</div> // If form isn't displayed, show a loading message
            )}
        </div>
    );
};

export default RegisterMentor;
