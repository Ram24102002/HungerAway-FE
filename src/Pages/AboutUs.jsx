import React, { useState } from 'react';
import { Heart, Users, Truck, MapPin, Target, Utensils } from 'lucide-react';

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const sections = [
    {
      id: 0,
      icon: Utensils,
      title: "Who We Are",
      color: "blue",
      content: {
        main: "HungerAway is a community-led initiative dedicated to redistributing surplus food to those in need. Our goal is simple yet powerful — to make sure no good food goes to waste while someone, somewhere, goes hungry.",
        sub: "Started by a group of passionate volunteers, HungerAway believes that small acts of kindness can create lasting change in the fight against hunger and food waste."
      }
    },
    {
      id: 1,
      icon: Target,
      title: "Our Mission",
      color: "orange",
      content: {
        main: "Our mission is to rescue excess food from events, restaurants, weddings, and households and deliver it safely to people in need within local communities. HungerAway serves as a bridge — connecting food surplus to food scarcity through a volunteer-powered, transparent system.",
        sub: "Every meal saved not only fills a stomach but also saves resources, prevents waste, and spreads compassion."
      }
    },
    {
      id: 2,
      icon: Truck,
      title: "How We Work",
      color: "blue",
      content: {
        steps: [
          { num: "1", title: "Food Reporting", desc: "Donors can report leftover or excess food through our website or WhatsApp helpline." },
          { num: "2", title: "Verification & Collection", desc: "Our nearest volunteer team verifies the food and collects it in clean, food-grade containers." },
          { num: "3", title: "Distribution", desc: "The food is promptly distributed to shelters, orphanages, and people in need — within safe consumption time limits." }
        ],
        sub: "Our volunteers follow strict hygiene standards and ensure every meal we handle is safe, fresh, and handled with care."
      }
    },
    {
      id: 3,
      icon: Heart,
      title: "Why It Matters",
      color: "orange",
      content: {
        main: "Every year, tons of edible food are wasted while millions go hungry. By joining hands with HungerAway, you're not just donating food — you're feeding hope, dignity, and kindness.",
        sub: "Together, we can make a world where hunger is a story of the past — and food truly brings people together."
      }
    },
    {
      id: 4,
      icon: Users,
      title: "Join the Movement",
      color: "blue",
      content: {
        main: "Whether you're an individual, restaurant, or organization — you can make an impact! Volunteer your time, donate food, or spread awareness in your community. Every small action counts.",
        sub: "Visit our Contact Us page or reach out on social media to learn how you can be part of the HungerAway family."
      }
    },
    {
      id: 5,
      icon: MapPin,
      title: "Our Presence",
      color: "orange",
      content: {
        main: "HungerAway currently operates in multiple cities across India with the support of local volunteers, NGOs, and food donors. Our network is constantly expanding — and we're always open to partnerships and new regions.",
        sub: "We believe in transparency, compassion, and community. Every meal rescued through HungerAway is a step closer to a world without hunger."
      }
    }
  ];

  const getColorClasses = (color, type = 'bg') => {
    const colors = {
      blue: {
        bg: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        text: 'text-blue-600',
        border: 'border-blue-600',
        light: 'bg-blue-50'
      },
      orange: {
        bg: 'bg-orange-600',
        hover: 'hover:bg-orange-700',
        text: 'text-orange-600',
        border: 'border-orange-600',
        light: 'bg-orange-50'
      }
    };
    return colors[color][type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
            About Us — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Hunger Away</span>
          </h1>
          <p className="text-gray-600 text-lg">Click on any section below to learn more</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const isHovered = hoveredCard === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                onMouseEnter={() => setHoveredCard(section.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-2 rounded-xl border-2 transition-all duration-300 transform ${
                  isActive 
                    ? `${getColorClasses(section.color, 'bg')} ${getColorClasses(section.color, 'border')} text-white scale-105 shadow-lg` 
                    : `bg-white ${getColorClasses(section.color, 'border')} hover:scale-105 hover:shadow-md`
                } ${isHovered && !isActive ? 'shadow-md' : ''}`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${isActive ? 'text-white' : getColorClasses(section.color, 'text')}`} />
                <h3 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {section.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Content Display */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 min-h-96 transition-all duration-500">
          {sections.map((section) => {
            const Icon = section.icon;
            
            return (
              <div
                key={section.id}
                className={`transition-all duration-500 ${
                  activeSection === section.id 
                    ? 'opacity-100 block' 
                    : 'opacity-0 hidden'
                }`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-4 rounded-full ${getColorClasses(section.color, 'light')}`}>
                    <Icon className={`w-8 h-8 ${getColorClasses(section.color, 'text')}`} />
                  </div>
                  <h2 className={`text-3xl font-bold ${getColorClasses(section.color, 'text')}`}>
                    {section.title}
                  </h2>
                </div>

                {section.content.steps ? (
                  <div className="space-y-6">
                    {section.content.steps.map((step) => (
                      <div 
                        key={step.num}
                        className="flex gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                      >
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full ${getColorClasses(section.color, 'bg')} text-white flex items-center justify-center font-bold text-lg`}>
                          {step.num}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                          <p className="text-gray-700 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                    <p className="text-gray-700 leading-relaxed mt-6 pl-16 italic">
                      {section.content.sub}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {section.content.main}
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {section.content.sub}
                    </p>
                  </div>
                )}

                {section.id === sections.length - 1 && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl border-2 border-orange-200">
                    <p className="text-gray-800 font-semibold text-center text-lg">
                      ❤️ Together, let's build a future where no food is wasted — and no one goes hungry.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeSection === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
            }`}
          >
            ← Previous
          </button>
          <button
            onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
            disabled={activeSection === sections.length - 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeSection === sections.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg'
            }`}
          >
            Next →
          </button>
        </div>

      </div>
    </div>
  );
}