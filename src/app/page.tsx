import ProfileClient from "@/lib/profile-client";
import { Login, Logout } from "@/lib/auth";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  return (
    <div className="flex flex-col items-center  h-screen gap-8">
      <header className="flex justify-between w-full bg-primary text-secondary p-4 px-20">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Sukoon</h1>
        </div>
        {session?.user ? <Logout /> : <Login />}
      </header>
      <ProfileClient />
    </div>
  );
}
