import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
   import '../index.css'; // This import caused a resolution error in this environment.

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

// Inline SVG Icons
const SearchIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const UserIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const BookOpenIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"></path>
  </svg>
);

const HashIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" y1="9" x2="20" y2="9"></line>
    <line x1="4" y1="15" x2="20" y2="15"></line>
    <line x1="10" y1="3" x2="8" y2="21"></line>
    <line x1="16" y1="3" x2="14" y2="21"></line>
  </svg>
);

const CheckCircleIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const KeyIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.006-7.006l7.006-7.006M10.17 12.06L3 19v2h2l7.06-7.17m-3.54-3.54L17 7.07l2.83-2.83a2 2 0 00-2.83-2.83L14.93 4z"></path>
  </svg>
);

const PrinterIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path>
    <rect x="6" y="14" width="12" height="8" rx="2" ry="2"></rect>
  </svg>
);

// Mock Data for demonstration - EXPANDED with PIN
const mockStudentResults = [
  {
    id: 'FSS001',
    pin: 'PIN12345', // Added pin
    name: 'Aisha Balogun',
    class: 'JSS 1A',
    term: 'First Term',
    session: '2024/2025',
    subjects: [
      { name: 'Mathematics', score: 85, grade: 'A' },
      { name: 'English Language', score: 78, grade: 'B' },
      { name: 'Basic Science', score: 92, grade: 'A' },
      { name: 'Social Studies', score: 70, grade: 'B' },
      { name: 'Computer Studies', score: 88, grade: 'A' },
      { name: 'PHE', score: 65, grade: 'C' },
      { name: 'CRS', score: 75, grade: 'B' },
      { name: 'Yoruba Language', score: 60, grade: 'C' },
    ],
    overallScore: 78,
    overallGrade: 'B',
    position: '5th of 30',
    comments: 'Excellent effort, keep it up!',
  },
  {
    id: 'FSS001',
    pin: 'PIN12345', // Same pin for subsequent terms for the same student
    name: 'Aisha Balogun',
    class: 'JSS 1A',
    term: 'Second Term',
    session: '2024/2025',
    subjects: [
      { name: 'Mathematics', score: 90, grade: 'A' },
      { name: 'English Language', score: 82, grade: 'A' },
      { name: 'Basic Science', score: 95, grade: 'A' },
      { name: 'Social Studies', score: 75, grade: 'B' },
      { name: 'Computer Studies', score: 90, grade: 'A' },
      { name: 'PHE', score: 70, grade: 'B' },
      { name: 'CRS', score: 80, grade: 'A' },
      { name: 'Yoruba Language', score: 68, grade: 'C' },
    ],
    overallScore: 81,
    overallGrade: 'A',
    position: '3rd of 30',
    comments: 'Continued excellent performance!',
  },
  {
    id: 'FSS002',
    pin: 'PIN67890', // Added pin
    name: 'Chukwuma Obi',
    class: 'JSS 1B',
    term: 'First Term',
    session: '2024/2025',
    subjects: [
      { name: 'Mathematics', score: 60, grade: 'C' },
      { name: 'English Language', score: 55, grade: 'D' },
      { name: 'Basic Science', score: 70, grade: 'B' },
      { name: 'Social Studies', score: 50, grade: 'D' },
      { name: 'Computer Studies', score: 68, grade: 'C' },
      { name: 'PHE', score: 72, grade: 'B' },
      { name: 'CRS', score: 62, grade: 'C' },
      { name: 'Igbo Language', score: 58, grade: 'D' },
    ],
    overallScore: 62,
    overallGrade: 'C',
    position: '12th of 28',
    comments: 'Needs to improve focus in core subjects.',
  },
  {
    id: 'FSS003',
    pin: 'PIN54321', // Added pin
    name: 'Fatima Abdullahi',
    class: 'JSS 1A',
    term: 'First Term',
    session: '2024/2025',
    subjects: [
      { name: 'Mathematics', score: 95, grade: 'A' },
      { name: 'English Language', score: 90, grade: 'A' },
      { name: 'Basic Science', score: 98, grade: 'A' },
      { name: 'Social Studies', score: 92, grade: 'A' },
      { name: 'Computer Studies', score: 96, grade: 'A' },
      { name: 'PHE', score: 88, grade: 'A' },
      { name: 'CRS', score: 94, grade: 'A' },
      { name: 'Hausa Language', score: 91, grade: 'A' },
    ],
    overallScore: 93,
    overallGrade: 'A',
    position: '1st of 30',
    comments: 'Outstanding academic performance!',
  },
  {
    id: 'FSS004',
    pin: 'PIN98765', // Added pin
    name: 'Samuel Adekunle',
    class: 'JSS 1B',
    term: 'First Term',
    session: '2024/2025',
    subjects: [
      { name: 'Mathematics', score: 72, grade: 'B' },
      { name: 'English Language', score: 68, grade: 'C' },
      { name: 'Basic Science', score: 75, grade: 'B' },
      { name: 'Social Studies', score: 63, grade: 'C' },
      { name: 'Computer Studies', score: 70, grade: 'B' },
      { name: 'PHE', score: 80, grade: 'A' },
      { name: 'CRS', score: 70, grade: 'B' },
      { name: 'Yoruba Language', score: 65, grade: 'C' },
    ],
    overallScore: 70,
    overallGrade: 'B',
    position: '8th of 28',
    comments: 'Good performance, continue to work hard.',
  },
];

// Main ResultsPage Component
export default function ResultsPage() {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [resultPin, setResultPin] = useState(''); // New state for result pin
  const [studentResult, setStudentResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Enter your admission number and pin to view results.');

  const handleSearch = (e) => {
    e.preventDefault();
    setMessage('');
    setStudentResult(null);
    setIsLoading(true);

    // Input Validation
    if (!admissionNumber.trim()) {
      setMessage('Please enter your admission number.');
      setIsLoading(false);
      return;
    }
    if (!resultPin.trim()) {
      setMessage('Please enter your result pin.');
      setIsLoading(false);
      return;
    }

    // Example: Basic admission number format validation
    if (!/^[Ff][Ss]{2}\d{3}$/.test(admissionNumber)) {
      setMessage('Invalid admission number format. (e.g., FSS001)');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      // Find ALL results for the admission number AND pin
      const foundResults = mockStudentResults.filter(
        (student) =>
          student.id.toLowerCase() === admissionNumber.toLowerCase() &&
          student.pin === resultPin // Match by pin
      );

      if (foundResults.length > 0) {
        // For simplicity, display the latest term's result if multiple exist for the same student/pin
        const latestResult = foundResults.sort((a, b) => {
            const termOrder = { 'First Term': 1, 'Second Term': 2, 'Third Term': 3 };
            return (termOrder[b.term] || 0) - (termOrder[a.term] || 0);
        })[0];
        setStudentResult(latestResult);
        setMessage('');
      } else {
        setMessage('No results found for that admission number and pin combination. Please check your entries.');
      }
      setIsLoading(false);
    }, 1000); // 1-second delay
  };

  const handlePrint = () => {
    window.print(); // This directly triggers the browser's native print dialog
  };

  return (
    <div className="min-h-screen bg-gray-50 font-gro text-gray-800 overflow-x-hidden"> {/* Changed font-inter to font-gro */}
      {/* School Name Header - Added for official look
      <header className="bg-gray-900 text-white py-4 text-center shadow-lg print:hidden"> {/* Added print:hidden to hide on print */}
        {/* <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide">
            FAITH SECONDARY SCHOOL
          </h1>
        </div> */}
      {/* </header> */} 

      {/* Hero Section */}
      <AnimatedSection direction="up" animationDelay="0ms" threshold={0.1}>
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-700 to-pink-700 text-white py-20 sm:py-28 px-4 sm:px-8 shadow-2xl">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
               style={{ backgroundImage: `url('https://placehold.co/1920x600/6A0DAD/FFFFFF?text=Academic+Results')` }}>
          </div>
          <div className="absolute inset-0 z-0 opacity-60"
               style={{ background: 'linear-gradient(to right, rgba(106, 13, 173, 0.8), rgba(212, 0, 100, 0.8))' }}>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight drop-shadow-xl">
              Check Your <span className="text-yellow-300">Academic Results</span>
            </h1>
            <p className="text-lg sm:text-2xl lg:text-3xl mb-8 sm:mb-10 font-light drop-shadow-lg">
              Enter your admission number and **purchased pin** to view your performance.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Content Sections */}
      <div className="container mx-auto max-w-6xl py-16 md:py-24 px-4 sm:px-8 space-y-16 md:space-y-24">

        {/* Results Search Section */}
        <AnimatedSection direction="up" animationDelay="100ms">
          <section className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-8 text-center relative pb-6">
              <span className="relative z-10">
                Find Your Results
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1.5 bg-pink-500 rounded-full"></span>
              </span>
            </h2>
            <form onSubmit={handleSearch} className="w-full max-w-md flex flex-col gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Admission Number (e.g., FSS001)"
                  value={admissionNumber}
                  onChange={(e) => setAdmissionNumber(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  required
                />
                <HashIcon size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative"> {/* New input for the pin */}
                <input
                  type="text"
                  placeholder="Enter Result Pin (e.g., PIN12345)"
                  value={resultPin}
                  onChange={(e) => setResultPin(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-base"
                  required
                />
                <KeyIcon size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(106, 13, 173, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="bg-purple-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg text-lg hover:bg-purple-700 transition-all duration-300 transform flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  <>
                    <SearchIcon size={20} className="inline-block mr-2 -mt-0.5" /> View Results
                  </>
                )}
              </motion.button>
            </form>

            {message && (
              <p className="mt-8 text-center text-lg text-gray-600 italic">
                {message}
              </p>
            )}
          </section>
        </AnimatedSection>

        {/* Display Results Section */}
        <AnimatePresence mode="wait">
          {studentResult && (
            <motion.section
              key="results-display"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100"
            >
              {/* This h2 will be the main title for the printed report */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-8 text-center relative pb-6">
                <span className="relative z-10">
                  Academic Report for <span className="text-pink-600">{studentResult.name}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1.5 bg-purple-500 rounded-full"></span>
                </span>
              </h2>

              {/* School name visible on print only */}
              <div className="hidden print:block text-center mb-8">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-2">FAITH SECONDARY SCHOOL</h1>
                <p className="text-sm text-gray-700">Official Academic Results</p>
              </div>


              {/* Student Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 text-gray-700 text-base">
                <p><UserIcon size={20} className="inline-block mr-2 text-blue-600" /> <strong>Admission No:</strong> {studentResult.id}</p>
                <p><BookOpenIcon size={20} className="inline-block mr-2 text-green-600" /> <strong>Class:</strong> {studentResult.class}</p>
                <p><HashIcon size={20} className="inline-block mr-2 text-red-600" /> <strong>Term:</strong> {studentResult.term}</p>
                <p><CheckCircleIcon size={20} className="inline-block mr-2 text-yellow-600" /> <strong>Session:</strong> {studentResult.session}</p>
              </div>

              {/* Subjects Table */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
                <table className="min-w-full bg-white">
                  <thead className="bg-purple-100 text-purple-800 text-left">
                    <tr>
                      <th className="py-3 px-4 text-sm sm:text-base font-semibold rounded-tl-xl">Subject</th>
                      <th className="py-3 px-4 text-sm sm:text-base font-semibold text-center">Score</th>
                      <th className="py-3 px-4 text-sm sm:text-base font-semibold text-center rounded-tr-xl">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {studentResult.subjects.map((subject, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="py-3 px-4 text-sm sm:text-base text-gray-700">{subject.name}</td>
                        <td className="py-3 px-4 text-sm sm:text-base text-center font-medium">{subject.score}</td>
                        <td className="py-3 px-4 text-sm sm:text-base text-center font-semibold text-purple-700">{subject.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Overall Summary */}
              <div className="mt-8 p-6 bg-blue-50 rounded-xl shadow-inner border border-blue-100 text-gray-800">
                <p className="text-lg sm:text-xl font-bold mb-2">Overall Performance:</p>
                <p className="text-base sm:text-lg"><strong>Average Score:</strong> <span className="text-blue-700 font-semibold">{studentResult.overallScore}%</span></p>
                <p className="text-base sm:text-lg"><strong>Overall Grade:</strong> <span className="text-blue-700 font-semibold">{studentResult.overallGrade}</span></p>
                <p className="text-base sm:text-lg"><strong>Position:</strong> <span className="text-blue-700 font-semibold">{studentResult.position}</span></p>
                <p className="text-base sm:text-lg mt-4"><strong>Comments:</strong> {studentResult.comments}</p>
              </div>

              {/* Print Button */}
              <div className="mt-10 text-center print:hidden"> {/* Added print:hidden to hide on print */}
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0, 128, 0, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrint}
                  className="bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg text-lg hover:bg-green-700 transition-all duration-300 transform flex items-center justify-center mx-auto"
                >
                  <PrinterIcon size={20} className="inline-block mr-2 -mt-0.5" /> Print Results
                </motion.button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </div>

      {/* Minimal Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center text-sm border-t border-gray-700 print:hidden"> {/* Added print:hidden to hide on print */}
        <div className="max-w-6xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Faith Secondary School. All rights reserved.</p>
          <p className="mt-2">Designed and Developed by Spark Innovation Hub</p>
        </div>
      </footer>
    </div>
  );
}
