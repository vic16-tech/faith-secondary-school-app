import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../index.css'

// Helper component for animating individual sections when they come into view
const AnimatedSection = ({ children, animationDelay = '0ms', direction = 'up', threshold = 0.1 }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // observer.unobserve(entry.target); // Uncomment if you want animation to trigger only once
          } else {
            // setIsVisible(false); // Uncomment if you want animation to reset when scrolled out of view
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: threshold,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [threshold]);

  let xOffset = 0;
  let yOffset = 0;
  let scaleFactor = 1;

  if (direction === 'up') yOffset = 50;
  if (direction === 'left') xOffset = -50;
  if (direction === 'right') xOffset = 50;
  if (direction === 'zoom') scaleFactor = 0.95;

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, x: xOffset, y: yOffset, scale: scaleFactor }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut', delay: parseFloat(animationDelay.replace('ms', '')) / 1000 }}
    >
      {children}
    </motion.div>
  );
};

// Inline SVG Icons for Admission Page
const DocumentIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

const CalendarIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const DollarSignIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path>
  </svg>
);

const QuestionMarkIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const CheckCircleOutlineIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const DownloadIcon = ({ size = 14, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

// Accordion Item Component for FAQs
const AccordionItem = ({ question, answer, isOpen, toggleAccordion }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left font-semibold text-lg text-blue-800 hover:text-indigo-600 transition-colors duration-200"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="pb-4 text-gray-700 overflow-hidden text-base leading-relaxed"
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// Main AdmissionPage Component
export default function Admissions() {
  const [openAccordion, setOpenAccordion] = useState(null); // State for FAQ accordion

  const faqs = [
    {
      question: "What are the admission requirements for new students?",
      answer: "Prospective students are required to submit their previous academic records, a birth certificate, two passport photographs, and a completed application form. Entrance examinations are also conducted.",
    },
    {
      question: "When do admissions open for the new academic year?",
      answer: "Admission forms are typically available from March to May each year. Entrance examinations are held in June, with results released in July.",
    },
    {
      question: "Do you offer scholarships or financial aid?",
      answer: "Yes, we offer a limited number of academic scholarships based on entrance examination performance and need-based financial aid. Please refer to our 'Scholarships' section for more details and application procedures.",
    },
    {
      question: "Can I schedule a school tour?",
      answer: "Absolutely! We encourage all prospective families to visit our campus. Please contact our admissions office to schedule a personalized tour during school hours.",
    },
    {
      question: "What is the age requirement for admission into JSS1?",
      answer: "For admission into JSS1, students must generally be at least 10 years old by September 1st of the admission year.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Directly navigate to the registration page
  const handleApplyNowClick = () => {
    window.location.href = '/register'; // Assumes /register is your registration page path
  };

  // Simulate a document download by opening a placeholder PDF
  const handleDownloadProspectus = () => {
    window.open('https://www.africau.edu/images/default/sample.pdf', '_blank'); // Example PDF URL
  };

  // Simulate a document download for Financial Aid Guide
  const handleDownloadFinancialAid = () => {
    window.open('https://www.africau.edu/images/default/sample.pdf', '_blank'); // Example PDF URL
  };

  // Directly navigate to the contact page
  const handleContactAdmissionsClick = () => {
    window.location.href = '/ContactFaith'; // 
  };


  return (
    // Added overflow-x-hidden to prevent horizontal scrolling on small screens
    <div className="min-h-screen bg-gray-50 font-gro text-gray-800 overflow-x-hidden">

      {/* Hero Section */}
      <AnimatedSection direction="up" animationDelay="0ms" threshold={0.1}>
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 to-indigo-700 text-white py-20 sm:py-28 px-4 sm:px-8 shadow-2xl">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
               style={{ backgroundImage: `url('https://placehold.co/1920x600/0A2342/FFFFFF?text=Faith+School+Campus')` }}>
          </div>
          <div className="absolute inset-0 z-0 opacity-60"
               style={{ background: 'linear-gradient(to right, rgba(29, 78, 216, 0.8), rgba(79, 70, 229, 0.8))' }}>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight drop-shadow-xl">
              Admissions at <span className="text-yellow-300">Faith Secondary School</span>
            </h1>
            <p className="text-lg sm:text-2xl lg:text-3xl mb-8 sm:mb-10 font-light drop-shadow-lg">
              Your Journey to Excellence Starts Here.
            </p>
            {/* Adjusted gap for closer buttons on mobile */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApplyNowClick}
                // Tailwind-only responsive classes: py-[2px] px-[8px] text-[10px] for <320px
                className="bg-white text-indigo-700 font-bold py-[2px]  text-[10px]
                           sm:py-1 px-3 text-xs /* for >=320px */
                           xs:py-2 xs:px-4 xs:text-sm /* for >=480px */
                           md:py-3 md:px-6 md:text-base /* for >=768px */
                           lg:py-4 lg:px-10 lg:text-lg /* for >=1024px */
                           rounded-full shadow-lg hover:text-indigo-800 transition-all duration-300 transform hover:-translate-y-1"
              >
                Apply Online Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadProspectus}
                // Tailwind-only responsive classes: py-[2px] px-[8px] text-[10px] for <320px
                className="border-2 border-white text-white font-bold py-[2px] px-[8px] text-[10px]
                           sm:py-1 sm:px-3 sm:text-xs /* for >=320px */
                           xs:py-2 xs:px-4 xs:text-sm /* for >=480px */
                           md:py-3 md:px-6 md:text-base /* for >=768px */
                           lg:py-4 lg:px-10 lg:text-lg /* for >=1024px */
                           rounded-full shadow-lg hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                <DownloadIcon
                  size={5} // Default size for smallest screens <320px
                  className="inline-block mr-0.5
                             sm:size-9 sm:mr-1 /* for >=320px */
                             xs:size-14 xs:mr-1.5 /* for >=480px */
                             md:size-16 md:mr-2 /* for >=768px */
                             lg:size-20 lg:mr-2 /* for >=1024px */"
                /> Download Prospectus
              </motion.button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Content Sections - Use light backgrounds for sections */}
      {/* Adjusted padding for smaller screens (p-6 default, md:p-10 for medium and up) */}
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4 sm:px-8 space-y-20 md:space-y-28">

        {/* Admission Process Section */}
        <AnimatedSection direction="left" animationDelay="100ms">
          {/* Adjusted padding for smaller screens (p-6 default, md:p-10 for medium and up) */}
          <section className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-800 mb-10 md:mb-12 text-center relative pb-6">
              <span className="relative z-10">
                Our Admission Process
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1.5 bg-indigo-500 rounded-full"></span>
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {/* Step 1 */}
              <div className="text-center p-4 sm:p-6 lg:p-8 bg-blue-50 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300 hover:shadow-xl border border-blue-100">
                <DocumentIcon size={56} className="text-blue-600 mx-auto mb-4 md:mb-6" />
                <h3 className="font-bold text-xl md:text-2xl text-blue-800 mb-2 md:mb-3">1. Obtain Application Form</h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">Purchase or download the application form from our school website or admissions office.</p>
              </div>
              {/* Step 2 */}
              <div className="text-center p-4 sm:p-6 lg:p-8 bg-indigo-50 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300 hover:shadow-xl border border-indigo-100" style={{ transitionDelay: '150ms' }}>
                <CheckCircleOutlineIcon size={56} className="text-indigo-600 mx-auto mb-4 md:mb-6" />
                <h3 className="font-bold text-xl md:text-2xl text-indigo-800 mb-2 md:mb-3">2. Submit Required Documents</h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">Complete the form and submit all necessary documents by the specified deadline.</p>
              </div>
              {/* Step 3 */}
              <div className="text-center p-4 sm:p-6 lg:p-8 bg-green-50 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300 hover:shadow-xl border border-green-100" style={{ transitionDelay: '300ms' }}>
                <CalendarIcon size={56} className="text-green-600 mx-auto mb-4 md:mb-6" />
                <h3 className="font-bold text-xl md:text-2xl text-green-800 mb-2 md:mb-3">3. Entrance Examination & Interview</h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">Applicants will be invited for an M entrance examination and a brief interview.</p>
              </div>
              {/* Final Step Message */}
              <div className="lg:col-span-3 text-center pt-6 md:pt-8 border-t border-gray-100 mt-6" style={{ transitionDelay: '450ms' }}>
                <p className="text-gray-700 text-base sm:text-xl font-semibold">
                  Successful candidates will receive an admission offer letter via email and postal mail.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Required Documents Section */}
        <AnimatedSection direction="right" animationDelay="200ms">
          {/* Adjusted padding for smaller screens (p-6 default, md:p-10 for medium and up) */}
          <section className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-800 mb-10 md:mb-12 text-center relative pb-6">
              <span className="relative z-10">
                Required Documents
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1.5 bg-indigo-500 rounded-full"></span>
              </span>
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-base text-gray-700">
              <li className="flex items-start gap-3 p-4 sm:p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <DocumentIcon size={28} className="text-purple-600 flex-shrink-0 mt-1" />
                <span>**Completed Application Form:** Ensure all sections are filled accurately.</span>
              </li>
              <li className="flex items-start gap-3 p-4 sm:p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100" style={{ transitionDelay: '100ms' }}>
                <DocumentIcon size={28} className="text-yellow-600 flex-shrink-0 mt-1" />
                <span>**Copy of Birth Certificate:** Proof of date of birth is essential.</span>
              </li>
              <li className="flex items-start gap-3 p-4 sm:p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100" style={{ transitionDelay: '200ms' }}>
                <DocumentIcon size={28} className="text-red-600 flex-shrink-0 mt-1" />
                <span>**Previous Academic Records/Report Cards:** For the last two academic years.</span>
              </li>
              <li className="flex items-start gap-3 p-4 sm:p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100" style={{ transitionDelay: '300ms' }}>
                <DocumentIcon size={28} className="text-teal-600 flex-shrink-0 mt-1" />
                <span>**Two recent Passport Photographs:** Clear, colored, and recent (child's).</span>
              </li>
              <li className="flex items-start gap-3 p-4 sm:p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100" style={{ transitionDelay: '400ms' }}>
                <DocumentIcon size={28} className="text-orange-600 flex-shrink-0 mt-1" />
                <span>**Medical Report:** A recent medical fitness report (upon provisional admission).</span>
              </li>
            </ul>
          </section>
        </AnimatedSection>

        {/* Admission Calendar Section */}
        <AnimatedSection direction="up" animationDelay="300ms">
          {/* Adjusted padding for smaller screens (p-6 default, md:p-10 for medium and up) */}
          <section className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-800 mb-10 md:mb-12 text-center relative pb-6">
              <span className="relative z-10">
                Important Dates & Deadlines
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1.5 bg-indigo-500 rounded-full"></span>
              </span>
            </h2>
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 p-4 sm:p-6 bg-blue-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-blue-200">
                <CalendarIcon size={32} className="text-blue-700 flex-shrink-0 mt-1" />
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-xl md:text-2xl text-blue-900 mb-1">March 1st - May 31st:</h3>
                  <p className="text-gray-700 text-base md:text-lg">Sale and Submission of Application Forms</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 p-4 sm:p-6 bg-indigo-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-indigo-200" style={{ transitionDelay: '100ms' }}>
                <CalendarIcon size={32} className="text-indigo-700 flex-shrink-0 mt-1" />
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-xl md:text-2xl text-indigo-900 mb-1">June 15th:</h3>
                  <p className="text-gray-700 text-base md:text-lg">Entrance Examination Date (First Batch)</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 p-4 sm:p-6 bg-green-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-green-200" style={{ transitionDelay: '200ms' }}>
                <CalendarIcon size={32} className="text-green-700 flex-shrink-0 mt-1" />
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-xl md:text-2xl text-green-900 mb-1">July 10th:</h3>
                  <p className="text-gray-700 text-base md:text-lg">Publication of Entrance Exam Results</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 p-4 sm:p-6 bg-purple-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-purple-200" style={{ transitionDelay: '300ms' }}>
                <CalendarIcon size={32} className="text-purple-700 flex-shrink-0 mt-1" />
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-xl md:text-2xl text-purple-900 mb-1">July 20th - August 10th:</h3>
                  <p className="text-gray-700 text-base md:text-lg">Admissions Interview & Offer Letter Collection</p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Tuition & Fees Section */}
        <AnimatedSection direction="zoom" animationDelay="400ms">
          {/* Adjusted padding for smaller screens (p-6 default, md:p-10 for medium and up) */}
          <section className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-800 mb-10 md:mb-12 text-center relative pb-6">
              <span className="relative z-10">
                Tuition & Fees
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1.5 bg-indigo-500 rounded-full"></span>
              </span>
            </h2>
            <div className="flex flex-col md:flex-row items-stretch justify-around gap-6 md:gap-10 text-center">
              <div className="p-6 md:p-8 bg-yellow-50 rounded-2xl shadow-md flex-1 min-w-[200px] sm:min-w-[280px] flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 hover:shadow-xl border border-yellow-200">
                <div>
                  <DollarSignIcon size={56} className="text-yellow-600 mx-auto mb-4 md:mb-6" />
                  <h3 className="font-bold text-xl md:text-2xl text-yellow-800 mb-2 md:mb-3">Application Fee</h3>
                  <p className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 md:mb-3">₦5,000</p>
                </div>
                <p className="text-gray-700 text-sm md:text-base">Non-refundable. Due with application form.</p>
              </div>
              <div className="p-6 md:p-8 bg-red-50 rounded-2xl shadow-md flex-1 min-w-[200px] sm:min-w-[280px] flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 hover:shadow-xl border border-red-200" style={{ transitionDelay: '100ms' }}>
                <div>
                  <DollarSignIcon size={56} className="text-red-600 mx-auto mb-4 md:mb-6" />
                  <h3 className="font-bold text-xl md:text-2xl text-red-800 mb-2 md:mb-3">Annual Tuition</h3>
                  <p className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 md:mb-3">₦70,000</p>
                </div>
                <p className="text-gray-700 text-sm md:text-base">Covers academics, facilities, and basic extracurriculars.</p>
              </div>
              <div className="p-6 md:p-8 bg-teal-50 rounded-2xl shadow-md flex-1 min-w-[200px] sm:min-w-[280px] flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 hover:shadow-xl border border-teal-200" style={{ transitionDelay: '200ms' }}>
                <div>
                  <DollarSignIcon size={56} className="text-teal-600 mx-auto mb-4 md:mb-6" />
                  <h3 className="font-bold text-xl md:text-2xl text-teal-800 mb-2 md:mb-3">Other Fees</h3>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">Varies</p>
                </div>
                <p className="text-gray-700 text-sm md:text-base">Uniforms, books, external exam fees are separate. Details available upon request.</p>
              </div>
            </div>
            <p className="text-center text-xs sm:text-sm text-gray-600 mt-8 md:mt-12">
              *All fees are subject to change without prior notice. Please contact the Bursary for the most current information.
            </p>
          </section>
        </AnimatedSection>

        {/* Scholarships & Financial Aid Section */}
        <AnimatedSection direction="left" animationDelay="500ms">
          {/* Adjusted padding for smaller screens (p-6 default, md:p-10 for medium and up) */}
          <section className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-800 mb-10 md:mb-12 text-center relative pb-6">
              <span className="relative z-10">
                Scholarships & Financial Aid
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1.5 bg-indigo-500 rounded-full"></span>
              </span>
            </h2>
            <div className="md:flex md:gap-12 lg:gap-16 items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-3 md:mb-4">
                  Faith Secondary School is committed to ensuring that talented and deserving students have access to quality education, regardless of their financial background.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                  We offer a variety of **scholarship opportunities** and **financial aid programs** to support our students.
                  These are typically awarded based on academic merit, demonstrated financial need, or a combination of both.
                </p>
                <p className="text-gray-800 text-base md:text-lg mt-3 md:mt-4 font-semibold">
                  For detailed information on eligibility criteria and application procedures, please download our comprehensive Financial Aid Guide.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadFinancialAid}
                  // Tailwind-only responsive classes: py-[2px] px-[8px] text-[10px] for <320px
                  className="mt-6 md:mt-8 inline-flex items-center bg-green-600 text-white font-bold py-[2px] px-[8px] text-[10px]
                             sm:py-1 sm:px-3 sm:text-xs /* for >=320px */
                             xs:py-2 xs:px-4 xs:text-sm /* for >=480px */
                             md:py-2.5 md:px-5 md:text-xs /* for >=768px */
                             lg:py-3.5 lg:px-10 lg:text-md /* for >=1024px */
                             rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <DownloadIcon
                    size={6} // Default size for smallest screens <320px
                    className="inline-block mr-0.5
                               sm:size-5 sm:mr-1 /* for >=320px */
                               xs:size-14 xs:mr-1.5 /* for >=480px */
                               md:size-16 md:mr-2 /* for >=768px */
                               lg:size-20 lg:mr-2 /* for >=1024px */"
                  /> Financial Aid Guide
                </motion.button>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://placehold.co/600x400/81C784/FFFFFF?text=Scholarship+Students"
                  alt="Students receiving scholarships"
                  className="rounded-2xl shadow-xl w-full h-auto object-cover border border-gray-200"
                  onError={(e) => e.target.src = 'https://placehold.co/600x400/E0E0E0/616161?text=Image+Unavailable'}
                />
              </div>
            </div>
          </section>
        </AnimatedSection>


        {/* FAQs Section */}
        <AnimatedSection direction="right" animationDelay="600ms">
          {/* Adjusted padding for smaller screens (p-6 default, md:p-10 for medium and up) */}
          <section className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-800 mb-10 md:mb-12 text-center relative pb-6">
              <span className="relative z-10">
                Frequently Asked Questions
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1.5 bg-indigo-500 rounded-full"></span>
              </span>
            </h2>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openAccordion === index}
                  toggleAccordion={() => toggleAccordion(index)}
                />
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Call to Action & Contact Section */}
        <AnimatedSection direction="up" animationDelay="700ms">
          {/* Adjusted padding for smaller screens (p-6 default, md:p-10 for medium and up) */}
          <section className="bg-gradient-to-br from-indigo-700 to-blue-700 text-white p-6 md:p-10 rounded-3xl shadow-xl text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 leading-tight drop-shadow-lg">
              Ready to Take the Next Step?
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl mb-8 md:mb-12 opacity-90 max-w-4xl mx-auto drop-shadow-sm">
              We are excited for you to join the Faith Secondary School family. Explore our campus, meet our faculty, and discover why we are the right choice for your child's future.
            </p>
            {/* Adjusted gap for closer buttons on mobile */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactAdmissionsClick}
                // Tailwind-only responsive classes: py-[2px] px-[8px] text-[10px] for <320px
                className="bg-white text-indigo-700 font-bold py-[2px] px-[8px] text-[10px]
                           sm:py-1 sm:px-3 sm:text-xs /* for >=320px */
                           xs:py-2 xs:px-4 xs:text-sm /* for >=480px */
                           md:py-3 md:px-6 md:text-base /* for >=768px */
                           lg:py-4 lg:px-10 lg:text-lg /* for >=1024px */
                           rounded-full shadow-lg hover:text-indigo-800 transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Admissions
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApplyNowClick}
                // Tailwind-only responsive classes: py-[2px] px-[8px] text-[10px] for <320px
                className="border-2 border-white text-white font-bold py-[2px] px-[8px] text-[10px]
                           sm:py-1 sm:px-3 sm:text-xs /* for >=320px */
                           xs:py-2 xs:px-4 xs:text-sm /* for >=480px */
                           md:py-3 md:px-6 md:text-base /* for >=768px */
                           lg:py-4 lg:px-10 lg:text-lg /* for >=1024px */
                           rounded-full shadow-lg hover:bg-white hover:text-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Your Application
              </motion.button>
            </div>
          </section>
        </AnimatedSection>

      </div>

      {/* Minimal Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center text-sm border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Faith Secondary School. All rights reserved.</p>
          <p className="mt-2">Designed and Developed by Spark Innovation Hub</p>
        </div>
      </footer>
    </div>
  );
}
