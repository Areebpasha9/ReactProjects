// src/pages/AboutPage.jsx
import React from 'react';
import { Users, Award, Leaf, Heart, Clock, MapPin, Truck } from 'lucide-react';
import founderImg from '../assets/founder.jpg';

const AboutPage = () => {
  const values = [
    { icon: <Leaf className="h-6 w-6" />, title: "Natural Ingredients", desc: "Locally sourced from trusted farms" },
    { icon: <Heart className="h-6 w-6" />, title: "Made with Love", desc: "Family recipes passed down generations" },
    { icon: <Award className="h-6 w-6" />, title: "Award Winning", desc: "Multiple taste competition winners" },
    { icon: <Users className="h-6 w-6" />, title: "Community Focused", desc: "Supporting local since 1995" }
  ];

  const teamMembers = [
    { name: "Areeb Riyasat", role: "Founder", img: founderImg  },
    { name: "James Wilson", role: "Head Chef", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60" },
    { name: "Sophie Chen", role: "Flavor Innovator", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60" }
  ];

  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ice-cream-pink/20 to-ice-cream-blue/20 rounded-2xl mb-12 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-display text-gray-900 mb-4">Our Sweet Story</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            For over 15 years, we've been crafting unforgettable ice cream experiences, 
            one scoop at a time
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Our Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-display text-gray-900 mb-8 text-center">From Farm to Freezer</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="space-y-4 text-gray-600">
                <p>
                  It all started in 2005 when our founder, Grandma Maria, decided to share her 
                  secret family ice cream recipes with the neighborhood. Using milk from the 
                  family dairy farm and fruits from the local orchard, she created flavors 
                  that quickly became the talk of the town.
                </p>
                <p>
                  What began as a weekend hobby soon grew into a beloved local institution. 
                  Today, we still operate from the same principles: use only the freshest 
                  ingredients, never cut corners on quality, and always serve with a smile.
                </p>
                <p>
                  While we've grown from a small farm stand to a full-scale artisanal factory, 
                  we've never lost sight of our roots. Every batch is still made with the same 
                  care and attention to detail that Grandma Maria insisted upon.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=60"
                alt="Ice Cream Factory"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-5">
          <h2 className="text-3xl font-display text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="p-3 bg-pink-200 rounded-xl inline-block mb-4">
                  <div className="text-pink-500">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-display text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-ice-cream-pink to-ice-cream-blue text-white rounded-2xl p-4 mb-10"> 
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">15+</div>
              <div>Years in Business</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div>Unique Flavors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div>Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">3</div>
              <div>Generations</div>
            </div>
          </div>
        </div>

        {/* Meet the Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-display text-gray-900 mb-12 text-center">Meet Our Ice Cream Artisans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
                />
                <h3 className="text-xl font-display text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-ice-cream-pink font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.role === "Founder" && "With 10+ years of experience, Maria oversees all recipe development"}
                  {member.role === "Head Chef" && "Ensures every batch meets our rigorous quality standards"}
                  {member.role === "Flavor Innovator" && "Creates our exciting seasonal and experimental flavors"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visit Us */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-display text-gray-900 mb-6 text-center">Visit Our Factory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <MapPin className="h-8 w-8 text-ice-cream-pink mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p className="text-gray-600">123 Kamal Kunj Vasant Vihar<br />New Delhi, IC 12345</p>
            </div>
            <div className="text-center p-4">
              <Clock className="h-8 w-8 text-ice-cream-blue mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Hours</h3>
              <p className="text-gray-600">Open Daily<br />11AM - 10PM</p>
            </div>
            <div className="text-center p-4">
              <Truck className="h-8 w-8 text-ice-cream-mint mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Delivery</h3>
              <p className="text-gray-600">Free delivery<br />on orders over $25</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;