import React, { useEffect, useState } from "react";
import { Mail, Star, Trash2, Menu, X } from "lucide-react";

export default function InboxRestrict() {
  const [emails, setEmails] = useState([]); // initially empty
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Fetch data from backend
  const getContacts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch contacts");

      const data = await response.json();
      console.log("Contacts fetched successfully:", data);

      // ✅ Set the fetched data into state
      setEmails(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // ✅ Run only once on mount
  useEffect(() => {
    getContacts();
  }, []);

  // ✅ Handle starred toggle
  const toggleStar = (id) => {
    setEmails((prev) =>
      prev.map((email) =>
        email._id === id ? { ...email, stared: !email.stared } : email
      )
    );
    if (selectedEmail?._id === id)
      setSelectedEmail({ ...selectedEmail, stared: !selectedEmail.stared });
  };

  // ✅ Handle delete
  const deleteEmail = (id) => {
    setEmails((prev) => prev.filter((email) => email._id !== id));
    if (selectedEmail?._id === id) setSelectedEmail(null);
  };

  const filteredEmails =
    filter === "starred" ? emails.filter((e) => e.stared) : emails;

  const unreadCount = emails.filter((e) => e.unread).length || 0;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-40 h-full w-3/4 sm:w-64 bg-white border-r border-gray-200 p-6 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-light text-gray-900">Inbox</h1>
            {/* <p className="text-sm text-gray-500 mt-1">{unreadCount} unread</p> */}
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
            onClick={() => setFilter("all")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
              filter === "all"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Mail size={20} />
            <span className="text-sm font-medium">All Mail</span>
          </button>

          <button
            onClick={() => setFilter("starred")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
              filter === "starred"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Star size={20} />
            <span className="text-sm font-medium">Starred</span>
            <span className="badge badge-dash badge-primary text-[10px] mx-1 px-2 py-0.5">Testing ⚠️</span>
          </button>
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between p-4 border-b border-gray-200">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Inbox</h1>
      </div>

      {/* Split View */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Email List */}
        <div className="w-full md:w-96 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col h-1/2 md:h-auto">
          <div className="flex-1 overflow-y-auto">
            {filteredEmails.length > 0 ? (
              filteredEmails.map((email) => (
                <div
                  key={email._id}
                  onClick={() => setSelectedEmail(email)}
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
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(email._id);
                      }}
                    >
                      <Star
                        size={16}
                        className={
                          email.stared
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-400"
                        }
                      />
                    </button> */}
                  </div>
                  <p className="text-xs text-gray-400 ">
                    {new Date(email.createdAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-2">
                    {email.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-6 text-gray-500 text-sm text-center">
                No emails found.
              </div>
            )}
          </div>
        </div>

        {/* Email View */}
        <div className="flex-1 overflow-y-auto h-1/2 md:h-auto">
          {selectedEmail ? (
            <div className="p-6 sm:p-8 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  {selectedEmail.name.charAt(0)}
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedEmail.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(selectedEmail.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {/* <button
                      onClick={() => toggleStar(selectedEmail._id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Star
                        size={20}
                        className={
                          selectedEmail.stared
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-400"
                        }
                      />
                    </button> */}
                    {/* <button
                      onClick={() => deleteEmail(selectedEmail._id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Trash2 size={20} className="text-gray-400" />
                    </button> */}
                  </div>
                </div>
              </div>

              <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
                <p>Email: {selectedEmail.email}</p>
                <p>Phone: {selectedEmail.phone}</p>
                <hr className="my-4" />
                <p className="font-medium mb-2">Message:</p>
                <p className="mt-4">{selectedEmail.message}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center p-6">
              <div>
                <Mail size={36} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm sm:text-base">
                  Select an email to read
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
