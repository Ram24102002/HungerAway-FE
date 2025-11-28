import React, { useState, useEffect } from "react";
import HungerAwayLogo from "../assets/HungerAwayNoBG.png";
import { Link } from "react-router-dom";
import { MessageCircleQuestionMark, Menu, X, HandPlatter } from "lucide-react";
import logo from "../assets/HungerAwayNoBG.png";

function Nav() {
const FAQ = [
  {
    id: 1,
    question: "What is HungerAway? 🤔",
    answer:
      "HungerAway is a community-driven initiative that connects people with surplus food to NGOs and individuals in need — ensuring that no meal goes to waste.",
  },
  {
    id: 2,
    question: "How does the food collection process work?",
    answer:
      "When someone reports excess food through our website or helpline, our nearest volunteer team verifies and collects it in safe, food-grade containers, then delivers it to those in need.",
  },
  {
    id: 3,
    question: "Is the food safe for consumption?",
    answer:
      "Yes! We strictly follow food safety standards. Our team checks the food quality, temperature, and freshness before redistribution.",
  },
  {
    id: 4,
    question: "Can I volunteer with HungerAway?",
    answer:
      "Absolutely! We’re always looking for passionate volunteers. You can join us by filling out the volunteer form on our website.",
  },
  {
    id: 5,
    question: "What types of food do you accept?",
    answer:
      "We accept cooked food that’s safe, fresh, and not expired — such as rice, curry, bread, and snacks.",
  },
  {
    id: 6,
    question: "How can I donate excess food?",
    answer:
      "You can donate through our website or WhatsApp by sharing your location and food details. Our local team will contact you shortly.",
  },
  {
    id: 7,
    question: "Do you operate in all cities?",
    answer:
      "We are currently active in multiple cities and are continuously expanding based on volunteer availability.",
  },
  {
    id: 8,
    question: "Can organizations partner with HungerAway?",
    answer:
      "Yes! We actively collaborate with restaurants, NGOs, and corporate canteens to reduce food waste together.",
  },
  {
    id: 9,
    question: "Do you provide receipts for donations?",
    answer:
      "Currently, we focus on food donations and do not issue tax receipts, but we can provide an acknowledgment upon request.",
  },
  {
    id: 10,
    question: "How do you ensure food reaches safely?",
    answer:
      "We have trained volunteers who follow strict hygiene protocols and ensure food is delivered within safe time limits.",
  }
];

  const [faqLimit, setFaqLimit] = useState(6);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setFaqLimit(10);
      } else {
        setFaqLimit(6);
        setIsMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // DaisyUI Drawer wrapper
    <div className="drawer">
      {/* Drawer toggle input (required by DaisyUI) */}
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />

      {/* Page Content (Nav + Main UI) */}
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="flex bg-white md:flex-row items-center justify-between md:px-8 mt-2 md:mt-4 md:mx-20 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={HungerAwayLogo} alt="No Food Waste Logo" className="w-30 h-16" />
            {/* <span className="text-2xl font-bold text-black">Hunger Away</span> */}
          </Link>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-md text-gray-700 hover:text-black">
              Home
            </Link>

            <Link
              to="/IndianCityCards"
              className="text-md flex items-center gap-1 text-gray-700 hover:text-black"
            >
              <span>Cities</span>
              <span className="badge badge-dash badge-primary text-[10px] mx-1 px-2 py-0.5">
                Beta
              </span>
            </Link>

            <Link to="/AboutUs" className="text-md text-gray-700 hover:text-black">
              About Us
            </Link>

            {/* FAQ Trigger */}
            <label
              htmlFor="my-drawer-1"
              className="text-md text-gray-700 hover:text-black cursor-pointer"
            >
              FAQ
            </label>

            <Link to="/ContactPage">
              <button className="px-6 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition">
                Contact Us
              </button>
            </Link>
          </div>
        </nav>

        {/* ---------- Fullscreen Mobile Menu ---------- */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col py-30 px-10  space-y-6">
            <button
              className="absolute top-6 right-6 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>



<img src={logo} alt="" />
            <hr />
            

            <Link
              to="/"
              className="text-xl text-gray-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* <hr /> */}

            {/* <Link
              to="/IndianCityCards"
              className="text-xl text-gray-800 font-medium flex items-center justify-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Cities</span>
              <span className="badge badge-dash badge-primary text-[10px] px-2 py-0.5">
                Beta
              </span>
            </Link> */}

            {/* <hr /> */}

            <Link
              to="/AboutUs"
              className="text-xl text-gray-800 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>



            {/* ✅ FAQ works perfectly on mobile now */}
            <label
              htmlFor="my-drawer-1"
              className="text-xl text-gray-800 font-medium cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                setTimeout(() => {
                  const faqDrawer = document.getElementById("my-drawer-1");
                  if (faqDrawer) faqDrawer.checked = true;
                }, 300); // wait 300ms for the overlay to close
              }}
            >
              FAQ
            </label>

            

<hr />
            <Link
              to="/ContactPage"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4"
            >
              <button className="px-8 py-3 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition">
                Contact Us
              </button>
            </Link>

            
          </div>
        )}
      </div>


   {/* ---------- DaisyUI Drawer Side ---------- */}
<div className="drawer-side z-[60] ">
  <label htmlFor="my-drawer-1" className="drawer-overlay dark:bg-gray-100"></label>

  {/* 👇 Make the drawer appear as half-screen on small, full on medium+ */}
  <div className="bg-base-200 min-h-full w-full md:w-1/2 p-4 dark:bg-white fixed left-0 top-0 h-full overflow-y-auto">
    <div className="flex justify-start items-center relative">
      <h2 className="text-2xl font-bold mt-20 md:mt-7 my-7 mx-4 md:flex">
        Learn More About How We Operate...
        <MessageCircleQuestionMark className="hidden md:block ml-2 inline" />
      </h2>

      <label
        htmlFor="my-drawer-1"
        className="btn btn-sm btn-circle absolute right-4 top-4 z-50"
      >
        ✕
      </label>
    </div>

    {FAQ.slice(0, faqLimit).map((faq, index) => (
      <div
        key={faq.id}
        className="collapse collapse-arrow bg-base-100 border border-base-300 dark:bg-white"
      >
        <input
          type="radio"
          name="my-accordion-2"
          defaultChecked={index === 0}
        />
        <div className="collapse-title font-semibold">{faq.question}</div>
        <div className="collapse-content text-sm">{faq.answer}</div>
      </div>
    ))}
  </div>
</div>


    </div>
  );
}

export default Nav;
