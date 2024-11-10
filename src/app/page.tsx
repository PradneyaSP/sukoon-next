import { Login, Logout } from "@/lib/auth/auth";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import StartHereButton from "@/components/startButton";
import SpotifyPlaylist from "@/components/spotifyComp";
// const cards = [
//   { title: "Employee Database Management", color: "bg-transparent", image: "/images/calender.png" },
//   { title: "Performance Management", color: "bg-transparent", image: "/images/clock.png" },
//   { title: "Employee Onboarding", color: "bg-transparent", image: "/images/alert.png" },
// ];
export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  return (
    <div className="flex flex-col items-center  h-screen gap-8">
      <header className="flex justify-between w-full bg-transparent text-primary-foreground p-4 px-20">
        <div className="flex items-center gap-4">
          <Image src="/bigLogo.png" alt="Sukoon" width={50} height={50} />
          <h1 className="text-2xl font-bold text-black">SUKOON</h1>
        </div>
        {user ? (
          <div className="flex gap-6 text-lg ">
            <Link href="/dashboard">
              <Button className="text-primary hover:bg-accent-dark transition-colors duration-300 text-lg" variant={"link"}>
                Dashboard
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button className="text-primary hover:bg-accent-dark transition-colors duration-300 text-lg" variant={"link"}>
                Volunteer
              </Button>
            </Link>
            <Link href="/donate">
              <Button className="text-rose-600 hover:bg-accent-dark transition-colors duration-300 text-lg" variant={"link"}>
                DONATE
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
      {/* <ProfileClient /> */}
      <div className="min-h-screen items-center justify-center">

      <div className="md:mx-20 sm:mx-20 p-8 md:p-12 lg:p-16 bg-white rounded-lg flex flex-col items-center text-center md:flex-row md:text-left">
        
        {/* Text Section */}
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-10">
          <h1 className="text-4xl font-semi-bold text-indigo-400">
            CHECK YOUR <span className="text-indigo-400 font-bold">MENTAL HEALTH</span>
          </h1>
          <p className="mt-4 text-gray-600">
          Designed to make mental health support accessible, private, and personalized.
          </p>
          <StartHereButton/>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="relative">
            <Image src="/rb_2250.png" height={500} width={600} alt="Mental Health Illustration" />
            {/* Replace '/path-to-your-image.png' with the actual path to your illustration */}
          </div>
        </div>
    

      </div>
      <div className="flex-row min-h-screen w-[100%]">
      
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgb(129 140 248)" fill-opacity="1" d="M0,320L80,282.7C160,245,320,171,480,154.7C640,139,800,181,960,186.7C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        <div className="h-[400px] bg-[#818CF8]">
        <SpotifyPlaylist/>

        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgb(129 140 248)" fill-opacity="1" d="M0,320L80,282.7C160,245,320,171,480,154.7C640,139,800,181,960,186.7C1120,192,1280,160,1360,144L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
      </div>
      {/*  */}

       {/* empty */}
       <div className="flex min-h-screen justify-center items-center">
  <div className="bg-white shadow-xl rounded-2xl h-[500px] w-[80%] max-w-[800px]">
    <iframe
      className="w-full h-full rounded-2xl"
      src="https://www.youtube.com/embed/5zhnLG3GW-8?si=ts1mKzL4wFxsapsY"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
</div>

      <div className="flex justify-center mx-auto"> 
      <Button className=" bg-pink-500 text-xl font-bold hover:bg-pink-800 rounded-full p-6 w-36">
        <a href="/donate">
          DONATE
          </a>
      </Button>
      </div>
         {/* reviews */}
      <div className="bg-gray-50 py-12">
  <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">
    And our 100,000+ happy users
  </h2>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">

    <div className="bg-purple-100 flex flex-col items-center text-center rounded-t-lg rounded-b-full p-6 shadow-md">
      <Image height={24} width={184} className="rounded-full mb-4" src="/pip1.jpeg" alt="User 1"/>
      <p className="text-gray-800 font-semibold">YourDOST helped me work on my listening skills and everything at work improved drastically. I learnt how to work together and achieve team targets.</p>
      <span className="mt-4 font-bold text-purple-600">Ajay</span>
    </div>

    <div className="bg-orange-100 flex flex-col items-center text-center rounded-t-lg rounded-b-full p-6 shadow-md">
      <Image height={24} width={184} className=" rounded-full mb-4" src="/pip2.jpeg" alt="User 2"/>
      <p className="text-gray-800 font-semibold">YourDOST helped me navigate the transition from college to the corporate world. I discovered techniques that helped me regulate my emotions.</p>
      <span className="mt-4 font-bold text-orange-600">Ankit</span>
    </div>

    <div className="bg-purple-100 flex flex-col items-center text-center rounded-t-lg rounded-b-full p-6 shadow-md">
      <Image height={24} width={184} className="rounded-full mb-4" src="/pip3.jpeg" alt="User 3"/>
      <p className="text-gray-800 font-semibold">ADHD and overthinking made it difficult for me to make decisions and believe in myself. With YourDOST by my side, I am rebuilding myself.</p>
      <span className="mt-4 font-bold text-purple-600">Sneha</span>
    </div>

    <div className="bg-orange-100 flex flex-col items-center text-center rounded-t-lg rounded-b-full p-6 shadow-md">
      <Image height={24} width={184} className=" rounded-full mb-4" src="/pip4.jpeg" alt="User 4"/>
      <p className="text-gray-800 font-semibold">I was unsure if I could succeed in civil engineering or if I should change my career. YourDOST helped me gain a shift in mindset.</p>
      <span className="mt-4 font-bold text-orange-600">Mohammed Khaja</span>
    </div>

    <div className="bg-purple-100 flex flex-col items-center text-center rounded-t-lg rounded-b-full p-6 shadow-md">
      <Image height={24} width={184} className=" rounded-full mb-4" src="/pip5.jpeg" alt="User 5"/>
      <p className="text-gray-800 font-semibold">YourDOST helped me speak up confidently and voice opinions wherever needed. I was able to let go of thoughts that were holding me back.</p>
      <span className="mt-4 font-bold text-purple-600">Priya</span>
    </div>
  </div>
</div>

      <footer className="bg-black flex justify-center mx-auto h-[60px]">
        <div className="justify-center m-auto">
          <p className="text-white">2024 | All rights reserved by Sukoon</p>
        </div>
        </footer>
      </div>
      
    </div>
  );
}
