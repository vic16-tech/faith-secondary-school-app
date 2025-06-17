import React, { useState, useEffect, useRef } from 'react';

// Helper component for animating individual sections when they come into view
const AnimatedSection = ({ children, animationDelay = '0ms', direction = 'up', threshold = 0.2 }) => {
  const sectionRef = useRef(null); // Ref to attach to the DOM element
  const [isVisible, setIsVisible] = useState(false); // State to control visibility/animation

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the element is intersecting (i.e., in view), set isVisible to true
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Option: Unobserve after the first intersection if you only want it to animate once
            // observer.unobserve(entry.target);
          } else {
            // Optional: If you want the animation to reset when scrolled out of view
            // setIsVisible(false);
          }
        });
      },
      {
        root: null, // viewport as the root
        rootMargin: '0px',
        threshold: threshold, // Percentage of the target element visible to trigger callback
      }
    );

    // Start observing the current sectionRef if it exists
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup function: disconnect the observer when the component unmounts
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Good practice to clean up observer
      }
      observer.disconnect(); // Disconnect the observer completely
    };
  }, [threshold]); // Re-run effect if threshold changes

  // Determine the initial transform class based on the animation direction
  let transformClass = '';
  if (direction === 'up') transformClass = 'translate-y-10';
  if (direction === 'left') transformClass = '-translate-x-10';
  if (direction === 'right') transformClass = 'translate-x-10';
  if (direction === 'zoom') transformClass = 'scale-95';

  return (
    <div
      ref={sectionRef} // Attach the ref to the div
      className={`
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : `opacity-0 ${transformClass}`}
      `}
      style={{ transitionDelay: animationDelay }}
    >
      {children}
    </div>
  );
};

// Inline SVG Icons
const MapPinIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s-8-4-8-10a8 8 0 0116 0c0 6-8 10-8 10z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const PhoneIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.63A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
  </svg>
);

const MailIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

// Generic Social Icon (simplified for example, you'd add specific paths for each platform)
const SocialIcon = ({ size = 24, className = '', platform = 'default' }) => {
  let pathD = "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 15h2v-6h-2v6zm0-8h2V7h-2v2z"; // Placeholder
  if (platform === 'facebook') pathD = "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z";
  if (platform === 'twitter') pathD = "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-19 11.6 1.1-.9 4.3-3.6 8-3.6 6.8 0 10.1-5.7 10-10 1.2-.7 2.1-1.6 3-2.6z";
  if (platform === 'instagram') pathD = "M18 2h-8a8 8 0 00-8 8v8a8 8 0 008 8h8a8 8 0 008-8v-8a8 8 0 00-8-8zM12 17a5 5 0 110-10 5 5 0 010 10zM18 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z";
  if (platform === 'linkedin') pathD = "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={pathD}></path>
    </svg>
  );
};


// Main ContactFaith component
export default function ContactFaith() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here,
    // e.g., send data to an API or display a success message.
    alert('Thank you for your message! We will get back to you soon.');
    // You might also clear the form fields here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-4 sm:p-8 font-inter">
      {/* Header Section */}
      <AnimatedSection direction="up" animationDelay="0ms" threshold={0}>
        <header className="text-center py-12 px-4 bg-white shadow-xl rounded-2xl mb-12 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-800 mb-4 tracking-tight leading-tight">
            Contact <span className="text-indigo-600">Faith Secondary School</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you! Reach out with any questions or inquiries.
          </p>
        </header>
      </AnimatedSection>

      {/* Main Content Sections - Animated on scroll */}
      <div className="container mx-auto max-w-6xl space-y-16">

        {/* Contact Information Section */}
        <AnimatedSection direction="left" animationDelay="0ms">
          <section className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl shadow-sm">
                <MapPinIcon size={32} className="text-blue-500 flex-shrink-0"/>
                <div>
                  <h3 className="font-semibold text-xl text-blue-800">Address</h3>
                  <p className="text-gray-700">Faith Secondary School, Fiidi, Makurdi, Benue State, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl shadow-sm">
                <PhoneIcon size={32} className="text-indigo-500 flex-shrink-0"/>
                <div>
                  <h3 className="font-semibold text-xl text-indigo-800">Phone</h3>
                  <p className="text-gray-700">+234 801 234 5678</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl shadow-sm">
                <MailIcon size={32} className="text-green-500 flex-shrink-0"/>
                <div>
                  <h3 className="font-semibold text-xl text-green-800">Email</h3>
                  <p className="text-gray-700">info@faithsecondaryschool.com</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-xl shadow-sm">
                <h3 className="font-semibold text-xl text-yellow-800 mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://facebook.com/faithsecondaryschool" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transform hover:scale-125 transition-transform duration-200">
                    <SocialIcon platform="facebook" size={32} />
                  </a>
                  <a href="https://twitter.com/faithsecondaryschool" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transform hover:scale-125 transition-transform duration-200">
                    <SocialIcon platform="twitter" size={32} />
                  </a>
                  <a href="https://instagram.com/faithsecondaryschool" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transform hover:scale-125 transition-transform duration-200">
                    <SocialIcon platform="instagram" size={32} />
                  </a>
                  <a href="https://linkedin.com/school/faithsecondaryschool" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transform hover:scale-125 transition-transform duration-200">
                    <SocialIcon platform="linkedin" size={32} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Contact Form Section */}
        <AnimatedSection direction="right" animationDelay="0ms">
          <section className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-lg font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-lg font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full text-xl shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>
        </AnimatedSection>

        {/* Optional: Map Embed Section */}
        <AnimatedSection direction="zoom" animationDelay="0ms">
          <section className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              Find Us on the Map
            </h2>
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
              {/* Replace with your actual Google Maps embed code or a placeholder image */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.625624765798!2d8.5306359!3d7.7126131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104f6991316b2067%3A0xf695b2c7e0c9c22e!2sMakurdi%2C%20Benue!5e0!3m2!1sen!2sng!4v1678881234567!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Faith Secondary School Location"
              ></iframe>
            </div>
          </section>
        </AnimatedSection>

      </div>
    </div>
  );
}
