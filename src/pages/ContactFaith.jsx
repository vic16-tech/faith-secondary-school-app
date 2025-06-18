// src/school-contact-page.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../index.css'

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
            // observer.unobserve(entry.target); // Uncomment if you want animation to trigger only once
          } else {
            // setIsVisible(false); // Uncomment if you want animation to reset when scrolled out of view
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

  // Initialize offset and scale factors with default values
  let xOffset = 0;
  let yOffset = 0;
  let scaleFactor = 1;

  // Determine the initial transform values based on the animation direction
  if (direction === 'up') yOffset = 50;
  if (direction === 'left') xOffset = -50;
  if (direction === 'right') xOffset = 50;
  if (direction === 'zoom') scaleFactor = 0.95;

  return (
    <motion.div
      ref={sectionRef} // Attach the ref to the div
      initial={{ opacity: 0, x: xOffset, y: yOffset, scale: scaleFactor }} // Framer motion initial state
      animate={isVisible ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}} // Framer motion animate state
      transition={{ duration: 1, ease: 'easeOut', delay: parseFloat(animationDelay.replace('ms', '')) / 1000 }} // Framer motion transition
    >
      {children}
    </motion.div>
  );
};

// Inline SVG Icons (for contact info and social)
const MapPinIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s-8-4-8-10a8 8 0 0116 0c0 6-8 10-8 10z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const PhoneIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.63A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 🔥 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
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

// Inline SVG Icons for validation feedback
const ExclamationCircleIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const CheckCircleIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// InputField component with validation feedback
const InputField = ({ label, type, value, setValue, isValid, touched, setTouched, name, isTextArea = false }) => {
  const handleBlur = () => setTouched(true);
  const showError = touched && !isValid;

  return (
    <div className="relative mb-6">
      <label htmlFor={name} className="block text-gray-700 font-semibold mb-1">
        {label}
      </label>
      <div className="relative">
        {isTextArea ? (
          <textarea
            name={name}
            id={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            rows="5"
            className={`w-full px-4 py-3 rounded-xl border text-base transition-all duration-300 focus:outline-none resize-y
              ${showError ? 'border-red-500 bg-red-50' : isValid && touched ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}
          ></textarea>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-xl border text-base transition-all duration-300 focus:outline-none
              ${showError ? 'border-red-500 bg-red-50' : isValid && touched ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}
          />
        )}
        {showError && (
          <ExclamationCircleIcon className={`absolute ${isTextArea ? 'right-3 top-4' : 'right-3 top-1/2 -translate-y-1/2'} text-red-500`} />
        )}
        {!showError && isValid && touched && ( // Only show check if valid AND touched
          <CheckCircleIcon className={`absolute ${isTextArea ? 'right-3 top-4' : 'right-3 top-1/2 -translate-y-1/2'} text-green-500`} />
        )}
      </div>
      {showError && (
        <p className="text-red-500 text-sm mt-1">
          {name === 'name' && 'Please enter at least 2 characters.'}
          {name === 'email' && 'Please enter a valid email address.'}
          {name === 'message' && 'Message must be at least 10 characters.'}
        </p>
      )}
    </div>
  );
};


// Custom Message Box Component
const MessageBox = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
          <p className="text-gray-800 text-lg mb-6">{message}</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            OK
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main ContactFaith component
export default function ContactFaith() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [showMessage, setShowMessage] = useState(false); // State for controlling MessageBox visibility
  const [messageText, setMessageText] = useState('');   // State for MessageBox content


  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const isValid = {
    name: name.trim().length >= 2,
    email: validateEmail(email),
    message: message.trim().length >= 10,
  };

  const allValid = isValid.name && isValid.email && isValid.message;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true }); // Mark all fields as touched on submit

    if (allValid) {
      // Simulate form submission
      console.log("Form Data:", { name, email, subject, message });
      setMessageText('Thank you for your message! We will get back to you soon.'); // Use setMessageText
      setShowMessage(true); // Use setShowMessage
      // Clear form fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTouched({ name: false, email: false, message: false }); // Reset touched state
    } else {
      setMessageText('Please correct the errors in the form.'); // Use setMessageText
      setShowMessage(true); // Use setShowMessage
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessageText('');
  };

  return (
    // Outer container: ensured `overflow-x-hidden` and fluid horizontal padding
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 font-gro overflow-x-hidden">

      {/* Header Section */}
      <AnimatedSection direction="up" animationDelay="0ms" threshold={0}>
        <header className="text-center py-12 px-4 sm:px-6 md:px-8 bg-white shadow-xl rounded-2xl mb-12 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-800 mb-4 tracking-tight leading-tight">
            Contact <span className="text-indigo-600">Faith Secondary School</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you! Reach out with any questions or inquiries.
          </p>
        </header>
      </AnimatedSection>

      {/* Main Content Sections - Animated on scroll */}
      {/* Adjusted horizontal padding for inner container to prevent edge touching */}
      <div className="container mx-auto max-w-6xl space-y-16 px-4 sm:px-6 md:px-8">

        {/* Contact Information Section */}
        <AnimatedSection direction="left" animationDelay="0ms">
          {/* Section padding adjusted for better fluid responsiveness */}
          <section className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
              Get in Touch
            </h2>
            {/* Grid layout for contact details: Ensures columns collapse to single column on small screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl shadow-sm">
                <MapPinIcon size={32} className="text-blue-500 flex-shrink-0 mt-1"/>
                <div className="flex-1 min-w-0"> {/* flex-1 and min-w-0 are crucial for content inside flex items to wrap */}
                  <h3 className="font-semibold text-xl text-blue-800">Address</h3>
                  {/* `break-words` for general text, `break-all` for forced breaking of long strings like URLs/emails */}
                  <p className="text-gray-700 text-base break-words">Faith Secondary School, Fiidi, Makurdi, Benue State, Nigeria</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl shadow-sm">
                <PhoneIcon size={32} className="text-indigo-500 flex-shrink-0 mt-1"/>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xl text-indigo-800">Phone</h3>
                  <p className="text-gray-700 text-base break-words">+234 801 234 5678</p>
                  <p className="text-gray-700 text-base break-words">+234 701 234 5679</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl shadow-sm">
                <MailIcon size={32} className="text-green-500 flex-shrink-0 mt-1"/>
                <div className="flex-1 min-w-0"> {/* Essential for email text to wrap within its container */}
                  <h3 className="font-semibold text-xl text-green-800">Email</h3>
                  {/* `break-all` for aggressive word breaking on the email address */}
                  <p className="text-gray-700 text-base break-all">info@faithsecondaryschool.com</p>
                </div>
              </div>
              {/* Social icons block: `md:col-span-2` makes it span 2 columns on medium screens,
                  `lg:col-span-1` makes it return to 1 column on large screens if grid supports it */}
              <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-xl shadow-sm md:col-span-2 lg:col-span-1">
                <h3 className="font-semibold text-xl text-yellow-800 mb-2">Follow Us</h3>
                <div className="flex gap-4 flex-wrap justify-center"> {/* `flex-wrap` allows icons to wrap, `justify-center` keeps them centered */}
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
          {/* Section padding adjusted for better fluid responsiveness */}
          <section className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Your Name"
                name="name"
                type="text"
                value={name}
                setValue={setName}
                isValid={isValid.name}
                touched={touched.name}
                setTouched={(val) => setTouched((t) => ({ ...t, name: val }))}
              />
              <InputField
                label="Your Email"
                name="email"
                type="email"
                value={email}
                setValue={setEmail}
                isValid={isValid.email}
                touched={touched.email}
                setTouched={(val) => setTouched((t) => ({ ...t, email: val }))}
              />
              <InputField
                label="Subject (Optional)"
                name="subject"
                type="text"
                value={subject}
                setValue={setSubject}
                isValid={true} // Always valid as it's optional
                touched={true}
                setTouched={() => {}}
              />
              <InputField
                label="Your Message"
                name="message"
                type="textarea"
                value={message}
                setValue={setMessage}
                isValid={isValid.message}
                touched={touched.message}
                setTouched={(val) => setTouched((t) => ({ ...t, message: val }))}
                isTextArea={true}
              />

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

        {/* Map Embed Section */}
        <AnimatedSection direction="zoom" animationDelay="0ms">
          <section className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              Find Us on the Map
            </h2>
            {/* Map container: w-full and h-80 ensure it adapts but has a minimum height */}
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
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

      {/* Render the custom message box if showMessage is true */}
      <AnimatePresence>
        {showMessage && <MessageBox message={messageText} onClose={handleCloseMessage} />}
      </AnimatePresence>

      {/* Minimal Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center text-sm border-t border-gray-700 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Faith Secondary School. All rights reserved.</p>
          <p className="mt-2">Designed and Developed by Spark Innovation Hub</p>
        </div>
      </footer>
    </div>
  );
}
