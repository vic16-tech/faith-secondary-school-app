import React, { useState, useEffect, useRef } from 'react';

// Main App component that will render the About page
export default function AboutFaith() {
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

  // Inline SVG icons (replacing react-icons)
  const SchoolIcon = ({ size = 120, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3L4 9v12h16V9L12 3z"></path>
      <path d="M9 21V12h6v9"></path>
      <path d="M2 10.5L12 3l10 7.5"></path>
      <path d="M4.5 15.5L12 21l7.5-5.5"></path>
    </svg>
  );

  const LightbulbIcon = ({ size = 120, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 006 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"></path>
      <path d="M9 18h6"></path>
      <path d="M10 22h4"></path>
      <path d="M12 22v-4"></path>
    </svg>
  );

  const GraduationCapIcon = ({ size = 32, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 10v6M12 19V9m0-6L2 6v6l10 6 10-6V6l-10-6z"></path>
      <path d="M2 12l10 6l10-6"></path>
    </svg>
  );

  const UsersIcon = ({ size = 32, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
      <path d="M16 3.13a4 4 0 010 7.75"></path>
    </svg>
  );

  const StarIcon = ({ size = 32, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  // Function to handle navigation to the ContactFaith page
  const handleContactClick = () => {
    // In a full React Router setup, you would use:
    // const navigate = useNavigate();
    // navigate('/ContactFaith');
    // For this self-contained component, we'll simulate a page change.
    window.location.href = '/ContactFaith'; // Or '#contact' if it's a section within the same page
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  text-gray-800 p-4 sm:p-8 font-gro">
      {/* Header Section */}
      <AnimatedSection direction="up" animationDelay="0ms" threshold={0}>
        <header className="text-center py-12 px-4 bg-white shadow-xl rounded-2xl mb-12 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-800 mb-4 tracking-tight leading-tight">
            About <span className="text-indigo-600">Faith Secondary School</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Nurturing Minds, Building Futures.
          </p>
        </header>
      </AnimatedSection>

      {/* Main Content Sections - Now animated on scroll */}
      <div className="container mx-auto max-w-6xl space-y-16">

        {/* Introduction */}
        <AnimatedSection direction="zoom" animationDelay="0ms">
          <section className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">
                Welcome to Our Story
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                At <span className="font-semibold">Faith Secondary School</span>, we believe in nurturing young minds and building a strong foundation for a bright future. Located in the heart of <span className="font-semibold">Fiidi,Makurdi Benue</span>, our school is a vibrant community where learning is an adventure and every child is encouraged to discover their full potential.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <SchoolIcon size={120} className="text-indigo-500 transform hover:scale-110 transition-transform duration-300"/>
            </div>
          </section>
        </AnimatedSection>

        {/* Our Vision */}
        <AnimatedSection direction="left" animationDelay="0ms">
          <section className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 flex justify-center order-2 md:order-1">
              <LightbulbIcon size={120} className="text-yellow-500 transform hover:rotate-6 transition-transform duration-300"/>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                We envision a world where every child is equipped with the knowledge, skills, and values to thrive in an ever-changing global society. We aim to inspire a lifelong love of learning and cultivate responsible, compassionate, and innovative individuals.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Our Mission */}
        <AnimatedSection direction="right" animationDelay="0ms">
          <section className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
              Our Mission
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
              <li className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <GraduationCapIcon size={32} className="text-blue-500 flex-shrink-0 mt-1"/>
                <span>
                  <strong className="text-blue-800">Fosters Academic Excellence:</strong> We offer a rigorous curriculum designed to challenge and engage students, ensuring a deep understanding of core subjects.
                </span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300" style={{ transitionDelay: '100ms' }}>
                <StarIcon size={32} className="text-indigo-500 flex-shrink-0 mt-1"/>
                <span>
                  <strong className="text-indigo-800">Encourages Creativity & Critical Thinking:</strong> Through interactive lessons, problem-solving activities, and creative projects, we empower students to think outside the box.
                </span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-green-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300" style={{ transitionDelay: '200ms' }}>
                <UsersIcon size={32} className="text-green-500 flex-shrink-0 mt-1"/>
                <span>
                  <strong className="text-green-800">Promotes Holistic Development:</strong> We believe in nurturing the whole child – academically, socially, emotionally, and physically.
                </span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300" style={{ transitionDelay: '300ms' }}>
                <LightbulbIcon size={32} className="text-purple-500 flex-shrink-0 mt-1"/>
                <span>
                  <strong className="text-purple-800">Instills Strong Values:</strong> We emphasize integrity, respect, empathy, and responsibility, guiding students to become principled members of society.
                </span>
              </li>
            </ul>
          </section>
        </AnimatedSection>

        {/* Why Choose Us? */}
        <AnimatedSection direction="up" animationDelay="0ms">
          <section className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
              Why Choose <span className="text-indigo-600">Faith Secondary School</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-lg">
              <div className="bg-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="font-semibold text-xl text-blue-800 mb-2">Dedicated & Passionate Educators</h3>
                <p className="text-gray-700">Our highly qualified teachers are committed to creating engaging learning experiences and providing individualized attention.</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1" style={{ transitionDelay: '100ms' }}>
                <h3 className="font-semibold text-xl text-indigo-800 mb-2">Modern Facilities</h3>
                <p className="text-gray-700">We offer well-equipped classrooms, science labs, a spacious playground, and a library that support a dynamic learning environment.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1" style={{ transitionDelay: '200ms' }}>
                <h3 className="font-semibold text-xl text-green-800 mb-2">Vibrant Community</h3>
                <p className="text-gray-700">We foster strong partnerships between students, parents, and teachers, creating a supportive and collaborative community.</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1" style={{ transitionDelay: '300ms' }}>
                <h3 className="font-semibold text-xl text-yellow-800 mb-2">Rich Extracurricular Program</h3>
                <p className="text-gray-700">From sports to arts to clubs, we offer a wide range of activities to help students explore their interests and develop new talents.</p>
              </div>
              <div className="bg-red-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1" style={{ transitionDelay: '400ms' }}>
                <h3 className="font-semibold text-xl text-red-800 mb-2">Focus on Character</h3>
                <p className="text-gray-700">Beyond academics, we instill strong moral values and a sense of social responsibility in every student.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1" style={{ transitionDelay: '500ms' }}>
                <h3 className="font-semibold text-xl text-purple-800 mb-2">Personalized Learning</h3>
                <p className="text-gray-700">We tailor our approach to meet the unique needs of each student, ensuring they reach their full potential.</p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Our History */}
        <AnimatedSection direction="zoom" animationDelay="0ms">
          <section className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
              Our Journey Through Time
            </h2>
            <div className="relative border-l-4 border-blue-300 pl-6 py-4">
              {/* History Item 1 */}
              <div className="mb-8 last:mb-0 relative before:content-[''] before:absolute before:left-[-29px] before:top-1 before:h-4 before:w-4 before:rounded-full before:bg-blue-500 before:border-4 before:border-blue-200">
                <h3 className="font-semibold text-xl text-blue-800 mb-1">
                  2011 - The Beginning
                </h3>
                <p className="text-gray-700">
                  <span className="font-semibold">Faith Secondary School</span> was founded in 2011 by Godwin Achede, with a vision to provide quality and accessible education to the local community.
                </p>
              </div>
              {/* History Item 2 */}
              <div className="mb-8 last:mb-0 relative before:content-[''] before:absolute before:left-[-29px] before:top-1 before:h-4 before:w-4 before:rounded-full before:bg-blue-500 before:border-4 before:border-blue-200" style={{ transitionDelay: '100ms' }}>
                <h3 className="font-semibold text-xl text-blue-800 mb-1">
                  2022- Growth & Development
                </h3>
                <p className="text-gray-700">
                  The school experienced significant growth, expanding its facilities to include new classroom blocks and a modern science laboratory.
                </p>
              </div>
              {/* History Item 3 */}
              <div className="mb-8 last:mb-0 relative before:content-[''] before:absolute before:left-[-29px] before:top-1 before:h-4 before:w-4 before:rounded-full before:bg-blue-500 before:border-4 before:border-blue-200" style={{ transitionDelay: '200ms' }}>
                <h3 className="font-semibold text-xl text-blue-800 mb-1">
                  2024 - Embracing Innovation
                </h3>
                <p className="text-gray-700">
                  In recent years, we have embraced innovative teaching methodologies and integrated technology into our curriculum to prepare students for the digital age.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Call to Action/Footer */}
        <AnimatedSection direction="up" animationDelay="0ms">
          <footer className="text-center py-10 px-4 bg-white shadow-xl rounded-2xl mt-12">
            <p className="text-lg text-gray-700 mb-4">
              Ready to learn more? Explore our programs or schedule a visit today!
            </p>
            <button
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full text-xl shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 cursor-pointer"
              onClick={handleContactClick} 
            >
              Contact Us
            </button>
          </footer>
        </AnimatedSection>

      </div>
    </div>
  );
}
