import { Login, Logout } from "@/lib/auth";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  return (
    <div className="flex flex-col items-center  h-screen gap-8">
      <header className="flex justify-between w-full bg-primary text-secondary p-4 px-20">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Sukoon</h1>
        </div>
        {session?.user ? (
          <div className="flex gap-10 text-lg ">
            <Link href="/dashboard">
              <Button className="text-secondary hover:bg-accent-dark transition-colors duration-300 text-lg" variant={"link"}>
                Dashboard
              </Button>
            </Link>
            <Logout />
          </div>
        ) : (
          <Login />
        )}
      </header>
    </div>
  );
}
