import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Donation: React.FC = () => {
  return (
    <>

      {/* Navbar */}
      <header className="flex justify-between items-center py-4 text-white px-8">
        <div>
          <a href="/home">
            <Image src="/img/logo.png" alt="Logo" width={70} height={70} />
          </a>
        </div>
        <nav className="flex space-x-4">
          <a href="/volunteer" className="text-black px-4 py-2 rounded-2xl">Volunteer</a>
          <a href="/donate" className="bg-rose-600 text-white px-4 py-2 rounded-2xl">Donate</a>
        </nav>
        
      </header>

      {/* Header Section */}
      <section className="bg-cover bg-center h-72 flex items-center justify-center text-center text-white" style={{ backgroundImage: "url('/bg.png')" }}>
        <div className="bg-black bg-opacity-50 p-8 rounded">
          <h1 className="text-4xl font-semibold">Where We Use Your Donation</h1>
          <p className="mt-4">You have the power to change lives.</p>
        </div>
      </section>

      {/* Donation Cards Section */}
      <section className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image src="/2149196091.jpg" className="w-full h-48 object-cover" alt="Food Distribution" width={350} height={200} />
          <div className="p-6">
            <h5 className="text-center text-blue-600 text-2xl font-bold mb-4">Food Offering</h5>
            <p>
            Our volunteers have been serving meals to the homeless once each month since 2003. The volunteers prepare the food at home and serve in different temples in India. The vegetarian meal consists of rice, dal,sabzi,roti, salad, fruit, and dessert.One elderly man movingly reflected that the spirit of hospitality he felt at Sahara Kitchen was for him an expression of real worship, and another commented that while he did not usually like vegetarian food, the food at Sahara Kitchen was delicious. Sue, a volunteer from Mumbai reflected, "Actually, we're not just feeding them food, we're feeding them love and kindness, which is exactly what Amma does."
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image src="/medium-shot-boy-holding-book.jpg" className="w-full h-48 object-cover" alt="Food Distribution" width={350} height={200} />
          <div className="p-6">
            <h5 className="text-center text-blue-600 text-2xl font-bold mb-4">Education</h5>
            <p>
            Our volunteers have been teaching underprivilidge kids once each month since 2003. We distribute stationary items to the kids. As we believe everyone has a right to education. We have adopted two villages of Greater Noida. Like a tree, poverty has many roots. But among the many causes of global poverty, one factor stands out: education. Not every person without an education is living in extreme poverty. But most of those living in extreme poverty do lack a basic education. Those living below the poverty line will also be more likely to keep their children out of school, leads to a greater chance of living in poverty in future."


            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image src="/2147902076.jpg" className="w-full h-48 object-cover" alt="Food Distribution" width={350} height={200} />
          <div className="p-6">
            <h5 className="text-center text-blue-600 text-2xl font-bold mb-4">Love Offering</h5>
            <p>
            Stray animals are any domesticated animal who does not have a home, Our volunteers have been saving stray Animals for couple of years. Since we have now more then 50 star animals including cows, dogs, cats, injured birds etc. We have built a shelter for them. Donation money is mostly used on these innocent animals food, clothing, vacination, medical test, hygiene care items and medicens. As we beileve Strays are not a random occurrence but a symptom of a bigger problem caused by the following: irresponsible pet ownership, pet owners not spaying/neutering their pets, people still BUYING and BREEDING instead of adopting or fostering shelter and rescue animals."
            </p>
          </div>
        </div>
        {/* Add other cards similarly */}
      </section>

      {/* Donation Form */}
      <section className="container mx-auto px-4 py-10 bg-gray-100 rounded-lg">
        <form className="max-w-lg mx-auto space-y-6">
          <h2 className="text-center text-3xl font-semibold">Volunteer Signup</h2>
          <div className="flex space-x-4">
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="First name" />
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" placeholder="Last name" />
          </div>
          {/* More form fields */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="defaultCheck1" className="h-4 w-4 text-blue-600" />
            <label htmlFor="defaultCheck1" className="text-gray-700">Agree to terms & conditions</label>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">Submit</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-white">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-xl text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-xl text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-xl text-gray-400 hover:text-white">Google</a>
            <a href="#" className="text-xl text-gray-400 hover:text-white">LinkedIn</a>
            <a href="#" className="text-xl text-gray-400 hover:text-white">YouTube</a>
          </div>
          <div className="text-gray-400">
            <Link href="/home" className="hover:text-white">Home</Link> | <Link href="/about" className="hover:text-white">About Us</Link> | <Link href="/volunteer" className="hover:text-white">Volunteer</Link> | <Link href="/charity" className="hover:text-white">Donate</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Donation;
