import Image from 'next/image';

export default function Volunteer() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center py-4 text-white px-8">
        <div>
          <a href="/">
            <Image src="/SUKOON.png" alt="Logo" width={70} height={70} />
          </a>
        </div>
        <nav className="flex space-x-4">
          <p className="text-black px-4 py-2 rounded-2xl ">Volunteer</p>
          <a href="/donate" className="text-white bg-rose-600 px-4 py-2 rounded-2xl">Donate</a>
        </nav>
        
      </header>

      {/* Jumbotron */}
      <section className="bg-indigo-400 text-white text-center py-12">
        <h1 className="text-4xl font-bold">Become our helping hand</h1>
        <p className="text-lg">You have the power to change lives.</p>
      </section>

      {/* Helping Hand Info */}
      <div className="text-center my-12 mx-8">
        <h5 className="text-lg font-semibold">
          Sukoon, 24/7 emotional support to millions via online chat. We want to ensure nobody has to face their problems alone.
        </h5>
        <p className="mt-4">{`How does it work? It's easy! We provide free online training & support - all you need is an internet connection to get started.`}</p>
      </div>

      {/* Volunteer Info Cards */}
      <div className="flex flex-wrap justify-center gap-8 my-8 px-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-80">
          <ul className="list-disc list-inside space-y-2">
            <li>Free active listening course</li>
            <li>Online volunteering from home</li>
            <li>Control your availability to listen</li>
            <li>Get certifications to boost your resume</li>
            <li>Support & coaching from friendly mentors</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-80 flex items-center justify-center">
          <Image src="/rb_48265.png" alt="Mind" width={200} height={200} />
        </div>
      </div>

      {/* Signup Form */}
      <section className="bg-cover bg-center py-16" style={{ backgroundImage: "url('/Image/vol1.jpg')" }}>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center">Volunteer Signup</h2>
          <form className="space-y-4 mt-4">
            <div className="flex gap-4">
              <input type="text" className="border px-4 py-2 w-full rounded" placeholder="First name" />
              <input type="text" className="border px-4 py-2 w-full rounded" placeholder="Last name" />
            </div>
            <input type="email" className="border px-4 py-2 w-full rounded" placeholder="Email: name@example.com" />
            <input type="tel" className="border px-4 py-2 w-full rounded" placeholder="Contact number" />
            <input type="date" className="border px-4 py-2 w-full rounded" />
            <input type="text" className="border px-4 py-2 w-full rounded" placeholder="Highest education" />
            <textarea className="border px-4 py-2 w-full rounded" rows={3} placeholder="Tell us about yourself"></textarea>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="form-check-input" />
              <label className="text-sm">Agree all terms & conditions</label>
            </div>
            <button type="submit" className="bg-indigo-400 text-white px-6 py-2 rounded">SUBMIT</button>
          </form>
        </div>
      </section>

      {/* Active Volunteers Section */}
      <section className="bg-indigo-400 text-white text-center py-12 lg:mx-52">
        <h2 className="text-4xl font-bold">Our active volunteers</h2>
        <p className="text-lg">You have the power to change lives.</p>
      </section>

      {/* Volunteer Cards */}
      <div className="flex flex-wrap justify-center gap-8 py-8">
        {['Zain', 'Raj', 'Jaya', 'Jyoti'].map((name, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md text-center w-40">
            <Image src='/image.png' alt={name} width={100} height={100} className="mx-auto rounded-full" />
            <h4 className="mt-4 font-bold">{name}</h4>
            <p>{['Artist', 'CEO', 'Teacher', 'Doctor'][index]}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-blue-600"><i className="fa fa-facebook"></i></a>
          <a href="#" className="text-blue-400"><i className="fa fa-twitter"></i></a>
          <a href="#" className="text-red-600"><i className="fa fa-google"></i></a>
          <a href="#" className="text-blue-700"><i className="fa fa-linkedin"></i></a>
          <a href="#" className="text-red-500"><i className="fa fa-youtube"></i></a>
        </div>
        <p className="text-sm">
          | <a href="/home" className="hover:underline">Home</a> |
          <a href="/about" className="hover:underline">About Us</a> |
          <a href="/volunteer" className="hover:underline">Volunteer</a> |
          <a href="/charity" className="hover:underline">Donate</a> |
          <a href="/consultant" className="hover:underline">Consultant</a> |
        </p>
        <p className="text-xs mt-2">Copyright © 2021 Sukoon. All Rights Reserved</p>
      </footer>
    </div>
  );
}
