import { Login, Logout } from "@/lib/auth";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  return (
    <div className="flex flex-col items-center  h-screen gap-8">
      <header className="flex justify-between w-full bg-transparent text-secondary p-4 px-20">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-black">SUKOON</h1>
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
      {/* <ProfileClient /> */}
      <div className=" min-h-screen flex items-center justify-center">

      <div className="mx-auto p-8 md:p-12 lg:p-16 bg-white rounded-lg flex flex-col items-center text-center md:flex-row md:text-left">
        
        {/* Text Section */}
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-10">
          <h1 className="text-4xl font-semi-bold text-indigo-400">
            CHECK YOUR <span className="text-indigo-400 font-bold">MENTAL HEALTH</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.
          </p>
          <button className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition duration-200">
            Contact Us
          </button>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="relative">
            <img src="" alt="Mental Health Illustration" className="w-64 h-64" />
            {/* Replace '/path-to-your-image.png' with the actual path to your illustration */}
          </div>
        </div>

      </div>
      
      </div>
    </div>
  );
}
