import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CornerUpLeft } from 'lucide-react';
import HungerAway from '../assets/HungerAwayNoBG.png';
import { Link } from 'react-router-dom';
import { notifyTostFun } from '../../Utils/notifyTostFun.js';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault(); // prevent page refresh

  // Check if all fields are filled
  if (!formData.name || !formData.email || !formData.phone || !formData.message) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      // success
      setSubmitted(true);
      notifyTostFun("✅ Message sent successfully!", "green");
      // alert("✅ Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => setSubmitted(false), 3000);
    } else {
      alert(`❌ Error: ${data.error || "Something went wrong"}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("⚠️ Could not send message. Please try again later.");
  }
};


  

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 flex items-center justify-center px-6 py-4">
            <Link to={'/'}><CornerUpLeft size={40} /></ Link>
        <div className="w-4/5  px-6 py-6 flex justify-center items-center gap-4">
          <div className='flex justify-start items-center gap-4'>
            {/* <h1 className="text-3xl font-bold text-black">Hunger Away</h1> */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center">
                    <img src={HungerAway} alt="" />
                  </div>
          </div>
          <p className="text-gray-600 mt-1 text-sm">Together Against Hunger</p>
        </div>
        
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Get in Touch</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions or want to volunteer? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Email</h4>
                    <p className="text-gray-600">contact@hungeraway.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Phone</h4>
                    <p className="text-gray-600">+91 1234567890</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1">Address</h4>
                    <p className="text-gray-600">
                      123 Community Street<br />
                      City, State 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h4 className="font-semibold text-black mb-2">Office Hours</h4>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-black font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-black font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-black font-medium mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-black font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center">
                  Thank you! We'll get back to you soon.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-600">
          <p>© 2024 Hunger Away. Making a difference, one meal at a time.</p>
        </div>
      </footer>
    </div>
  );
}