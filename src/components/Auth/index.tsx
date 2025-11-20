'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Lock, Mail, Send } from 'lucide-react';

type Tab = 'password' | 'otp';

interface FormData {
  emailOrMobile: string;
  password: string;
  otp: string;
}

const Signin = () => {
  const [activeTab, setActiveTab] = useState<Tab>('password');
  const [formData, setFormData] = useState<FormData>({
    emailOrMobile: '',
    password: '',
    otp: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSignIn = async () => {
    setIsLoading(true);
    try {
      console.log('Password Sign-In', {
        emailOrMobile: formData.emailOrMobile,
        password: formData.password,
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSignIn = async () => {
    setIsLoading(true);
    try {
      console.log('OTP Sign-In', {
        emailOrMobile: formData.emailOrMobile,
        otp: formData.otp,
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      console.log('Sending OTP to', formData.emailOrMobile);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (activeTab === 'password') handlePasswordSignIn();
    else handleOtpSignIn();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && otpSent) handleSubmit();
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setOtpSent(false);
    setFormData(prev => ({ ...prev, otp: '' }));
  };

  return (
    <section className="overflow-hidden py-20 min-h-screen flex items-center" style={{background: 'linear-gradient(135deg, #f5f1ed 0%, #ede8e3 100%)'}}>
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding */}
          <div className="hidden lg:block text-center lg:text-left space-y-6">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <h1 className="text-4xl font-bold" style={{color: '#4F1719'}}>ORNAPAY</h1>
              </div>
              <p className="text-lg" style={{color: '#832729'}}>Premium Jewellery Collection</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{backgroundColor: '#832729'}}>
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Authentic Pieces</h3>
                  <p className="text-sm text-gray-600">Curated collection of premium jewellery</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{backgroundColor: '#832729'}}>
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Secure Shopping</h3>
                  <p className="text-sm text-gray-600">Your account is protected with advanced security</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{backgroundColor: '#832729'}}>
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Exclusive Deals</h3>
                  <p className="text-sm text-gray-600">Access special offers and member benefits</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 xl:p-10 border" style={{borderColor: '#832729', borderWidth: '2px'}}>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold" style={{color: '#4F1719'}}>Welcome Back</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Signin/Signup to your exclusive collection
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 p-1.5 rounded-lg relative" style={{backgroundColor: '#f5f1ed'}}>
              {['password', 'otp'].map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab as Tab)}
                  className={`flex-1 py-2.5 px-4 text-sm sm:text-base font-semibold rounded-md transition-all duration-300 ${
                    activeTab === tab
                      ? 'text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={activeTab === tab ? {backgroundColor: '#832729'} : {}}
                >
                  {tab === 'password' ? 'Password' : 'OTP'}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="space-y-5" onKeyPress={handleKeyPress}>

              {/* Email / Mobile */}
              <div className="transition-opacity duration-300">
                <label
                  htmlFor="emailOrMobile"
                  className="block mb-2.5 text-sm font-semibold text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <Mail size={18} style={{color: '#832729'}} />
                    Email or Mobile Number
                  </div>
                </label>
                <input
                  type="text"
                  id="emailOrMobile"
                  name="emailOrMobile"
                  value={formData.emailOrMobile}
                  onChange={handleInputChange}
                  placeholder="Enter your email or mobile"
                  className="w-full rounded-lg border-2 px-4 py-3 text-gray-900 bg-white placeholder-gray-400 outline-none transition-all duration-200"
                  style={{
                    borderColor: '#e5d9d0'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#832729'}
                  onBlur={(e) => e.target.style.borderColor = '#e5d9d0'}
                />
              </div>

              {/* Password Input */}
              <div
                className={`transition-all duration-300 ${
                  activeTab === 'password'
                    ? 'opacity-100 max-h-40 translate-y-0'
                    : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden pointer-events-none'
                }`}
              >
                <label
                  htmlFor="password"
                  className="block mb-2.5 text-sm font-semibold text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <Lock size={18} style={{color: '#832729'}} />
                    Password
                  </div>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border-2 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200"
                  style={{
                    borderColor: '#e5d9d0'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#832729'}
                  onBlur={(e) => e.target.style.borderColor = '#e5d9d0'}
                />

                <a
                  href="#"
                  className="inline-block text-sm font-semibold mt-3 hover:opacity-70 transition-opacity"
                  style={{color: '#832729'}}
                >
                  Forgot your password?
                </a>
              </div>

              {/* OTP Section */}
              <div
                className={`transition-all duration-300 ${
                  activeTab === 'otp'
                    ? 'opacity-100 max-h-96 translate-y-0'
                    : 'opacity-0 max-h-0 -translate-y-2 overflow-hidden pointer-events-none'
                }`}
              >
                {!otpSent ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      We will send a one-time password to your email or mobile number
                    </p>
                    <button
                      type="button"
                      disabled={isLoading || !formData.emailOrMobile}
                      onClick={handleSendOtp}
                      className="w-full py-3 px-6 rounded-lg text-white font-semibold shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl transform hover:scale-105"
                      style={{backgroundColor: '#832729'}}
                    >
                      {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2.5 text-sm font-semibold text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        <Send size={18} style={{color: '#832729'}} />
                        Enter OTP
                      </div>
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      maxLength={6}
                      inputMode="numeric"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-2 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 text-center text-2xl tracking-widest"
                      style={{
                        borderColor: '#e5d9d0'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#832729'}
                      onBlur={(e) => e.target.style.borderColor = '#e5d9d0'}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setFormData(prev => ({...prev, otp: ''}));
                      }}
                      className="text-sm font-semibold mt-3 hover:opacity-70 transition-opacity"
                      style={{color: '#832729'}}
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              {activeTab === 'password' || (activeTab === 'otp' && otpSent) ? (
                <button
                  type="button"
                  disabled={isLoading || !formData.emailOrMobile || (activeTab === 'password' && !formData.password) || (activeTab === 'otp' && !formData.otp)}
                  onClick={handleSubmit}
                  className="w-full mt-8 py-3.5 px-6 rounded-lg text-white font-semibold shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl transform hover:scale-105"
                  style={{backgroundColor: '#832729'}}
                >
                  {isLoading
                    ? 'Signing In...'
                    : 'Sign In'}
                </button>
              ) : null}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;