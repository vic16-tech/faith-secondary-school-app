import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Inline SVG Icons for validation and password toggle
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

const EyeIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeSlashIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-10-7-10-7a18.06 18.06 0 014.28-5.36M10.16 6.16A8.08 8.08 0 0112 5c7 0 10 7 10 7a18.06 18.06 0 01-4.28 5.36"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const ShieldIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

// InputField component with validation feedback and password toggle
const InputField = ({ label, type, value, setValue, isValid, touched, setTouched, name, toggle }) => {
  const handleBlur = () => setTouched(true);
  const showError = touched && !isValid;

  return (
    <div className="relative mb-6">
      <label htmlFor={name} className="block text-gray-700 font-semibold mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={toggle ? (toggle.show ? "text" : "password") : type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 rounded-md border text-base transition-all duration-300 focus:outline-none focus:ring-2
            ${showError ? 'border-red-500 bg-red-50 focus:ring-red-200' : isValid && touched ? 'border-green-500 bg-green-50 focus:ring-green-200' : 'border-gray-300 bg-white focus:ring-indigo-200'}`}
        />
        {toggle && (
          <div
            onClick={toggle.toggleShow}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            {toggle.show ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
          </div>
        )}
        {showError && (
          <ExclamationCircleIcon className={`absolute ${toggle ? 'right-10' : 'right-3'} top-1/2 -translate-y-1/2 text-red-500`} />
        )}
        {!showError && isValid && touched && (
          <CheckCircleIcon className={`absolute ${toggle ? 'right-10' : 'right-3'} top-1/2 -translate-y-1/2 text-green-500`} />
        )}
      </div>
      {showError && (
        <p className="text-red-500 text-sm mt-1">
          {name === 'firstName' && 'First name must be at least 2 characters.'}
          {name === 'lastName' && 'Last name must be at least 2 characters.'}
          {name === 'email' && 'Please enter a valid email address.'}
          {name === 'phone' && 'Phone number must be at least 10 digits.'}
          {name === 'password' && 'Password must be at least 6 characters.'}
          {name === 'confirm' && 'Passwords do not match.'}
        </p>
      )}
    </div>
  );
};

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
    confirm: false,
  });

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validatePhone = (val) => /^[0-9]{10,}$/.test(val);

  const isValid = {
    firstName: firstName.trim().length >= 2,
    lastName: lastName.trim().length >= 2,
    email: validateEmail(email),
    phone: validatePhone(phone),
    password: password.length >= 6,
    confirm: confirm === password && confirm.length > 0,
  };

  const allValid = Object.values(isValid).every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouchedFields({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      password: true,
      confirm: true,
    });

    if (allValid) {
      console.log("Form Submitted:", { firstName, lastName, email, phone, password });
      alert('Login Successful!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirm('');
      setTouchedFields({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        password: false,
        confirm: false,
      });
    } else {
      console.log("Form has errors.");
      alert('Please correct the errors in the form.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br font-inter from-blue-100 via-purple-100 to-pink-100 font-inter p-4 sm:p-8 relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, duration: 2 }}
      ></motion.div>
      <motion.div
        className="absolute top-1/2 right-1/4 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 2 }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, duration: 2 }}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white/90 backdrop-blur-md border border-gray-200 w-full max-w-xl rounded-3xl shadow-2xl p-6 md:p-10 relative z-10 overflow-hidden transform hover:scale-[1.005] transition-transform duration-300"
      >
        {/* Decorative elements - subtle gradients for a premium look */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500 rounded-bl-[50px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 rounded-tr-[50px] opacity-20"></div>

        {/* Shield icon with responsive positioning */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-3 md:left-4 text-indigo-700 text-3xl z-10">
          <ShieldIcon size={30} />
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-tight leading-tight uppercase relative z-0 pb-4 border-b border-gray-100">
          Faith Secondary School <br /> <span className="text-indigo-600 text-2xl md:text-3xl">Login</span>
        </h2>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <InputField
            label="First Name"
            name="firstName"
            type="text"
            value={firstName}
            setValue={setFirstName}
            isValid={isValid.firstName}
            touched={touchedFields.firstName}
            setTouched={(val) => setTouchedFields((t) => ({ ...t, firstName: val }))}
          />
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            value={lastName}
            setValue={setLastName}
            isValid={isValid.lastName}
            touched={touchedFields.lastName}
            setTouched={(val) => setTouchedFields((t) => ({ ...t, lastName: val }))}
          />
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={email}
            setValue={setEmail}
            isValid={isValid.email}
            touched={touchedFields.email}
            setTouched={(val) => setTouchedFields((t) => ({ ...t, email: val }))}
          />
          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            value={phone}
            setValue={setPhone}
            isValid={isValid.phone}
            touched={touchedFields.phone}
            setTouched={(val) => setTouchedFields((t) => ({ ...t, phone: val }))}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={password}
            setValue={setPassword}
            isValid={isValid.password}
            touched={touchedFields.password}
            setTouched={(val) => setTouchedFields((t) => ({ ...t, password: val }))}
            toggle={{ show: showPassword, toggleShow: () => setShowPassword(!showPassword) }}
          />
          <InputField
            label="Confirm Password"
            name="confirm"
            type="password"
            value={confirm}
            setValue={setConfirm}
            isValid={isValid.confirm}
            touched={touchedFields.confirm}
            setTouched={(val) => setTouchedFields((t) => ({ ...t, confirm: val }))}
            toggle={{ show: showPassword, toggleShow: () => setShowPassword(!showPassword) }}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)' }} // Enhanced shadow on hover
            whileTap={{ scale: 0.98 }}
            disabled={!allValid}
            className={`w-full mt-8 py-3 rounded-xl font-bold text-lg text-white transition duration-300 shadow-lg transform hover:-translate-y-0.5
              ${allValid ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700' : 'bg-gray-400 cursor-pointer'}`}
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
