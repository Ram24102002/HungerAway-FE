import { useState } from 'react';

export default function RequestButton({donation}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requestnote, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

const handleSubmit = async () => {
  if (!name || !phone) {
      setError('Please fill in all fields');
      return;
  }

  setIsLoading(true);
  setError('');

  try {
      const payload = {
          name,
          phone,
          requestnote, // send matching key
          donation: donation._id
      };

      console.log('Sending payload:', payload);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/requests`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('Response:', data);

      if (!response.ok) {
          throw new Error(data.message || data.error || 'Something went wrong');
      }

      setSubmitted(true);

      setTimeout(() => {
          setSubmitted(false);
          setName('');
          setPhone('');
          setNote('');
          setIsOpen(false);
          setIsLoading(false);
      }, 2000);

  } catch (err) {
      console.error('Error:', err);
      setError(err.message);
  } finally {
      setIsLoading(false);
  }
};

  return (
    <div >
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        disabled={donation.picked}
        className={`w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity ${donation.picked? "bg-gray-600":"bg-indigo-600 "}`}
      >
        Request Pickup
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>

            <h1 className="text-xl text-gray-800 mb-8 text-center">
              <span className='text-2xl font-bold '>{donation.foodName}</span>
            </h1>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Request Note
                </label>
                <textarea
                  id="requestnote"
                  type="text"
                  value={requestnote}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-2">
                  Requesting
                </label>
                <input
                  id="foodName"
                  type="text"
                  value={donation.foodName}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading || submitted}
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 
                ${isLoading || submitted ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {submitted ? "✓ Request Sent!" : isLoading ? "Submitting..." : "Send Request"}
              </button>


              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
