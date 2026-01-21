
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: ''
    });
  };

  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ice-cream-pink/20 to-ice-cream-blue/20 rounded-2xl mb-12 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-display text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions, feedback, or just want to say hello? We'd love to hear from you!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-display text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ice-cream-pink focus:border-transparent"
                      placeholder="John"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ice-cream-pink focus:border-transparent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ice-cream-pink focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ice-cream-pink focus:border-transparent"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Factory Tour Booking">Factory Tour Booking</option>
                    <option value="Catering Request">Catering Request</option>
                    <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                    <option value="Partnership Opportunities">Partnership Opportunities</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ice-cream-pink focus:border-transparent"
                    placeholder="Tell us what's on your mind..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-ice-cream-pink text-white px-6 py-3 rounded-lg font-bold bg-pink-400 hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-display text-gray-900 mb-6">Connect With Us</h2>
              <div className="grid grid-cols-3 gap-4">
                <a href="#" className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors flex flex-col items-center">
                  <Facebook className="h-6 w-6 mb-2" />
                  <span className="text-sm">Facebook</span>
                </a>
                <a href="#" className="bg-pink-600 text-white p-4 rounded-xl hover:bg-pink-700 transition-colors flex flex-col items-center">
                  <Instagram className="h-6 w-6 mb-2" />
                  <span className="text-sm">Instagram</span>
                </a>
                <a href="#" className="bg-blue-400 text-white p-4 rounded-xl hover:bg-blue-500 transition-colors flex flex-col items-center">
                  <Twitter className="h-6 w-6 mb-2" />
                  <span className="text-sm">Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div>
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-display text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-ice-cream-pink flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Visit Our Factory</h3>
                    <p className="text-gray-600">
                      123 Kamal Kunj<br />
                       Vasant Vihar<br />
                      New Delhi
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-ice-cream-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Call Us</h3>
                    <p className="text-gray-600">
                       (555) 123-4567<br />
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-ice-cream-mint flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Email Us</h3>
                    <p className="text-gray-600">
                       hello@scoopdreams.com<br />
                     
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-ice-cream-yellow flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Hours of Operation</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Thursday</span>
                        <span className="font-medium">11AM - 10PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Friday - Saturday</span>
                        <span className="font-medium">11AM - 11PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium">12PM - 9PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-display text-gray-900 mb-6">Find Us</h2>
              <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-ice-cream-pink mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Interactive map would go here</p>
                  <button className="border-2 border-ice-cream-pink text-ice-cream-pink px-6 py-2 rounded-lg font-bold hover:bg-pink-50 transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-display text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: "Do you accommodate dietary restrictions?",
                    a: "Yes! We offer vegan, dairy-free, and sugar-free options."
                  },
                  {
                    q: "Is parking available?",
                    a: "We have free parking for 50+ vehicles behind our factory."
                  },
                  {
                    q: "Do you host private events?",
                    a: "Absolutely! Contact our events team for catering and venue rental."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-ice-cream-pink font-bold hover:text-pink-600 transition-colors">
                View All FAQs →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;