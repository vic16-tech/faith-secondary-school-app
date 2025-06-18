import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import About from './pages/About';
import Footer from './components/Footer';
import Admissions from './pages/Admissions';
import Results from './pages/Results';
import Staff from './components/Staff';
import Login from './pages/Login';
import ContactFaith from './pages/ContactFaith';
import AboutFaith from './pages/AboutFaith';
import Register from './pages/Register';
import './index.css';

function App() {
  // Removed: const location = useLocation();
  // Removed: const isLoginPage = location.pathname === '/login';
  // These are no longer needed if Header always renders

  return (
    <>
      {/* Header is now rendered unconditionally on all pages */}
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <About />
              <Staff />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path='/AboutFaith' element={<AboutFaith/>}/>
        <Route path="/admission" element={<Admissions />} />
        <Route path="/results" element={<Results />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/ContactFaith' element= {<ContactFaith/>}/>
      </Routes>
    </>
  );
}

export default App;
