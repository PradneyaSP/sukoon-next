"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Dashboard = () => {
  const { user, error, isLoading } = useUser();
  const isAuthenticated = user ? true : false;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!isAuthenticated) return null;

  // const isMentor = document.cookie.split('; ').find(row => row.startsWith('isMentor='))?.split('=')[1] === 'true';

  return (
    <div>
      <div className="flex h-fit m-4 gap-20">
        <div className="bg-white rounded-lg p-6 text-center max-w-md border border-gray-300 inline-block">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
          <p className="mb-6">Start chatting with people and explore new connections!</p>
          <Link href={"/chat"}>
            <Button variant={"default"} className="p-2 w-fit">{"Let's Chat!"}</Button>
          </Link>
        </div>
        <div className="bg-white rounded-lg p-6 text-center max-w-md border border-gray-300 inline-block">
          <h2 className="text-2xl font-bold mb-4">Take an Assessment</h2>
          <p className="mb-6">Evaluate your skills and knowledge by taking an assessment.</p>
          <Link href={"/assmt"}>
            <Button variant={"default"} className="p-2 w-fit">{"Start Assessment"}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
