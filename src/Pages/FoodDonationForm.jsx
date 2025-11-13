import React, { useState, useEffect } from 'react';
import { Package, Clock, MapPin, Utensils, Vibrate, NotebookPen } from 'lucide-react';

export default function FoodDonationForm() {
  const [DonationFormData, setDonationFormData] = useState({
    city: '',
    area: '',
    foodName: '',
    isPacked: false,
    edibleDays: '',
    phone: '',
    note: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!DonationFormData.city || !DonationFormData.area || !DonationFormData.foodName || !DonationFormData.edibleDays || !DonationFormData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    try{
      const dataToSend = { ...DonationFormData, durationType: selected };
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/food-donations`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(dataToSend),
});


      const data = await response.json();

      if (response.ok) {
        // success
        successToast();
        // alert("✅ Donation submitted successfully!");
        setDonationFormData({ city: "", area: "", foodName: "", isPacked: false, edibleDays: "", phone: "", note: "" });
      } else {
        alert(`❌ Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("⚠️ Could not submit donation. Please try again later.");
    }
  };

 const successToast = () => {
  const toast = document.createElement("div");

  // Tailwind classes for top-center positioning and z-index
  toast.className = "fixed top-5 left-1/2 transform -translate-x-1/2 z-50";

  // Inner HTML for the green alert
  toast.innerHTML = `
    <div class="alert alert-success shadow-lg">
      <span>✅ Donation submitted !</span>
    </div>
  `;

  document.body.appendChild(toast);

  // Remove toast after 5 seconds
  setTimeout(() => toast.remove(), 5000);
};


  const handleChange = (name, value) => {
    setDonationFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  
  const [selected, setSelected] = useState("Hours");

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-100 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Food Donation Form</h1>
          <p className="text-gray-600">Help us distribute food to those in need</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* City Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                City Name
              </label>
              <input
                type="text"
                value={DonationFormData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="Enter your city"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-600 transition"
              />
            </div>

            {/* Area Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                Area Name
              </label>
              <input
                type="text"
                value={DonationFormData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                placeholder="Enter your area"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 transition"
              />
            </div>

            {/* Food Name Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Utensils className="w-4 h-4 text-pink-500" />
                Food Name
              </label>
              <input
                type="text"
                value={DonationFormData.foodName}
                onChange={(e) => handleChange('foodName', e.target.value)}
                placeholder="What food are you donating?"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition"
              />
            </div>


            {/*  Phone Number Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Vibrate  className="w-4 h-4 text-pink-500" />
                Contact Number
              </label>
              <input
                type="number"
                value={DonationFormData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Your contact number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition"
              />
            </div>

            {/*  Note Textarea */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <NotebookPen className="w-4 h-4 text-pink-500" />
                Note
              </label>
              <textarea
                type="text"
                value={DonationFormData.note}
                onChange={(e) => handleChange('note', e.target.value)}
                placeholder="Leave a note (optional)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-500 transition"
              />
            </div>

            {/* Packed Toggle */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => handleChange('isPacked', !DonationFormData.isPacked)}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-indigo-600" />
                  <div>
                    <span className="text-sm font-semibold text-gray-700 block">Packed or Not Packed</span>
                    <span className="text-xs text-gray-500">Is the food already packaged?</span>
                  </div>
                </div>
                <div className="relative">
                  <div className={`w-14 h-7 rounded-full transition-all ${DonationFormData.isPacked ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                  <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all ${DonationFormData.isPacked ? 'translate-x-7' : ''}`}></div>
                </div>
              </div>
              <div className="mt-3 text-center">
                <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  DonationFormData.isPacked 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {DonationFormData.isPacked ? 'Packed ✓' : 'Not Packed'}
                </span>
              </div>
            </div>

            {/* Edible Days Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                Food Will Be Edible For (Hours/Days)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={DonationFormData.edibleDays}
                  onChange={(e) => handleChange('edibleDays', e.target.value)}
                  placeholder="Enter number of days"
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                  <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="block w-25 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="Hours">Hours</option>
        <option value="Days">Days</option>
      </select>
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Submit Donation
              </button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-xs text-gray-600 mt-1">Always Available</div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-indigo-600">100%</div>
              <div className="text-xs text-gray-600 mt-1">Free Service</div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Thank you for helping reduce food waste! 🌍</p>
        </div>
      </div>
    </div>
  );
}