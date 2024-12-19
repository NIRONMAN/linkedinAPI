import React from 'react';
import { ArrowRight,LogIn } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const CustomLinkedInIcon = () => (
    <div className="relative flex items-center justify-center w-6 h-6">
      <div className="absolute w-6 h-6 bg-blue-600 rounded"></div>
      <span className="relative text-white font-bold text-sm">in</span>
    </div>
  );

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">PostPro</span>
            </div>
            <div className="flex items-center space-x-4 bg-blue-600 rounded-lg px-3 py-2 text-white">
              

              <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
              
            </div>
          </div>
        </div>
      </nav>

      {/* upper Section */}
<main className="pt-32 pb-16 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center text-white">
      <h1 className="text-5xl font-bold mb-6">
        Simplify Your LinkedIn Presence
      </h1>
      <p className="text-xl max-w-2xl mx-auto mb-8">
        Connect, create, and share your content seamlessly. The smartest way to
        manage your LinkedIn posts and grow your professional network.
      </p>
      <button className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition flex items-center mx-auto">
        <Link href={"/Dashboard"}>Start Posting Now</Link>
        <ArrowRight className="ml-2 h-5 w-5" />
      </button>
    </div>
  </div>
</main>


      <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Why Choose Us</h2>
        <div className="grid md:grid-cols-2 gap-8">

          <div className="group bg-white p-6 rounded-xl shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-blue-50">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 ease-in-out group-hover:rotate-12">
              <CustomLinkedInIcon />
            </div>
            <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-blue-600 text-gray-500">
              LinkedIn Integration
            </h3>
            <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
              Seamlessly connect and manage your LinkedIn profile with just a few clicks.
            </p>
            <div className="mt-4 flex items-center gap-2 text-blue-600 transform transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
            </div>
          </div>

          <div className="group bg-white p-6 rounded-xl shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-blue-50">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 ease-in-out group-hover:rotate-12">
              <LogIn className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-blue-600 text-gray-500">
              Google Authentication
            </h3>
            <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
              Quick and secure login with your Google account for a hassle-free experience.
            </p>
            <div className="mt-4 flex items-center gap-2 text-blue-600 transform transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to streamline your LinkedIn posting?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of professionals who trust our platform
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition">
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-600"> &copy; {new Date().getFullYear()} PostPro. All rights reserved.</span>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms and Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;