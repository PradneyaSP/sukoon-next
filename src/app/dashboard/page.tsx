"use client"
import React, { useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Assessment from "@/components/assessment/assessment";

const Dashboard = () => {
  const { user, error, isLoading } = useUser();
  const isAuthenticated = user ? true : false;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  useEffect(() => {
    const checkUserInDB = async () => {
      if (user) {
        const userRef = doc(db, "userDetails", user.nickname || "defaultNickname");
        const userSnap = await getDoc(userRef);

        // If user does not exist, add the user data
        if (!userSnap.exists()) {
          await setDoc(userRef, { ...user });
          console.log("User data added to Firestore");
        } else {
          console.log("User already exists in Firestore");
        }
      }
    };

    checkUserInDB();
  }, [user]);

  if (!isAuthenticated) return null;

  return (<div><Link href={"/chat"} ><Button variant={"default"} className="p-2 w-fit">{"Let's Chat!"}</Button></Link>    <div>
    <h1>Welcome to Mental Health Assessment</h1>
    <Assessment />
  </div></div>)
};

export default Dashboard;
