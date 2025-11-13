import React from 'react';
import { MapPin , MapPinned } from 'lucide-react';
import ChennaiImg from '../assets/Cities/Chennai.png';
import MumbaiImg from '../assets/Cities/Mumbai.png';
import BangaloreImg from '../assets/Cities/Banglore.png';
import HyderabadImg from '../assets/Cities/Hydrabad.png';
import KolkataImg from '../assets/Cities/Kolkata.png';
import PuneImg from '../assets/Cities/Pune.png';

const IndianCityCards = () => {
  const cities = [
    { name: 'Chennai',  images: ChennaiImg  },
    { name: 'Mumbai', images: MumbaiImg },
    // { name: 'Delhi', images: DelhiImg  },
    { name: 'Bangalore', images: BangaloreImg },
    { name: 'Hyderabad', images: HyderabadImg },
    { name: 'Kolkata', images: KolkataImg },
    { name: 'Pune', images: PuneImg },
    // { name: 'Ahmedabad', images: AhmedabadImg },
    // { name: 'Jaipur', images: JaipurImg },
    // { name: 'Lucknow', images: LucknowImg }
  ];

  return (
    <div className="max-h-screen bg-white p-8 flex flex-col justify-center item center ">
      {/* <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Select a city to explore food donations
      </h1> */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-8 gap-15 max-w-7xl mx-auto">
        {cities.map((city, index) => (
          <div
            key={index}
            className="rounded-xl  overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <div className={`h-33 flex flex-col items-center justify-center`}>
              <img src={city.images} className='h-[100%] w-[100%]' alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className='block md:hidden flex flex-col justify-center items-center mt-4'>
        <h2 className='text-2xl'>Choose where you are </h2>
        <MapPinned size={40} className='mt-5' />
      </div>
    </div>
  );
};

export default IndianCityCards;