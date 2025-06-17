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
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Header />}

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

      {/* {!isLoginPage && <Footer />} */}
    </>
  );
}

export default App;
