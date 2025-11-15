import React from 'react'
import { HandHeart, Salad } from 'lucide-react';
import HungerAwayHero from '../assets/HungerAway_Hero.png';
import { Link } from 'react-router-dom';


function Hero() {
  return (
    <div >{/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-5 md:py-10 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          {/* <div className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm mb-6">
            Learn Like a Pro
          </div> */}
          
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Share Food. <br />Spread Kindness.
          </h1>
          
          <p className="text-md md:text-xl text-gray-600 mb-8">
            A simple act of sharing can change lives.
            {/* — let’s make sure every meal finds a plate. */}
          </p>
          
          <div className="flex gap-4 mb-12">
            <Link to='/FoodDonationForm'>
            <button className="flex items-center gap-2 px-5 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
              Donate Food
              <HandHeart className="w-5 h-5" />
            </button>
            </Link>
            <Link to='/FoodDonationList'>
                <button className="flex items-center gap-2 px-5 py-4 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-medium">
                    Find Food
                    <Salad  className="w-5 h-5" />
                </button>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-lg">
                👨
              </div>
              <div className="w-10 h-10 rounded-full bg-teal-400 border-2 border-white flex items-center justify-center text-lg">
                👩
              </div>
              <div className="w-10 h-10 rounded-full bg-red-400 border-2 border-white flex items-center justify-center text-lg">
                👩
              </div>
            </div>
            <span className="text-gray-600">Trusted by 1000+ People and Organizations</span>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1  flex justify-center items-center mt-7 md:mt-0">
          <img src={HungerAwayHero} className='h-[40dvh] md:h-[70dvh]' alt="" />
        </div>
      </div></div>
  )
}

export default Hero