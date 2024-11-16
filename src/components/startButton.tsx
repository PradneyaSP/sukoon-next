

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function StartHereButton() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Replace this with your actual login check (e.g., checking cookies, session, or context)
    const user = localStorage.getItem('user'); // Example: storing login status in local storage
    setIsLoggedIn(!!user);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push('/dashboard');
    } else {
      router.push('/api/auth/login');
    }
  };

  return (
    <Button
      onClick={handleClick} className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition duration-200"
    >
      Start Here <span>→</span>
    </Button>
  );
}

