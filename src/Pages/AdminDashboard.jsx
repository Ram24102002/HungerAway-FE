import React, { useEffect, useState } from "react";
import { Mail, Users, Menu, X, Plus } from "lucide-react";
import logo from "../assets/HungerAwayNoBG.png";
import logoText from "../assets/HungerAwayIcon.png";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [emails, setEmails] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [activeSection, setActiveSection] = useState("inbox");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");


  const navigate = useNavigate();

  // Fetch contacts/emails
  const getContacts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch contacts");

      const data = await response.json();
      console.log("Contacts fetched successfully:", data);
      setEmails(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Fetch volunteers (you'll need to create this endpoint)
  const getVolunteers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/volunteers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch volunteers");

      const data = await response.json();
      console.log("Volunteers fetched successfully:", data);
      setVolunteers(data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  const postVolunteer = async (volunteerData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/volunteers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(volunteerData),
      });
      if (!response.ok) throw new Error("Failed to add volunteer");

      const data = await response.json();
      console.log("Volunteer added successfully:", data);
      getVolunteers(); // Refresh the volunteer list
    } catch (error) {
      console.error("Error adding volunteer:", error);
    }
  };


  useEffect(() => {
    getContacts();
    getVolunteers();
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSelectedEmail(null);
    setSelectedVolunteer(null);
    setSidebarOpen(false);
  };


  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen bg-white">
        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 z-40 h-full w-3/4 sm:w-64 bg-white border-r border-gray-200 p-6 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="mb-8 flex justify-between items-center">
            <div className="flex">
              <img src={logoText} className="h-8 px-3 mt-[-4px] cursor-pointer" onClick={() => navigate("/")} alt="Hunger Away" />
              <h1 className="text-2xl font-light text-gray-900">Admin</h1>
            </div>
            <button
              className="md:hidden text-gray-500"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => handleSectionChange("inbox")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                activeSection === "inbox"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Mail size={20} />
              <span className="text-sm font-medium">Inbox</span>
              {emails.length > 0 && (
                <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  {emails.length}
                </span>
              )}
            </button>

            <button
              onClick={() => handleSectionChange("volunteers")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                activeSection === "volunteers"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Users size={20} />
              <span className="text-sm font-medium">Volunteer List</span>
              {volunteers.length > 0 && (
                <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  {volunteers.length}
                </span>
              )}
            </button>

            <button
              onClick={() => handleSectionChange("AddVolunteers")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                activeSection === "AddVolunteers"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Users size={20} />
              <span className="text-sm font-medium">Add Volunteer</span>
            </button>

            <button
  onClick={() => navigate("/")}
  className="sticky bottom-4 w-full bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-all"
>
  Go Home
</button>

          </nav>
        </div>

        {/* Mobile Top Bar */}
        <div className="flex md:hidden items-center justify-between p-4 border-b border-gray-200">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <img src={logo} className="h-10 cursor-pointer" onClick={() => navigate("/")} alt="Hunger Away" />
          <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
        </div>

        {/* Split View */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* List View */}
          <div className="w-full md:w-96 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col h-1/2 md:h-auto">
            <div className="flex-1 overflow-y-auto">

              {/* Email List */}
              {activeSection === "inbox" && (
                <>
                  {emails.length > 0 ? (
                    emails.map((email) => (
                      <div
                        key={email._id}
                        onClick={() => {
                          setSelectedEmail(email);
                          setSelectedVolunteer(null);
                        }}
                        className={`p-5 border-b border-gray-200 cursor-pointer transition-colors ${
                          selectedEmail?._id === email._id
                            ? "bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {email.name}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400">
                          {new Date(email.createdAt).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-2">
                          {email.message}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-gray-500 text-sm text-center">
                      No messages found.
                    </div>
                  )}
                </>
              )}

              {/* Volunteer List */}
              {activeSection === "volunteers" && (
                <>
                  <div className="h-[55dvh] w-full">
                    {volunteers.length > 0 ? (
                    volunteers.map((volunteer) => (
                      <div
                        key={volunteer._id}
                        onClick={() => {
                          setSelectedVolunteer(volunteer);
                          setSelectedEmail(null);
                        }}
                        className={`p-5 border-b border-gray-200 cursor-pointer transition-colors ${
                        selectedVolunteer?._id === volunteer._id
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {volunteer.name}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-400">
                          {volunteer.email}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {volunteer.phone}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-gray-500 text-sm text-center">
                      No volunteers found.
                    </div>
                  )}
                  </div>
                  
                </>
              )}

              {/* Add Volunteers */}
              {activeSection === "AddVolunteers" && (
                
                  <div className="w-full p-6" id="addVolunteer">


  <form className="bg-white"
  onSubmit={(e)=>{
        e.preventDefault();

        const volunteerData = {
          name,
          phone,
          email
        }
        postVolunteer(volunteerData);

        setName("");
        setPhone("");
        setEmail("");
      }}
  >
    <h2 className="text-lg py-3 font-semibold  text-gray-800 flex justify-start item-center "><p className="px-3" >Add Volunteer</p> <Users /></h2>

    {/* Name */}
    <div className="mb-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
        placeholder="Volunteer Name"
      />
    </div>

    {/* Phone */}
    <div className="mb-3">
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
        placeholder="Phone Number"
      />
    </div>

    {/* Email */}
    <div className="mb-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
        placeholder="Email Address"
      />
    </div>

    <button
      type="submit"
      
      className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition flex justify-center items-center gap-2"
    >
      Add Volunteer <Plus />
    </button>
  </form>

</div>

              )
                }
            </div>
          </div>

          {/* Detail View */}
          <div className="flex-1 overflow-y-auto h-1/2 md:h-auto">
            {selectedEmail && activeSection === "inbox" ? (
              <div className="p-6 sm:p-8 max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {selectedEmail.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {selectedEmail.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(selectedEmail.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  <hr className="my-4" />
                  <p><span className="font-medium mb-2">Email:</span> {selectedEmail.email}</p>
                  <br />
                  <p><span className="font-medium mb-2">Phone:</span> {selectedEmail.phone}</p>
                  <br />
                  <p className="font-medium mb-2">Message:</p>
                  <p className="mt-4">{selectedEmail.message}</p>
                </div>
              </div>
            ) : selectedVolunteer && activeSection === "volunteers" ? (
              <div className="p-6 sm:p-8 max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                    {selectedVolunteer.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {selectedVolunteer.name}
                    </p>
                    <p className="text-xs text-gray-500">Volunteer</p>
                  </div>
                </div>

                <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  <hr className="my-4" />
                  <p><span className="font-medium mb-2">Email:</span> {selectedVolunteer.email}</p>
                  <br />
                  <p><span className="font-medium mb-2">Phone:</span> {selectedVolunteer.phone}</p>
                  <br />
                  {selectedVolunteer.availability && (
                    <>
                      <p><span className="font-medium mb-2">Availability:</span> {selectedVolunteer.availability}</p>
                      <br />
                    </>
                  )}
                  {selectedVolunteer.skills && (
                    <>
                      <p className="font-medium mb-2">Skills:</p>
                      <p className="mt-2">{selectedVolunteer.skills}</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center p-6">
                <div>
                  {activeSection === "inbox" ? (
                    <>
                      <Mail size={36} className="text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm sm:text-base">
                        Select a message to read
                      </p>
                    </>
                  ) : (
                    <>
                      <Users size={36} className="text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm sm:text-base">
                        Select a volunteer to view details
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}