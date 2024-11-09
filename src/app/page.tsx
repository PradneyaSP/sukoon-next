import { Login, Logout } from "@/lib/auth/auth";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  return (
    <div className="flex flex-col items-center  h-screen gap-8">
      <header className="flex justify-between w-full bg-primary text-primary-foreground p-4 px-20">
        <div className="flex items-center gap-4">
          <Image src="/bigLogo.png" alt="Sukoon" width={50} height={50} />
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
          <div className="flex gap-10 text-lg ">
            {/* <Link href={"/register-mentor"}><Button variant={"link"} className="text-primary-foreground text-lg">Register as a Mentor</Button></Link> */}
            <Login />
          </div>
        )}
      </header>
    </div>
  );
}
