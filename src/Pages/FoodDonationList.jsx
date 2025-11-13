import React, { useState, useEffect } from 'react';
import { Package, Clock, MapPin, Utensils, CheckCircle, XCircle } from 'lucide-react';

export default function FoodDonationList() {
  
  
  const [donations, setDonations] = useState([]);
  const fetchDonations = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/food-donations`);
      const data = await response.json();
      setDonations(data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-between mb-7">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Available Food Donations</h1>
              <p className="text-gray-600">Fresh food waiting to be collected</p>
            </div>
          </div>
          <div className="flex item-center justify-between  bg-white border-2 border-gray-200 px-8 py-2 mt-4 rounded-lg">
            <div className="text-3xl font-bold text-indigo-600">{donations.length}</div>
            <p className="text-sm p-2 text-gray-600">Active Donations</p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-gray-300 transition-colors"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{donation.foodName}</h3>
                  {/* <span className="text-sm text-gray-500">Donation #{donation.id}</span> */}
                </div>
                {/* {donation.isPacked ? (
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="bg-amber-100 p-2 rounded-full">
                    <XCircle className="w-5 h-5 text-amber-600" />
                  </div>
                )} */}
              </div>

              {/* Location Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-xs text-gray-500">City</p>
                    <p className="font-semibold text-gray-900">{donation.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-xs text-gray-500">Area</p>
                    <p className="font-semibold text-gray-900">{donation.area}</p>
                  </div>
                </div>


                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-outline btn-info btn-sm"
                    onClick={() => document.getElementById(`note_${donation._id}`).showModal()}
                  >
                    Note
                  </button>
                  <p className="text-sm text-gray-700 line-clamp-1">- {donation.note || "Not Notes Provided"}</p>
                </div>




                <dialog id={`note_${donation._id}`} className="modal dark:bg-white">
                  <div className="modal-box dark:bg-white">
                    <h3 className="font-bold text-lg">{donation.foodName}</h3>
                    <p className="py-4">{donation.note || "No note provided."}</p>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>

              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-6"></div>

              {/* Additional Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-600" />
                  <span className={`text-sm font-medium ${
                    donation.isPacked ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {donation.isPacked ? 'Packed' : 'Unpacked'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {donation.edibleDays} {donation.durationType || "Days"}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button className={`w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity`}>
                Request Pickup
              </button>
            </div>
          ))}
        </div>

        {/* Stats Section
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {donations.filter(d => d.isPacked).length}
            </div>
            <p className="text-gray-600">Packed Items</p>
          </div>
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {donations.filter(d => !d.isPacked).length}
            </div>
            <p className="text-gray-600">Unpacked Items</p>
          </div>
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {Math.round(donations.reduce((acc, d) => acc + d.edibleDays, 0) / donations.length)}
            </div>
            <p className="text-gray-600">Avg. Days Fresh</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}